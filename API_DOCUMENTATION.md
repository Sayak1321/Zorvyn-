# Finance Dashboard API Documentation

Welcome to the API Documentation for the Finance Dashboard Backend. 

## Base URL
All endpoints branch off the base URL. For local environments, this is:
`http://localhost:3000`

## Authentication & Authorization
This API uses stateless **JSON Web Tokens (JWT)**.
To access protected endpoints, you must obtain a token via the `/api/auth/login` endpoint and pass it in the Headers of your HTTP requests as follows:
```http
Authorization: Bearer <YOUR_ACTIVE_TOKEN>
```

### Roles
The system strictly enforces Endpoint access via Role-Based Access Control:
- `VIEWER`: Can view records.
- `ANALYST`: Can view records + view aggregated dashboard data.
- `ADMIN`: Complete CRUD control over records and other users.

---

## 1. Authentication APIs

### Register a User
Creates a new account. By default, all newly registered accounts are given the `VIEWER` role for security.

*   **Endpoint:** `POST /api/auth/register`
*   **Access:** Public
*   **Body (JSON):**
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword" // Minimum 6 characters
    }
    ```
*   **Success Response (201):** Returns the serialized user object.

### Login
Receives login credentials and returns a JWT token.

*   **Endpoint:** `POST /api/auth/login`
*   **Access:** Public
*   **Body (JSON):**
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
*   **Success Response (200):** 
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIs...",
      "role": "VIEWER"
    }
    ```

---

## 2. Records APIs

### Get All Records
Retrieves a list of all financial records globally across the dashboard.

*   **Endpoint:** `GET /api/records`
*   **Access:** `VIEWER`, `ANALYST`, `ADMIN`
*   **Query Parameters (Optional):**
    *   `startDate` (ISO DateTime string)
    *   `endDate` (ISO DateTime string)
    *   `type` ("INCOME" | "EXPENSE")
    *   `category` (String)

### Create a Record
Creates a new financial entry in the database.

*   **Endpoint:** `POST /api/records`
*   **Access:** `ADMIN` strictly
*   **Body (JSON):**
    ```json
    {
      "amount": 299.99,            // Positive value
      "type": "EXPENSE",           // "INCOME" or "EXPENSE"
      "category": "Software",      
      "date": "2026-04-10T00:00:00Z", // Required ISO string
      "description": "Monthly AWS Bill" // Optional
    }
    ```

### Update a Record
Updates specific fields of an existing financial record.

*   **Endpoint:** `PUT /api/records/:id`
*   **Access:** `ADMIN` strictly
*   **Path Variable:** `id` (The UUID of the record)
*   **Body (JSON):** Any combination of `amount`, `type`, `category`, `date`, or `description`.

### Delete a Record
Removes a specific financial record permanently.

*   **Endpoint:** `DELETE /api/records/:id`
*   **Access:** `ADMIN` strictly
*   **Path Variable:** `id` (The UUID of the record)

---

## 3. Dashboard APIs

### Get Aggregated Summary
Calculates aggregate totals across records. Highly optimized for analytics gathering.

*   **Endpoint:** `GET /api/dashboard/summary`
*   **Access:** `ANALYST`, `ADMIN`
*   **Query Parameters (Optional):**
    *   `startDate` & `endDate` to restrict the aggregation window.
*   **Success Response (200):**
    ```json
    {
      "totalIncome": 15000.5,
      "totalExpense": 2500,
      "netBalance": 12500.5,
      "categoryTotals": {
        "Salary": 15000.5,
        "Groceries": 2500
      }
    }
    ```

---

## 4. User APIs (Administration)

### Get All Users
Retrieves the list of all registered users and their current statuses.

*   **Endpoint:** `GET /api/users`
*   **Access:** `ADMIN` strictly

### Update User Role
Allows an Admin to elevate or demote another user's privileges.

*   **Endpoint:** `PUT /api/users/:id/role`
*   **Access:** `ADMIN` strictly
*   **Body (JSON):**
    ```json
    {
      "role": "ANALYST" // Must be "VIEWER", "ANALYST", or "ADMIN"
    }
    ```

### Update User Status
Allows an Admin to functionally ban or unban an account without deleting them. Inactive users cannot log in.

*   **Endpoint:** `PUT /api/users/:id/status`
*   **Access:** `ADMIN` strictly
*   **Body (JSON):**
    ```json
    {
      "status": "INACTIVE" // Must be "ACTIVE" or "INACTIVE"
    }
    ```
