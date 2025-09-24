---
title: Backend Stack
---

# Backend Stack

Contonest’s backend is a **single TypeScript codebase** that powers both the Telegram bot and the Mini App API. It’s built using **Bun** for fast execution, with a focus on lightweight, maintainable, and highly performant architecture.

## Core Framework & Language

- **TypeScript** – Full type safety for both API and bot logic.
- **Bun** – Node alternative for package management, execution, and fast bundling.
- **Elysia** – Minimalist web framework to handle API requests and webhooks.

## Telegram & Bot Integration

- **nyx-bot-client** – Custom Telegram bot library developed exclusively for Contonest.
- Supports both **Local Bot API server** and **official api.telegram.org**, with local file (`file://`) handling for better compatibility.
- Uses `WEBHOOK_SECRET` to secure webhooks at `/bot-webhook`.

## Database & Caching

- **PostgreSQL** – Stores contests, users, settings, and submissions.
- **Kysely** – Type-safe SQL query builder for PostgreSQL.
- **Redis** – Caching and broadcast channels, with connection pooling via **generic-pool**.
- **Database SQL file** – `database.sql` provides all required table structures for setup.

## Payments

- **@ton/core** and **@ton/ton** – Handle TON entry fee payments.
- **env `MASTER_WALLET`** – Receives contest entry fee commissions.

## Image & Media Processing

- **Canvas** – Generate contest images with **themes, backdrops, and symbols**.
- **Sharp** – Normalize user-uploaded images.
- **Storage** – User images stored in `storage/images` (persistent if using Docker).
- **env `COVER_ARCHIVE_CHAT_ID`** – Telegram chat where generated images are sent to retrieve `file_id` for reuse.

## Security & Validation

- **dompurify** + **jsdom** – Sanitizes HTML inputs from users.
- **fast-jwt** + **fast-sha256** – JWT-based authentication after initial Telegram `initData` verification.
- **zod** – Validates request schemas and ensures data integrity.

## Search & Utilities

- **fuse.js** – Fuzzy search for contests and submissions.
- **generic-pool** – Manages PostgreSQL and Redis connection pools.

---

This stack ensures Contonest’s backend is **secure, efficient, and fully integrated with Telegram**, supporting payments, dynamic content generation, and smooth Mini App operation.
