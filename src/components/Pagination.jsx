import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function Pagination({ pageLimit }) {
    console.log()
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageOffset, setPageOffset] = useState(() => {
        return +searchParams.get('page') || 1;
    });

    const next = () => {
        if (pageOffset === pageLimit) return;
        setPageOffset(pageOffset + 1);
    };

    const prev = () => {
        if (pageOffset === 1) return;
        setPageOffset(pageOffset - 1);
    };

    useEffect(() => {
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: pageOffset });
    }, [pageOffset]);

    useEffect(() => {
        setPageOffset(+searchParams.get('page') || 1);
    }, [searchParams]);


    return (
        <div className="flex items-center justify-center gap-8 ">
            <div
                size="sm"
                onClick={prev}
                disabled={pageOffset === 1}
                className={`cursor-pointer ${pageOffset === 1 ? 'opacity-50 pointer-events-none' : ''}`}
            >
                <FaArrowLeft strokeWidth={2} className="h-4 w-4" />
            </div>
            <div color="gray" className="font-normal">
                Page <strong className="text-gray-900">{pageOffset}</strong> of <strong className="text-gray-900">{pageLimit}</strong>
            </div>
            <div
                size="sm"
                onClick={next}
                disabled={pageOffset === pageLimit}
                className={`cursor-pointer ${pageOffset === pageLimit ? 'opacity-50 pointer-events-none' : ''}`}
            >
                <FaArrowRight strokeWidth={2} className="h-4 w-4" />
            </div>
        </div>
    );
}