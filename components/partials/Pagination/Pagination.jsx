'use client';
import Link from "next/link";
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, id, name }) => {
    const getLink = (page) => `/filmler/category/${id}?name=${name}&page=${page}`;

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 text-white py-4">
            {/* İlk Sayfa */}
            {currentPage > 1 && (
                <Link href={getLink(1)}>
                    <button className="flex items-center gap-1 px-3 py-1 bg-cyan-700 hover:bg-cyan-800 rounded-full transition">
                        <FaAngleDoubleLeft /> İlk
                    </button>
                </Link>
            )}

            {/* Önceki */}
            {currentPage > 1 && (
                <Link href={getLink(currentPage - 1)}>
                    <button className="flex items-center gap-1 px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded-full transition">
                        <FaAngleLeft /> Önceki
                    </button>
                </Link>
            )}

            {/* Mevcut Sayfa */}
            <span className="px-4 py-1 bg-cyan-500 text-white rounded-full font-semibold shadow">
                {currentPage} / {totalPages}
            </span>

            {/* Sonraki */}
            {currentPage < totalPages && (
                <Link href={getLink(currentPage + 1)}>
                    <button className="flex items-center gap-1 px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded-full transition">
                        Sonraki <FaAngleRight />
                    </button>
                </Link>
            )}

            {/* Son Sayfa */}
            {currentPage < totalPages && (
                <Link href={getLink(totalPages)}>
                    <button className="flex items-center gap-1 px-3 py-1 bg-cyan-700 hover:bg-cyan-800 rounded-full transition">
                        Son <FaAngleDoubleRight />
                    </button>
                </Link>
            )}
        </div>
    );
};

export default Pagination;
