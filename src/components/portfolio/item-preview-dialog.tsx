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

interface ItemPreviewDialogProps {
  item: PortfolioItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ItemPreviewDialog({ item, open, onOpenChange }: ItemPreviewDialogProps) {
  if (!item) return null;

  const isInteractive = (item.category === 'game' || item.category === 'website') && item.url;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[80vh]">
          <div className="p-6 flex flex-col overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold font-headline">{item.title}</DialogTitle>
              <DialogDescription className="text-base pt-2 text-muted-foreground">{item.description}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <Badge variant="outline" className="capitalize">{item.category}</Badge>
            </div>
          </div>
          <div className="relative aspect-video bg-muted h-full">
            {isInteractive ? (
              <iframe
                src={item.url}
                title={item.title}
                className="w-full h-full border-0 md:rounded-r-lg"
                sandbox="allow-scripts allow-same-origin"
              />
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
