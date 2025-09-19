"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from "@/lib/api/clientApi";
import css from "./NoteDetails.module.css";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

    if (isLoading) {
        return <p>Loading, please wait ...</p>;
    }

    if (error || !note) {
        return <p>Something went wrong.</p>
  }
  
  const handleGoBack = () => {
  const isSure = confirm('Are you sure?');
  if (isSure) {
    router.back();
  }
};

const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();

    };

    return (
      <div className={css.container}>
        <button className={css.backBtn} onClick={ handleGoBack}>Go back</button>
            <div className={css.item}>
                <div className={css.header}>
                    <h2 className={css.header}>{note.title}</h2>
                </div>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>{formatDate(note.createdAt)}</p>
            </div>
        </div>
    )
};

export default NoteDetailsClient;
