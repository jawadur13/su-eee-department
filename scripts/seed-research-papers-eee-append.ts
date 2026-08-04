import { prisma } from '../src/lib/db';

const AREA = 'Department of Electrical and Electronics Engineering, Sonargaon University';

const NEW_PAPERS = [
  {
    title: 'Design and Simulation of a DC-Powered Solar-Based Water Pumping System',
    authors: 'R. Mollah, Habib A. Kabbyo, Rubayat Rokon, Md. Rahman, Md. Mushfiqur Rahman, Muhibul Haque Bhuyan',
    area: AREA,
    date: 'December 2024',
    publicationYear: 2024,
    links: [],
    displayOrder: 5,
  },
  {
    title: 'Arduino, Sensors and IoT-Based Coal Mining Safety System for Bangladesh',
    authors: 'R. Mollah, Habib A. Kabbyo, Rubayat Rokon, S. Rahman, Muhibul Haque Bhuyan',
    area: AREA,
    date: 'February 2025',
    publicationYear: 2025,
    links: [],
    displayOrder: 6,
  },
  {
    title: 'Performance Analysis of Fully-Depleted Silicon-On-Insulator (SOI) G4-FET and Gate-All-Around (GAA) MOSFETs',
    authors: 'Md. Rakibul Alam, Md. Rais Uddin Mollah, Md. Ferdous Khan',
    area: AREA,
    date: 'March 2019',
    publicationYear: 2019,
    links: [],
    displayOrder: 7,
  },
  {
    title: 'Designing a Double Integral Sliding Mode Controller for Battery Storage and Wind-Based DC Microgrids with ANN-MPPT',
    authors: 'Israt Jahan Bushra, Md. Saiful Islam, Tushar Kanti Roy, Md. Rais Uddin Mollah, Subarto Kumar Ghosh',
    area: AREA,
    date: '2024',
    publicationYear: 2024,
    links: [],
    displayOrder: 8,
  },
  {
    title: 'The Taxonomy for Learning, Teaching and Assessing: Current Practices at Polytechnics in Bangladesh and its Effects in Developing Students\' Competences',
    authors: 'Faruque A. Haolader, Md Ramjan Ali, Khan Md Foysol',
    area: AREA,
    date: '2015',
    publicationYear: 2015,
    links: [{ label: 'DOI', value: 'https://doi.org/10.13152/IJRVET.2.2.9' }],
    displayOrder: 9,
  },
  {
    title: 'Propagation-path losses characterization for 900 MHz cellular communications in Dhaka City',
    authors: 'A. B. M. Siddique Hossain, R. Ali',
    area: AREA,
    date: '2003',
    publicationYear: 2003,
    links: [{ label: 'DOI', value: 'https://doi.org/10.1109/APCC.2003.1274298' }],
    displayOrder: 10,
  },
  {
    title: 'Automatic Voltage Regulator Control Simulation Analysis using Differential Evolution Algorithm',
    authors: 'Md. Ferdous Khan, Mobashwer Hassan Saad, Mir Hannan',
    area: AREA,
    date: '2022',
    publicationYear: 2022,
    links: [],
    displayOrder: 11,
  },
  {
    title: 'An Overview of Radio over Fiber (RoF) Technology',
    authors: 'Md. Ferdous Khan, Md. Zakir Hossan, Sayeed Islam',
    area: AREA,
    date: '2019',
    publicationYear: 2019,
    links: [],
    displayOrder: 12,
  },
  {
    title: 'Boiler Explosion in Bangladesh: Causes, Consequences and Precautions',
    authors: 'Md. Ferdous Khan, Md. Zakir Hossan, Sayeed Islam',
    area: AREA,
    date: 'May 2019',
    publicationYear: 2019,
    links: [{ label: 'DOI', value: 'https://doi.org/10.1145/3335550.3335592' }],
    displayOrder: 13,
  },
  {
    title: 'IoT-based Three-phase Smart Meter: Application for Power Quality Monitoring',
    authors: 'B. U. Bhuiyan, Md. M. Karim, I. Khan',
    area: AREA,
    date: 'December 2023',
    publicationYear: 2023,
    links: [{ label: 'DOI', value: 'https://doi.org/10.1109/eict61409.2023.10427710' }],
    displayOrder: 14,
  },
  {
    title: 'Household Energy Consumption Clustering Using k-means Algorithm: A Bangladesh Case Study',
    authors: 'B. U. Bhuiyan, I. Khan',
    area: AREA,
    date: 'September 2024',
    publicationYear: 2024,
    links: [{ label: 'DOI', value: 'https://doi.org/10.1109/PEEIACON63629.2024.10800004' }],
    displayOrder: 15,
  },
  {
    title: 'BER Performance of Spectral/Spatial OCDMA for UWO Link Using Perfect Difference Code',
    authors: 'Anik Kumar Das',
    area: AREA,
    date: '2021',
    publicationYear: 2021,
    links: [],
    displayOrder: 16,
  },
  {
    title: 'Design and Analysis of a Highly Sensitive BaTiO3-BP Hybrid Structure-Based SPR Biosensor for Rapid Bacterial Detection',
    authors: 'Md. Bijoy Khan',
    area: AREA,
    date: '',
    publicationYear: null,
    links: [],
    displayOrder: 17,
  },
  {
    title: 'Area and Power Efficient 4x4 Approximate Wallace Tree Multiplier Using Pareto-Optimal Adders',
    authors: 'M. G. Hasan, M. M. Islam, M. M. Khan, T. H. Saika, M. T. Amin',
    area: AREA,
    date: '2025',
    publicationYear: 2025,
    links: [{ label: 'DOI', value: 'https://doi.org/10.1109/QPAIN66474.2025.11172111' }],
    displayOrder: 18,
  },
  {
    title: 'Wideband and Linear Current Starved VCO with Source Degeneration and Integrated Charge Pump for ADC Front Ends',
    authors: 'M. M. Khan, M. M. Islam, M. G. Hasan, T. H. Saika, M. T. Amin',
    area: AREA,
    date: '2025',
    publicationYear: 2025,
    links: [{ label: 'DOI', value: 'https://doi.org/10.1109/QPAIN66474.2025.11171774' }],
    displayOrder: 19,
  },
  {
    title: 'Adaptive PID Algorithm for Dynamic Control Systems with BLDC Motor Validation',
    authors: 'M. M. Islam, M. M. Khan, M. G. Hasan',
    area: AREA,
    date: '2025',
    publicationYear: 2025,
    links: [{ label: 'DOI', value: 'https://doi.org/10.1109/RAAICON69033.2025.11502080' }],
    displayOrder: 20,
  },
  {
    title: 'Multipolar origin and polarization-controlled high-Q quasi-BIC Fano resonances in dielectric metasurfaces for sensing applications',
    authors: 'S. Sarkar, A. Zubair',
    area: AREA,
    date: 'February 2026',
    publicationYear: 2026,
    links: [{ label: 'DOI', value: 'https://doi.org/10.1039/D5NA01014D' }],
    displayOrder: 21,
  },
  {
    title: 'Lattice structure dependent modulation of photonic band gap in gallium phosphide based 2D photonic crystal',
    authors: 'S. Islam, M., S. Sarkar, M. I. Tahmid, M. A. Zaman Mamun',
    area: AREA,
    date: 'June 2020',
    publicationYear: 2020,
    links: [{ label: 'DOI', value: 'https://doi.org/10.1109/TENSYMP50017.2020.9230935' }],
    displayOrder: 22,
  },
  {
    title: 'Design and Implementation of a Compact, Energy-Efficient, and Low-Phase-Noise Phase Frequency Detector for Advanced PLL Applications',
    authors: 'T. Alam, T. T. Hossain, S. Nishat, T. H. Saika, S. Sultana',
    area: AREA,
    date: 'January 2026',
    publicationYear: 2026,
    links: [],
    displayOrder: 23,
  },
  {
    title: 'Novel Architecture of a Low Power D Flip-Flop Based Compact Frequency Divider for Wideband PLL Applications',
    authors: 'T. Alam, T. T. Hossain, T. H. Saika, S. Nishat',
    area: AREA,
    date: 'September 2024',
    publicationYear: 2024,
    links: [],
    displayOrder: 24,
  },
  {
    title: 'An Area Efficient Low Current Mismatch Charge Pump with Loop Filter for PLL Applications',
    authors: 'S. Nishat, T. T. Hossain, T. Alam, T. H. Saika',
    area: AREA,
    date: 'May 2024',
    publicationYear: 2024,
    links: [],
    displayOrder: 25,
  },
];

async function main() {
  console.log(`Seeding ${NEW_PAPERS.length} new research papers…`);
  for (const paper of NEW_PAPERS) {
    await prisma.researchPaper.create({ data: paper });
  }
  console.log(`✓ Inserted ${NEW_PAPERS.length} papers (appended to existing 5)`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
