-- Missing PageHero row for /student-society/service-charter — the
-- page reads it via getPageHero('student-society-service-charter')
-- but no seed row was ever added for it in 20260524150000_page_hero,
-- so it wasn't reachable/editable from /admin/page-heroes. Seeded
-- with the values the public page was already falling back to, so
-- this is a no-op for the live site's appearance.
INSERT INTO "page_hero" ("id", "pageKey", "pageLabel", "publicPath", "heroTitle", "heroOverline", "heroImageUrl", "heroImageVerticalPercent", "updatedAt") VALUES
  ('seed_pageHero_ss_service_charter', 'student-society-service-charter', 'Service Charter', '/student-society/service-charter', 'Service Charter', 'Student Society', 'https://res.cloudinary.com/csrrzxip/image/upload/v1786532227/sonargaon-eee/service-charter-banner.jpg', 50, NOW())
ON CONFLICT ("pageKey") DO NOTHING;
