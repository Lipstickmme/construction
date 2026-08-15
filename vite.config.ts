import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

/**
 * The Vercel Supabase integration injects its connection details under
 * unprefixed names (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) and Next.js-flavoured
 * ones. Vite only exposes `VITE_`-prefixed variables to the browser, so
 * without this the same two values would have to be copied into a second pair
 * of variables by hand — two more things to get wrong and to keep in step.
 *
 * Instead: take whichever name is present and define the `VITE_` pair from it.
 * Naming order is explicit-first, so a `VITE_` value you set yourself always
 * beats the injected one.
 */
function pick(env: Record<string, string | undefined>, names: string[]): string {
  for (const name of names) {
    const value = env[name]
    if (value) return value
  }
  return ''
}

export default defineConfig(({ mode }) => {
  // `loadEnv` with an empty prefix reads every key from `.env*`; process.env
  // carries what the host injected at build time.
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }

  const supabaseUrl = pick(env, [
    'VITE_SUPABASE_URL',
    'SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
  ])

  const supabaseAnonKey = pick(env, [
    'VITE_SUPABASE_ANON_KEY',
    'SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_PUBLISHABLE_KEY',
    'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  ])

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(supabaseAnonKey),
    },
  }
})
