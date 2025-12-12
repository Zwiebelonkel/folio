'use server';
/**
 * @fileOverview A flow for sending an email from the contact form.
 *
 * - sendEmail - A function that handles sending the email.
 * - SendEmailSchema - The input type for the sendEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { send } from 'genkit/x/sendgrid';

export const SendEmailSchema = z.object({
  name: z.string(),
  contact: z.string(),
  reason: z.string(),
});

export type SendEmailInput = z.infer<typeof SendEmailSchema>;

export async function sendEmail(input: SendEmailInput) {
  return sendEmailFlow(input);
}

const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: SendEmailSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    await send({
      // This is the address the email will be sent from.
      // It must be a verified sender in your SendGrid account.
      // For now, we'll use your address as both sender and recipient.
      from: {
        email: 'lucamuller2004@gmail.com',
        name: 'Portfolio Contact Form',
      },
      to: 'lucamuller2004@gmail.com',
      subject: `New Contact Form Submission from ${input.name}`,
      html: `
        <p>You have a new contact form submission:</p>
        <ul>
          <li><strong>Name:</strong> ${input.name}</li>
          <li><strong>Contact:</strong> ${input.contact}</li>
        </ul>
        <p><strong>Message:</strong></p>
        <p>${input.reason}</p>
      `,
    });
  }
);
