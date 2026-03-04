import { resend } from '@/lib/email/resend';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

interface SendEmailResult {
  success: boolean;
  error?: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<SendEmailResult> {
  try {
    const from = process.env.EMAIL_FROM ?? 'eSIM Store <noreply@example.com>';
    const response = await resend.emails.send({ from, to, subject, html });
    if (response.error) {
      console.error('Resend error:', response.error);
      return { success: false, error: response.error.message };
    }
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Failed to send email:', message);
    return { success: false, error: message };
  }
}
