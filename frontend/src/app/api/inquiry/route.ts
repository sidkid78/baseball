import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const inquiryToEmail = process.env.INQUIRY_TO_EMAIL;
const inquiryFromEmail = process.env.INQUIRY_FROM_EMAIL;

if (!resendApiKey) {
  console.error("RESEND_API_KEY is not set. Email sending will fail.");
}
if (!inquiryToEmail) {
  console.error("INQUIRY_TO_EMAIL is not set. Email sending will fail.");
}
if (!inquiryFromEmail) {
  console.error("INQUIRY_FROM_EMAIL is not set. Email sending will fail.");
}

const resend = new Resend(resendApiKey);

interface InquiryPayload {
  name: string;
  email: string;
  message: string;
  cardId?: string;
  cardName?: string;
  phone?: string; // Honeypot
}

// Server-side validation
function validatePayload(payload: InquiryPayload): { isValid: boolean; message?: string } {
  if (!payload.name || payload.name.trim().length === 0 || payload.name.length > 100) {
    return { isValid: false, message: 'Valid name is required.' };
  }
  if (!payload.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(payload.email) || payload.email.length > 100) {
    return { isValid: false, message: 'Valid email is required.' };
  }
  if (!payload.message || payload.message.trim().length < 10 || payload.message.length > 2000) {
    return { isValid: false, message: 'Message must be between 10 and 2000 characters.' };
  }
  if (payload.phone) { // Honeypot check
    console.warn('Honeypot field filled, potential spam detected.');
    return { isValid: false, message: 'Spam detected.' };
  }
  return { isValid: true };
}

// Helper to escape HTML for email body
function escapeHtml(unsafe: string | undefined): string {
    if (!unsafe) return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  if (!resendApiKey || !inquiryToEmail || !inquiryFromEmail) {
    return NextResponse.json(
      { message: 'Email service is not configured correctly on the server.' },
      { status: 500 }
    );
  }

  try {
    const payload = await req.json() as InquiryPayload;
    const validation = validatePayload(payload);

    if (!validation.isValid) {
      return NextResponse.json({ message: validation.message || 'Invalid input.' }, { status: 400 });
    }

    const subject = payload.cardName
      ? `Baseball Card Inquiry: ${payload.cardName} - from ${payload.name}`
      : `Baseball Card Inquiry from ${payload.name}`;

    const textBody = `
Name: ${payload.name}
Email: ${payload.email}
${payload.cardId ? `Card ID: ${payload.cardId}\n` : ''}${payload.cardName ? `Card Name: ${payload.cardName}\n` : ''}
Message:
${payload.message}
    `;

    const htmlBody = `
      <html>
        <body>
          <h2>Baseball Card Inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          ${payload.cardId ? `<p><strong>Card ID:</strong> ${escapeHtml(payload.cardId)}</p>` : ''}
          ${payload.cardName ? `<p><strong>Card Name:</strong> ${escapeHtml(payload.cardName)}</p>` : ''}
          <p><strong>Message:</strong></p>
          <pre style="font-family: sans-serif; white-space: pre-wrap; border: 1px solid #eee; padding: 10px;">${escapeHtml(payload.message)}</pre>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: `Baseball Card Inquiries <${inquiryFromEmail}>`,
      to: [inquiryToEmail],
      replyTo: payload.email,
      subject: subject,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ message: 'Failed to send email.', error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Inquiry sent successfully!', data }, { status: 200 });

  } catch (error) {
    console.error('Error processing inquiry:', error);
    // Check if error is an instance of Error to safely access message property
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return NextResponse.json({ message: 'Error processing request.', error: errorMessage }, { status: 500 });
  }
} 