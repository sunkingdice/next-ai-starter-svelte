/**
 * Inngest serve handler for SvelteKit (GET/POST/PUT).
 */
import { serve } from "inngest/sveltekit";
import {
  inngest,
  messageHandlerFn,
  userRegisteredFn,
} from "../../../../inngest.config";
import { userRegistered } from "$lib/inngest";

const inngestServe = serve({
  client: inngest,
  functions: [userRegisteredFn, messageHandlerFn, userRegistered],
});

export const GET = inngestServe.GET;
export const POST = inngestServe.POST;
export const PUT = inngestServe.PUT;
