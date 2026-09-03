# NestJS LMS API

A learning management system API built with NestJS, TypeScript, MongoDB, and Mongoose. The API supports user registration and login, JWT authentication, role-based course creation, and course management.

## Features

- User registration with bcrypt password hashing
- JWT-based login and protected profile access
- Role-based authorization for course creation
- Course create, read, update, and delete endpoints
- DTO validation with NestJS `ValidationPipe`

## Requirements

- Node.js 20 or later
- pnpm
- MongoDB running locally or a MongoDB connection string

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create a `.env` file in the project root:

   ```env
   DATABASE_URL=mongodb://127.0.0.1:27017/nest-js-lms
   JWT_SECRET=replace-with-a-long-random-secret
   PORT=3000
   ```

   `DATABASE_URL` is required. `PORT` defaults to `3000` when it is not set.

3. Start the API:

   ```bash
   pnpm start:dev
   ```

The API is available at `http://localhost:3000`.

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm start` | Start the application |
| `pnpm start:dev` | Start in watch mode |
| `pnpm start:prod` | Run the compiled application |
| `pnpm build` | Compile the project |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run end-to-end tests |
| `pnpm test:cov` | Run tests with coverage |
| `pnpm lint` | Lint and automatically fix files |

## API Endpoints

### Authentication

#### Register

`POST /auth/register`

```json
{
  "fname": "Ada",
  "lname": "Lovelace",
  "email": "ada@example.com",
  "password": "strong-password",
  "role": "Student"
}
```

Returns an access token. Supported roles are `Student`, `Teacher`, and `Admin`. New users default to `Student` when no role is provided.

#### Login

`POST /auth/login`

```json
{
  "email": "ada@example.com",
  "password": "strong-password"
}
```

Use the returned token in protected requests:

```http
Authorization: Bearer <access-token>
```

#### Profile

`GET /auth/profile` requires a valid bearer token.

### Courses

`GET /courses` and `GET /courses/:id` are public read endpoints.

`POST /courses` requires a valid bearer token and the `Admin` role:

```json
{
  "name": "Introduction to TypeScript",
  "des": "Learn the fundamentals of TypeScript.",
  "lavel": "Beginner",
  "price": 49.99
}
```

`PATCH /courses/:id` updates a course, and `DELETE /courses/:id` removes one. Course update and delete authorization currently follows the controller implementation.

## Project Structure

```text
src/
  auth/       Registration, login, JWT, and role guards
  course/     Course controller, service, DTOs, and entity
  user/       User service, schema, and role types
  main.ts     Application bootstrap and request validation
```

## Testing

Run the test suite with:

```bash
pnpm test
```

The end-to-end tests require the application dependencies and a working test environment.

## License

This project is private and is not currently published under an open-source license.
