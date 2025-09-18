import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

const siteUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Create, manage, and organize your notes efficiently with NoteHub.",
  openGraph: {
    title: 'NoteHub',
            description: 'The best place to keep your thoughts and ideas organized.',
            url: siteUrl,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Notehub App',
                },
            ],
            type: 'website',
        }
};

export default function RootLayout({
  children, modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children} { modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
