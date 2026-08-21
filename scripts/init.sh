#!/usr/bin/env bash
# Initializes local env for this SvelteKit starter. Does not scaffold a new app.

set -e

echo "🚀 Starting setup..."

if [ ! -f .env ]; then
  cp .env.example .env
  echo "📝 Created .env from .env.example — fill in your secrets."
fi

echo "📦 Installing dependencies..."
npm install

echo "🗄 Generating Prisma client..."
npx prisma generate

echo "⚠️ Set DATABASE_URL and AUTH_SECRET in .env, then run:"
echo "   npx prisma migrate dev"
echo "   npm run dev"
echo "✅ Setup complete."
