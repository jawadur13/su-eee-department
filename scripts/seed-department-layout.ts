import { prisma } from '../src/lib/db';

async function main() {
  await prisma.pageHero.upsert({
    where: { pageKey: 'department-layout' },
    update: {},
    create: {
      pageKey: 'department-layout',
      pageLabel: 'Department Layout',
      publicPath: '/about/department-layout',
      heroTitle: 'Department Layout',
      heroOverline: 'About',
      heroImageUrl: '/assets/site-school-1024x576.webp',
    },
  });
  console.log('✓ department-layout page hero seeded');

  const existing = await prisma.departmentLayout.findFirst();
  if (!existing) {
    await prisma.departmentLayout.create({
      data: {
        slug: 'eee-department-layout',
        title: 'Department of Electrical and Electronics Engineering — Floor Plan',
        shortTitle: 'EEE Department Layout',
        coverUrl: '/assets/site-school-1024x576.webp',
        displayOrder: 0,
      },
    });
    console.log('✓ department layout seeded');
  } else {
    console.log('Department layout already exists (skipped)');
  }

  await prisma.$disconnect();
  console.log('Done.');
}
main().catch((e) => { console.error(e); process.exit(1); });
