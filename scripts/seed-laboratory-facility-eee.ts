import { prisma } from '../src/lib/db';

const EEE_LABS = [
  {
    iconName: 'CircuitBoard',
    title: 'Electrical Circuit Lab',
    description: 'Foundational hands-on training in circuit analysis, electrical measurements, and basic electronics. Students work with oscilloscopes, power supplies, multimeters, and trainer boards to build and test AC/DC circuits.',
    keyLabel: 'Key Equipment',
    keyItems: 'Digital oscilloscopes, function generators, DC power supplies, multimeters, breadboards, resistive/capacitive/inductive banks, soldering stations, solar panels with controller, RF signal generator.',
    focus: 'AC/DC circuit analysis, electrical measurements, and fundamental electronics prototyping.',
    displayOrder: 0,
  },
  {
    iconName: 'ShieldCheck',
    title: 'Power System Protection & Communication Lab',
    description: 'Focused on power transmission, switchgear protection, and modern communication systems. Equipped with specialized trainers and test rigs for real-world engineering scenarios.',
    keyLabel: 'Key Equipment',
    keyItems: 'Switchgear & protection trainer, HVAC transmission line trainer, three-phase variable power supply, three-phase motor, IDMT relay, differential relay, analog/digital communication training systems, 8086 microprocessor trainer.',
    focus: 'Power system protection, transmission line analysis, and analog/digital communication techniques.',
    displayOrder: 1,
  },
  {
    iconName: 'Zap',
    title: 'Energy Conversion Lab',
    description: 'Covers electrical machines, transformers, and electromechanical energy conversion. Students analyze the operational characteristics of motors, generators, and power conversion equipment.',
    keyLabel: 'Key Equipment',
    keyItems: 'DC motor/generator, three-phase induction motor, alternator, single-phase/three-phase transformers, variable auto transformer, electro dynamometer, synchronizing module, resistive/inductive/capacitive loads.',
    focus: 'Electrical machine characteristics, energy conversion efficiency, and transformer operation.',
    displayOrder: 2,
  },
  {
    iconName: 'Cpu',
    title: 'Electronic Lab',
    description: 'A comprehensive electronics lab for analog and digital circuit design. Students prototype circuits using a wide range of semiconductor devices, integrated circuits, and testing instruments.',
    keyLabel: 'Key Equipment',
    keyItems: 'Digital/analog oscilloscopes, function generators, logic trainer boards, DC power supplies, semiconductor devices (transistors, diodes, MOSFETs, SCRs), digital ICs, op-amps, 555 timers, 7-segment displays, multiplexers, flip-flops.',
    focus: 'Analog/digital circuit design, semiconductor device characterization, and integrated circuit prototyping.',
    displayOrder: 3,
  },
];

async function main() {
  console.log('Clearing existing laboratory labs…');
  const deleted = await prisma.laboratoryLab.deleteMany();
  console.log(`✓ Deleted ${deleted.count} labs`);

  console.log('Seeding EEE laboratory labs…');
  await prisma.laboratoryLab.createMany({ data: EEE_LABS });
  console.log(`✓ Inserted ${EEE_LABS.length} labs`);

  console.log('Updating laboratory facility landing with EEE intro…');
  await prisma.laboratoryFacilityLanding.upsert({
    where: { id: 'singleton' },
    update: {
      introBody: 'The Department of Electrical and Electronics Engineering at Sonargaon University is committed to excellence in hands-on technical education. Our specialized laboratories — including the Electrical Circuit Lab, Power System Protection & Communication Lab, Energy Conversion Lab, and Electronic Lab — provide students with modern instruments and real-world experimentation to master circuit design, power systems, communication, and embedded electronics.',
      featuresHeading: 'Why Our Labs Matter',
      featuresOverline: 'What Sets Us Apart',
      features: [
        {
          iconName: 'Cpu',
          title: 'Industry-Standard Equipment',
          description: 'Modern oscilloscopes, function generators, microprocessor trainers, and communication systems used in professional engineering practice.',
        },
        {
          iconName: 'Users',
          title: 'Practical Learning',
          description: 'Each lab accommodates 35–45 students with dedicated workstations, ensuring every student gains hands-on experience.',
        },
        {
          iconName: 'Lightbulb',
          title: 'Research & Innovation',
          description: 'Labs support senior design projects and faculty-led research in power systems, VLSI, embedded systems, and renewable energy.',
        },
      ],
    },
    create: {
      id: 'singleton',
      heroTitle: 'Laboratory Facility',
      heroOverline: 'About',
      heroImageUrl: '/assets/site-school-1024x576.webp',
      introBody: 'The Department of Electrical and Electronics Engineering at Sonargaon University is committed to excellence in hands-on technical education. Our specialized laboratories — including the Electrical Circuit Lab, Power System Protection & Communication Lab, Energy Conversion Lab, and Electronic Lab — provide students with modern instruments and real-world experimentation to master circuit design, power systems, communication, and embedded electronics.',
      featuresHeading: 'Why Our Labs Matter',
      featuresOverline: 'What Sets Us Apart',
      features: [
        {
          iconName: 'Cpu',
          title: 'Industry-Standard Equipment',
          description: 'Modern oscilloscopes, function generators, microprocessor trainers, and communication systems used in professional engineering practice.',
        },
        {
          iconName: 'Users',
          title: 'Practical Learning',
          description: 'Each lab accommodates 35–45 students with dedicated workstations, ensuring every student gains hands-on experience.',
        },
        {
          iconName: 'Lightbulb',
          title: 'Research & Innovation',
          description: 'Labs support senior design projects and faculty-led research in power systems, VLSI, embedded systems, and renewable energy.',
        },
      ],
    },
  });
  console.log('✓ Laboratory facility landing updated');

  console.log('\nDone.');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
