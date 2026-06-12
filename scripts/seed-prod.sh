#!/usr/bin/env bash
# ================================================================
# Script de seed pour la base de données de production
# Usage : DATABASE_URL="..." bash scripts/seed-prod.sh
# ================================================================
set -e

if [ -z "$DATABASE_URL" ]; then
  echo "❌  DATABASE_URL est requis."
  exit 1
fi

echo "🌱  Lancement du seed..."
pnpm --filter @workspace/api-server run seed
echo "✅  Seed terminé."
