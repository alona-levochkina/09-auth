import React, { Suspense } from "react";
import css from "./LayoutNotes.module.css";

export default function NotesFilterLayout({
  children,
  sidebar,
  }: {
  children: React.ReactNode;
    sidebar: React.ReactNode;
   }) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <Suspense fallback={<div>Loading categories...</div>}>{sidebar} </Suspense>
      </aside>
      <main className={css.notesWrapper}>
        {children}
      </main>
    </div>
  );
}