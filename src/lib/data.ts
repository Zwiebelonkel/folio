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
  {
    id: '1',
    title: 'Neon Racer',
    description: 'A futuristic racing game with vibrant neon aesthetics. Built with Unity.',
    category: 'game',
    ...getImage('game-1'),
    url: 'about:blank',
  },
  {
    id: '2',
    title: 'Portfolio Site',
    description: 'A clean and modern portfolio website for a fictional designer.',
    category: 'website',
    ...getImage('website-1'),
    url: 'about:blank',
  },
  {
    id: '3',
    title: 'Cosmic Drift',
    description: 'An abstract 3D artwork exploring celestial forms and colors. Rendered in Blender.',
    category: '3d',
    ...getImage('3d-1'),
  },
  {
    id: '4',
    title: 'Midnight Drive',
    description: 'A synthwave track with a driving beat and nostalgic melodies.',
    category: 'music',
    ...getImage('music-1'),
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/08/04/audio_2d79a291b5.mp3',
  },
  {
    id: '5',
    title: 'GitHub Profile',
    description: 'Check out my code repositories and contributions on GitHub.',
    category: 'link',
    ...getImage('link-1'),
    url: 'https://github.com',
  },
  {
    id: '12',
    title: 'Daydream',
    description: 'A short, ethereal film about lucid dreaming.',
    category: 'video',
    ...getImage('video-1'),
    url: 'about:blank'
  },
  {
    id: '6',
    title: 'Elder Scrolls V: Skyrim',
    description: 'A dark fantasy game concept with a focus on immersive storytelling.',
    category: 'game',
    ...getImage('game-2'),
    url: 'about:blank',
  },
  {
    id: '7',
    title: 'Modern E-commerce',
    description: 'A sleek e-commerce platform with a focus on user experience.',
    category: 'website',
    ...getImage('website-2'),
    url: 'about:blank',
  },
  {
    id: '8',
    title: 'Glass Pavilion',
    description: 'An architectural visualization of a modern glass house in a forest.',
    category: '3d',
    ...getImage('3d-2'),
  },
  {
    id: '13',
    title: 'City Lights',
    description: 'A music video for a local indie band, capturing the energy of the city at night.',
    category: 'video',
    ...getImage('video-2'),
    url: 'about:blank'
  },
  {
    id: '9',
    title: 'Coffee Shop Lo-fi',
    description: 'A relaxing lo-fi hip hop beat, perfect for studying or chilling.',
    category: 'music',
    ...getImage('music-2'),
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808840a12.mp3',
  },
  {
    id: '10',
    title: 'Digital Dreams',
    description: 'An uplifting electronic track with layered synths and a danceable rhythm.',
    category: 'music',
    ...getImage('music-3'),
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/11/11/audio_a088928062.mp3',
  },
  {
    id: '11',
    title: 'Behance Profile',
    description: 'My design portfolio on Behance.',
    category: 'link',
    ...getImage('link-2'),
    url: 'https://behance.net',
  },
];
