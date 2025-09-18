'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { refreshSession } from '@/lib/api/clientApi';

const privateRoutes = ['/profile', '/notes'];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser, clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await refreshSession();
        setUser(response.data);
      } catch (error) {
        setUser(null);
        if (privateRoutes.some(route => pathname.startsWith(route))) {
          clearAuth();
          router.push('/sign-in');
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [pathname, router, setUser, clearAuth]);

  if (isLoading) {
    return <p>Loading session...</p>;
  }

  return <>{children}</>;
}