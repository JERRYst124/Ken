# Supabase setup

1. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_PUBLISHABLE_KEY` to the project's publishable key (or legacy anon key). Never use a `service_role` key in the browser.
2. Run `migrations/20261116100000_initial_progress.sql` in the Supabase SQL Editor.
3. In Authentication, enable Email and keep email confirmation disabled so new users can sign in immediately. Allow the local callback URLs used by Vite (for example `http://localhost:5173/account` and `http://localhost:5174/account`); add the production callback URL after the domain is selected.
4. Restart the Vite server after changing `.env.local`.

Sign-up stores the user's full name and date of birth in Supabase Auth user metadata. Progress is scoped to the signed-in user and protected by row-level security. Local progress is reused only when its owner marker matches the signed-in user; guest or other-user progress is not imported into a new account. Signing out clears the local progress cache; the Supabase copy remains available at the next sign-in.
