import { prisma } from '../src/lib/db';

const EEE_LABS = [
  {
    slug: 'electrical-circuit-lab',
    name: 'Electrical Circuit Lab',
    tagline: 'Room 207 · In-Charge: Shariful Islam',
    description: `A foundational lab for circuit analysis and electrical measurements.

Major Equipment:
- Digital Logic Trainer Board
- Analog & Digital Oscilloscopes
- Function Generator
- Single & Dual DC Power Supplies
- Multimeters (Vector, Digital, Clamp)
- Analog Ammeters & Voltmeters (AC/DC)
- Galvanometer
- LCR Meter
- Frequency Counters & Meter
- RF Signal Generator
- Breadboards & Switch Banks
- Resistive, Capacitive & Inductive Banks
- AC Network Circuit Board / Trainer Board
- Transformers (220V to 12×2V)
- Soldering Station (Iron, Lead, Stand, Sucker)
- Solar Panel with Controller
- Relay & Automatic Transfer Switch
- Computer Power Supply
- Various Tools & Components

Capacity: 35 students | 80 equipment items`,
    heroImageUrl: null,
    gallery: [],
    displayOrder: 1,
  },
  {
    slug: 'power-system-protection-communication-lab',
    name: 'Power System Protection & Communication Lab',
    tagline: 'Room 605 · In-Charge: Shariful Islam',
    description: `A specialized lab combining power system protection with communication engineering.

Major Equipment:
- Switchgear & Protection Trainer
- Electrical Power Transmission Line Trainer (HVAC)
- Three-Phase Variable Power Supply
- Three-Phase Motor
- IDMT Relay & Differential Relay
- Analog Communication Training System
- Digital Communication Training System
- High-Level Communication Training System
- 8086 Microprocessor Trainer
- Digital & Analog Oscilloscopes
- Trainer Boards
- Cartridge Fuse

Capacity: 40 students | 15 equipment items`,
    heroImageUrl: null,
    gallery: [],
    displayOrder: 2,
  },
  {
    slug: 'energy-conversion-lab',
    name: 'Energy Conversion Lab',
    tagline: 'Room 208 · In-Charge: Shariful Islam',
    description: `A lab focused on electrical machines, transformers, and power conversion.

Major Equipment:
- DC Motor/Generator
- Three-Phase Induction Motor
- Generator / Alternator
- Capacitive Run Motor & Split-Phase Motor
- Single-Phase & Three-Phase Transformers
- Variable Single-Phase Auto Transformer
- Electro Dynamometer
- Synchronizing Module
- Convert DC Power Supply
- Resistive, Inductive & Capacitive Loads
- AC Voltmeter, Ammeter & Wattmeter
- Digital Wattmeter & Multimeter
- Tachometer
- Connecting Cables

Capacity: 40 students | 22 equipment items`,
    heroImageUrl: null,
    gallery: [],
    displayOrder: 3,
  },
  {
    slug: 'electronic-lab',
    name: 'Electronic Lab',
    tagline: 'Room 604 · In-Charge: Shariful Islam',
    description: `A comprehensive electronics lab for analog and digital circuit design.

Major Equipment:
- Digital & Analog Oscilloscopes
- Single & Dual DC Power Supplies
- Function Generator
- Logic Trainer Board
- Power Electronic KIT with Power Supply
- Multimeters (UT33, Sanowa, Digital)
- Analog Ammeters & Voltmeters
- Soldering Station (Iron, Stand)
- Passive Components (Resistors, Capacitors, Variable Resistors)
- Semiconductor Devices (Transistors, Diodes, MOSFETs, SCRs, DIACs)
- Digital ICs & Op-Amp ICs
- 555 Timer IC
- Decoder/Demultiplexer (2×4, 3×8)
- Encoder (8-line to 3-line)
- 4-bit Magnitude Comparator
- Dual J-K & D Flip-Flops with Reset
- 7-Segment Decoder & Display
- Multiplexers (4×1, 8×1)
- 4-bit Binary Full Adder
- BCD to 7-Segment Decoder
- CMOS Monostable/Astable Multivibrator
- IC Holders, Jumper Wires, Heat Sinks

Capacity: 45 students | 47 equipment items`,
    heroImageUrl: null,
    gallery: [],
    displayOrder: 4,
  },
];

async function main() {
  console.log('Clearing existing lab records…');
  const deleted = await prisma.lab.deleteMany();
  console.log(`✓ Deleted ${deleted.count} lab records`);

  console.log('Seeding EEE labs…');
  for (const lab of EEE_LABS) {
    await prisma.lab.create({ data: lab });
  }
  console.log(`✓ Inserted ${EEE_LABS.length} EEE labs`);

  console.log('\nDone.');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
