'use client';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

interface NotesClientProps {
  tag?: string,
}

export default function NotesPage({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const {
    data: notesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes", tag ?? 'all', currentPage, debouncedSearchTerm],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        search: debouncedSearchTerm || undefined,
        tag,
      }),
    placeholderData: (previousData) => previousData,
    staleTime: 30000,
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {notesData && notesData.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={notesData.totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <Link href='/notes/action/create' className={css.button}>Create note +</Link>
      </header>

      {notesData && notesData.notes.length > 0 && (
        <NoteList
          notes={notesData.notes}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      )}
    </div>
  );
}
