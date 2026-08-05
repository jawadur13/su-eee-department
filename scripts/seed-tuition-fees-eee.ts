import { prisma } from '../src/lib/db';

async function main() {
  const program = await prisma.program.findFirst({
    where: { programName: 'B.Sc. in EEE' },
    select: { id: true },
  });
  if (!program) {
    console.error('Program "B.Sc. in EEE" not found.');
    process.exit(1);
  }

  console.log('Program ID:', program.id);

  const existing = await prisma.programFeeStructure.findUnique({
    where: { programId: program.id },
  });

  if (existing) {
    console.log('Deleting existing fee structure…');
    await prisma.programFeeStructure.delete({ where: { programId: program.id } });
  }

  console.log('Creating EEE tuition fee structure…');
  await prisma.programFeeStructure.create({
    data: {
      programId: program.id,
      introOverline: 'B.Sc. in Electrical and Electronics Engineering (EEE)',
      introHeading: 'Tuition Fee Structure',
      introBody: 'Cost per credit and total program cost vary based on academic background (SSC + HSC or Diploma) and the shift you choose. HSC background programs carry 161 credits; Diploma-background and Golden A+ achievers follow a reduced 144-credit structure. Use the breakdown below to find the fees that apply to you.',

      overviewStats: [
        { iconName: 'GraduationCap', label: 'Total Credits', value: '161 / 144' },
        { iconName: 'Calendar', label: 'Semester System', value: 'Tri-Semester' },
        { iconName: 'CreditCard', label: 'Admission Fee', value: 'BDT 12,500' },
        { iconName: 'BookOpen', label: 'Semester Fees', value: 'BDT 96,000' },
      ],

      shifts: [
        {
          iconName: 'Sun', name: 'SUN', shiftLabel: 'Morning Shift',
          description: 'Primarily for students from an SSC + HSC background.',
          groups: [{
            background: 'SSC + HSC',
            tiers: [
              { gpa: 'No Waiver', waiver: '—', totalCredits: 161, perCredit: 1750, total: 390250 },
              { gpa: '5.00–7.99', waiver: '55%', totalCredits: 161, perCredit: 788, total: 235368 },
              { gpa: '8.00–9.00', waiver: '58%', totalCredits: 161, perCredit: 735, total: 226835 },
              { gpa: '10.00', waiver: '73%', totalCredits: 144, perCredit: 473, total: 184653 },
            ],
          }],
        },
        {
          iconName: 'Star', name: 'STAR', shiftLabel: 'Friday Shift',
          description: 'Available for both SSC + HSC and Diploma students.',
          groups: [
            { background: 'SSC + HSC', tiers: [
              { gpa: 'No Waiver', waiver: '—', totalCredits: 161, perCredit: 3326, total: 619986 },
              { gpa: '5.00–7.99', waiver: '62%', totalCredits: 161, perCredit: 1264, total: 288004 },
              { gpa: '8.00–9.00', waiver: '64%', totalCredits: 161, perCredit: 1197, total: 277217 },
              { gpa: '10.00', waiver: '66%', totalCredits: 144, perCredit: 1131, total: 266591 },
            ]},
            { background: 'Diploma', tiers: [
              { gpa: 'No Waiver', waiver: '—', totalCredits: 144, perCredit: 3326, total: 557444 },
              { gpa: '5.00–7.99', waiver: '62%', totalCredits: 144, perCredit: 1264, total: 260516 },
              { gpa: '8.00–9.00', waiver: '64%', totalCredits: 144, perCredit: 1197, total: 250868 },
            ]},
          ],
        },
        {
          iconName: 'Moon', name: 'MOON', shiftLabel: 'Evening Shift',
          description: 'Available for both SSC + HSC and Diploma students.',
          groups: [
            { background: 'SSC + HSC', tiers: [
              { gpa: 'No Waiver', waiver: '—', totalCredits: 161, perCredit: 3326, total: 619986 },
              { gpa: '5.00–7.99', waiver: '71%', totalCredits: 161, perCredit: 965, total: 239865 },
              { gpa: '8.00–9.00', waiver: '73%', totalCredits: 161, perCredit: 898, total: 229078 },
              { gpa: '10.00', waiver: '75%', totalCredits: 144, perCredit: 832, total: 218452 },
            ]},
            { background: 'Diploma', tiers: [
              { gpa: 'No Waiver', waiver: '—', totalCredits: 144, perCredit: 3326, total: 557444 },
              { gpa: '5.00–7.99', waiver: '71%', totalCredits: 144, perCredit: 965, total: 217460 },
              { gpa: '8.00–9.00', waiver: '73%', totalCredits: 144, perCredit: 898, total: 207812 },
            ]},
          ],
        },
      ],

      policies: [
        { iconName: 'ShieldCheck', title: 'Golden A+ Waiver', text: 'Students with a Golden A+ in both SSC and HSC receive a 100% Tuition Fee Waiver and follow a reduced 144-credit program.' },
        { iconName: 'Percent', title: 'Payment Discounts', text: '10% waiver on tuition fees if the full 1st semester fee is paid at admission. 15% waiver on tuition fees if the full program fee is paid at admission.' },
        { iconName: 'Receipt', title: 'Additional Fees', text: 'A BDT 7,500 fee is charged for the Provisional Certificate (PVC) in the final semester.' },
      ],

      displayOrder: 0,
    },
  });

  console.log('✓ EEE tuition fee structure seeded');
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
