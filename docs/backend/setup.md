---
title: Backend Setup
---

# Backend Setup Guide

This guide explains how to set up the Contonest backend for **local development** or **production**.

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
BOT_TOKEN=
BOT_USERNAME=
BOT_ADMIN_ID=
BOT_API_SERVER=

POOL_SIZE_REDIS=
POOL_SIZE_MYSQL=

MYSQL_USER=
MYSQL_NAME=
MYSQL_PASS=
MYSQL_HOST=
MYSQL_PORT=

REDIS_HOST=
REDIS_PORT=

API_HOST=
API_PORT=
API_AUTH_TTL=
API_JWT_SECRET=
WEBHOOK_SECRET=
API_VERSION=

MINIAPP_URL=
MINIAPP_SLUG=

MASTER_WALLET=
COVER_ARCHIVE_CHAT_ID=
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

- Install MySQL and Redis.
- Import `database.sql` into MySQL:

```bash
mysql -u MYSQL_USER -p MYSQL_NAME < database.sql
```

- Ensure MySQL and Redis are running.

---

## Docker Deployment (Optional)

Docker is supported but **not recommended** due to complexity.
Ensure **persistent volumes** for images and MySQL:

```yaml
services:
   backend:
      build: .
      container_name: contonest-backend
      restart: unless-stopped
      ports:
         - "3000:3000"
      env_file:
         - ".env.docker"
      depends_on:
         - db
         - redis
      volumes:
         - ./storage/images:/app/storage/images

   db:
      image: mysql:8.0
      container_name: contonest-mysql
      restart: unless-stopped
      environment:
         MYSQL_ROOT_PASSWORD: ${MYSQL_PASS}
         MYSQL_DATABASE: ${MYSQL_NAME}
         MYSQL_USER: ${MYSQL_USER}
         MYSQL_PASSWORD: ${MYSQL_PASS}
      volumes:
         - mysql_data:/var/lib/mysql
         - ./database.sql:/docker-entrypoint-initdb.d/init.sql:ro

   redis:
      image: redis:7-alpine
      container_name: contonest-redis
      restart: unless-stopped
      volumes:
         - redis_data:/data
      command: ["redis-server", "--appendonly", "yes"]

volumes:
   mysql_data:
   redis_data:
```

- Build and run:

```bash
docker compose up --build
```

> Make sure `storage/images` and MySQL volumes are persistent to avoid data loss.

---

This setup ensures the backend runs **securely**, handles **payments**, manages **images and storage**, and integrates fully with the Mini App and Telegram bot.
