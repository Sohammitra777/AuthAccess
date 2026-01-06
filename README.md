# 📘 authAccess — Full-Stack Authentication & Authorization System

## 🌐 Live Application

- Web App: https://your-project-url-here

## 🔹 Quick Summary (Reviewer Overview)

- Full-stack auth system — **TypeScript monorepo (React + Express + Drizzle + Postgres)**
- **Access + Refresh tokens via secure HTTP-only cookies** (rotation enabled)
- **Atomic transaction-based refresh-token rotation** (delete → insert → commit)
- **Role-based authorization enforced fully in backend** (no frontend trust)
- Tested auth/admin flows with **Vitest + Supertest** — 70/30 critical-path focus
- Deployments: **Vercel (client), Render (API), Neon (Postgres)**
- Feature-based architecture — modular & scalable
- Built for **self-learning and architecture exploration** using production-style design


---

## 📝 Project Description

**authAccess** is a TypeScript monorepo that implements a modern authentication and authorization system inspired by real-world production architectures. The project focuses on understanding secure auth design through **self-learning and architecture exploration**.

It includes secure cookie-based token flows, backend-only authorization control, feature-based modular structure, Drizzle ORM with PostgreSQL, and fully tested backend authentication and admin modules.

---

## 🧩 Tech Stack

### 🖥 Frontend (client — Vercel)
- React 19 + TypeScript  
- TanStack Query  
- React Router  
- Tailwind CSS  
- Framer Motion  
- Axios  
- Vite

### 🗄 Backend (server — Render)
- Node.js + Express 5 + TypeScript  
- Drizzle ORM + PostgreSQL (Neon)  
- Zod validation  
- Argon2 password hashing  
- JSON Web Tokens  
- Access + Refresh tokens via cookies  
- CORS, cookie-parser, dotenv

---

## 🧱 Monorepo & Feature-Based Architecture (first-level only)

---
authAccess/
├─ client/
│  ├─ src/
│  │  ├─ core/        # app config, providers, routing
│  │  ├─ feature/     # feature-based modules
│  │  ├─ shared/      # reusable UI, hooks, utils
│  │  └─ App.tsx
│
├─ server/
│  ├─ src/
│  │  ├─ core/        # server bootstrap, middleware, config
│  │  ├─ modules/     # domain modules (auth, users, admin)
│  │  ├─ shared/      # shared helpers & types
│  │  └─ server.ts

---


> The project follows a **feature-based architectural structure**, where functionality is grouped by feature rather than technical layer — improving modularity, scalability, and maintainability.

---

## ✨ Core Features

- Secure authentication (register, login, logout)
- Access + Refresh tokens via **HTTP-only secure cookies**
  - `SameSite=None; Secure`
  - Tokens are rotated on every refresh or login event
- **Role-Based Authorization (RBAC)**
  - Roles stored in database
- **Backend-only authorization enforcement**
- Protected API routes + validation middleware
- Typed database schema via Drizzle ORM
- Auth & admin modules tested with **Vitest + Supertest**
  - 70/30 testing principle — test what can break core behavior
- Architecture mirrors real-world auth systems for learning & exploration

---

## 🌐 Deployment Model

- Backend → **Render**
- Database → **Neon PostgreSQL**
- Frontend → **Vercel**
- Single API base URL via environment variables

---

## 🛡 Security Practices (Implemented)

- Passwords hashed with **Argon2**
- JWT secrets stored in environment variables
- Secure cookies (`SameSite=None; Secure`)
- HTTPS-aligned deployment behavior
- Sensitive values not committed to repo
- Request validation with **Zod**
- **Refresh-token rotation lifecycle**

> The system uses production-style security practices and is built for **self-learning and architecture exploration**.

---

## 🧠 Why Cookies Instead of localStorage?

- `localStorage` tokens are readable by frontend JavaScript → XSS-prone  
- HTTP-only cookies **cannot be accessed from client code**
- Supports security flags:
  - `SameSite=None`
  - `Secure`
- Works cleanly with **access + refresh token rotation**

> **Cookies reduce attack surface and prevent token exposure to the frontend.**

📌 **Note:**  
A previous localStorage-based implementation exists on branch **`legacy-jwt`** — kept only for comparison and learning.

---

## 🔐 Backend-Only Authorization Model

- No authorization logic is performed or trusted on the frontend 
- All access checks run **only on the server**
- Roles validated at API level
- Frontend acts only as a consumer of protected resources

> The backend is the **single source of truth** for authentication & authorization.

---

## 🔄 Atomic Refresh Token Rotation

The refresh-token lifecycle is implemented using **atomic database transactions**.

During login or refresh, a single transactional operation:

- deletes the previous refresh token  
- inserts a new one  
- commits as one atomic unit

This prevents:

- race conditions during parallel requests  
- token reuse after rotation  
- inconsistent session states  

Pattern used:

> **delete → insert → commit → issue new token**

---

## 🗄 Database Model

- `users`
- `refresh_token`

Managed via drizzle-kit migrations.

---

## 🧰 Developer Tooling

- TypeScript end-to-end  
- ESLint + Prettier + Tailwind plugin  
- Drizzle Kit migrations  
- Vitest + Supertest (critical-path testing)  
- Nodemon / tsx developer workflow  
- **psql — terminal-based PostgreSQL inspection**

---

## 📅 Roadmap

- Session-based authentication  
- OAuth providers (Google, GitHub, etc.)  
- Permission-based authorization layer (role-compatible)  
- Architecture & flow diagrams  
  - *(Auth + refresh lifecycle diagram already exists on project webpage)*

---

## 🎯 Project Intent

Designed for:

- Self-learning  
- Architecture exploration  
- High-level technical interview demonstration  

Shows how a modern authentication stack can be structured using **practical, production-style design principles**.