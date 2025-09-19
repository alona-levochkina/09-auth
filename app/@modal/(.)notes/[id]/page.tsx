import { fetchNoteByIdOnServer } from '@/lib/api/serverApi';
import { NotePreview } from './NotePreview.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type NoteModalProps = {
  params: Promise <{
    id: string;
  }>;
}

export default async function NoteModal({ params }: NoteModalProps) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteByIdOnServer(id),
  });


   return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview noteId={id} />
    </HydrationBoundary>
  );
}