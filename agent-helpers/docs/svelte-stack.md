# Svelte stack notes

Source: conversion from the Next.js/React starter on 2026-08-21.

## Replacements

| Removed (React/Next) | Svelte replacement |
| --- | --- |
| Next.js App Router | SvelteKit 2 (`src/routes`) |
| React 19 | Svelte 5 runes |
| next-auth | `@auth/sveltekit` + `@auth/prisma-adapter` |
| `@trpc/react-query` / React Query | vanilla `@trpc/client` + `createCaller` |
| lucide-react | `@lucide/svelte` |
| react-toastify | `svelte-sonner` |
| next-themes | `mode-watcher` |
| framer-motion | Svelte transitions / CSS |
| Resend React templates | HTML strings |
| inngest/next | `inngest/sveltekit` |
| Storybook React | `@storybook/sveltekit` |

## Auth

- Config lives in `src/auth.ts`. Hooks re-export `handle`.
- Session: `event.locals.auth()` on the server, `data.session` from `+layout.server.ts`.
- Email provider id is `nodemailer`. Env: `AUTH_SECRET`, `AUTH_URL`.

## tRPC

- Browser: `import { trpc } from '$lib/trpc/client'`
- Server: `createServerApi(session)` from `$lib/trpc/server`
