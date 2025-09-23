---
title: Frontend Stack
---

# Frontend Stack

Contonest’s frontend is built on **SolidJS**, avoiding unnecessary React complexities to ensure **small bundle sizes** and fast performance. The entire project is written in **TypeScript** for type safety and maintainability.

## Core Framework

- **SolidJS** – Reactive UI library providing fine-grained reactivity without virtual DOM overhead.
- **@tanstack/solid-virtual** – Virtualized lists for efficiently rendering long contest or submission lists.
- **@solidjs/router** – Handles page navigation inside the Mini App.

## Telegram & TON Integration

- **@telegram-apps/sdk-solid** – Full access to Telegram Mini Apps APIs and events.
- **@tonconnect/sdk** & **@tonconnect/ui** – Handle TON payments and entry fees directly in the app.

## Text Editing & Media Handling

- **pell** – Lightweight bare rich-text editor.
- **tippy.js** – Tooltips for UI hints and editor action buttons.
- **dompurify** – Sanitizes user-generated content.
- **snarkdown** – Converts Markdown input to HTML.
- **cropperjs** – Image cropping for contest images or avatars.

## Animations & Effects

- **js-confetti** – Celebration effects.
- **gsap** – Advanced animations where needed.
- **pako** + **custom WASM ThorVG build** – Render **Lottie/TGS animations** by inflating gzip-compressed TGS files to JSON.
- **Web Workers** – Used to render Lottie animations and contest themes (backdrops + symbols) without blocking the UI.

## Utilities

- **swiper** – Sliders and tabbed interfaces.
- **dayjs** – Lightweight date and time formatting.
- **uuid** – Generate unique IDs for contests, submissions, and participants.
- **sortablejs** & **solid-sortablejs** – Drag-and-drop functionality.
- **solid-icons** – Collection of UI icons.
- **solid-toast** – Toast messages and notifications.
- **plausible-tracker** – Custom server-based analytics for user interactions.

## Styling & Tooling

- **SCSS** + **autoprefixer** – Flexible styling and responsive layouts.
- **Biome** – Linting and formatting across the project.
- **Vite** – Fast bundler and development server.

## Internationalization

- **@solid-primitives/i18n** – Multilingual support using standard i18n practices.

---

This stack ensures Contonest’s frontend is **fast, compact, and Telegram-native**, while supporting **rich content, animations, and secure payments**.
