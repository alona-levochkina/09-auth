'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { updateUser } from '@/lib/api/clientApi';
import Image from 'next/image';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState(user?.username || '');

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await updateUser({ username });
      setUser(response);
      router.push('/profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

    if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user?.avatar || '/default-avatar.png'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          priority
        />
        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={css.input}
            />
          </div>
          <p>Email: {user?.email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" onClick={() => router.back()} className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}