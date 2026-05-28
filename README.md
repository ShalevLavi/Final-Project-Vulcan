# Vulcan Motors
A Full-stack web application for a high-end made up car manufacturer founded in 2019
Features a public pages with company and vehicle information, and a private owner portal with personal car details and AI support chat.

## Live Sites
- **Front-end:** [https://vulcan-motors.vercel.app](https://vulcan-motors.vercel.app)
- **Back-end:** [https://final-project-vulcan.onrender.com](https://final-project-vulcan.onrender.com)

## Features

### Public Site
- Landing page with company information, highlights and navigation.
- Collection page with off-road and luxury cars full details.
- About page with Vulcan's story.

### Owner Portal
- Secure login with full name (case-insensitive) and last 4 VIN characters.
- Personal dashboard showing vehicle details and picture.
- Maintenance history with completed, upcoming and pending services.
- Service request system — choose a service type and schedule it.
- Real-time AI support chat powered by Groq.

## Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS + CSS Modules
- Zustand (global state management)
- React Router
- Socket.IO Client

### Backend
- Node.js + Express + TypeScript
- MongoDB Atlas + Mongoose
- JWT Authentication
- Socket.IO (real-time communication)
- Groq AI — Llama 3 model (support chat)
- Helmet.js + Rate Limiting (security)

### Testing
- Jest + Supertest (backend — 28 tests)
- Vitest + React Testing Library (frontend — 13 tests)

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

## Running Locally

### Requirements
- Node.js 18+
- A MongoDB Atlas account
- A Groq API key (free at console.groq.com)

### Backend
```bash
cd Server
npm install       # installs all dependencies from package.json
npm run seed      # populates the database with test data
npm run dev       # starts the server on port 5000
```

Create a `.env` file in the `Server/` folder:
``` bash
PORT = 5000
MONGODB_URI = your_mongodb_connection_string
JWT_SECRET = your_secret_key
GROQ_API_KEY = your_groq_key
FRONTEND_URL = http://localhost:5173
NODE_ENV = development
```

### Frontend
```bash
cd CLient
npm install       # installs all dependencies from package.json
npm run dev       # starts the site on port 5173
```

Create a `.env` file in the `CLient/` folder:
VITE_BACKEND_URL=http://localhost:5000

### Running Tests
```bash
# Backend
cd Server
npm test

# Frontend
cd CLient
npm test
```

## Developer
Built by Shalev Lavi - Vulcan Motors - Final Project