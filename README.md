# My API

This API provides user authentication and user-related functionalities.

## Getting Started

To get started with this API, follow these steps:

### Prerequisites

- Node.js installed
- MongoDB Atlas account

### Installation

1. Clone the repository.
2. Install dependencies by running:

````
npm install
````

3. Set up environment variables:
- Create a `.env` file based on the `.env.example` provided.
- Fill in the necessary values for variables like `DB_USER`, `DB_PASS`, and `SECRET`.

### Running the API

To run the API, execute the following command:

````
npm start
````


The API will start running on `http://localhost:3000`.

## Endpoints

### GET /

- Description: Welcome message
- Public Access: Yes
- Endpoint: `/`

### POST /auth/register

- Description: Register a new user
- Public Access: Yes
- Endpoint: `/auth/register`
- Request Body: JSON with `name`, `email`, `password`, `confirmpassword`, and `phone`

### POST /auth/login

- Description: Log in existing user
- Public Access: Yes
- Endpoint: `/auth/login`
- Request Body: JSON with `email` and `password`

### GET /user/:id

- Description: Get user details by ID
- Public Access: No
- Endpoint: `/user/:id`
- Request Headers: `Authorization` with JWT token

## Models

### User

- Fields:
  - `name`: String
  - `email`: String
  - `password`: String
  - `phone`: Object containing `number` and `ddd`
  - `date_creation`: String
  - `date_update`: String
  - `last_login`: String

## Authentication

This API uses JSON Web Tokens (JWT) for authentication. To access protected routes, include the JWT token in the `Authorization` header.

## Database

This API uses MongoDB for data storage. Ensure you have the MongoDB connection string set in the environment variables.
