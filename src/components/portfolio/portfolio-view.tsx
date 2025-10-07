"use client";

import type { PortfolioItem, Category } from '@/lib/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PortfolioCard } from './portfolio-card';
import { ItemPreviewDialog } from './item-preview-dialog';
import { useMusicPlayer } from '@/components/contexts/music-player-context';
import { LayoutGrid, Gamepad2, Globe, Box, Music, Link as LinkIcon, Video } from 'lucide-react';

const categories: { name: string; value: Category | 'all'; icon: React.ElementType }[] = [
  { name: 'All', value: 'all', icon: LayoutGrid },
  { name: 'Games', value: 'game', icon: Gamepad2 },
  { name: 'Websites', value: 'website', icon: Globe },
  { name: '3D', value: '3d', icon: Box },
  { name: 'Music', value: 'music', icon: Music },
  { name: 'Videos', value: 'video', icon: Video },
  { name: 'Links', value: 'link', icon: LinkIcon },
];

export function PortfolioView({ items }: { items: PortfolioItem[] }) {
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const { playTrack, currentTrack, isPlaying, togglePlayPause } = useMusicPlayer();

  const filteredItems = items.filter(
    item => activeFilter === 'all' || item.category === activeFilter
  );

  const handleCardClick = (item: PortfolioItem) => {
    if (item.category === 'music') {
      if (currentTrack?.id === item.id) {
        togglePlayPause();
      } else {
        playTrack(item);
      }
    } else if (item.category === 'link' && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {categories.map(({ name, value, icon: Icon }) => (
          <Button
            key={value}
            variant={activeFilter === value ? 'default' : 'outline'}
            onClick={() => setActiveFilter(value)}
            className="capitalize gap-2"
          >
            <Icon className="h-4 w-4" />
            {name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {filteredItems.map(item => (
          <PortfolioCard
            key={item.id}
            item={item}
            onCardClick={handleCardClick}
            isPlaying={item.id === currentTrack?.id && isPlaying}
          />
        ))}
      </div>

      <ItemPreviewDialog
        item={selectedItem}
        open={!!selectedItem}
        onOpenChange={(isOpen) => !isOpen && setSelectedItem(null)}
      />
    </>
  );
}
