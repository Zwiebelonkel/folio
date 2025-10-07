
"use client";

import type { PortfolioItem } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Link as LinkIcon, Play, Pause, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PortfolioCardProps {
  item: PortfolioItem;
  onCardClick: (item: PortfolioItem) => void;
  isPlaying?: boolean;
}

export function PortfolioCard({ item, onCardClick, isPlaying = false }: PortfolioCardProps) {
  const getAction = () => {
    switch (item.category) {
      case 'music':
        return isPlaying ? { text: 'Pause', icon: Pause } : { text: 'Play', icon: Play };
      case 'link':
        return { text: 'Visit', icon: LinkIcon };
      case 'video':
        return { text: 'Watch', icon: Video };
      default:
        return { text: 'Preview', icon: Eye };
    }
  };

  const { text, icon: Icon } = getAction();

  return (
    <Card 
      onClick={() => onCardClick(item)}
      className="overflow-hidden flex flex-col group transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2 cursor-pointer bg-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          data-ai-hint={item.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <Badge variant="secondary" className="absolute top-3 right-3 capitalize">{item.category}</Badge>
      </div>
      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold font-headline group-hover:text-primary transition-colors">{item.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
        </div>
        <Button onClick={(e) => {e.stopPropagation(); onCardClick(item)}} className="w-full mt-4" variant={isPlaying && item.category === 'music' ? 'default' : 'secondary'}>
          <Icon className="mr-2 h-4 w-4" />
          {text}
        </Button>
      </CardContent>
    </Card>
  );
}
