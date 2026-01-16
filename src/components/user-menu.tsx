'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
      >
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || 'User'}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span className="text-sm font-medium">{session?.user?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
          <div className="px-4 py-3 border-b dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {session?.user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {session?.user?.email}
            </p>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              signOut({ callbackUrl: '/login' });
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}