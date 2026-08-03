import { prisma } from '../src/lib/db';

async function main() {
  console.log('Seeding SUEEC (SU Electrical and Electronic Club)…');

  await prisma.aboutEeeClub.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      heroTitle: 'SU Electrical and Electronic Club',
      heroOverline: 'About',
      heroImageUrl: '/assets/mecha-hero.webp',
      heroImagePublicId: null,
      heroImageVerticalPercent: 45,

      introOverline: 'Where Innovation Meets Community',
      introHeading:
        'Building Industry-Ready <span class="text-gradient">EEE Engineers</span>',
      introBody1:
        'The Department of Electrical and Electronic Engineering at Sonargaon University fosters a vibrant student community through its official departmental club — SUEEC. We are committed to transforming students into industry-ready professionals through continuous technical engagement and hands-on exposure.',
      introBody2:
        'From robotics workshops to industrial visits, from project exhibitions to national tech fests — SUEEC bridges classroom learning with the real world, equipping every member with the skills, network, and confidence to lead in the field of electrical and electronic engineering.',
      introImageUrl: '/assets/mecha-club-1.webp',
      introImagePublicId: null,

      stats: [
        { value: '100+', label: 'Active Members' },
        { value: '30+', label: 'Workshops & Seminars' },
        { value: '15+', label: 'Industrial Visits' },
        { value: '2024', label: 'Founded' },
      ],

      activitiesOverline: 'What We Do',
      activitiesHeading: 'Core Activities & Initiatives',
      activities: [
        {
          iconName: 'Cpu',
          imageUrl: '/assets/mecha-workshop.webp',
          imagePublicId: null,
          category: 'Technical Training',
          title: 'Robotics & Electronics Workshops',
          description:
            'Hands-on Arduino and embedded systems workshops — from basic circuit design to autonomous robotics. Students build functioning prototypes using microcontrollers, sensors, and actuators in guided sessions.',
        },
        {
          iconName: 'Factory',
          imageUrl: '/assets/mecha-field-visit.webp',
          imagePublicId: null,
          category: 'Industrial Exposure',
          title: 'Industry Visits & Plant Tours',
          description:
            'Organized tours to power generation plants, substations, semiconductor facilities, telecom exchanges, and electronics manufacturing units — giving students firsthand exposure to real-world EEE operations.',
        },
        {
          iconName: 'Mic',
          imageUrl: '/assets/mecha-seminar.webp',
          imagePublicId: null,
          category: 'Knowledge Sharing',
          title: 'Seminars & Tech Talks',
          description:
            'Regular sessions featuring industry professionals, alumni, and faculty covering trending topics — AI, VLSI design, renewable energy, IoT, and career pathways in power and telecommunications sectors.',
        },
        {
          iconName: 'Lightbulb',
          imageUrl: '/assets/mecha-project.webp',
          imagePublicId: null,
          category: 'Innovation',
          title: 'Project Exhibitions & Tech Fairs',
          description:
            'Students showcase innovative hardware and software projects during departmental exhibitions and university-wide tech fairs — from smart home systems to renewable energy prototypes — sharpening design and presentation skills.',
        },
        {
          iconName: 'Sparkles',
          imageUrl: '/assets/mecha-cocurricular.webp',
          imagePublicId: null,
          category: 'Community',
          title: 'Co-curricular & Networking Events',
          description:
            'Beyond circuits and code — indoor games, cultural programs, study tours, and networking mixers that foster a well-rounded university experience and strong inter-batch collaboration.',
        },
        {
          iconName: 'Award',
          imageUrl: '/assets/mecha-appreciation.webp',
          imagePublicId: null,
          category: 'Recognition',
          title: 'Competitions & National Recognition',
          description:
            'SUEEC members actively participate in national-level robotics competitions, project showcases, and tech olympiads — earning recognition and building portfolios that stand out in the job market.',
        },
      ],

      networkOverline: 'Beyond Graduation',
      networkHeading: 'Building a Professional Network',
      networkBody:
        'The SUEEC community serves as a bridge between current students and the SU Alumni — creating an active professional network that opens doors to internships, job placements, and lifelong mentorship across the electrical and electronics engineering industry.',
      networkPrimaryCtaLabel: 'Join the Club',
      networkPrimaryCtaHref: 'https://su.edu.bd/swd/activities',
      networkSecondaryCtaLabel: 'Alumni Portal',
      networkSecondaryCtaHref:
        'http://sue.su.edu.bd:5081/sonargaon_erp/student/convocation_registration/alumni',
    },
  });

  console.log('✓ SUEEC page seeded');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
