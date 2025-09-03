# 🚆🕗RailTime

A web application for browsing and managing train schedules: public route search and a simple admin panel for CRUD operations.

---

## Table of Contents

- [Links](#links)
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Quick Start (Local)](#quick-start-local)
- [How to Use](#how-to-use)
- [API (Overview)](#api-overview)

---

## Links

- **Production:** https://rail-time.vercel.app/
- **Local:** http://localhost:3000

---

## Overview

- Public section for searching and viewing schedules.
- User authentication (registration/login).
- Admin panel (`/admin`) with route protection.
- REST API for trains and schedules.

---

## Features

- 🔎 **Schedule search**: filters by day of week, train number, departure & arrival.
- 🔐 **Authentication**: credentials provider with JWT sessions.
- 🛠️ **Admin**: create, update, delete trains.
- 🧪 **Validation**: server-side DTO validation.
- 🚦 **API status codes**: proper HTTP codes and error messages.

---

## Tech Stack

### Frontend

- **Next.js 15**
- **TypeScript / React 18**
- Component-based UI using MUI library.

### Backend

- **Next.js Route Handlers** (`app/api/**`)
- **Prisma ORM + PostgreSQL**
- **NextAuth** (Credentials, JWT sessions)
- Server-side schema validation.

---

## Project Structure

```
app/
  (routes, pages, and API: /api/**, /login, /register, /admin, /schedule)
prisma/
  schema.prisma
  migrations/
src/
  components/         # UI components
  server/
    services/         # business logic (trains, schedule)
    validation/       # validation schemas
  generated/
    prisma/           # generated Prisma Client (created during build)
```

---

## Environment Variables

Create `.env.local` in the project root:

```
# PostgreSQL connection
DATABASE_URL="<postgreSQL connection string>"

# NextAuth
NEXTAUTH_SECRET="<generate_a_random_32+_char_string>"
NEXTAUTH_URL="http://localhost:3000"
```

> `NEXTAUTH_SECRET` is required for signing/encrypting JWTs.

---

## Quick Start (Local)

### Prerequisites

- Node.js **v20+** (recommended)
- PostgreSQL **14+**
- npm / pnpm / yarn

### Steps

```bash
git clone <repo-url>
cd railtime
npm i                 # or pnpm i / yarn

# configure .env.local (see above)

npx prisma migrate dev
npx prisma generate

npm run dev
# open http://localhost:3000
```

---

## How to Use

1. **Public mode:** go to `/schedule`, set search parameters — view the list of trains.
2. **Register/Login:** use `/register` and `/login`.
3. **Admin panel:** after authentication, open `/admin` to manage trains (create/update/delete).

---

## API (Overview)

> Base prefix: `/api`

### Trains

- `GET /api/trains?q=<search>` — list trains (with optional filter).
- `POST /api/trains` — create a train.
- `GET /api/trains/:id` — get a train by id.
- `PATCH /api/trains/:id` — update a train.
- `DELETE /api/trains/:id` — delete a train.

### Schedule

- `GET /api/schedule?day=MON&train=123` — search schedule.

> Responses return proper HTTP status codes and error messages (e.g., 400 validation, 409 conflict, 500 internal error).
