import Link from 'next/link';

interface PaginationControlsProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  basePath: string;
  totalPages?: number;
}

export default function PaginationControls({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  basePath,
  totalPages
}: PaginationControlsProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  // Build URL for page
  const getPageUrl = (page: number) => {
    if (page === 1) {
      return `${basePath}/`;
    }
    return `${basePath}/page/${page}/`;
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const _maxVisible = 5;
    
    if (totalPages) {
      // If we know total pages
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, currentPage + 2);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    } else {
      // Without total pages, show current and nearby pages
      if (currentPage > 2) pages.push(currentPage - 2);
      if (currentPage > 1) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (hasNextPage) pages.push(currentPage + 1);
      if (hasNextPage) pages.push(currentPage + 2);
    }
    
    return pages.filter(p => p > 0);
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav 
      className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-gray-200"
      aria-label="Pagination Navigation"
    >
      {/* Previous Button */}
      <div className="flex-1 flex justify-start">
        {hasPreviousPage ? (
          <Link
            href={getPageUrl(prevPage)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Go to previous page"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Link>
        ) : (
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </span>
        )}
      </div>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {/* First page if not visible */}
        {pageNumbers[0] > 1 && (
          <>
            <Link
              href={getPageUrl(1)}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              aria-label="Go to page 1"
            >
              1
            </Link>
            {pageNumbers[0] > 2 && (
              <span className="px-2 text-gray-400">...</span>
            )}
          </>
        )}

        {/* Visible page numbers */}
        {pageNumbers.map(page => (
          <Link
            key={page}
            href={getPageUrl(page)}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              page === currentPage
                ? 'bg-blue-600 text-white border border-blue-600'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        ))}

        {/* Last pages indicator */}
        {hasNextPage && pageNumbers[pageNumbers.length - 1] < currentPage + 2 && (
          <span className="px-2 text-gray-400">...</span>
        )}
      </div>

      {/* Next Button */}
      <div className="flex-1 flex justify-end">
        {hasNextPage ? (
          <Link
            href={getPageUrl(nextPage)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Go to next page"
          >
            Next
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
            Next
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        )}
      </div>
    </nav>
  );
}