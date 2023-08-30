import { useState } from "react";

function usePagination(data: string[]) {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data?.length / 9);

    function currentData() {
        const begin = (currentPage - 1) * 9;
        const end = begin + 9;
        if (data && data !== undefined) {
            return data.slice(begin, end);
        }
    }

    function next() {
        setCurrentPage(currentPage + 1 > maxPage ? maxPage : currentPage + 1);
    }

    function prev() {
        setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1);
    }

    function jump(page: number) {
        setCurrentPage(page > maxPage ? maxPage : page);
    }

    return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePagination;
