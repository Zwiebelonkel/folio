
"use client";

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
import { Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Add this for model-viewer custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

interface ItemPreviewDialogProps {
  item: PortfolioItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ItemPreviewDialog({ item, open, onOpenChange }: ItemPreviewDialogProps) {
  if (!item) return null;

  const is3d = item.category === '3d' && !!item.url;
  const isExternalLink = !!item.url && item.url.startsWith('http');
  const isSketchfab3d = is3d && isExternalLink;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[80vh]">
          <div className="p-6 flex flex-col overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold font-headline">{item.title}</DialogTitle>
              <DialogDescription className="text-base pt-2 text-muted-foreground">{item.description}</DialogDescription>
            </DialogHeader>
            <div className="flex-1 flex flex-col justify-between">
              <div className="mt-4">
                <Badge variant="outline" className="capitalize">{item.category}</Badge>
              </div>
              {isExternalLink && (
                <div className="mt-6">
                  <Button asChild>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      {isSketchfab3d ? 'View on Sketchfab' : 'Visit Link'}
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className={cn(
            "relative bg-muted md:h-full",
            is3d ? "min-h-[400px] md:min-h-0" : "aspect-video"
          )}>
            {is3d ? (
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
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
