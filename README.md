# SvelteKit AI Starter

This project is a port of [Kevin's next-ai-starter](https://github.com/sunkingdice/next-ai-starter) — a fantastic Next.js template built for AI-assisted development workflows. A huge thanks to Kevin for putting that together. His approach to structuring agent helpers, task checklists, and Cursor commands is genuinely excellent, and this repo wouldn't exist without that foundation. If you haven't watched his videos on AI coding, [start here](https://youtu.be/gXmakVsIbF0).

I'm a Svelte person. I wanted all the same tooling and conventions Kevin built, just without React and Next.js in the middle of it. So I ported the whole thing to SvelteKit. Same stack philosophy, same agent-helper structure, same deployment target — just Svelte all the way down.

**Contributions are welcome.** This is meant to be a community resource, not a personal scratchpad. If you want to improve the stack, fix something, or add an integration that makes sense here, open a PR. The only thing I ask is that additions stay in the spirit of the template: practical, composable, and AI-coding-friendly.

# 🚀 SvelteKit Modern Stack Template

A SvelteKit template that combines commonly used tools and libraries for building full-stack web applications. This stack is specifically designed to be optimized for AI coding assistants like Cursor.

## 🎯 Overview

This template includes [SvelteKit 2](https://svelte.dev/docs/kit) with [Svelte 5](https://svelte.dev), [Supabase](https://supabase.com) for the database, [Resend](https://resend.com) for transactional emails, and optional integrations with various AI providers and AWS services.

## ✨ Features

### 🏗️ Core Architecture

- [**SvelteKit 2**](https://svelte.dev/docs/kit) - Svelte 5 framework with file-based routing
- [**TypeScript**](https://www.typescriptlang.org/) - Type safety throughout
- [**tRPC**](https://trpc.io/) - End-to-end type-safe APIs
- [**Prisma**](https://www.prisma.io/) - Database ORM and schema management
- [**Auth.js**](https://authjs.dev/reference/sveltekit) - Authentication with Prisma adapter
- [**Supabase**](https://supabase.com) - Postgres database with realtime and auth

### 🎨 UI & Styling

- [**Tailwind CSS**](https://tailwindcss.com/) - Utility-first CSS framework
- [**Svelte transitions**](https://svelte.dev/docs/svelte/transition) - Built-in animation
- [**Lucide Icons**](https://lucide.dev/guide/svelte/) - `@lucide/svelte` icon set
- Dark mode with [mode-watcher](https://www.npmjs.com/package/mode-watcher)

### 🛠️ Development Tools

- [**Storybook**](https://storybook.js.org/) - Component development environment
- [**Geist Font**](https://vercel.com/font) - Typography by Vercel

### 🤖 AI & Background Jobs

- Multiple AI integrations available:
  - [OpenAI](https://openai.com) - GPT-4 and o-series models
  - [Anthropic](https://anthropic.com) - Sonnet-3.5
  - [Perplexity](https://perplexity.ai) - Web search models
  - [Groq](https://groq.com) - Fast inference
- [**Inngest**](https://www.inngest.com/) - Background jobs and scheduled tasks

### 🔧 Infrastructure & Services

- [**Resend**](https://resend.com) - Email delivery
- [**AWS S3**](https://aws.amazon.com/s3/) - File storage
- [**Supabase**](https://supabase.com) - Primary database
  (Note that I don't directly use the supabase client in this template, so you can switch out supabase with other database providers via the DATABASE_URL and DIRECT_URL environment variables.)

### 🔔 Additional Features

- [**svelte-sonner**](https://github.com/wobsoriano/svelte-sonner) - Toast notifications
- Utility functions for common operations
- TypeScript configuration included

### 🤖 Agent Features

- [**Agent Helpers**](./agent-helpers) - A folder for agent-specific files and tools.
- [**Agent Instructions**](./agent-helpers/README.md) - Instructions for the agent.
- [**Agent Tasks**](./agent-helpers/tasks.md) - A checklist of tasks for the agent to complete.
- [**Agent Scratchpad**](./agent-helpers/scratchpad.md) - A place for the agent to write down its thoughts and ideas.
- [**Agent Logs**](./agent-helpers/logs) - A place for the agent to write down its logs.

> **ℹ️ Add these lines to your `.gitignore` to avoid agent-helper conflicts (copy & paste):**

```.gitignore
# agent-helpers
agent-helpers/logs
agent-helpers/sample-code
agent-helpers/scratchpad.md
```

### 🤖 Cursor Custom Slash Commands

Cursor has a feature that allows you to define custom slash commands for your AI agents. This is a great way to help your agents navigate the codebase and complete tasks efficiently.

Here are the commands that are available to you, just type `/` in the agent window to see the list of commands.

- [**start**](.cursor/commands/start.md) - Start working on a new task.
- [**continue**](.cursor/commands/continue.md) - Queue these up to keep the agent working on the current task until all tasks are complete.
- [**review**](.cursor/commands/review.md) - Review the work that has been completed.
- [**document**](.cursor/commands/document.md) - Document the changes that have been made.
- [**refactor**](.cursor/commands/refactor.md) - Refactor the code to make it easier for AI agents to navigate in the future.

> **ℹ️ Tip: When starting a new task, you can queue these up to keep the agent working on the current task until all tasks are complete.** For example:

```txt
/start
/continue
/continue
/continue
/continue
/continue
/review
/refactor
/review
/document
```

If you want to add more commands, you can add them to the .cursor/commands folder, just start the file with `#` and the name of the command.

## 🚀 Getting Started

1. Fork this repository
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and configure your environment variables
4. Set up your database:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to see your app.

## 📁 Project Structure

- `src/routes/` - SvelteKit pages and API routes
- `src/lib/`
  - `components/` - Svelte UI components
  - `api/` - tRPC routers
  - `trpc/` - Browser and server tRPC clients
- `src/stories/` - Storybook files
- `prisma/` - Database schema

## 🚀 Deployment

This template is optimized for deployment on [Vercel](https://vercel.com) with `@sveltejs/adapter-vercel`.

### Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your database connection strings from Supabase:
   - Project Settings → Database
   - Copy both the URI (for `DATABASE_URL`) and Direct Connection (for `DIRECT_URL`)

### Vercel Setup

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Configure the following environment variables:
   - `DATABASE_URL` - Your Supabase database URL
   - `DIRECT_URL` - Your Supabase direct connection URL
   - `AUTH_SECRET` - Generate with `openssl rand -base64 32`
   - `AUTH_URL` - Your production URL (e.g., https://your-app.vercel.app)
   - Add any other variables from `.env.example` that you're using
5. Deploy!

### Post-Deployment

1. Run database migrations in the Vercel deployment:

```bash
npx vercel env pull .env.production.local  # Pull production env vars
npx prisma migrate deploy                  # Deploy migrations to production
```

2. Set up your custom domain in Vercel (optional):
   - Go to your project settings
   - Navigate to Domains
   - Add your domain and follow the DNS configuration instructions

## 📝 License

MIT License
