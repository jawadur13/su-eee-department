-- Add isEnabled field to syllabus table
ALTER TABLE "syllabus" ADD COLUMN "isEnabled" BOOLEAN NOT NULL DEFAULT true;

-- Create index for filtering enabled syllabus
CREATE INDEX "syllabus_isEnabled_displayOrder_idx" ON "syllabus"("isEnabled", "displayOrder");
