export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  const delta = 2; // Cambia este valor si quieres más o menos páginas alrededor de la página actual
  const range = {
    start: Math.max(2, currentPage - delta),
    end: Math.min(totalPages - 1, currentPage + delta),
  };

  const pages = [];
  if (range.start > 2) {
    pages.push(1, "...");
  } else {
    pages.push(1);
  }

  for (let i = range.start; i <= range.end; i++) {
    pages.push(i);
  }

  if (range.end < totalPages - 1) {
    pages.push("...", totalPages);
  } else if (range.end === totalPages - 1) {
    pages.push(totalPages);
  }

  return pages;
};
