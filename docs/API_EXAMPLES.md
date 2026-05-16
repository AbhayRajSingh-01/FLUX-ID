# Flux ID — API Testing Examples

Base URL: `http://localhost:5000/api`

## Register — `POST /auth/register`

**Request body:**

```json
{
  "name": "Alex Morgan",
  "email": "alex@flux.id",
  "password": "secret123"
}
```

**Success (201):**

```json
{
  "success": true,
  "message": "Registration successful.",
  "data": {
    "user": {
      "id": "674a1b2c3d4e5f6789012345",
      "name": "Alex Morgan",
      "email": "alex@flux.id",
      "createdAt": "2026-05-16T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error (400) — duplicate email:**

```json
{
  "success": false,
  "message": "Email already registered."
}
```

---

## Login — `POST /auth/login`

**Request body:**

```json
{
  "email": "alex@flux.id",
  "password": "secret123"
}
```

**Success (200):**

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": { "id": "...", "name": "Alex Morgan", "email": "alex@flux.id", "createdAt": "..." },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error (401):**

```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

---

## Profile — `GET /auth/profile`

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Success (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "674a1b2c3d4e5f6789012345",
      "name": "Alex Morgan",
      "email": "alex@flux.id",
      "createdAt": "2026-05-16T10:00:00.000Z"
    }
  }
}
```

**Error (401):**

```json
{
  "success": false,
  "message": "Not authorized. Please log in."
}
```

---

## Postman / Thunder Client

1. Create environment variable `baseUrl` = `http://localhost:5000/api`
2. Register or login → copy `data.token` from response
3. Set collection auth: Bearer Token = `{{token}}`
4. Call `GET {{baseUrl}}/auth/profile`
