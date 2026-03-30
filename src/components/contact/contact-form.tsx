'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Send, Mail, Linkedin, Github } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form',
        variant: 'destructive',
      });
      return;
    }

    // Create mailto link with form data
    const mailtoLink = `mailto:your.email@example.com?subject=${encodeURIComponent(
      `Portfolio Contact: ${formData.subject}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    toast({
      title: 'Opening Email Client',
      description: 'Your default email application will open with the message.',
    });

    // Optional: Clear form after a delay
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDirectEmail = () => {
    window.location.href = 'mailto:your.email@example.com';
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind? Want to collaborate? Drop me a message and let's create something amazing.
          </p>
        </div>

        <div className="relative">
          {/* Decorative background elements */}
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <form
            onSubmit={handleSubmit}
            className="relative bg-card border border-border rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground block"
                >
                  Your Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={cn({
                    'border-red-500': errors.name,
                  })}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground block"
                >
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn({
                    'border-red-500': errors.email,
                  })}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-2 mb-6">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-foreground block"
              >
                Subject
              </label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                  className={cn({
                    'border-red-500': errors.subject,
                  })}
                placeholder="Project Inquiry / Collaboration / General Question"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject}</p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-2 mb-8">
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground block"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                  className={cn("resize-none", {
                    'border-red-500': errors.message,
                  })}
                placeholder="Tell me about your project or idea..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 px-8 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>

              <button
                type="button"
                onClick={handleDirectEmail}
                className="sm:w-auto px-8 py-4 bg-background border border-border hover:bg-accent text-foreground font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Direct Email
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info & Social Links */}
        <div className="mt-12 space-y-6">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Or reach out directly via email
            </p>
            <a
              href="mailto:lucamuller2004@gmail.com"
              className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors inline-block text-lg"
            >
              lucamuller2004@gmail.com
            </a>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/Zwiebelonkel"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 bg-background border border-border hover:border-yellow-500 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-yellow-400 transition-colors" />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                GitHub
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/luca-m%C3%BCller-a182ab323/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 bg-background border border-border hover:border-orange-500 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-orange-400 transition-colors" />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                LinkedIn
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}