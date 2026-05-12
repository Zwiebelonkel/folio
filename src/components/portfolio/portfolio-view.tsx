
"use client";

import { useEffect, useRef, useState } from 'react';
import type { PortfolioItem, Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PortfolioCard } from './portfolio-card';
import { ItemPreviewDialog } from './item-preview-dialog';
import { useMusicPlayer } from '@/components/contexts/music-player-context';
import { LayoutGrid, Gamepad2, Globe, Box, Music, Link as LinkIcon, Video, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const { playTrack, currentTrack, isPlaying, togglePlayPause } = useMusicPlayer();
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems = items.filter(item => {
    const matchesCategory = activeFilter === 'all' || item.category.includes(activeFilter);
    const matchesSearch = searchTerm.trim() === '' ||
                          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = !activeTag || (item.tags && item.tags.includes(activeTag));
    return matchesCategory && matchesSearch && matchesTag;
  });

  useEffect(() => {
    // Refresh animations when filter changes
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.gsap-card');
      cards.forEach((card: any) => {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.9, y: 30 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, [activeFilter, searchTerm, activeTag]);

  const handleCardClick = (item: PortfolioItem) => {
    if (item.category.includes('music')) {
      if (currentTrack?.id === item.id) {
        togglePlayPause();
      } else {
        playTrack(item);
      }
    } else if (item.category.includes('link') && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedItem(item);
    }
  };
  
  const handleItemAction = (item: PortfolioItem) => {
    if (item.category.includes('music')) {
      if (currentTrack?.id === item.id) {
        togglePlayPause();
      } else {
        playTrack(item);
      }
    } else {
      setSelectedItem(item);
    }
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    setSelectedItem(null);
    setActiveFilter('all');
    setSearchTerm('');
  };

  const clearTagFilter = () => {
    setActiveTag(null);
  };

  return (
    <>
      <div className="mb-12 space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map(({ name, value, icon: Icon }) => (
            <Button
              key={value}
              variant={activeFilter === value ? 'default' : 'outline'}
              onClick={() => {
                setActiveFilter(value);
                clearTagFilter();
              }}
              className="capitalize gap-2 rounded-full px-6 transition-all duration-300 hover:scale-105"
            >
              <Icon className="h-4 w-4" />
              {name}
            </Button>
          ))}
        </div>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Search projects"
            className="pl-12 py-6 rounded-2xl liquid-glass border-white/10 focus:ring-primary/50 text-lg"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              clearTagFilter();
            }}
          />
        </div>
        {activeTag && (
          <div className="flex justify-center">
            <Button variant="secondary" onClick={clearTagFilter} className="rounded-full bg-primary/20 text-primary hover:bg-primary/30">
              Filtering by: {activeTag}
              <X className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div 
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24"
      >
        {filteredItems.map(item => (
          <div key={item.id} className="gsap-card">
            <PortfolioCard
              item={item}
              onCardClick={() => handleCardClick(item)}
              onActionClick={() => handleItemAction(item)}
              isPlaying={item.id === currentTrack?.id && isPlaying}
            />
          </div>
        ))}
      </div>

      <ItemPreviewDialog
        item={selectedItem}
        open={!!selectedItem}
        onOpenChange={(isOpen) => !isOpen && setSelectedItem(null)}
        onTagClick={handleTagClick}
      />
    </>
  );
}
