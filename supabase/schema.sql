-- Demo schema for the Stackblaze Builder React + Vite starter.
-- Run once in Supabase Studio (SQL editor) inside your workspace.

create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.todos enable row level security;

create policy "Allow anon demo access"
  on public.todos
  for all
  to anon, authenticated
  using (true)
  with check (true);
