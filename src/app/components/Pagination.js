const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }) => (
    <div className="flex justify-between mt-6">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Previous
      </button>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Next
      </button>
    </div>
  );
  
  export default Pagination;
  