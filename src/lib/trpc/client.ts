/**
 * Browser tRPC client. Use createCaller on the server instead.
 */
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import { browser } from "$app/environment";
import type { AppRouter } from "$lib/api/root";

function getBaseUrl() {
  if (browser) return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 5173}`;
}

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      headers() {
        return {
          "x-trpc-source": "sveltekit",
        };
      },
      transformer: SuperJSON,
    }),
  ],
});
