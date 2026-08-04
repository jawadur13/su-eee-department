import { prisma } from '../src/lib/db';

async function main() {
  const existing = await prisma.pageHero.findUnique({ where: { pageKey: 'faculty-member-detail' } });
  if (existing) {
    console.log('✓ faculty-member-detail page hero already exists');
    await prisma.$disconnect();
    return;
  }

  await prisma.pageHero.create({
    data: {
      pageKey: 'faculty-member-detail',
      pageLabel: 'Faculty Member Detail',
      publicPath: '/faculty-member',
      heroTitle: 'Faculty Member',
      heroOverline: 'Department of EEE',
      heroImageUrl: '/assets/site-school-1024x576.webp',
    },
  });
  console.log('✓ faculty-member-detail page hero created');
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
