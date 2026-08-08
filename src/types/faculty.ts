export type FacultyType = 'leadership' | 'full-time' | 'part-time';

/**
 * A single list item. Either a plain string, or an object carrying the
 * item text plus an optional link (used for publications with a DOI/URL
 * and for research profile links like Google Scholar).
 */
export type SectionItem = string | { text: string; url?: string };

/**
 * Flexible section content. A section can be:
 *  - a plain paragraph (string)
 *  - a simple bullet list (SectionItem[])
 *  - grouped lists with subheadings ({ heading, items }[])
 */
export type SectionContent =
  | string
  | SectionItem[]
  | { heading: string; items: SectionItem[] }[];
