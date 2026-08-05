import { prisma } from '../src/lib/db';

async function main() {
  console.log('=== 1. DEPARTMENT IDENTITY ===');
  const di = await prisma.departmentIdentity.findUnique({ where: { id: 'singleton' } });
  console.log('  name:', di?.name);
  console.log('  shortCode:', di?.shortCode);

  console.log('\n=== 2. PROGRAMS ===');
  const progs = await prisma.program.findMany({ select: { programName: true, description: true } });
  progs.forEach(p => console.log(' ', p.programName));

  console.log('\n=== 3. DEAN MESSAGE ===');
  const dean = await prisma.faculty.findFirst({ where: { isDean: true }, select: { name: true, messageParagraphs: true, messageTitleLine2: true } });
  console.log('  name:', dean?.name);
  console.log('  messageTitleLine2:', dean?.messageTitleLine2);
  console.log('  paragraph snippets:', (dean?.messageParagraphs ?? []).map((p: string) => p.slice(0, 80)));

  console.log('\n=== 4. HEAD MESSAGE ===');
  const head = await prisma.faculty.findFirst({ where: { isHead: true }, select: { name: true, messageParagraphs: true, messageTitleLine2: true } });
  console.log('  name:', head?.name);
  console.log('  messageTitleLine2:', head?.messageTitleLine2);
  console.log('  paragraph snippets:', (head?.messageParagraphs ?? []).map((p: string) => p.slice(0, 80)));

  console.log('\n=== 5. NAV — Mecha Club entry ===');
  const mecha = await prisma.mainNavItem.findFirst({ where: { name: 'Mecha Club' }, select: { name: true, href: true } });
  console.log(' ', mecha?.name, '→', mecha?.href);

  console.log('\n=== 6. NEWS ===');
  const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' }, select: { shortTitle: true } });
  news.forEach(n => console.log(' ', n.shortTitle));

  console.log('\n=== 7. NOTICES ===');
  const notices = await prisma.notice.findMany({ orderBy: { createdAt: 'desc' }, select: { title: true } });
  notices.forEach(n => console.log(' ', n.title));

  console.log('\n=== 8. ALUMNI ===');
  const alumni = await prisma.alumni.findMany({ orderBy: { displayOrder: 'asc' }, select: { name: true } });
  alumni.forEach(a => console.log(' ', a.name));

  console.log('\n=== 9. CLUBS ===');
  const clubs = await prisma.club.findMany({ orderBy: { displayOrder: 'asc' }, select: { name: true } });
  clubs.forEach(c => console.log(' ', c.name));

  console.log('\n=== 10. FAQ ===');
  const faqs = await prisma.faq.findMany({ select: { question: true } });
  faqs.slice(0, 5).forEach(f => console.log(' ', f.question.slice(0, 80)));

  console.log('\n=== 11. VISITORS ===');
  const visitors = await prisma.visitor.findMany({ select: { name: true } });
  visitors.forEach(v => console.log(' ', v.name));

  console.log('\n=== 12. PAGE HEROES ===');
  const heroes = await prisma.pageHero.findMany({ select: { pageKey: true, heroTitle: true } });
  heroes.forEach(h => console.log(' ', h.pageKey, '—', h.heroTitle));

  console.log('\n=== 13. GALLERY ===');
  const gallery = await prisma.gallery.count();
  console.log('  count:', gallery);

  console.log('\n=== 14. JOURNEY CTA ===');
  const cta = await prisma.journeyCtaContent.findUnique({ where: { id: 'singleton' } });
  console.log('  title:', cta?.heroTitle);

  console.log('\n=== 15. CONTACT PAGE ===');
  const contact = await prisma.contactPageContent.findUnique({ where: { id: 'singleton' } });
  console.log('  title:', contact?.title);

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
