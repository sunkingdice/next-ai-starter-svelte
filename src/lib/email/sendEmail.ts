/**
 * Transactional email sender via Resend. Templates are HTML strings.
 */
import { Resend } from "resend";
import { welcomeEmailHtml } from "./templates/welcomeEmail";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM || "no-reply@yourdomain.com",
    to,
    subject: "Welcome!",
    html: welcomeEmailHtml(name),
  });
}
