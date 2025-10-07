import { Header } from '@/components/layout/header';
import { MusicPlayerProvider } from '@/components/contexts/music-player-context';
import { PortfolioView } from '@/components/portfolio/portfolio-view';
import { MusicPlayer } from '@/components/player/music-player';
import { portfolioItems } from '@/lib/data';

export default function Home() {
  return (
    <MusicPlayerProvider>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <PortfolioView items={portfolioItems} />
        </main>
        <MusicPlayer />
      </div>
    </MusicPlayerProvider>
  );
}
