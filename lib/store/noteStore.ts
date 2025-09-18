import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CreateNoteData, NoteTag } from "@/types/note";

type NoteDraftStore = {
  draft: CreateNoteData;
  setDraft: (note: CreateNoteData) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNoteData = {
  title: "",
  content: "",
  tag: "Todo" as NoteTag,
};

export const useNoteStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({ draft: { ...state.draft, ...note } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft-storage",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
