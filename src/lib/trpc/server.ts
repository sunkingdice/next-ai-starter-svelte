/**
 * Server-side tRPC caller for SvelteKit load functions.
 */
import type { Session } from "@auth/core/types";
import { createCaller } from "$lib/api/root";
import { createTRPCContext } from "$lib/api/trpc";

export function createServerApi(session: Session | null) {
  return createCaller(() =>
    createTRPCContext({
      headers: new Headers({ "x-trpc-source": "sveltekit-server" }),
      session,
    }),
  );
}
