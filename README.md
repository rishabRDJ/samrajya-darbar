# Samrajya: Darbar (UI & Mantri AI Engine)

## Overview
Darbar serves two roles in the Samrajya architecture. 
1. **Frontend UI:** A real-time dashboard visualizing portfolio metrics, active order blocks, and trade history.
2. **Mantri AI Engine:** Embedded Serverless API Routes utilizing the Vercel AI SDK. Mantri listens to trade logs via Redis, stores long-term memory analysis in MongoDB, and executes RAG document retrieval without consuming persistent backend compute.

## Tech Stack
* Framework: Next.js (React), TypeScript, Tailwind CSS
* AI Orchestration: Vercel AI SDK
* Vector Database: Pinecone

## Core Responsibilities
1. Consume REST APIs from Dwarpal (Auth) and Diwan (Trading state).
2. Execute Mantri Serverless functions to process JSON trade logs into human-readable rationale.
3. Query Pinecone for financial document RAG embeddings.

## Environment Variables Required
\`\`\`env
NEXT_PUBLIC_DWARPAL_URL="http://localhost:3001"
NEXT_PUBLIC_DIWAN_URL="http://localhost:3002"
OPENAI_API_KEY="sk-your-llm-api-key"
PINECONE_API_KEY="your-pinecone-api-key"
MONGO_URI="mongodb+srv://user:pass@cluster.mongodb.net/mantri_memory"
REDIS_URL="rediss://default:pass@upstash-url:port"
\`\`\`

## Run Locally
\`\`\`bash
npm install
npm run dev
\`\`\`
