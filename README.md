# Hono + TanStack Start

A full-stack TypeScript setup demonstrating end-to-end type safety with Hono backend and TanStack Start frontend.

## The Stack

Hono backend with Zod validation and OpenAPI docs. TanStack Start frontend with React Query. They connect through `src/routes/api/$.ts` which proxies requests to the Hono server.

Types flow from Hono routes → exported `App` type → client → React Query.

## Why Hono

- **Portable**: Deploy standalone or swap frontends easily
- **Rich ecosystem**: Mature middleware, authentication, validation
- **Better DX**: OpenAPI docs, type inference, simpler patterns
- **Performance**: Faster cold starts, smaller bundle size

## Getting Started

```bash
pnpm install
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Run production build
```

Visit `/api/doc` for Swagger UI. Check `src/routes/index.tsx` for type-safe client usage.

**Key Files:**
- `server/index.ts` - Hono routes with Zod schemas
- `src/routes/api/$.ts` - TanStack → Hono proxy
- `src/routes/index.tsx` - Type-safe client example

Deploys as a single unit. Frontend gets backend types at compile time. 🔥

