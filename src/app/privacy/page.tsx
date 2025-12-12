import { Header } from '@/components/layout/header';

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold font-headline mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-muted-foreground prose prose-invert">
            <p>
              Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.
            </p>

            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">1. Information we collect</h2>
            <p>
              Log data: When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your computer's Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.
            </p>

            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">2. Legal bases for processing</h2>
            <p>
              We will process your personal information lawfully, fairly and in a transparent manner. We collect and process information about you only where we have legal bases for doing so.
            </p>

            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">3. Security of your personal information</h2>
            <p>
              We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.
            </p>

            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">4. Your rights and controlling your personal information</h2>
            <p>
              You always retain the right to withhold personal information from us, with the understanding that your experience of our website may be affected. We will not discriminate against you for exercising any of your rights over your personal information.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
