/**
 * One-off migration seed — Option A restructure.
 *
 * Re-parses the same EEE Excel and rewrites ONLY the `publications` and
 * `research` JSON columns into the new structured shape:
 *   - publications: SectionItem[]  → each paper is its own item, with any
 *     inline DOI/URL extracted into a separate `url` field.
 *   - research:     SectionItem[]  → first item is all research fields joined
 *     by commas; profile links (Google Scholar) become their own labelled
 *     link items.
 *
 * Does NOT delete or create faculty, and touches no other columns.
 * Matches existing rows by slug (same slugify as the original seed),
 * falling back to an exact name match.
 */
import * as XLSX from 'xlsx';
import path from 'path';
import { prisma } from '../src/lib/db';

const EXCEL_PATH = path.resolve(
  __dirname,
  '..',
  'Temporary for seed',
  'EEE-Faculties-Info-Update-2026-2-fb2c6f45aebdc3c96d6e82ea96964dd4.xlsx',
);

type SectionItem = string | { text: string; url?: string };

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Pull the first meaningful link out of a paper's text and return the URL
// plus the text with the link (and its label) stripped away.
function extractLink(raw: string): { text: string; url?: string } {
  let url: string | undefined;

  // 1) Labelled full URL — "Link:", "DOI:", "doi:" (colon optional).
  let m = raw.match(/(?:Link|DOI|doi)\s*[:：]?\s*(https?:\/\/[^\s)]+)/i);
  if (m) url = m[1];

  // 2) Any bare URL.
  if (!url) {
    m = raw.match(/https?:\/\/[^\s)]+/i);
    if (m) url = m[0];
  }

  // 3) Labelled bare DOI number — "DOI: 10.xxxx" / "DOI 10.xxxx".
  if (!url) {
    m = raw.match(/(?:DOI|doi)\s*[:：]?\s*(10\.\d{3,}\/[^\s,)]+)/i);
    if (m) url = 'https://doi.org/' + m[1];
  }

  if (url) url = url.replace(/[.,;]+$/, '');

  // Remove the link (and any label) from the display text.
  let text = raw
    .replace(/\s*(?:Link|DOI|doi)\s*[:：]?\s*https?:\/\/[^\s)]+/gi, '')
    .replace(/\s*https?:\/\/[^\s)]+/gi, '')
    .replace(/\s*(?:DOI|doi)\s*[:：]?\s*10\.\d{3,}\/[^\s,)]+/gi, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*[.,;]\s*$/, '')
    .trim();

  return url ? { text, url } : { text };
}

// Split one publication blob into individual papers.
function splitPapers(raw: string): string[] {
  let s = raw.replace(/\r\n/g, '\n').trim();
  if (!s) return [];

  // Bullet style ("•\t...").
  if (s.includes('•')) {
    return s.split('•').map((x) => x.trim()).filter(Boolean);
  }

  // Numbered style — split before "N." markers (1–2 digits) that are
  // preceded by start/whitespace and followed by a quote or capital.
  // The year "2024." is excluded by the 1–2 digit limit.
  s = s.replace(/(^|\s)(\d{1,2})\.\s*(?=["“'(A-Z])/g, '\u0000');
  const parts = s.split('\u0000').map((x) => x.trim()).filter(Boolean);
  return parts.length > 0 ? parts : [s];
}

function buildPublications(raw: string | undefined): SectionItem[] | null {
  if (!raw || !String(raw).trim()) return null;
  const items = splitPapers(String(raw))
    .map((p) => extractLink(p))
    .filter((it) => it.text.length > 0 || it.url);
  return items.length > 0 ? items : null;
}

function buildResearch(
  interestRaw: string | undefined,
  scholarRaw: string | undefined,
): SectionItem[] | null {
  const items: SectionItem[] = [];

  // Field-of-interest → a single comma-joined item.
  if (interestRaw && String(interestRaw).trim()) {
    const fields = String(interestRaw)
      .replace(/\r\n/g, '\n')
      .split(/[\n,]+/)
      .map((f) => f.replace(/^[.\s]+|[.\s]+$/g, '').trim())
      .filter(Boolean);
    if (fields.length > 0) items.push(fields.join(', '));
  }

  // Google Scholar / research link → its own labelled link item, but only
  // when the cell actually holds a URL (some rows have plain text).
  if (scholarRaw && /^https?:\/\//i.test(String(scholarRaw).trim())) {
    items.push({ text: 'Google Scholar', url: String(scholarRaw).trim() });
  }

  return items.length > 0 ? items : null;
}

async function main() {
  console.log('Reading Excel file:', EXCEL_PATH);
  const workbook = XLSX.readFile(EXCEL_PATH);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1 });
  const dataRows = rows.slice(1).filter((r: any) => r[1] && String(r[1]).trim().length > 0);

  console.log(`Found ${dataRows.length} faculty rows in Excel\n`);

  let updated = 0;
  let skipped = 0;

  for (let i = 0; i < dataRows.length; i++) {
    const r = dataRows[i] as any[];
    const name = String(r[1] ?? '').trim();
    const publicationsRaw = r[11];
    const interestRaw = r[14];
    const scholarRaw = r[15];

    const publications = buildPublications(publicationsRaw);
    const research = buildResearch(interestRaw, scholarRaw);

    // Locate the existing faculty row (never create).
    const slug = slugify(name);
    let target = await prisma.faculty.findUnique({ where: { slug }, select: { id: true } });
    if (!target) {
      target = await prisma.faculty.findFirst({ where: { name }, select: { id: true } });
    }
    if (!target) {
      console.warn(`  [${i + 1}] SKIP — no faculty found for "${name}" (slug: ${slug})`);
      skipped++;
      continue;
    }

    await prisma.faculty.update({
      where: { id: target.id },
      data: {
        publications: (publications ?? undefined) as any,
        research: (research ?? undefined) as any,
      },
    });

    const pubCount = publications ? publications.length : 0;
    const resCount = research ? research.length : 0;
    console.log(`  [${i + 1}] ${name} — publications: ${pubCount} item(s), research: ${resCount} item(s)`);
    updated++;
  }

  console.log(`\nDone. Updated ${updated} faculty, skipped ${skipped}.`);
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
