import type { PortfolioItem } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  if (!image) {
    return { imageUrl: "https://picsum.photos/seed/fallback/600/400", imageHint: "placeholder image" };
  }
  return { imageUrl: image.imageUrl, imageHint: image.imageHint };
};

export const portfolioItems: PortfolioItem[] = [
  // Websites
  {
    id: 'w1',
    title: 'Outside Between',
    description: 'A visually intriguing web experience hosted on Firebase.',
    category: 'website',
    imageUrl: '/images/apple-touch-icon.png',
    imageHint: 'album art',
    url: 'https://outside---between.web.app/',
  },
  {
    id: 'w2',
    title: 'McLearn',
    description: 'An educational web app hosted on Firebase.',
    category: 'website',
    ...getImage('website-4'),
    url: 'https://mclearn-d113a.web.app/',
  },

  // Games
  {
    id: 'g1',
    title: 'Darkest Cards',
    description: 'A dark fantasy card game.',
    category: 'game',
    ...getImage('game-3'),
    url: 'https://zwiebelonkel.itch.io/darkest-cards',
  },
  {
    id: 'g2',
    title: 'GAS-24',
    description: 'A driving simulation game.',
    category: 'game',
    ...getImage('game-4'),
    url: 'https://zwiebelonkel.itch.io/gas-24',
  },
  {
    id: 'g3',
    title: 'Driver',
    description: 'A minimalist driving game.',
    category: 'game',
    ...getImage('game-5'),
    url: 'https://zwiebelonkel.itch.io/driver',
  },
  {
    id: 'g4',
    title: 'Fighter',
    description: 'A retro-inspired fighting game.',
    category: 'game',
    ...getImage('game-6'),
    url: 'https://zwiebelonkel.itch.io/fighter',
  },
  {
    id: 'g5',
    title: 'Ball',
    description: 'An arcade ball-rolling game.',
    category: 'game',
    ...getImage('game-7'),
    url: 'https://zwiebelonkel.itch.io/ball',
  },
  {
    id: 'g6',
    title: 'Pitfall',
    description: 'A platformer with tricky traps and jumps.',
    category: 'game',
    ...getImage('game-8'),
    url: 'https://zwiebelonkel.itch.io/pitfall',
  },
  {
    id: 'g7',
    title: 'Daddy',
    description: 'A horror-themed indie game.',
    category: 'game',
    ...getImage('game-9'),
    url: 'https://zwiebelonkel.itch.io/daddy',
  },

  // Music
  {
    id: 'm1',
    title: 'Track 1',
    description: 'A melodic electronic track on Spotify.',
    category: 'music',
    ...getImage('music-4'),
    audioUrl: 'https://open.spotify.com/intl-de/track/2QsA3EukXQY3S4S0CRqwpn?si=312acf9d7fe24b65',
  },
  {
    id: 'm2',
    title: 'Track 2',
    description: 'An ambient electronic track on Spotify.',
    category: 'music',
    ...getImage('music-5'),
    audioUrl: 'https://open.spotify.com/intl-de/track/5ELcT07OoPaQhqmpbHXLCm?si=0ee634c7f2bb4b3e',
  },
  {
    id: 'm3',
    title: 'Track 3',
    description: 'A chill instrumental song hosted on Spotify.',
    category: 'music',
    ...getImage('music-6'),
    audioUrl: 'https://open.spotify.com/intl-de/track/6xQRBSiPcwjAjBELq987dS?si=5b0b8b27189f40ff',
  },

  // 3D Models
  {
    id: 'd1',
    title: '3D Model 1',
    description: 'Interactive 3D model on Sketchfab.',
    category: '3d',
    ...getImage('3d-3'),
    url: 'https://skfb.ly/pBxoG',
  },
  {
    id: 'd2',
    title: '3D Model 2',
    description: 'Architectural 3D scene on Sketchfab.',
    category: '3d',
    ...getImage('3d-4'),
    url: 'https://skfb.ly/pBv87',
  },
  {
    id: 'd3',
    title: '3D Model 3',
    description: 'Artistic 3D model on Sketchfab.',
    category: '3d',
    ...getImage('3d-5'),
    url: 'https://skfb.ly/pB9Mr',
  },

  // Links
  {
    id: 'l1',
    title: 'Itch.io Profile',
    description: 'Game development projects by Zwiebelonkel.',
    category: 'link',
    ...getImage('link-3'),
    url: 'https://zwiebelonkel.itch.io/',
  },
  {
    id: 'l2',
    title: 'GitHub Profile',
    description: 'Open source contributions and code repositories.',
    category: 'link',
    ...getImage('link-4'),
    url: 'https://github.com/Zwiebelonkel',
  },
  {
    id: 'l3',
    title: 'Sketchfab Profile',
    description: '3D models and visualizations by lucamuller2004.',
    category: 'link',
    ...getImage('link-5'),
    url: 'https://sketchfab.com/lucamuller2004',
  },
];
