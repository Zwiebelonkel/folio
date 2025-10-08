
"use client";

import type { PortfolioItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Link as LinkIcon, Play, Pause, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import React, { useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PortfolioCardProps {
  item: PortfolioItem;
  onCardClick: (item: PortfolioItem) => void;
  isPlaying?: boolean;
}

export function PortfolioCard({ item, onCardClick, isPlaying = false }: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});
  const isMobile = useIsMobile();

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const rotateX = (y - height / 2) / (height / 2) * -5;
    const rotateY = (x - width / 2) / (width / 2) * 5;

    setStyle({
      '--x': `${x}px`,
      '--y': `${y}px`,
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  };

  const onMouseLeave = () => {
    if (isMobile) return;
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    });
  };


  const getAction = () => {
    if (item.category.includes('music')) {
      return isPlaying ? { text: 'Pause', icon: Pause } : { text: 'Play', icon: Play };
    }
    if (item.category.includes('link')) {
      return { text: 'Visit', icon: LinkIcon };
    }
    if (item.category.includes('video')) {
      return { text: 'Watch', icon: Video };
    }
    return { text: 'Preview', icon: Eye };
  };

  const { text, icon: Icon } = getAction();

  return (
    <Card 
      ref={cardRef}
      onClick={() => onCardClick(item)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={style as React.CSSProperties}
      className="overflow-hidden flex flex-col group transition-all duration-200 ease-out shadow-lg hover:shadow-2xl hover:shadow-primary/30 cursor-pointer bg-card interactive-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="shine-effect" />
        <img
          src={item.imageUrl as string}
          alt={item.title}
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
          data-ai-hint={item.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute top-3 right-3 flex gap-2">
          {item.category.map(cat => (
            <Badge key={cat} variant="secondary" className="capitalize">{cat}</Badge>
          ))}
        </div>
      </div>
      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold font-headline group-hover:text-primary transition-colors">{item.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
        </div>
        <Button onClick={(e) => {e.stopPropagation(); onCardClick(item)}} className="w-full mt-4" variant={isPlaying && item.category.includes('music') ? 'default' : 'secondary'}>
          <Icon className="mr-2 h-4 w-4" />
          {text}
        </Button>
      </CardContent>
    </Card>
  );
}
