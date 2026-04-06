# Financial Dashboard Backend

## Overview
This is a robust and modular RESTful backend service built for a **Finance Dashboard System**. Designed to be a secure data layer, it allows varying levels of users to manage, record, and summarize financial transactions. Focused heavily on architecture and access control, the system ensures that Viewers, Analysts, and Admins can interact correctly with data based purely on their assigned permissions.

## Features & Requirements Addressed

1. **User and Role Management**:
   - Supports creating active users and safely storing hashed passwords (bcrypt).
   - Manages user status (`ACTIVE` vs `INACTIVE`). Inactive accounts are blocked from logging in.
   - Role-based interaction context: `ADMIN`, `ANALYST`, and `VIEWER`.
2. **Financial Records Management**:
   - Manages financial records accurately including Amount, Category, Node, and Type (Income/Expense).
   - Strong schema validation for inputs via Zod preventing unhandled edge cases or payload errors.
   - Comprehensive query filtering mechanisms via `startDate`, `endDate`, `type`, and `category`.
3. **Dashboard Summary APIs**:
   - Consolidates real-time totals for income, expenses, and net balance.
   - Computes complex analytics like category-wise breakdowns.
   - Exposes recent activities alongside monthly/weekly transactional trends.
4. **Access Control (Authorization)**:
   - Secure endpoints guarded by efficient authentication schemas relying on JWT configurations.
   - `VIEWER` roles are strictly limited to viewing aggregated Dashboard endpoints.
   - `ANALYST` roles can additionally read complete lists of financial records.
   - `ADMIN` roles possess unlimited privileges, including user provisioning and complete transaction management.
5. **Validation and Error Handling**:
   - Unauthenticated access appropriately triggers a `401 Unauthorized` block.
   - Attempting access to unauthorized paths throws a `403 Forbidden` error.
   - Payload issues correctly generate structured `400 Bad Request` messages via Zod validators.
6. **Data Persistence Context**:
   - Fully implemented utilizing **PostgreSQL** running on Neon Serverless.
   - Structured and type-safe database queries natively handled by **Drizzle ORM**.

## Tech Stack
- **Typescript & Node.js**
- **Express.js** (Routing & Middlewares)
- **Drizzle ORM** (Database Query/Schema definition)
- **Neon PostgreSQL** (Relational Database)
- **Zod** (Data validation declaration)
- **JSON Web Token** (Authentication / Session Management)
- **Bcrypt** (Cryptographic Password Hashing)

## Local Development Setup

### 1. Requirements
Ensure you have `Node.js` installed alongside `pnpm` (npm and yarn are also acceptable).

### 2. Environment Configuration
Create a `.env` file in the root directory and specify the following necessary configurations:
```env
PORT=4000
CORS_ORIGIN=*
DB_URL=postgresql://user:password@host/db_name?sslmode=require
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Database Setup
Execute Drizzle's push command to automatically scaffold your tables in Postgres:
```bash
pnpm run db:push

### 5. Running the Application
**Development Mode:**
```bash
pnpm run dev
```

**Production Build:**
```bash
pnpm run build
pnpm run start
```

## Endpoints Map
### API Documentation
- `GET /docs` - Swagger UI

### Authentication & Users (`/api/user`)
- `POST /login` - Public authentication gate.
- `GET /` - List all system users (**Admin Only**)
- `POST /` - Register new user (**Admin Only**)
- `PUT /role` - Update any user's system role (**Admin Only**)
- `PUT /status` - Update an active user's status (`ACTIVE` vs `INACTIVE`) (**Admin Only**)
- `DELETE /:id` - Terminate an existing user profile (**Admin Only**)

### Finances (`/api/records`)
- `GET /` - Retrieve granular records with filters (**Analyst, Admin**)
- `GET /:id` - Retrieve singular explicit record (**Analyst, Admin**)
- `POST /` - Insert a new categorical record (**Admin Only**)
- `PUT /:id` - Update existing record details (**Admin Only**)
- `DELETE /:id` - Exunge a given record (**Admin Only**)

### Dashboard (`/api/dashboard`)
- `GET /` - Fetch Dashboard metrics and aggregates (**Viewer, Analyst, Admin**)

## Thought Process & Architectural Context
- **Separation of Concerns:** Implemented a strict modular layer comprising `Routes` -> `Controller` -> `Service` -> `Model` (Database SQL). This makes testing specific methods effortless and maintains a vastly clean scope preventing god-files. 
- **Zod and ORM Synergy:** Integrating Zod with Drizzle allowed the system to establish an 'End-to-End Type Safety' mechanism from incoming HTTP payloads all the way to postgres queries, significantly eliminating typecasting pitfalls.
- **Fail-Fast Integrity Checks:** Enforcing JWT evaluation alongside required permission matrices inside middleware chains before business logic is accessed greatly optimizes requests by immediately invalidating illicit accesses without straining the CPU or database instance.
