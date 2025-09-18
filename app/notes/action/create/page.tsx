import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "Create a New Note | NoteHub",
  description: "Add a new note to your collection. Fill out the form to get started.",
  openGraph: {
    title: "Create a New Note | NoteHub",
    description: "Start organizing your thoughts by creating a new note.",
    url: `${siteUrl}/notes/action/create`,
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}