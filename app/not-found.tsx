import { Metadata } from "next";
import css from "./Not-found.module.css";

export const metadata: Metadata  = {
  title: "404 - Page Not Found  | NoteHub",
  description: "The page you are looking for does not exist. Let's get you back on track.",
  openGraph: {
    title: '404 - Page Not Found  | NoteHub',
            description: "It seems you've taken a wrong turn.",
            url: 'http://localhost:3000',
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Notehub',
                },
            ],
            type: 'website',
        }
};
const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
