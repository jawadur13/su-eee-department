import { prisma } from '../src/lib/db';

const PAPERS = [
  {
    title: 'Design and performance analysis of a Tunable Active Inductor Based Bandpass Filter for X Band Applications in 90 nm CMOS Process',
    authors: 'Omar Faruqe, Rumana Akhter, Md Shafikul Islam Shawan, Fatema Tuz Zohra, Md Ashikur Rahman, Hadeeka Tuz Zahra, Fatema Sharmin, Md Tawfiq Amin',
    area: 'Department of Electrical and Electronics Engineering, Sonargaon University',
    date: '2023',
    publicationYear: 2023,
    links: [
      { label: 'DOI', value: 'https://doi.org/10.1109/EICT61409.2023.10427919' },
      { label: 'IEEE Xplore', value: 'https://ieeexplore.ieee.org/abstract/document/10427919' },
    ],
    displayOrder: 0,
  },
  {
    title: 'MOSFET Based Active Components as Alternative to Passive Counterparts',
    authors: 'Shafiyee Islam, Omar Faruqe, Md Sohel Rana, Fahim Shariar, Rebina Akter, Md Ariful Islam, Md Ashikur Rahman, Ashrafun Naher Pinky, Md Tawfiq Amin',
    area: 'Department of Electrical and Electronics Engineering, Sonargaon University',
    date: '2022',
    publicationYear: 2022,
    links: [
      { label: 'DOI', value: 'https://doi.org/10.1109/I2CT54291.2022.9824453' },
      { label: 'IEEE Xplore', value: 'https://ieeexplore.ieee.org/abstract/document/9824453' },
    ],
    displayOrder: 1,
  },
  {
    title: 'Enhancement of c-Si/TiO2 Heterojunction Thin Film Solar Cell Using Hybrid Metal-Dielectric Nanostructures',
    authors: 'Soikot Sarkar, S. M. Choudhury',
    area: 'Department of Electrical and Electronics Engineering, Sonargaon University',
    date: '2024',
    publicationYear: 2024,
    links: [
      { label: 'DOI', value: 'https://doi.org/10.1016/j.solener.2025.113535' },
      { label: 'arXiv', value: 'https://arxiv.org/abs/2411.19925' },
    ],
    displayOrder: 2,
  },
  {
    title: 'A polarization tunable incident angle tolerant dielectric metasurface-based color filter',
    authors: 'Soikot Sarkar, D. Sarker, A. Zubair',
    area: 'Department of Electrical and Electronics Engineering, Sonargaon University',
    date: '2024',
    publicationYear: 2024,
    links: [
      { label: 'DOI', value: 'https://doi.org/10.1039/d4ma00291a' },
      { label: 'RSC', value: 'https://pubs.rsc.org/en/content/articlehtml/2024/ma/d4ma00291a' },
    ],
    displayOrder: 3,
  },
  {
    title: 'Design and Performance Analysis of a c-Si Thin-Film Solar Cell Using Plasmonic Ag Nanostructures',
    authors: 'Soikot Sarkar, S. M. Choudhury',
    area: 'Department of Electrical and Electronics Engineering, Sonargaon University',
    date: '2023',
    publicationYear: 2023,
    links: [],
    displayOrder: 4,
  },
];

async function main() {
  console.log('Clearing existing research papers…');
  const deleted = await prisma.researchPaper.deleteMany();
  console.log(`✓ Deleted ${deleted.count} papers`);

  console.log('Seeding 5 EEE research papers…');
  for (const paper of PAPERS) {
    await prisma.researchPaper.create({ data: paper });
  }
  console.log(`✓ Inserted ${PAPERS.length} papers`);

  console.log('\nDone.');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
