import { prisma } from '../src/lib/db';

const EVENTS = [
  {
    slug: 'industrial-visit-walton-factory-2024',
    title: 'Industrial Visit to Walton Hi-Tech Factory',
    shortTitle: 'Walton Factory Visit',
    category: 'Industrial Visit',
    status: 'Past',
    eventDate: new Date('2024-11-24'),
    displayDate: '24 November 2024',
    time: '9:00 AM – 4:00 PM',
    venue: 'Walton Hi-Tech Industries, Gazipur',
    summary: 'Final-year students toured the production lines to connect classroom theory with real-world manufacturing.',
    description: [
      'A group of 60 final-year students from the Department of Electrical and Electronic Engineering visited the Walton Hi-Tech manufacturing facility on 24 November 2024.',
      'Students observed CNC machining, assembly automation, and quality-control processes first-hand, gaining insight into modern electronics manufacturing.',
      'The visit ended with an interactive session with the plant engineers, where students learned about career opportunities and industry expectations.',
    ],
    focus: 'Bridging academic learning with real-world manufacturing practice.',
    details: [
      { label: 'Chief Guest', value: 'Eng. A. Hossain' },
      { label: 'Coordinator', value: 'Dr. S. Rahman' },
      { label: 'Participants', value: '60' },
    ],
    imageUrl: '/assets/site-school-1024x576.webp',
  },
  {
    slug: 'industrial-visit-ghorashal-power-plant-2024',
    title: 'Enlightening Experience at Ghorashal Power Plant — EEE Industrial Visit',
    shortTitle: 'Ghorashal Power Plant Visit',
    category: 'Industrial Visit',
    status: 'Past',
    eventDate: new Date('2024-02-12'),
    displayDate: '12 February 2024',
    time: '',
    venue: 'Ghorashal Power Plant',
    summary: 'EEE students gained practical understanding of power generation processes and real-world engineering applications.',
    description: [
      'The Department of Electrical and Electronic Engineering at Sonargaon University organized an industrial visit to Ghorashal Power Plant on 12 February 2024, providing students with practical exposure to power generation.',
      'Students engaged in interactive sessions with professionals covering plant architecture, machinery, and the role of technology in optimizing energy production.',
      'A comprehensive guided tour included the turbine hall and control room, helping students understand the complexities of power generation systems and operational planning.',
      'Q&A sessions encouraged critical thinking about industry challenges and innovations, while networking opportunities helped students build connections with industry professionals.',
      'Ghorashal Power Plant authorities offered both paid and unpaid internship positions for EEE students, reflecting the university\'s commitment to bridging academia and industry.',
    ],
    focus: 'Practical understanding of power generation, plant operations, and industrial networking.',
    details: [
      { label: 'Organized By', value: 'Department of EEE' },
      { label: 'Internship Offered', value: 'Paid & Unpaid Positions' },
    ],
    imageUrl: '/assets/site-school-1024x576.webp',
  },
  {
    slug: 'project-showcasing-presentations-2024',
    title: 'Showcasing Creative Journeys through Poster and Project Presentations 2024',
    shortTitle: 'Project Showcasing & Presentations',
    category: 'Workshop',
    status: 'Past',
    eventDate: new Date('2024-11-08'),
    displayDate: '8 November 2024',
    time: '',
    venue: 'Main Auditorium, Sonargaon University',
    summary: 'A one-day hands-on project showcasing and presentation event bringing together students from the Department of EEE.',
    description: [
      'The Department of Electrical and Electronic Engineering successfully organized a one-day Project Showcasing and Presentations event on 8 November 2024.',
      'Students from Sonargaon University took part in hands-on sessions covering various types of projects and presentation techniques.',
      'The event concluded with a project showcase judged by industry experts, providing students with valuable feedback and recognition.',
    ],
    focus: 'Student project development, technical presentations, and peer learning.',
    details: [
      { label: 'Participants', value: '120' },
      { label: 'Location', value: 'Main Auditorium' },
      { label: 'Organising Partner', value: 'Robotics Society' },
    ],
    imageUrl: '/assets/site-school-1024x576.webp',
  },
];

async function main() {
  console.log('Clearing existing events…');
  const deleted = await prisma.event.deleteMany();
  console.log(`✓ Deleted ${deleted.count} events`);

  console.log(`Seeding ${EVENTS.length} EEE events…`);
  for (const event of EVENTS) {
    await prisma.event.create({ data: event });
  }
  console.log(`✓ Inserted ${EVENTS.length} events`);

  console.log('\nDone.');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
