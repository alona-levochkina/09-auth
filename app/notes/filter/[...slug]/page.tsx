import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

type FilteredNotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({ params }: FilteredNotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] === 'all' ? 'All Notes' : slug[0];

  const title = `${category} | NoteHub`;
  const description = `Browse and manage notes under the '${category}' category.`;
  const url = `${siteUrl}/notes/filter${slug.join('/')}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}
export default async function FilteredNotesPage({ params }: FilteredNotesPageProps) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const category = slug[0] === 'All' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', category, 1],
    queryFn: () => fetchNotes({ page: 1, tag: category }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <NotesClient tag={category} />
    </HydrationBoundary>
  );
}