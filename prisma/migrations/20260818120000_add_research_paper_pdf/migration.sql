-- Self-hosted PDF for research papers. Nullable: existing rows keep
-- listing metadata-only until an admin uploads a file.
ALTER TABLE "research_paper" ADD COLUMN "pdfUrl" TEXT;
ALTER TABLE "research_paper" ADD COLUMN "pdfPublicId" TEXT;
