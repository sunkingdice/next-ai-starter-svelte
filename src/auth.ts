/**
 * Auth.js (SvelteKit) configuration: Prisma adapter + email magic links.
 *
 * Key Behaviors:
 * - Uses database sessions and Nodemailer via Resend SMTP.
 * - Exposes handle/signIn/signOut for hooks and form actions.
 */
import { SvelteKitAuth } from "@auth/sveltekit";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Nodemailer from "@auth/sveltekit/providers/nodemailer";
import { env } from "$env/dynamic/private";
import { prisma } from "$lib/db";

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: {
        host: "smtp.resend.com",
        port: 465,
        auth: {
          user: "resend",
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM || "onboarding@resend.dev",
    }),
  ],
  session: {
    strategy: "database",
  },
  trustHost: true,
  callbacks: {
    async signIn({ user }) {
      try {
        return Boolean(user?.email);
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },
    async session({ session, user }) {
      try {
        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
            role: user.role,
            login: user.login,
            isAdmin: user.isAdmin,
          },
        };
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
  },
});
