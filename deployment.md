# Deployment

## Live Application

**Frontend:**  
https://coffee-brew-log-1-4s2f.onrender.com

**Backend API:**  
https://coffee-brew-log-eb81.onrender.com

---

## Hosting Platform

This project is deployed on Render using two services:

- **Frontend:** Render Static Site
- **Backend:** Render Web Service

---

## Backend Deployment

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

### Environment Variables

- `DATABASE_URL=file:./dev.db`
- `CORS_ORIGIN=https://coffee-brew-log-1-4s2f.onrender.com`

> Render automatically provides the `PORT` environment variable.

---

## Frontend Deployment

- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

### Environment Variables

- `VITE_API_URL=https://coffee-brew-log-eb81.onrender.com/api`

---

## Notes

- The backend uses SQLite with Sequelize.
- The database schema is automatically created on startup using `sequelize.sync()`.
- SQLite storage on Render's free tier is ephemeral, making it suitable for demonstration purposes.
