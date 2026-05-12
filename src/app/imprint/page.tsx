import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function Imprint() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 sm:py-16 min-h-screen">
        <div className="max-w-3xl mx-auto bg-background/40 backdrop-blur-md p-8 rounded-3xl border border-white/10">
          <h1 className="text-4xl font-bold font-headline mb-8">Imprint</h1>
          <div className="space-y-6 text-muted-foreground prose prose-invert">
            <p>
              Jan-Luca Müller
              <br />
              Pürschweg 22
              <br />
              28779 Bremen
              <br />
              Germany
            </p>

            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">Contact</h2>
            <p>
              Email: lucamuller2004@gmail.com
            </p>

            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">Disclaimer</h2>
            <p>
              The contents of our pages have been created with the utmost care. However, we cannot guarantee the
              contents' accuracy, completeness or topicality. According to statutory provisions, we are furthermore
              responsible for our own content on these web pages. In this matter, please note that we are not
              obliged to monitor the transmitted or saved information of third parties, or investigate circumstances
              pointing to illegal activity.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
