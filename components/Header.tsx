"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History } from 'lucide-react';
import { AnimatedBackground } from '@/components/motion-primitives/AnimatedBackground';

export function Header() {
  const pathname = usePathname();
  
  const TABS = [
    { label: 'Home', icon: <Home className='h-5 w-5' />, href: "/" },
    { label: 'History', icon: <History className='h-5 w-5' />, href: "/history" }
  ];

  const activeTab = TABS.find(tab => tab.href === pathname)?.label || TABS[0].label;

  return (
    <header className='fixed top-0 left-0 right-0 z-50 flex justify-center w-full'>
      <div className='flex items-center justify-center w-full max-w-7xl mx-auto px-4 py-3'>
        <div className='flex space-x-2 rounded-xl border border-zinc-950/10 dark:border-zinc-50/10 bg-white dark:bg-card p-2'>
          <AnimatedBackground
            defaultValue={activeTab}
            className='rounded-lg bg-zinc-100 dark:bg-[#ff99cc]'
            transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
          >
            {TABS.map((tab) => (
              <Link 
                key={tab.label} 
                href={tab.href}
                data-id={tab.label}
                className='inline-flex h-9 w-9 items-center justify-center text-zinc-500 dark:text-zinc-400 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950 dark:data-[checked=true]:text-zinc-50'
              >
                {tab.icon}
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </div>
    </header>
  );
}
