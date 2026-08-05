import { prisma } from '../src/lib/db';

const EEE_RESEARCH_AREAS = [
  { iconName: 'Brain',         areaName: 'Artificial Intelligence (AI)', displayOrder: 1 },
  { iconName: 'CircuitBoard',  areaName: 'VLSI & IC Design',             displayOrder: 2 },
  { iconName: 'Bot',           areaName: 'Robotics & Automation',        displayOrder: 3 },
  { iconName: 'Cpu',           areaName: 'Embedded Systems',             displayOrder: 4 },
  { iconName: 'Wifi',          areaName: 'Internet of Things (IoT)',     displayOrder: 5 },
  { iconName: 'Leaf',          areaName: 'Renewable Energy',             displayOrder: 6 },
  { iconName: 'Network',       areaName: 'Smart Grid',                   displayOrder: 7 },
  { iconName: 'Activity',      areaName: 'Signal Processing',            displayOrder: 8 },
];

async function main() {
  console.log('Clearing existing research areas…');
  const deleted = await prisma.researchArea.deleteMany();
  console.log(`✓ Deleted ${deleted.count} research areas`);

  console.log('Seeding EEE research areas…');
  for (const area of EEE_RESEARCH_AREAS) {
    await prisma.researchArea.create({ data: area });
  }
  console.log(`✓ Inserted ${EEE_RESEARCH_AREAS.length} EEE research areas`);

  console.log('Setting featured research area (Robotics & Automation)…');
  const featured = await prisma.researchArea.findFirst({ where: { areaName: 'Robotics & Automation' } });
  if (featured) {
    await prisma.researchArea.update({
      where: { id: featured.id },
      data: {
        isFeatured: true,
        featuredHeading: 'Robotics & Industrial Automation',
        featuredImageUrl: '/assets/research-featured.webp',
        featuredDescription:
          'This research cell operates at the intersection of electrical design and intelligent control, building autonomous systems for next-generation manufacturing and smart automation.',
        featuredCtaHref: '/research',
      },
    });
    console.log('✓ Featured area set');
  }

  console.log('\nDone.');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
