-- Clear phone numbers from all service charter items
-- Removes contactPhone field from each service item in the serviceItems JSON array
UPDATE "service_charter"
SET "serviceItems" = (
  SELECT jsonb_agg(
    item - 'contactPhone'
  )
  FROM jsonb_array_elements("serviceItems") AS item
)
WHERE "serviceItems" IS NOT NULL
AND "serviceItems"::text LIKE '%contactPhone%';
