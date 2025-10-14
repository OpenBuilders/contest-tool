---
title: Frontend Setup
---

# Frontend Setup Guide

This guide explains how to set up the Contests Tool frontend for **development**, **production builds**, and **deployment**.

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_PROJECT_NAME=
VITE_BACKEND_BASE_URL=
VITE_APP_BASE_URL=
VITE_PLAUSIBLE_API=
VITE_PLAUSIBLE_DOMAIN=
VITE_BOT_USERNAME=
VITE_MINIAPP_SLUG=
```

> ⚠️ Replace each value with your own configuration.

## Local Development

1. **Install dependencies** using Bun:

```bash
bun install
```

2. **Start the development server**:

```bash
bun run dev
```

This will start a Vite server, accessible via the host network.

## Production Build

To build the frontend for production:

```bash
bun run build
```

The output will be in the `dist/` folder, ready to serve with any static file server.

## Deployment Options

### 1. GitHub Pages or Pages.dev

- Simply push your `dist/` folder to a GitHub repository configured for **Pages** deployment.
- The frontend is fully static and works with any standard static hosting solution.

### 2. Docker Deployment

We provide a Dockerfile that installs dependencies, builds the project, and serves it via **Nginx** on port `80` inside the container.

**Build the Docker image:**

```bash
docker build -t contests-tool-frontend .
```

**Run the container:**

```bash
docker run -p 80:80 contests-tool-frontend
```

The frontend will be accessible at `http://localhost` (or your server IP).

## Notes

- Ensure all **environment variables** are set before building or running.
- Bun is used as a lightweight alternative to Node.js and npm/yarn.
- The project uses **Vite** as the bundler for fast builds and hot-reload development.
- For Docker, any changes require rebuilding the image.
