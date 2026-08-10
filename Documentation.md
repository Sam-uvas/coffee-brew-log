# Coffee Brew Log

A tiny full-stack app for logging coffee brews at a micro-roastery: create,
view, filter, edit, and delete brew entries.

Built for the XPL Full-Stack Developer Bootcamp assessment.

## Project description

The app has two parts, kept in separate folders:

- **`backend/`** — a JSON API built with **Express**, using **Sequelize**
  (an ORM) backed by a **SQLite** database. Exposes CRUD endpoints under
  `/api/brews`.
- **`frontend/`** — a **React** app (built with Vite) styled with
  **Tailwind CSS**. Talks to the backend over the JSON API.

Each brew entry has: beans, brew method, coffee grams, water grams, a
rating out of 5, and tasting notes.

### Why Sequelize instead of Prisma

The original plan was to use Prisma, but Prisma's CLI needs to download a
platform-specific query-engine binary from `binaries.prisma.sh` the first
time you run it, and that domain was blocked in the sandbox this was built
in — so it couldn't actually be tested there. Sequelize + `sqlite3` needed
nothing beyond the npm registry, so it was used instead and tested
end-to-end (every CRUD endpoint, validation path, and status code was
exercised with real requests before this was handed over). Sequelize still
satisfies the "ORM backed by a SQL database" requirement.

## Tech stack

- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express
- ORM / DB: Sequelize + SQLite
- Both apps read config from environment variables (see `.env.example` in
  each folder)

## Project structure

```
coffee-brew-log/
├── backend/
│   ├── src/
│   │   ├── db/sequelize.js       # Sequelize connection
│   │   ├── models/Brew.js        # Brew model/schema
│   │   ├── routes/brews.js       # /api/brews CRUD routes
│   │   ├── routes/validateBrew.js# request validation middleware
│   │   ├── seed.js               # sample data seeder
│   │   └── index.js              # Express app entry point
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/brews.js          # fetch wrapper for the API
│   │   ├── components/           # BrewCard, MethodFilter, BrewFormModal, RatingBadge
│   │   ├── brewMethods.js        # shared list of brew methods
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
├── Documentation.md
└── deployment.md
```

## Setup instructions

### Prerequisites

- Node.js 18+ and npm

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run seed     # optional: adds 3 sample brews
npm run dev       # starts the API on http://localhost:4000
```

The first time the server starts it creates `backend/dev.db` (a SQLite
file) and the `brews` table automatically — no separate migration step
needed for local dev.

### 2. Frontend

In a second terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev       # starts the app on http://localhost:5173
```

Open `http://localhost:5173` in your browser. Make sure the backend is
running first, or the list will show a fetch error.

### Environment variables

**`backend/.env`**

| Variable       | Description                                  | Example                  |
|----------------|-----------------------------------------------|---------------------------|
| `DATABASE_URL` | SQLite file path                              | `file:./dev.db`           |
| `PORT`         | Port the API listens on                       | `4000`                    |
| `CORS_ORIGIN`  | Origin allowed to call the API                | `http://localhost:5173`   |

**`frontend/.env`**

| Variable       | Description                                  | Example                       |
|----------------|-----------------------------------------------|---------------------------------|
| `VITE_API_URL` | Base URL of the backend API                   | `http://localhost:4000/api`    |

No secrets are hardcoded anywhere in the source — everything environment-
specific is read from these variables.

## API reference

Base path: `/api/brews`

| Method | Path          | Description                          | Success | Errors             |
|--------|---------------|---------------------------------------|---------|---------------------|
| GET    | `/`           | List all brews (newest first)        | 200     | 500                 |
| GET    | `/?method=X`  | List brews filtered by method        | 200     | 500                 |
| GET    | `/:id`        | Get a single brew                    | 200     | 400, 404, 500       |
| POST   | `/`           | Create a brew                        | 201     | 400 (validation), 500 |
| PUT    | `/:id`        | Update a brew                        | 200     | 400, 404, 500       |
| DELETE | `/:id`        | Delete a brew                        | 204     | 400, 404, 500       |

A brew object looks like:

```json
{
  "id": 1,
  "beans": "Zimbabwean highlands",
  "method": "Aeropress",
  "coffeeGrams": 15,
  "waterGrams": 200,
  "rating": 3,
  "tastingNotes": "Heavy body, soft finish, nutty",
  "createdAt": "2026-08-10T12:29:16.363Z",
  "updatedAt": "2026-08-10T12:29:16.363Z"
}
```

`POST` and `PUT` require every field (`beans`, `method`, `coffeeGrams`,
`waterGrams`, `rating`, `tastingNotes`) to be present and non-blank;
`coffeeGrams`/`waterGrams` must be positive numbers and `rating` must be
between 0 and 5. Missing or invalid fields return `400` with a message
describing what's wrong.

## Frontend features

- **List view** — shows all brews with a color-coded rating badge (red
  for low, orange for mid, green for high), matching the wireframe.
- **Filter by method** — dropdown filters the list via the API's
  `?method=` query param.
- **Add a brew** — modal form; Save is disabled until every field is
  filled in.
- **Edit a brew** — same modal, pre-filled, with a Delete button.
- **Page title** — the document title is set to `Brews: {count}` and
  updates whenever the brew count changes.
- Responsive layout — works at both mobile and desktop widths.

## Testing it locally

With both servers running:

1. Visit `http://localhost:5173` — you should see the 3 seeded brews (or
   an empty state if you skipped seeding).
2. Click **Add**, try submitting with a field blank — Save stays
   disabled.
3. Fill in all fields and Save — the new brew appears in the list.
4. Use the method filter dropdown to narrow the list.
5. Click the edit icon on a brew, change a value, Save — the list
   updates.
6. Open a brew for edit and click Delete — it disappears from the list.
