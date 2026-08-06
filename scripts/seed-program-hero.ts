import { prisma } from '../src/lib/db';

async function main() {
  console.log('Seeding program-bsc-eee PageHero…');
  await prisma.pageHero.upsert({
    where: { pageKey: 'program-bsc-eee' },
    update: {},
    create: {
      pageKey: 'program-bsc-eee',
      pageLabel: 'B.Sc. in EEE Program Overview',
      publicPath: '/programs/bsc-eee',
      heroTitle: 'B.Sc. in Electrical and Electronic Engineering',
      heroOverline: 'Programs',
      heroImageUrl: '/assets/site-school-1024x576.webp',
    },
  });
  console.log('✓ PageHero seeded');

  console.log('Updating program ctaHref…');
  const program = await prisma.program.findFirst();
  if (program) {
    await prisma.program.update({
      where: { id: program.id },
      data: { ctaHref: '/programs/bsc-eee' },
    });
    console.log('✓ ctaHref set to /programs/bsc-eee');
  }

  await prisma.$disconnect();
  console.log('\nDone.');
}

main().catch((e) => { console.error(e); process.exit(1); });
