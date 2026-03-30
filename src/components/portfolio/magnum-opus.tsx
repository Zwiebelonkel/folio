"use client";

import type { PortfolioItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface MagnumOpusProps {
  item: PortfolioItem;
}

export function MagnumOpus({ item }: MagnumOpusProps) {
  const handleActionClick = () => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Star className="w-6 h-6 text-primary animate-pulse" />
          <h2 className="text-3xl font-bold font-headline tracking-tight text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Magnum Opus
          </h2>
          <Star className="w-6 h-6 text-primary animate-pulse" />
        </div>

        <Card 
          className="luxury-glow overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-primary/20 group cursor-pointer transition-all duration-500"
          onClick={handleActionClick}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-video lg:aspect-auto h-full overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent hidden lg:block" />
            </div>
            
            <CardContent className="p-8 lg:p-12 flex flex-col justify-center gap-6">
              <div className="flex flex-wrap gap-2">
                {item.category.map(cat => (
                  <Badge key={cat} variant="secondary" className="capitalize text-primary border-primary/20">
                    {cat}
                  </Badge>
                ))}
              </div>

              <div>
                <h3 className="text-4xl lg:text-5xl font-bold font-headline mb-4 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {item.tags?.map(tag => (
                  <Badge key={tag} variant="outline" className="bg-primary/5">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-4">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-primary/20 transition-all"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Experience on Steam
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}