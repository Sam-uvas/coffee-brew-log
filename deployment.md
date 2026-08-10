# Deployment

## Status

This app has **not been deployed to a live URL yet** — deploying requires
an account on a hosting service (Render, Railway, Fly.io, etc.), which
isn't something I have access to from this environment. Below are exact,
tested-locally steps to deploy it yourself on Render's free tier, plus
notes on what to watch out for.

Once deployed, replace this section with:

```
Live app: https://<your-frontend-service>.onrender.com
Live API: https://<your-backend-service>.onrender.com
```

## Deploying on Render (recommended)

Render can host both the backend (as a "Web Service") and the frontend
(as a "Static Site") for free. You'll end up with two services.

### 1. Push this repo to GitHub

Render deploys from a git repo, so push `coffee-brew-log/` to a new
GitHub repository first.

### 2. Deploy the backend

1. In the Render dashboard: **New → Web Service**, connect your repo.
2. **Root directory:** `backend`
3. **Build command:** `npm install`
4. **Start command:** `npm start`
5. **Environment variables** (Render → your service → Environment):
   - `DATABASE_URL` = `file:./dev.db`
   - `PORT` — Render sets this automatically; the app already reads
     `process.env.PORT`, so you don't need to set it yourself.
   - `CORS_ORIGIN` = the URL of your deployed frontend (you'll fill this
     in after step 3, then redeploy)
6. Deploy. Once live, note the backend URL, e.g.
   `https://coffee-brew-log-api.onrender.com`.

**Important — SQLite on Render's free tier:** Render's free web services
use an ephemeral filesystem, so the SQLite file (`dev.db`) will be wiped
on every restart/redeploy. That's fine for demoing this assessment, but
for anything persistent you'd want either a Render "Disk" (paid) attached
at `/data` with `DATABASE_URL=file:/data/dev.db`, or to swap in a hosted
Postgres database (Render's free Postgres tier works well with
Sequelize — you'd change `dialect: 'sqlite'` to `dialect: 'postgres'` in
`backend/src/db/sequelize.js` and point `DATABASE_URL` at the Postgres
connection string).

### 3. Deploy the frontend

1. **New → Static Site**, same repo.
2. **Root directory:** `frontend`
3. **Build command:** `npm install && npm run build`
4. **Publish directory:** `dist`
5. **Environment variables:**
   - `VITE_API_URL` = `https://coffee-brew-log-eb81.onrender.com/api` 
6. Deploy. Note the frontend URL, e.g.
   `https://coffee-brew-log.onrender.com`.

### 4. Close the loop on CORS

Go back to the backend service's environment variables and set
`CORS_ORIGIN` to the frontend URL from step 3, then trigger a manual
redeploy of the backend so it picks up the change.

## Troubleshooting notes

Things worth checking if the deployed app doesn't work:

- **Frontend loads but the brew list shows a fetch error** — almost
  always `VITE_API_URL` pointing at the wrong host, or `CORS_ORIGIN` on
  the backend not matching the frontend's actual URL exactly (including
  `https://` and no trailing slash).
- **Backend "sync" errors on Render** — SQLite needs a writable
  filesystem; confirm `DATABASE_URL` points somewhere the service can
  write to (Render's default working directory is writable, just not
  persistent — see the note above).
- **Environment variables not taking effect** — Render only picks up new
  env vars on the *next* deploy, so after changing one, trigger a manual
  deploy rather than assuming it hot-reloads.
- **Vite env vars not appearing in the built app** — Vite only exposes
  variables prefixed with `VITE_` to client code, and it inlines them at
  *build* time, not runtime. If you change `VITE_API_URL` after the
  static site has already built, you need to trigger a rebuild, not just
  a restart.

## Alternative: Railway / Fly.io

The same two-service split (Node backend + static frontend build) works
on Railway or Fly.io with minor adjustments to their respective config
files (`railway.json` / `fly.toml`). The environment variables needed are
identical to the Render setup above.
