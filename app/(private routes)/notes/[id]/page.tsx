import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from './NoteDetails.client'
import { Metadata } from "next";

interface NoteDetailsProps {
    params: Promise<{ id: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
    const { id } = await params;

    const note = await fetchNoteById(id);
    const title = `${note.title} | NoteHub`;
    const description = note.content.substring(0, 155) + '...';
    const url = `${siteUrl}/notes/${id}`; 

    return {
      title,
      description,
        openGraph: {
            title,
            description,
            url,
            images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
        },
  }
}

export default async function NoteDetailsPage({ params }: NoteDetailsProps) {
    const { id } = await params;
    const queryClient = new QueryClient();
        await queryClient.prefetchQuery({
            queryKey: ['note', id],
            queryFn: () => fetchNoteById(id),
        })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    )
}
