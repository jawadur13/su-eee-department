import { prisma } from '../src/lib/db';

async function main() {
  console.log('Clearing existing prospectus entries…');
  const deleted = await prisma.prospectusEntry.deleteMany();
  console.log(`✓ Deleted ${deleted.count} entries`);

  console.log('Seeding EEE prospectus…');
  await prisma.prospectusEntry.create({
    data: {
      slug: 'bsc-eee',
      title: 'B.Sc. in Electrical and Electronic Engineering (EEE)',
      shortTitle: 'B.Sc. in EEE',
      department: 'Electrical and Electronics Engineering',
      level: 'Undergraduate',
      coverUrl: '/assets/site-school-1024x576.webp',
      displayOrder: 0,
    },
  });
  console.log('✓ B.Sc. in EEE prospectus seeded');

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
