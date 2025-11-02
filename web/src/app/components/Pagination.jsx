const Pagination = ({ pagination }) => {
    return (
        <>
            {Array.from({ length: pagination.pageCount }).map((_, index) => {
                const page = index + 1;
                    return (
                        <Link
                            key={page}
                            href={`/results?query=${encodeURIComponent(searchTerm)}&page=${page}`}
                            className={`h-10 w-10 flex justify-center items-center rounded-full text-sm font-semibold transition-colors ${
                                    page === currentPage
                                        ? "bg-custom text-white shadow-md"
                                        : "bg-white border border-gray-300 text-gray-700"
                                }`}
                            >
                            {page}
                        </Link>
                    );
            })}
        </>
    )
}

export default Pagination;