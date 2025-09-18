import { getCurrentUser } from '@/lib/api/serverApi';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import css from './Profile.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile | NoteHub',
  description: 'View and manage your user profile.',
};

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username || 'Not set'}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}