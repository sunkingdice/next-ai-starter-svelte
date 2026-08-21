/**
 * SvelteKit ambient app types, including Auth.js session locals.
 */
import type { DefaultSession } from "@auth/core/types";

declare global {
  namespace App {
    interface Locals {
      auth: () => Promise<import("@auth/core/types").Session | null>;
    }

    interface PageData {
      session: import("@auth/core/types").Session | null;
    }
  }
}

declare module "@auth/core/types" {
  interface Session {
    user: {
      id: string;
      login?: string;
      role?: "user" | "admin";
      isAdmin?: boolean;
      isTeamAdmin?: boolean;
      dashboardEnabled?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    login?: string;
    role?: "user" | "admin";
    isAdmin?: boolean;
    isTeamAdmin?: boolean;
  }
}

export {};
