"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (noteId: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteMutation.mutate(noteId);
    }
  };

  if (notes.length === 0) {
    return null;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <div>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>{" "}
              <button
                className={css.button}
                onClick={() => handleDelete(note.id)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
