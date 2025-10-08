"use client";

import type { PortfolioItem } from '@/lib/types';
import { createContext, useContext, useState, type ReactNode } from 'react';

interface MusicPlayerContextType {
  currentTrack: PortfolioItem | null;
  isPlaying: boolean;
  playTrack: (track: PortfolioItem) => void;
  togglePlayPause: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<PortfolioItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track: PortfolioItem) => {
    if (!track.category.includes('music')) return;
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <MusicPlayerContext.Provider value={{ currentTrack, isPlaying, playTrack, togglePlayPause }}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
}
