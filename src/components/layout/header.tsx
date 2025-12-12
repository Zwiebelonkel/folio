
"use client";

import Image from 'next/image';
import { SidebarTrigger } from '../ui/sidebar';

export function Header() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm dark:bg-black/80"
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-start">
          <div className="p-4">
            <SidebarTrigger />
          </div>
          <div onClick={scrollToTop} className="flex items-center gap-3 cursor-pointer pl-4">
            <Image 
              src="/images/LM_nobg.png" 
              alt="LM Logo"
              width={32} 
              height={32} 
              className="h-8 w-8"
            />
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
              Luca Müller
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
