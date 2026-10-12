# AGENTS.md - Samrajya Darbar & Mantri AI

## Project Purpose
Darbar is the Next.js frontend UI and Mantri AI engine for Project Samrajya, an automated paper-trading and smart-money analytics system.

## Technical Stack
* Framework: Next.js (App Router)
* Language: TypeScript (Strict mode)
* Styling: Tailwind CSS
* Charts: TradingView Lightweight Charts (`lightweight-charts`)
* AI Orchestration: Vercel AI SDK (`ai`, `@ai-sdk/openai`)
* Database/Vector: MongoDB Atlas & Pinecone

## Architecture Rules
1. **Server-First Architecture:** Keep React Server Components (RSC) as the default. Use Client Components (`'use client'`) only when interactive state, WebSocket event listeners, or browser APIs are explicitly required.
2. **No Component Caching:** Do not use `'use cache'` or static caching components. Darbar is a real-time financial trading dashboard; data must remain dynamic to reflect live market states and portfolio balances.
3. **Mantri AI Placement:** All AI endpoints must be built as Next.js Route Handlers inside `app/api/` to execute as serverless functions on Vercel without persistent backend consumption.
4. **Security Boundaries:** Never expose private Fyers access tokens, MongoDB credentials, or OpenAI keys to the client bundle. All credentials remain restricted to server-side code and environment variables.

## Development Commands
* Install: `npm install`
* Start Dev Server: `npm run dev`
* Type Check: `npx tsc --noEmit`
* Production Build: `npm run build`