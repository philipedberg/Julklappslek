# Railway Deployment Guide

## How to Deploy Julklappslek on Railway

### Prerequisites
- GitHub account with your repository pushed
- Railway account (https://railway.app)

### Deployment Steps

1. **Go to Railway.app**
   - Sign in to your Railway account
   - Click "New Project"

2. **Connect your GitHub Repository**
   - Select "Deploy from GitHub repo"
   - Choose your Julklappslek repository

3. **Configure Port (Automatic)**
   - Railway automatically assigns a `PORT` environment variable
   - The app reads this via `process.env.PORT` in server.ts
   - **Default**: Railway uses port 3000 (but you don't need to configure it)

4. **Set Build Command (if needed)**
   - Build: `yarn build`
   - Start: `yarn start`

5. **Deploy**
   - Railway will automatically deploy once you connect the repo
   - Your app will be available at: `https://<your-project-name>.up.railway.app`

### How Ports Work

- **During Development**: `yarn dev`
  - Backend: `http://localhost:3001`
  - Frontend: `http://localhost:5174`

- **On Railway**:
  - The `PORT` environment variable is automatically set by Railway
  - Backend listens on `$PORT` (usually 3000 or assigned by Railway)
  - Frontend is served from the same origin as the backend
  - Frontend API calls use `/api` (relative URLs)

### Environment Variables

The app automatically handles:
- `PORT`: Set by Railway (defaults to 3001 locally)
- `NODE_ENV`: Set to `production` on Railway

### Build Process on Railway

1. Installs dependencies: `yarn install`
2. Builds the project: `yarn build`
   - Runs TypeScript check: `tsc -b`
   - Builds frontend: `vite build` → creates `dist/` folder
3. Starts the server: `yarn start`
   - Server runs on assigned PORT
   - Serves frontend from `dist/` folder

### Accessing Your Deployment

Your voting page will be live at:
```
https://<your-railway-project-url>/
```

Everyone visiting this URL will see the same real-time vote counts!

### Troubleshooting

**Issue**: "Cannot find module" errors
- Solution: Run `yarn install` locally first, commit `yarn.lock`

**Issue**: API calls failing
- Solution: App uses relative `/api` paths in production
- Make sure frontend is built and served from the same server

**Issue**: Votes not persisting
- Solution: This is expected - votes are stored in memory and reset when the app restarts
- For persistent votes, implement a database (MongoDB, PostgreSQL, etc.)

### Optional: Add a Database

To persist votes across restarts, add:
- **MongoDB Atlas** (free tier available)
- **PostgreSQL** on Railway
- **Supabase**

Update `server.ts` to store votes in the database instead of memory.

---

**Your Railway deployment is now live! 🚀🎄**
