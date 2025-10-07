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
    description: 'A social Webgame about Cards and Luck.',
    category: 'website',
    imageUrl: '/images/outside.png',
    imageHint: 'album art',
    url: 'https://outside---between.web.app/',
  },
  {
    id: 'w2',
    title: 'McLearn',
    description: 'An educational web app for custom learn cards.',
    category: 'website',
    imageUrl: '/images/learn.png',
    imageHint: 'McLearn',
    url: 'https://mclearn-d113a.web.app/',
  },

  // Games
  {
    id: 'g1',
    title: 'Darkest Cards',
    description: 'A dark fantasy/horror card game about collecting cards.',
    category: 'game',
    imageUrl: '/images/darkestCards.png',
    imageHint: 'Darkest Cards',
    url: 'https://zwiebelonkel.itch.io/darkest-cards',
  },
  {
    id: 'g2',
    title: 'GAS-24',
    description: 'A 3D psx-styled horror game inside a gasstation.',
    category: 'game',
    imageUrl: '/images/gas24.png',
    imageHint: 'Gas24',
    url: 'https://zwiebelonkel.itch.io/gas-24',
  },
  {
    id: 'g3',
    title: 'Driver',
    description: 'A short pixelated horror game about driving a car and savinf gasoline.',
    category: 'game',
    imageUrl: '/images/driver.png',
    imageHint: 'Driver',
    url: 'https://zwiebelonkel.itch.io/driver',
  },
  {
    id: 'g4',
    title: 'Fighter',
    description: 'A retro-inspired local multiplayer fighting game.',
    category: 'game',
    imageUrl: '/images/fighter.png',
    imageHint: 'Fighter',
    url: 'https://zwiebelonkel.itch.io/fighter',
  },
  {
    id: 'g5',
    title: 'Ball',
    description: 'An arcade ball-rolling game. Burrito bison principle',
    category: 'game',
    imageUrl: '/images/ball.jpeg',
    imageHint: 'Ball',
    url: 'https://zwiebelonkel.itch.io/ball',
  },
  {
    id: 'g6',
    title: 'Pitfall',
    description: 'A ragdoller with tricky traps and jumps.',
    category: 'game',
    imageUrl: '/images/pitfall.png',
    imageHint: 'Pitfall',
    url: 'https://zwiebelonkel.itch.io/pitfall',
  },
  {
    id: 'g7',
    title: 'Pizza Dude',
    description: 'A horror-themed indie game about a pizzeria.',
    category: 'game',
    imageUrl: '/images/pizza.png',
    imageHint: 'Pizza Dude',
    url: 'https://zwiebelonkel.itch.io/daddy',
  },

  // Music
  {
    id: 'm1',
    title: 'NIS',
    description: 'A oriental dark drill track on Spotify.',
    category: 'music',
    imageUrl: '/images/nis.jpg',
    imageHint: 'NIS',
    audioUrl: 'https://open.spotify.com/intl-de/track/2QsA3EukXQY3S4S0CRqwpn?si=312acf9d7fe24b65',
  },
  {
    id: 'm2',
    title: 'SMOKE',
    description: 'A dark piano drill/grime track on Spotify.',
    category: 'music',
    imageUrl: '/images/smoke.jpg',
    imageHint: 'SMOKE',
    audioUrl: 'https://open.spotify.com/intl-de/track/5ELcT07OoPaQhqmpbHXLCm?si=0ee634c7f2bb4b3e',
  },
  {
    id: 'm3',
    title: 'WANTED',
    description: 'An ambient trap track hosted on Spotify.',
    category: 'music',
    imageUrl: '/images/wanted.jpg',
    imageHint: 'WANTED',
    audioUrl: 'https://open.spotify.com/intl-de/track/6xQRBSiPcwjAjBELq987dS?si=5b0b8b27189f40ff',
  },

  // 3D Models
  {
    id: 'd1',
    title: 'Orange Glasses',
    description: 'Interactive 3D model on Sketchfab.',
    category: '3d',
    imageUrl: '/images/glasses.png',
    imageHint: 'Orange glasses',
    url: 'https://skfb.ly/pBxoG',
  },
  {
    id: 'd2',
    title: 'Office Assets',
    description: 'Architectural 3D scene on Sketchfab.',
    category: '3d',
    imageUrl: '/images/buro.png',
    imageHint: 'Office Assets',
    url: 'https://skfb.ly/pBv87',
  },
  {
    id: 'd3',
    title: 'Cigarettes',
    description: 'Low poly game asset on Sketchfab. Made for Gas24',
    category: '3d',
    imageUrl: '/images/redSmoke.png',
    imageHint: 'Cigarettes',
    url: 'https://skfb.ly/pB9Mr',
  },

  // Links
  {
    id: 'l1',
    title: 'Itch.io Profile',
    description: 'Game development projects by Zwiebelonkel.',
    category: 'link',
    imageUrl: '/images/itch.jpg',
    imageHint: 'Itch.io',
    url: 'https://zwiebelonkel.itch.io/',
  },
  {
    id: 'l2',
    title: 'GitHub Profile',
    description: 'Open source contributions and code repositories.',
    category: 'link',
    imageUrl: '/images/github.png',
    imageHint: 'GitHub',
    url: 'https://github.com/Zwiebelonkel',
  },
  {
    id: 'l3',
    title: 'Sketchfab Profile',
    description: '3D models and visualizations by lucamuller2004.',
    category: 'link',
    imageUrl: '/images/sketch.jpg',
    imageHint: 'Cigarettes',
    url: 'https://sketchfab.com/lucamuller2004',
  },
];
