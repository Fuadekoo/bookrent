import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard'); // Redirect to a protected page if the user is authenticated
    }
  }, [loading, user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};

export default PublicRoute;