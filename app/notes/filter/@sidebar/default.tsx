import Link from 'next/link';
import css from './SidebarNotes.module.css'

const NotesSidebar = async () => {
 const categories = [
    { id: "todo", name: "Todo" },
    { id: "work", name: "Work" },
    { id: "personal", name: "Personal" },
    { id: "meeting", name: "Meeting" },
    { id: "shopping", name: "Shopping" },
  ];

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/All`} className={css.menuLink}>All notes</Link>
      </li>
      {categories.map((category) => (
        <li key={category.id}>
          <Link href={`/notes/filter/${category.name}`} className={css.menuLink}>{category.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NotesSidebar;

