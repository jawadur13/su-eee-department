import { prisma } from '../src/lib/db';

async function main() {
  const existing = await prisma.news.findMany({ select: { shortTitle: true } });
  console.log('Current news:', existing.length);
  if (existing.length > 0) {
    console.log('Clearing…');
    const deleted = await prisma.news.deleteMany();
    console.log(`✓ Deleted ${deleted.count} articles`);
  }

  console.log('Seeding EEE news…');
  await prisma.news.create({
    data: {
      slug: 'project-showcasing-presentations-2024',
      title: 'Showcasing Creative Journeys through Poster and Project Presentations 2024',
      shortTitle: 'Project Showcasing & Presentations',
      category: 'Workshop',
      publishedAt: new Date('2024-11-08'),
      displayDate: '08 November 2024',
      summary: 'A one-day hands-on project showcasing and presentations event bringing together students from the Department of Electrical and Electronic Engineering.',
      coverUrl: '/assets/site-school-1024x576.webp',
      body: [
        'The Department of Electrical and Electronic Engineering at Sonargaon University successfully organized a one-day Project Showcasing and Presentations event on 8 November 2024, bringing together students from across the department.',
        'Participants from Sonargaon University took part in hands-on sessions covering different types of projects and presentation techniques, fostering peer learning and technical skill development.',
        'The event concluded with a project showcase judged by industry experts, providing students with valuable feedback and professional recognition.',
      ],
      meta: [
        { label: 'Participants', value: '120' },
        { label: 'Location', value: 'Main Auditorium' },
        { label: 'Organising Partner', value: 'Robotics Society' },
      ],
    },
  });
  console.log('✓ News seeded');

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
