# react-vite-starter

Default starter for [Stackblaze Builder](https://github.com/stackblaze/stack-templates/tree/main/services/stackblaze-builder) workspaces. A minimal **React + Vite + TypeScript** app with Supabase pre-wired.

When you create a Builder workspace, Kubero clones this repo into `/home/coder/project`. The workspace template injects Supabase credentials so you can start building immediately.

## Environment variables

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase API URL (in-cluster Kong gateway in Builder workspaces) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous JWT key |

These are set automatically in the `stackblaze-builder` Kubero template. For local development outside Builder, copy them into a `.env` file:

```env
VITE_SUPABASE_URL=http://localhost:8000
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Quick start

```bash
pnpm install
pnpm dev
```

Open the URL Vite prints (default port `5173`). In a Builder workspace, run `pnpm dev` from the integrated terminal in code-server.

## Supabase demo

The sample todo list expects a `todos` table. After your workspace Supabase add-on is ready, open Supabase Studio and run `supabase/schema.sql` once.

## Build

```bash
pnpm build
pnpm preview
```

## Docs

- [Stackblaze Builder template](https://github.com/stackblaze/stack-templates/tree/main/services/stackblaze-builder)
- [Builder design doc](https://github.com/stackblaze/stackblaze/blob/main/docs/builder/DETAILED-DESIGN.md) (in the main Stackblaze monorepo)
- [Supabase JS client](https://supabase.com/docs/reference/javascript/introduction)

## Publish this repo

This starter lives at `https://github.com/stackblaze/react-vite-starter`.

If you are setting it up for the first time:

```bash
git init
git add .
git commit -m "Initial Stackblaze Builder React + Vite starter"
gh repo create stackblaze/react-vite-starter --public --source=. --remote=origin --push
```
