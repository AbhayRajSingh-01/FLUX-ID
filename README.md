# Flux ID — Full-Stack Authentication System

A production-ready authentication system with a premium futuristic UI (glassmorphism, neon glow, Framer Motion) and a secure Node.js + MongoDB backend.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React, Vite, Tailwind CSS, Framer Motion, Axios, React Router |
| Backend | Node.js, Express, Mongoose, JWT, bcrypt |
| Database | MongoDB |

## Project Structure

```
flux-id/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/authController.js
│   │   ├── middleware/auth.js, errorHandler.js
│   │   ├── models/User.js
│   │   ├── routes/auth.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/AuthContext.jsx
│   │   ├── pages/
│   │   └── utils/
│   ├── .env.example
│   └── package.json
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [MongoDB](https://www.mongodb.com/) running locally or [MongoDB Atlas](https://www.mongodb.com/atlas)

## Step-by-Step Setup

### 1. Clone / open project

```bash
cd flux-id
```

### 2. Backend setup

```bash
cd backend
npm install
```

Copy environment file and edit values:

```bash
copy .env.example .env
```

On macOS/Linux:

```bash
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/flux-id
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Start the API:

```bash
npm run dev
```

Server runs at **http://localhost:5000**

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
copy .env.example .env
```

Edit `frontend/.env` (optional — defaults work with proxy):

```env
VITE_API_URL=http://localhost:5000/api
```

Start the app:

```bash
npm run dev
```

App runs at **http://localhost:5173**

## Run Commands Summary

| Command | Location | Description |
|---------|----------|-------------|
| `npm install` | `backend/` | Install API dependencies |
| `npm run dev` | `backend/` | Start API with watch mode |
| `npm start` | `backend/` | Start API (production) |
| `npm install` | `frontend/` | Install UI dependencies |
| `npm run dev` | `frontend/` | Start Vite dev server |
| `npm run build` | `frontend/` | Production build |

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | No | Health check |
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Sign in |
| GET | `/api/auth/profile` | Bearer JWT | Get current user |

## Sample API Testing

### Health check

```bash
curl http://localhost:5000/api/health
```

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Alex Morgan\",\"email\":\"alex@flux.id\",\"password\":\"secret123\"}"
```

macOS/Linux:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alex@flux.id","password":"secret123"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"alex@flux.id\",\"password\":\"secret123\"}"
```

Save the `token` from the response.

### Profile (protected)

```bash
curl http://localhost:5000/api/auth/profile ^
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### PowerShell example

```powershell
$body = @{ name = "Alex Morgan"; email = "alex@flux.id"; password = "secret123" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
```

## Frontend Features

- Glassmorphism login & register pages
- Email/password validation
- Show/hide password toggle
- Remember Me (localStorage vs sessionStorage)
- JWT stored securely per remember preference
- Protected dashboard route
- Logout with toast notifications
- Animated particles, floating blobs, Framer Motion transitions

## Security Notes

- Passwords hashed with bcrypt (12 salt rounds)
- JWT stored in sessionStorage by default; localStorage only when "Remember Me" is checked
- Password field excluded from queries by default (`select: false`)
- CORS restricted to `CLIENT_URL`
- Use a strong `JWT_SECRET` in production

## Optional Enhancements (not implemented)

- Google OAuth
- Email verification
- Forgot password with OTP
- Rate limiting
- Refresh tokens

## License

MIT — use freely for portfolio and learning projects.
