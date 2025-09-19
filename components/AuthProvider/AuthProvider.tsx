'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe, refreshSession } from '@/lib/api/clientApi';

const privateRoutes = ['/profile', '/notes'];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, setUser, clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        
        await refreshSession();
        
        const res = await getMe();
        setUser(res);
      } catch (error) {
        console.log(error);
        
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
     }, [setUser, clearAuth]); 
  
  useEffect(() => {
        if (isLoading) {
      return;
    }

    const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

    if (!isAuthenticated && isPrivateRoute) {
      router.push('/sign-in');
    }
  }, [pathname, isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <p>Loading session...</p>;
  }

  if (!isAuthenticated && privateRoutes.some(route => pathname.startsWith(route))) {
    return <p>Loading session...</p>;
  }

  return <>{children}</>;
}