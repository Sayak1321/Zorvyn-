Finance Dashboard Backend

Architecture & Technology Stack
The backend will be built with Node.js, Express, and TypeScript for robust typing and maintainability.

Database: SQLite via Prisma ORM (ensuring relational modeling, data consistency, and simplified migrations).
Validation: Zod for schema-based input validation.
Authentication & Roles: JSON Web Tokens (JWT) for simple and secure stateless authentication and transmitting user roles.
Architecture: Strict 3-tier Layered Architecture:
Routes: To declare the endpoints.
Controllers: To unpack HTTP requests, hand them to the service layer, and format the response. No business logic.
Services: To handle the core business and validation logic.
Repositories: To exclusively interface with Prisma/SQLite for all database queries.
Error Handling: A centralized global error-handling middleware that catches exceptions and outputs structured error formats.


Database Schema (Relational Modeling)

User
 id (UUID, Primary Key)
 email (String, Unique)
 passwordHash (String)
 role (Enum: VIEWER, ANALYST, ADMIN)
 status (Enum: ACTIVE, INACTIVE)
 createdAt, updatedAt
 
FinancialRecord
 id (UUID, Primary Key)
 amount (Decimal or Float)
 type (Enum: INCOME, EXPENSE)
 category (String)
 date (DateTime)
 description (String, Optional)
 createdAt, updatedAt
 
API Endpoints & Role Responsibilities
All protected endpoints will use an authMiddleware to verify the JWT and a roleMiddleware to enforce role permissions.

Authentication APIs (Public)

POST /api/auth/register (Registers a new user - default Viewer)
POST /api/auth/login (Returns JWT token)
User APIs
GET /api/users (Admin)
PUT /api/users/:id/role (Admin)
PUT /api/users/:id/status (Admin)

Record APIs

GET /api/records (Viewer, Analyst, Admin) - Supports filtering by date range, type, category.
GET /api/records/:id (Viewer, Analyst, Admin)
POST /api/records (Admin)
PUT /api/records/:id (Admin)
DELETE /api/records/:id (Admin)

Dashboard APIs
GET /api/dashboard/summary (Analyst, Admin) - Returns total income, total expense, net balance, and aggregated totals by category over a provided date range.

Structure
├── prisma
│   └── schema.prisma
├── src
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── repositories
│   ├── routes
│   ├── services
│   ├── types
│   ├── utils
│   └── index.ts
├── tsconfig.json
└── package.json

Verification
 Registering and logging into different roles.
 Verifying that Viewers are correctly rejected from creating records or calling dashboard APIs.
 Verifying validation correctly rejects partial or malformed requests.
 Ensuring error responses are consistent and don't leak stack traces.
