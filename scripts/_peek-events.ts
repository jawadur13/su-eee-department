import { prisma } from '../src/lib/db';
async function main() {
  const events = await prisma.event.findMany({ orderBy: { eventDate: 'desc' } });
  console.log(`Total: ${events.length} events\n`);
  events.forEach(e => {
    console.log(`${e.shortTitle} | ${e.category} | ${e.eventDate}`);
  });
  await prisma.$disconnect();
}
main();
