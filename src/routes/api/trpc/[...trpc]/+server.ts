/**
 * tRPC HTTP adapter for SvelteKit. GET/POST hit /api/trpc.
 */
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { RequestHandler } from "./$types";
import { appRouter } from "$lib/api/root";
import { createTRPCContext } from "$lib/api/trpc";

const handler: RequestHandler = async (event) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: event.request,
    router: appRouter,
    createContext: async () =>
      createTRPCContext({
        headers: event.request.headers,
        session: await event.locals.auth(),
      }),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : ({ path, error }) => {
            console.error(`tRPC failed on ${path ?? "<no-path>"}`, error);
          },
  });
};

export const GET = handler;
export const POST = handler;
