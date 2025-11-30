/**
 * Format a single BibTeX entry in MLA style
 */
function formatMLA(bib) {
  const { type, author, title, year } = bib;
  
  switch (type) {
    case 'article':
      // Article format: Author. "Title." Journal, vol. X, year, pp. XX-XX.
      return `${author}. "${title}." <em>${bib.journal}</em>, vol. ${bib.volume}, ${year}, pp. ${bib.pages}.`;
    
    case 'book':
      // Book format: Author. Title. Publisher, year.
      return `${author}. <em>${title}</em>. ${bib.publisher}, ${year}.`;
    
    case 'inproceedings':
      // Conference paper format: Author. "Title." Conference Name, year, pp. XX-XX.
      return `${author}. "${title}." <em>${bib.booktitle}</em>, ${year}, pp. ${bib.pages}.`;
    
    default:
      // Fallback for unknown types
      return `${author}. "${title}." ${year}.`;
  }
}

/**
 * Format an array of BibTeX entries in MLA style
 */
export function formatBibliographyMLA(bibs) {
  return bibs.map(bib => formatMLA(bib));
}