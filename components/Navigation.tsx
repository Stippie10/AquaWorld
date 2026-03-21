'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove('auth_token');
    setIsLoggedIn(false);
    router.push('/');
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Over Ons', href: '/about' },
    { label: 'Staff Team', href: '/staff' },
    { label: 'Discord', href: '/discord' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md border-b border-cyan-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2 text-3xl font-black hover:scale-105 transition transform">
            <Image
              src="/AquaWorld_Transparant.png"
              alt="AquaWorld logo"
              width={48}
              height={48}
            />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">AquaWorld</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-semibold transition-all duration-300 relative group ${
                  pathname === item.href
                    ? 'text-cyan-400'
                    : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                  pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}

            {isLoggedIn ? (
              <div className="flex space-x-3">
                <Link
                  href="/admin"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-purple-500/50"
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold hover:from-red-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-red-500/50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/50"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
