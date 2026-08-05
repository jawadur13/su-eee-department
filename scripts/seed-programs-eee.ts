import * as XLSX from 'xlsx';
import path from 'path';
import { prisma } from '../src/lib/db';

const EXCEL_PATH = path.resolve(
  __dirname,
  '..',
  'Temporary for seed',
  'Programs_and_Course_Curriculum_Template_EEE-f2445f6c8669f75a9153f741fceb2894.xlsx',
);

function cleanRichText(raw: string): string {
  return raw
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .replace(/ +/g, ' ')
    .trim();
}

async function main() {
  console.log('Reading Excel:', EXCEL_PATH);

  const workbook = XLSX.readFile(EXCEL_PATH);
  console.log('Sheets:', workbook.SheetNames.join(', '));

  // Sheet 1: Program_Overview
  const sheet1 = workbook.Sheets['Program_Overview'];
  const rows1 = XLSX.utils.sheet_to_json<any[]>(sheet1, { header: 1, defval: '' });

  const headers = rows1[0] as string[];
  console.log('Program_Overview headers:', headers.filter(Boolean).join(' | '));

  const dataRow = rows1[1] as any[];
  const extraRows = rows1.slice(2);

  const programName = cleanRichText(dataRow[0] || '');
  const level = cleanRichText(dataRow[1] || '');
  const degreeAwarded = cleanRichText(dataRow[2] || '');
  const duration = cleanRichText(dataRow[3] || '');
  const totalCredits = cleanRichText(dataRow[4] || '');
  const specRaw = cleanRichText(dataRow[5] || '');
  const description = cleanRichText(dataRow[6] || '');
  const admissionReqRow2 = cleanRichText(dataRow[7] || '');
  const remarks = cleanRichText(dataRow[8] || '');

  // Gather additional admission requirement paragraphs from rows 2-12
  const admissionParagraphs: string[] = [];
  if (admissionReqRow2) admissionParagraphs.push(admissionReqRow2);
  for (const row of extraRows) {
    const text = cleanRichText(row[7] || row[0] || '');
    if (text) admissionParagraphs.push(text);
  }

  console.log(`\nProgram: ${programName}`);
  console.log(`Level: ${level}  |  Degree: ${degreeAwarded}`);
  console.log(`Duration: ${duration}  |  Credits: ${totalCredits}`);
  console.log(`Specializations: ${specRaw}`);
  console.log(`Admission paragraphs: ${admissionParagraphs.length}`);

  // Parse specializations
  const specializations = specRaw
    .split(/[,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Build full description
  const fullDescriptionParts: string[] = [description];
  if (totalCredits) fullDescriptionParts.push(`Total Credits: ${totalCredits}.`);
  if (admissionParagraphs.length > 0) {
    fullDescriptionParts.push('\nAdmission Requirements:');
    for (const p of admissionParagraphs) {
      fullDescriptionParts.push(`• ${p}`);
    }
  }
  const fullDescription = fullDescriptionParts.join('\n');

  // Sheet 2 & 3 check
  for (const name of ['Course_Structure', 'Credit_Distribution']) {
    const sheet = workbook.Sheets[name];
    const rows = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1, defval: '' });
    const dataRows = rows.slice(1).filter((r: any) => r.some((c: any) => c !== ''));
    if (dataRows.length === 0) {
      console.log(`\n⚠ ${name}: Empty (headers only, no course data)`);
    } else {
      console.log(`\n${name}: ${dataRows.length} rows`);
    }
  }

  // Delete existing programs
  const before = await prisma.program.count();
  console.log(`\nExisting programs: ${before}`);

  if (before > 0) {
    const deleted = await prisma.program.deleteMany();
    console.log(`Deleted ${deleted.count} program(s)`);
  }

  // Insert new EEE program
  const degreeCode = 'BSc-EEE';
  const program = await prisma.program.create({
    data: {
      programName: `B.Sc. in ${programName}`,
      degreeCode,
      duration,
      description: fullDescription,
      specializations,
      displayOrder: 1,
      cta: 'Learn More',
      ctaHref: '/admission/requirements',
    },
  });

  console.log(`\nInserted: ${program.programName} (${program.degreeCode})`);

  const after = await prisma.program.count();
  console.log(`Done. Programs: ${before} → ${after}`);
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
