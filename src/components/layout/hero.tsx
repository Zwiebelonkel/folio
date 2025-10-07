
import Image from 'next/image';

export function Hero() {
  return (
    <section className="py-16 sm:py-20 text-center flex flex-col items-center">
      <Image
        src="/images/profile2.png"
        alt="Luca Müller"
        width={128}
        height={128}
        className="rounded-full mb-8 border-4 border-primary/20 shadow-lg"
        priority
      />
      <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
        Creative Developer & Digital Artist
      </h2>
      <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
        Passionate about crafting unique digital experiences, from interactive games and immersive web applications to captivating music and 3D models. Explore my portfolio to see my work.
      </p>
    </section>
  );
}
