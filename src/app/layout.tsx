import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ScrollProgress } from '@/components/layout/scroll-progress';
import { GridBackground } from '@/components/layout/grid-background';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Luca Müller | Creative Developer & Digital Artist',
  description: 'Portfolio of Luca Müller. Passionate about crafting unique digital experiences, from interactive games to immersive 3D web applications.',
  icons: {
    icon: '/images/LM_nobg.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased relative">
        <ScrollProgress />
        <GridBackground />
        <div className="pt-16">
          {children}
        </div>
        <Toaster />
        
        {/* Model Viewer for 3D Portfolio Items */}
        <Script 
          type="module" 
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" 
          strategy="afterInteractive"
        />
        
        {/* Google Analytics */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-QCE8WV2Z4S" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QCE8WV2Z4S');
          `}
        </Script>
      </body>
    </html>
  );
}
