import { MusicPlayerProvider } from '@/components/contexts/music-player-context';
import { PortfolioView } from '@/components/portfolio/portfolio-view';
import { MusicPlayer } from '@/components/player/music-player';
import { portfolioItems, skillsData } from '@/lib/data';
import { Hero } from '@/components/layout/hero';
import { Skills } from '@/components/skills';
import { Separator } from '@/components/ui/separator';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { MagnumOpus } from '@/components/portfolio/magnum-opus';

export default function Home() {
  const magnumOpusItem = portfolioItems.find(item => item.id === 'g7');
  const otherItems = portfolioItems.filter(item => item.id !== 'g7');

  return (
    <MusicPlayerProvider>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Hero />
          <Skills skills={skillsData} />
          
          {magnumOpusItem && (
            <>
              <Separator className="my-12 opacity-50" />
              <MagnumOpus item={magnumOpusItem} />
            </>
          )}

          <Separator className="my-12" />
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline mb-4">Portfolio Collection</h2>
            <p className="text-muted-foreground">Explore a variety of games, websites, and creative digital works.</p>
          </div>
          <PortfolioView items={otherItems} />
        </main>
        <Footer />
        <MusicPlayer />
      </div>
    </MusicPlayerProvider>
  );
}