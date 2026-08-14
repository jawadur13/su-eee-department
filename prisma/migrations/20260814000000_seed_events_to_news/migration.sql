-- Seed news items from events
-- This migration creates news articles from existing events that haven't been converted yet

-- Check: Which events are already news? (by slug match)
-- If event.slug matches news.slug, skip it.
-- Otherwise, create a news row with the event's data.

-- Insert news from events (only those not already in news table by slug)
INSERT INTO "news" (
  "id", "slug", "title", "shortTitle", "category",
  "publishedAt", "displayDate", "summary", "coverUrl",
  "coverPublicId", "body", "meta", "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid(),
  e."slug",
  e."title",
  e."shortTitle",
  'Event'::text,
  COALESCE(e."eventDate", NOW()),
  e."displayDate",
  e."summary",
  e."imageUrl",
  e."imagePublicId",
  COALESCE(e."description", '[]'::jsonb),
  COALESCE(e."details", '[]'::jsonb),
  NOW(),
  NOW()
FROM "event" e
WHERE NOT EXISTS (
  SELECT 1 FROM "news" n WHERE n."slug" = e."slug"
)
ORDER BY e."eventDate" DESC NULLS LAST, e."createdAt" DESC
LIMIT 2
ON CONFLICT ("slug") DO NOTHING;
