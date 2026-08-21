/**
 * tRPC init: context, transformer, and public/protected procedures.
 *
 * Key Behaviors:
 * - Context receives the Auth.js session from the SvelteKit event.
 * - protectedProcedure requires ctx.session.user.
 */
import { initTRPC, TRPCError } from "@trpc/server";
import type { Session } from "@auth/core/types";
import superjson from "superjson";
import { ZodError } from "zod";

export const createTRPCContext = async (opts: {
  headers: Headers;
  session: Session | null;
}) => {
  return {
    session: opts.session,
    headers: opts.headers,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Session or user information is missing",
    });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
