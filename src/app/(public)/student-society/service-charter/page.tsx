import PageShell from '@/components/layout/PageShell';
import Container from '@/components/ui/Container';
import { getServiceCharters, getPageHero } from '@/lib/identity';
import ServiceCharterClient from './ServiceCharterClient';
import ServiceDirectory from './ServiceDirectory';

export const metadata = {
  title: 'Service Charter — Department of Electrical and Electronics Engineering',
  description: 'Service charter and service directory for the Department of Electrical and Electronics Engineering, Sonargaon University.',
};

export default async function ServiceCharterPage() {
  const [entries, hero] = await Promise.all([
    getServiceCharters(),
    getPageHero('student-society-service-charter'),
  ]);

  const serviceItems = entries[0]?.serviceItems ?? [];
  const items = entries.map((p) => ({
    slug: p.slug,
    title: p.title,
    shortTitle: p.shortTitle,
    department: p.department,
    cover: p.coverUrl || '',
    pdf: p.pdfUrl || '',
  }));

  return (
    <PageShell
      title={hero?.heroTitle ?? 'Service Charter'}
      subtitle={hero?.heroSubtitle ?? undefined}
      overline={hero?.heroOverline ?? 'Student Society'}
      image={hero?.heroImageUrl ?? 'https://res.cloudinary.com/csrrzxip/image/upload/v1786532227/sonargaon-eee/service-charter-banner.jpg'}
      imagePosition={hero ? `center ${hero.heroImageVerticalPercent}%` : 'center 50%'}
      contentClassName="bg-gray-50 py-12 md:py-20"
    >
      <Container>
        <div className="space-y-10">
          <ServiceDirectory items={serviceItems} />
          <div>
            <ServiceCharterClient items={items} />
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
