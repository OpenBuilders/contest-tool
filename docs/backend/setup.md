---
title: Backend Setup
---

# Backend Setup Guide

This guide explains how to set up the Contests Tool backend for **local development** or **production**.

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
BOT_TOKEN=
BOT_USERNAME=
BOT_ADMIN_ID=
BOT_API_SERVER=

POOL_SIZE_REDIS=
POOL_SIZE_PGSQL=

PGSQL_NAME=
PGSQL_USER=
PGSQL_PASS=
PGSQL_HOST=
PGSQL_PORT=

REDIS_HOST=
REDIS_PORT=

API_HOST=
API_PORT=
API_AUTH_TTL=
API_JWT_SECRET=
API_VERSION=

MINIAPP_URL=
MINIAPP_SLUG=

MASTER_WALLET=
COVER_ARCHIVE_CHAT_ID=

TELEGRAM_API_ID=
TELEGRAM_API_HASH=

WEBHOOK_SECRET=
WEBHOOK_URL=

TON_CLIENT_ENDPOINT_URL=
TON_CLIENT_API_KEY=
```

> ⚠️ Replace each value with your own configuration.

---

## Local Deployment

1. **Install dependencies**:

```bash
bun install
```

2. **Start the backend**:

```bash
bun run index.ts
```

3. **Set up the Telegram webhook**:

```
https://YOUR_API_HOST/bot-webhook
```

with `secret_token` = `WEBHOOK_SECRET`.

> Recommended: Use a Local Bot API server for full compatibility with file:// URIs, though `api.telegram.org` works as well.

4. **Database setup**:

- Install PostgreSQL and Redis.
- Import `database.sql` into PostgreSQL:

```bash
psql -U POSTGRES_USER -d POSTGRES_DB -f database.sql
```

- Ensure PostgreSQL and Redis are running.

---

## Docker Deployment (Optional)

Docker is supported but **not recommended** due to complexity.
Ensure **persistent volumes** for images and PostgreSQL:

```yaml
services:
   backend:
      build: .
      container_name: contests-tool-backend
      restart: unless-stopped
      env_file:
         - ".env.docker"
      depends_on:
         db:
            condition: service_healthy
         redis:
            condition: service_healthy
      volumes:
         - image-storage:/app/storage/images
         - cover-storage:/app/storage/covers
         - telegram-bot-api-data:/var/lib/telegram-bot-api
      ports:
         - "9092:9092"
      healthcheck:
         test: ["CMD", "curl", "-f", "http://backend:9092/health"]
         interval: 30s
         timeout: 5s
         retries: 3
         start_period: 10s

   db:
      image: postgres:17
      container_name: contests-tool-postgres
      restart: unless-stopped
      environment:
         POSTGRES_USER: ${PGSQL_USER}
         POSTGRES_PASSWORD: ${PGSQL_PASS}
         POSTGRES_DB: ${PGSQL_NAME}
      healthcheck:
         test: ["CMD-SHELL", "pg_isready -U ${PGSQL_USER}"]
         interval: 10s
         timeout: 5s
         retries: 5
      volumes:
         - postgres_data:/var/lib/postgresql/data

   redis:
      image: redis:7-alpine
      container_name: contests-tool-redis
      restart: unless-stopped
      healthcheck:
         test: ["CMD", "redis-cli", "ping"]
         interval: 5s
         timeout: 3s
         retries: 5
      volumes:
         - redis_data:/data
      command: ["redis-server", "--appendonly", "yes"]

   telegram-bot-api:
      image: aiogram/telegram-bot-api:latest
      restart: unless-stopped
      environment:
         TELEGRAM_API_ID: ${TELEGRAM_API_ID}
         TELEGRAM_API_HASH: ${TELEGRAM_API_HASH}
         TELEGRAM_HTTP_PORT: 9091
         TELEGRAM_LOCAL: true
      volumes:
         - image-storage:/app/storage/images
         - cover-storage:/app/storage/covers
         - telegram-bot-api-data:/var/lib/telegram-bot-api
      ports:
         - "9091:9091"

volumes:
   postgres_data:
   redis_data:
   telegram-bot-api-data:
   image-storage:
   cover-storage:
```

- Build and run:

```bash
docker compose up --build
```

> Make sure `storage/images` and PostgreSQL volumes are persistent to avoid data loss.

---

This setup ensures the backend runs **securely**, handles **payments**, manages **images and storage**, and integrates fully with the Mini App and Telegram bot.
