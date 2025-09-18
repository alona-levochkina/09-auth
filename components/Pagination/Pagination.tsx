"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      previousLabel="←"
      nextLabel="→"
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      pageClassName={css.pagination}
      pageLinkClassName={css.pagination}
      previousClassName={css.pagination}
      previousLinkClassName={css.pagination}
      nextClassName={css.pagination}
      nextLinkClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.pagination}
      breakClassName={css.pagination}
      breakLinkClassName={css.pagination}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
    />
  );
}
