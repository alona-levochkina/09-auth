"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import css from "./NoteForm.module.css";
import type { CreateNoteData } from "@/types/note";

const initialFormState: CreateNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [formData, setFormData] = useState<CreateNoteData>(initialFormState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setFormData(draft);
    setIsHydrated(true);
  }, [draft]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    setDraft(updatedData);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      clearDraft();

      router.push("/notes/filter/All");
    },
    onError: (error) => {
      console.error("Failed to create note:", error);
      alert("Failed to create note. Please try again.");
    },
  });

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(formData);
  };

  if (!isHydrated) {
    return <p>Loading draft...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className={css.input}
          required
          minLength={3}
          maxLength={50}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={8}
          className={css.textarea}
          maxLength={500}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={!formData.title || isPending}
        >
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
