import * as XLSX from 'xlsx';
import path from 'path';
import { prisma } from '../src/lib/db';

const EXCEL_PATH = path.resolve(
  __dirname,
  '..',
  'Temporary for seed',
  'EEE-Faculties-Info-Update-2026-2-fb2c6f45aebdc3c96d6e82ea96964dd4.xlsx',
);

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeFacultyType(raw: string): 'full_time' | 'part_time' {
  const t = raw.toLowerCase().replace(/[^a-z]/g, '');
  return t === 'parttime' ? 'part_time' : 'full_time';
}

function excelSerialToDate(serial: number): string {
  const epoch = new Date(1899, 11, 30);
  const d = new Date(epoch.getTime() + serial * 86400000);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function cleanText(raw: string | undefined): string | null {
  if (!raw) return null;
  return raw.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

function guessDate(raw: string | number | undefined): string | undefined {
  if (raw == null) return undefined;
  if (typeof raw === 'number') return excelSerialToDate(raw);
  const s = String(raw).trim();
  if (/^\d+$/.test(s) && s.length >= 5) return excelSerialToDate(Number(s));
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(s)) return s;
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(s)) {
    const [d, m, y] = s.split('.');
    return `${d}/${m}/${y}`;
  }
  if (/^\d{2}\.\d{2}\.\d{2}$/.test(s)) {
    const [d, m, y] = s.split('.');
    return `${d}/${m}/20${y}`;
  }
  if (/^\d{2}\/\d{2}\d{4}$/.test(s)) {
    const m = s.substring(0, 2);
    const d = s.substring(2, 4);
    const y = s.substring(4, 8);
    return `${d}/${m}/${y}`;
  }
  return s;
}

async function main() {
  console.log('Reading Excel file:', EXCEL_PATH);

  const workbook = XLSX.readFile(EXCEL_PATH);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });

  const headers = rows[0] as string[];
  const dataRows = rows.slice(1).filter((r: any) => r[1] && String(r[1]).trim().length > 0);

  console.log(`Found ${dataRows.length} faculty rows in Excel`);

  // Count existing faculty
  const totalBefore = await prisma.faculty.count();
  const deanCount = await prisma.faculty.count({ where: { isDean: true } });
  const toDelete = totalBefore - deanCount;

  console.log(`Existing faculty: ${totalBefore} (${deanCount} dean(s), deleting ${toDelete})`);

  // Delete non-dean faculty
  if (toDelete > 0) {
    const deleted = await prisma.faculty.deleteMany({ where: { isDean: false } });
    console.log(`Deleted ${deleted.count} faculty members`);
  }

  // Insert new faculty
  let inserted = 0;
  const usedSlugs = new Set<string>();

  for (let i = 0; i < dataRows.length; i++) {
    const r = dataRows[i] as any[];

    const name = String(r[1] ?? '').trim();
    const facultyTypeRaw = String(r[2] ?? '').trim();
    const joiningDateRaw = r[3];
    const position = String(r[4] ?? '').trim();
    const email = String(r[5] ?? '').trim() || null;
    const phone = String(r[6] ?? '').trim() || null;
    const suId = String(r[7] ?? '').trim() || null;
    const academicBg = cleanText(r[8]);
    const biography = cleanText(r[9]);
    const experience = cleanText(r[10]);
    const publications = cleanText(r[11]);
    const awards = cleanText(r[12]);
    const specialisation = cleanText(r[13]);
    const interest = cleanText(r[14]);
    const googleScholar = String(r[15] ?? '').trim() || null;
    const fellowship = cleanText(r[16]);

    const joiningDate = guessDate(joiningDateRaw);

    // Build slug
    let slug = slugify(name);
    while (usedSlugs.has(slug)) {
      slug = slugify(name + '-' + (i + 1));
    }
    usedSlugs.add(slug);

    const isHead = /head/i.test(position);

    // Build personalInfo as label/value array
    const personalInfo: { label: string; value: string }[] = [];
    if (biography) {
      personalInfo.push({ label: 'Biography', value: biography });
    }
    if (joiningDate) {
      personalInfo.push({ label: 'Joining Date', value: joiningDate });
    }
    if (googleScholar) {
      personalInfo.push({ label: 'Google Scholar', value: googleScholar });
    }

    const data: any = {
      slug,
      name,
      designation: position || null,
      type: normalizeFacultyType(facultyTypeRaw),
      displayOrder: i + 1,
      email: email || null,
      phone: phone || null,
      suId: suId || null,
      isHead,
    };

    // Json fields — only include if non-empty
    if (personalInfo.length > 0) data.personalInfo = personalInfo;
    if (academicBg) data.academicQualification = academicBg;
    if (experience) data.previousEmployment = experience;
    if (publications) data.publications = publications;
    if (awards) data.awards = awards;
    if (specialisation) data.teachingArea = specialisation;
    if (interest) data.research = interest;
    if (fellowship) data.membership = fellowship;

    await prisma.faculty.create({ data });
    inserted++;
    console.log(`  [${i + 1}] ${name}  (${data.type})  slug: ${slug}${isHead ? ' [HEAD]' : ''}`);
  }

  const totalAfter = await prisma.faculty.count();
  console.log(`\nDone. Faculty: ${totalBefore} → ${totalAfter} (kept ${deanCount} dean(s), inserted ${inserted})`);
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
