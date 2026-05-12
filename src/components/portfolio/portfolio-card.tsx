"use client";

import { useRef, useState } from 'react';
import type { PortfolioItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Link as LinkIcon, Play, Pause, Video, Music } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TypewriterText } from '@/components/ui/typewriter-text';
import gsap from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface PortfolioCardProps {
  item: PortfolioItem;
  onCardClick: () => void;
  onActionClick: () => void;
  isPlaying?: boolean;
}

export function PortfolioCard({ item, onCardClick, onActionClick, isPlaying = false }: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    setMousePos({ x, y });

    if (!isMobile) {
      const rotateX = (y - height / 2) / (height / 2) * -8;
      const rotateY = (x - width / 2) / (width / 2) * 8;

      gsap.to(cardRef.current, {
        rotateX,
        rotateY,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true
      });
    }
  };

  const onMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
      overwrite: true
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

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onActionClick();
  };

  return (
    <Card 
      ref={cardRef}
      onClick={onCardClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ 
        '--x': `${mousePos.x}px`, 
        '--y': `${mousePos.y}px` 
      } as React.CSSProperties}
      className={cn(
        "liquid-glass overflow-hidden flex flex-col group transition-all duration-300 ease-out shadow-lg cursor-pointer interactive-card rounded-2xl border-white/5 w-full",
        isPlaying && "border-primary/50 bg-primary/5"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="shine-effect" />
        <img
          src={item.imageUrl}
          alt={item.title}
          className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110"
          data-ai-hint={item.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-60" />
        <div className="absolute top-3 right-3 flex gap-2">
          {item.category.slice(0, 2).map(cat => (
            <Badge key={cat} variant="secondary" className="capitalize bg-black/60 backdrop-blur-md border-white/10 py-0.5 px-2 text-[10px] tracking-widest font-bold">
              {cat}
            </Badge>
          ))}
        </div>
      </div>
      <CardContent className="p-5 flex-1 flex flex-col justify-between relative z-10">
        <div>
          <h3 className="text-lg font-bold font-headline group-hover:text-primary transition-colors line-tight">
            <TypewriterText text={item.title} />
          </h3>
          <div className="text-xs text-muted-foreground mt-2 line-clamp-2 font-light">
            <TypewriterText text={item.description} />
          </div>
        </div>
        <Button 
          onClick={handleActionClick} 
          className="w-full mt-5 rounded-xl transition-all duration-300 transform active:scale-95 glass-button" 
          variant={isPlaying && item.category.includes('music') ? 'default' : 'secondary'}
        >
          <Icon className="mr-2 h-4 w-4" />
          {text}
        </Button>
      </CardContent>
    </Card>
  );
}
