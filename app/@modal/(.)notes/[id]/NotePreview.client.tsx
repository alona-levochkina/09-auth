"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

interface NotePreviewProps {
  noteId: string;
}

export const NotePreview = ({ noteId }: NotePreviewProps) => {
   const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
     enabled: !!noteId, 
     refetchOnMount: false,
   });
  const router = useRouter();

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error ||!note) {
    return <p>Something went wrong.</p>;
  }

   const handleGoBack = () => {
    router.back();
};

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
     <Modal onClose={handleGoBack}>
     <div className={css.item}>
       <button className={css.backBtn} onClick={ handleGoBack}>Go back</button>
      <div className={css.header}>
        <h2>{note.title}</h2>
      </div>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>{formatDate(note.createdAt)}</p>
      </div>
      </Modal>
  );
};