import { prisma } from '../src/lib/db';

async function main() {
  const existing = await prisma.syllabus.findMany({ select: { shortTitle: true } });
  console.log('Current:', existing.length, 'syllabus entries');
  existing.forEach(s => console.log(' -', s.shortTitle));

  console.log('Clearing…');
  const deleted = await prisma.syllabus.deleteMany();
  console.log(`✓ Deleted ${deleted.count} entries`);

  console.log('Seeding EEE syllabus…');
  await prisma.syllabus.create({
    data: {
      slug: 'bsc-eee',
      title: 'B.Sc. in Electrical and Electronic Engineering (EEE) — Course Syllabus',
      shortTitle: 'B.Sc. in EEE Syllabus',
      department: 'Electrical and Electronics Engineering',
      level: 'Undergraduate',
      summary: 'The B.Sc. in EEE curriculum spans 161 credits across three core areas — Power Engineering, Electronics, and Telecommunication Engineering. The program includes specializations in Electronics, Communication, and Power, with periodic revisions to align with industry demands in the power and digital communication sectors.',
      coverUrl: '/assets/site-school-1024x576.webp',
      displayOrder: 0,
    },
  });
  console.log('✓ B.Sc. in EEE syllabus seeded');

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
