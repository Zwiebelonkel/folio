import Link from 'next/link';
import { TypewriterText } from '@/components/ui/typewriter-text';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-border/50">
      <div className="container mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>
          <TypewriterText text={`© ${year} Luca Müller. All Rights Reserved.`} />
        </p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link href="/imprint" className="hover:text-foreground transition-colors">
            <TypewriterText text="Imprint" />
          </Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            <TypewriterText text="Privacy Policy" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
