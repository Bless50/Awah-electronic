'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { User } from '@supabase/supabase-js';

export default function SetupAdminPage() {
  const { user, profile, refreshProfile } = useAuth() as {
    user: User | null;
    profile: { role: string } | null;
    refreshProfile: () => Promise<void>;
  };
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const makeAdmin = async () => {
    if (!user) {
      toast.error('You must be logged in to become an admin');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/make-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to make admin');
      }

      await refreshProfile();
      toast.success('You are now an admin!');
      router.push('/admin');
    } catch (error) {
      console.error('Error making admin:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to make admin');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">Please log in to access the admin setup.</p>
          <Button onClick={() => router.push('/auth/login')}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  if (profile?.role === 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">You're Already an Admin</h1>
          <p className="text-gray-600 mb-6">You already have administrator privileges.</p>
          <Button onClick={() => router.push('/admin')}>
            Go to Admin Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Become an Admin</h1>
        <p className="text-gray-600 mb-6">
          Click the button below to grant admin privileges to your account.
        </p>
        <Button 
          onClick={makeAdmin} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Processing...' : 'Make Me Admin'}
        </Button>
      </div>
    </div>
  );
}
