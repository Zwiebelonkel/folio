export type Category = 'game' | 'website' | '3d' | 'music' | 'link';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  imageUrl: string;
  imageHint: string;
  url?: string;
  audioUrl?: string; 
}
