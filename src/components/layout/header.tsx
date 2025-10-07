import { Atom } from 'lucide-react';

export function Header() {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 container mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Atom className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
            FusionFolio
          </h1>
        </div>
      </div>
    </header>
  );
}
