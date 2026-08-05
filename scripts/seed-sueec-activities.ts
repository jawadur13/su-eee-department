import { prisma } from '../src/lib/db';

const ACTIVITIES = [
  {
    iconName: 'Cpu',
    imageUrl: '/assets/sueec-robotics-workshop.webp',
    imagePublicId: null,
    category: 'Technical Training',
    title: 'Robotics & Electronics Workshops',
    description:
      'Hands-on Arduino and embedded systems training — from basic circuits to autonomous robots.',
  },
  {
    iconName: 'Mic',
    imageUrl: '/assets/sueec-tech-talks.webp',
    imagePublicId: null,
    category: 'Knowledge Sharing',
    title: 'Seminars & Tech Talks',
    description:
      'Industry professionals and alumni covering AI, VLSI, IoT, and career pathways.',
  },
  {
    iconName: 'Lightbulb',
    imageUrl: '/assets/sueec-project-exhibitions.webp',
    imagePublicId: null,
    category: 'Innovation',
    title: 'Project Exhibitions',
    description:
      'Hardware and software project showcases at departmental exhibitions and tech fairs.',
  },
  {
    iconName: 'Factory',
    imageUrl: '/assets/sueec-industrial-visits.webp',
    imagePublicId: null,
    category: 'Industrial Exposure',
    title: 'Industrial Visits',
    description:
      'Tours to power plants, substations, telecom exchanges, and electronics manufacturing.',
  },
  {
    iconName: 'Users',
    imageUrl: '/assets/sueec-leadership.webp',
    imagePublicId: null,
    category: 'Leadership',
    title: 'Leadership Development',
    description:
      'Soft skills, teamwork, and professional development programs.',
  },
  {
    iconName: 'Sparkles',
    imageUrl: '/assets/sueec-networking.webp',
    imagePublicId: null,
    category: 'Community',
    title: 'Networking Events',
    description:
      'Connecting students with alumni and industry for internships and mentorship.',
  },
];

async function main() {
  console.log('Updating SUEEC activities only…');
  await prisma.aboutEeeClub.update({
    where: { id: 'singleton' },
    data: { activities: ACTIVITIES },
  });
  console.log(`✓ Replaced with ${ACTIVITIES.length} activities`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
