import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border/50">
      <div className="container mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Luca Müller. All Rights Reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link href="/imprint" className="hover:text-foreground transition-colors">
            Imprint
          </Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
