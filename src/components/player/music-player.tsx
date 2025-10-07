"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useMusicPlayer } from '@/components/contexts/music-player-context';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export function MusicPlayer() {
  const { currentTrack, isPlaying, togglePlayPause } = useMusicPlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(e => console.error("Error playing audio:", e));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        setProgress(audio.currentTime);
        setDuration(audio.duration);
      };
      const handleEnded = () => {
        if(isPlaying) togglePlayPause();
      }

      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', updateProgress);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('loadedmetadata', updateProgress);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [isPlaying, togglePlayPause]);
  
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-card/80 backdrop-blur-lg border-t border-border/50 container mx-auto p-4">
        <audio ref={audioRef} src={currentTrack.audioUrl} />
        <div className="flex items-center gap-4">
          <Image
            src={currentTrack.imageUrl}
            alt={currentTrack.title}
            width={56}
            height={56}
            className="rounded-md"
            data-ai-hint={currentTrack.imageHint}
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-card-foreground truncate">{currentTrack.title}</p>
            <p className="text-sm text-muted-foreground truncate">{currentTrack.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" disabled>
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={togglePlayPause}>
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" disabled>
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          <div className="hidden sm:flex flex-1 items-center gap-3">
             <span className="text-xs font-mono w-12 text-center">{formatTime(progress)}</span>
             <Slider
                value={[progress]}
                max={duration || 1}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
            />
            <span className="text-xs font-mono w-12 text-center">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
