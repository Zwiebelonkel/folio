
"use client";

import { useEffect, useRef } from 'react';
import type { PortfolioItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MagnumOpusProps {
  item: PortfolioItem;
}

export function MagnumOpus({ item }: MagnumOpusProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { scale: 0.9, opacity: 0, y: 100 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleActionClick = () => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="h-[1px] w-12 bg-primary/30" />
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-primary/80">Magnum Opus</h2>
          <div className="h-[1px] w-12 bg-primary/30" />
        </div>

        <div ref={cardRef}>
          <Card 
            className="liquid-glass overflow-hidden border-2 border-primary/20 group cursor-pointer transition-all duration-500 hover:border-primary/50 luxury-glow rounded-[2rem]"
            onClick={handleActionClick}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
              <div className="relative aspect-video lg:aspect-auto h-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/20 to-transparent hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent lg:hidden" />
              </div>
              
              <CardContent className="p-10 lg:p-16 flex flex-col justify-center gap-8 relative z-10">
                <div className="flex flex-wrap gap-3">
                  {item.category.map(cat => (
                    <Badge key={cat} variant="secondary" className="capitalize text-primary bg-primary/10 border-primary/20 py-1 px-3 text-xs tracking-wider">
                      {cat}
                    </Badge>
                  ))}
                </div>

                <div>
                  <h3 className="text-5xl lg:text-7xl font-bold font-headline mb-6 group-hover:text-primary transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-xl font-light">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tags?.map(tag => (
                    <Badge key={tag} variant="outline" className="bg-white/5 border-white/10 text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4">
                  <Button 
                    size="lg" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-7 rounded-2xl shadow-2xl hover:shadow-primary/40 transition-all duration-300 transform group-hover:translate-y-[-4px]"
                  >
                    <ExternalLink className="mr-3 h-6 w-6" />
                    Experience on Steam
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
