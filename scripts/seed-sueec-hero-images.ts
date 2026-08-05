import { prisma } from '../src/lib/db';

async function main() {
  await prisma.aboutEeeClub.update({
    where: { id: 'singleton' },
    data: {
      heroImageUrl: '/assets/cover.webp',
      introImageUrl: '/assets/intro-image.webp',
    },
  });
  console.log('✓ Hero + intro images updated');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
