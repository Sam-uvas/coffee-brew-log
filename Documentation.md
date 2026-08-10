# Coffee Brew Log

A modern full-stack web application for recording and managing coffee brew recipes at a micro-roastery. Users can create, view, filter, edit, and delete brew entries through a clean, responsive interface.

This project was developed for the **XPL Full-Stack Developer Bootcamp Assessment**.

---

# Live Demo

**Frontend:**  
https://coffee-brew-log-1-4s2f.onrender.com

**Backend API:**  
https://coffee-brew-log-eb81.onrender.com

---

# Features

- Create new brew entries
- View all recorded brews
- Filter brews by brewing method
- Edit existing brew entries
- Delete brew entries
- Responsive user interface
- Client-side form validation
- Server-side validation
- RESTful JSON API
- Automatic database initialization using Sequelize

---

# Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS

## Backend

- Node.js
- Express

## Database

- SQLite
- Sequelize ORM

---

# Project Structure

```text
coffee-brew-log/
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   └── sequelize.js
│   │   ├── models/
│   │   │   └── Brew.js
│   │   ├── routes/
│   │   │   ├── brews.js
│   │   │   └── validateBrew.js
│   │   ├── seed.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── brews.js
│   │   ├── components/
│   │   ├── brewMethods.js
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
│
├── Documentation.md
└── deployment.md
```

---

# Project Overview

The application consists of two independent services:

## Backend

The backend is built using **Express** and **Sequelize**, exposing a RESTful JSON API under:

```
/api/brews
```

It performs:

- CRUD operations
- Input validation
- Database communication
- Error handling

SQLite is used as the relational database, while Sequelize provides object-relational mapping between JavaScript models and SQL tables.

The database schema is created automatically when the application starts using:

```javascript
sequelize.sync();
```

---

## Frontend

The frontend is a React application created with Vite and styled using Tailwind CSS.

It communicates with the backend through the REST API and provides:

- Brew list
- Brew filtering
- Add/Edit modal
- Delete confirmation
- Responsive layout
- Dynamic page title

---

# Brew Data Model

Each brew contains:

| Field | Description |
|--------|-------------|
| Beans | Coffee bean name |
| Method | Brewing method |
| Coffee Grams | Amount of coffee used |
| Water Grams | Amount of water used |
| Rating | Rating between 0 and 5 |
| Tasting Notes | User tasting notes |

---

# Local Setup

## Prerequisites

- Node.js 18 or later
- npm

---

## Backend

```bash
cd backend

cp .env.example .env

npm install

npm run seed

npm run dev
```

The backend runs on:

```
http://localhost:4000
```

The first launch automatically creates:

- SQLite database (`dev.db`)
- Brew table

No manual migrations are required.

---

## Frontend

Open a second terminal.

```bash
cd frontend

cp .env.example .env

npm install

npm run dev
```

The frontend runs on:

```
http://localhost:5173
```

Ensure the backend is running before opening the application.

---

# Environment Variables

## Backend

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | SQLite database path | file:./dev.db |
| PORT | API port | 4000 |
| CORS_ORIGIN | Allowed frontend origin | http://localhost:5173 |

---

## Frontend

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:4000/api |

All configuration values are loaded from environment variables.

No secrets are hardcoded into the source code.

---

# API Endpoints

Base URL:

```
/api/brews
```

| Method | Endpoint | Description | Success |
|---------|----------|-------------|---------|
| GET | / | Retrieve all brews | 200 |
| GET | /?method=V60 | Filter by brew method | 200 |
| GET | /:id | Retrieve a single brew | 200 |
| POST | / | Create a brew | 201 |
| PUT | /:id | Update a brew | 200 |
| DELETE | /:id | Delete a brew | 204 |

---

# Validation

The backend validates every request before saving data.

Required fields:

- Beans
- Method
- Coffee Grams
- Water Grams
- Rating
- Tasting Notes

Validation rules:

- No blank fields
- Coffee grams must be greater than 0
- Water grams must be greater than 0
- Rating must be between 0 and 5

Invalid requests return HTTP **400 Bad Request**.

---

# Frontend Functionality

The application provides:

- Responsive card layout
- Brew filtering
- Modal-based create and edit forms
- Client-side validation
- Delete confirmation
- Dynamic browser title:

```
Brews: {brewCount}
```

The interface automatically refreshes after every successful create, update, or delete operation.

---

# Local Testing

With both applications running:

1. Open:

```
http://localhost:5173
```

2. Verify the brew list loads.

3. Create a new brew.

4. Edit an existing brew.

5. Delete a brew.

6. Filter brews by brewing method.

7. Refresh the page to confirm data persists.

---

# Deployment

The application is deployed on **Render**.

Frontend:

https://coffee-brew-log-1-4s2f.onrender.com

Backend:

https://coffee-brew-log-eb81.onrender.com

---

# License

This project was developed as part of the **XPL Full-Stack Developer Bootcamp Assessment**.
