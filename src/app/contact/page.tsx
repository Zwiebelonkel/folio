import { Header } from '@/components/layout/header';
import { ContactForm } from '@/components/contact/contact-form';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline mb-4">Contact Me</h1>
            <p className="text-muted-foreground">
              Have a question or want to work together? Drop me a message.
            </p>
          </div>
          <ContactForm />
        </div>
      </main>
    </>
  );
}
