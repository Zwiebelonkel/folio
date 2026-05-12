"use client";

import { useEffect, useRef } from 'react';
import type { PortfolioItem } from '@/lib/types';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link as LinkIcon, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import gsap from 'gsap';

interface ItemPreviewDialogProps {
  item: PortfolioItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTagClick: (tag: string) => void;
}

export function ItemPreviewDialog({ item, open, onOpenChange, onTagClick }: ItemPreviewDialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && contentRef.current) {
      const tl = gsap.timeline();
      
      // Intensive opening animation
      tl.fromTo(contentRef.current,
        { 
          opacity: 0, 
          scale: 0.8, 
          y: 40, 
          rotateX: -15,
          skewY: 2 
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          rotateX: 0,
          skewY: 0,
          duration: 0.8, 
          ease: "expo.out",
          clearProps: "all"
        }
      );

      // Stagger internal elements
      tl.from(".preview-stagger", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4");
    }
  }, [open, item]);

  if (!item) return null;

  const is3d = item.category.includes('3d') && !!item.url;
  const isExternalLink = !!item.url && item.url.startsWith('http');
  const isSketchfab3d = is3d && isExternalLink;
  const isMusic = item.category.includes('music');

  const getLinkText = () => {
    if (isSketchfab3d) return 'View on Sketchfab';
    if (isMusic) return 'Listen on Spotify';
    return 'Visit Link';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden border-white/10 bg-background/60 backdrop-blur-3xl">
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 max-h-[80vh]">
          <div className="p-8 flex flex-col overflow-y-auto">
            <DialogHeader className="preview-stagger">
              <DialogTitle className="text-3xl font-bold font-headline leading-tight">{item.title}</DialogTitle>
              <DialogDescription className="text-lg pt-2 text-muted-foreground/80 font-light">{item.description}</DialogDescription>
            </DialogHeader>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="mt-6 flex flex-wrap gap-2 preview-stagger">
                  {item.category.map(cat => (
                    <Badge key={cat} variant="outline" className="capitalize px-3 py-1 bg-white/5 border-white/10">{cat}</Badge>
                  ))}
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div className="preview-stagger">
                    <Separator className="my-6 opacity-30" />
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <button key={tag} onClick={() => onTagClick(tag)} className="focus:outline-none">
                          <Badge variant="secondary" className="hover:bg-primary/20 cursor-pointer bg-primary/10 text-primary border-primary/20">{tag}</Badge>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {isExternalLink && (
                <div className="mt-8 preview-stagger">
                  <Button asChild className="w-full sm:w-auto h-12 px-8 rounded-xl bg-primary text-primary-foreground hover:scale-105 transition-transform">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {isMusic ? <Music className="mr-2 h-5 w-5" /> : <LinkIcon className="mr-2 h-5 w-5" />}
                      {getLinkText()}
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className={cn(
            "relative bg-muted/20 md:h-full",
            is3d ? "min-h-[400px] md:min-h-0" : "aspect-video"
          )}>
            {is3d && !isExternalLink ? (
              /* @ts-ignore - model-viewer is a custom element */
              <model-viewer
                  src={item.url}
                  alt={item.title}
                  ar
                  ar-modes="webxr scene-viewer quick-look"
                  camera-controls
                  auto-rotate
                  poster={item.imageUrl}
                  shadow-intensity="1"
                  style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                  className="md:rounded-r-lg"
              >
              </model-viewer>
            ) : (
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover md:rounded-r-lg"
                data-ai-hint={item.imageHint}
                priority
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}