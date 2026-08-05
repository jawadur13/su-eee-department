import { prisma } from '../src/lib/db';
async function main() {
  const [progs, fees] = await Promise.all([
    prisma.program.findMany({ orderBy: { displayOrder: 'asc' } }),
    prisma.programFeeStructure.findMany(),
  ]);
  console.log('Programs:', progs.length);
  progs.forEach(p => console.log(' ', p.programName, '| id:', p.id));
  console.log('\nFee Structures:', fees.length);
  fees.forEach(f => console.log(' ', f.introOverline, '| programId:', f.programId));
  await prisma.$disconnect();
}
main();
