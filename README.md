# Easy Generator

A full-stack web application with authentication built using NestJS and React.

## Project Structure

```
easyGenerator/
├── Backend/     # NestJS API server
└── Frontend/    # React + Vite application
```

## Quick Start

### Prerequisites

- Node.js v20.19.5 (or v18+)
- npm v10.8.2 (or v10+)
- MongoDB database

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd easyGenerator
   ```

2. **Setup Backend**

   ```bash
   cd Backend
   npm install
   ```

   Create a `.env` file in the Backend directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=4000
   EXPIRES_IN=5h
   ```

3. **Setup Frontend**
   ```bash
   cd Frontend
   npm install
   ```

### Running the Application

1. **Start Backend** (from Backend directory)

   ```bash
   npm run start:dev
   ```

   Backend will run on `http://localhost:4000`

   API Documentation (Swagger): `http://localhost:4000/swagger`

2. **Start Frontend** (from Frontend directory)
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## Tech Stack

**Backend:**

- NestJS
- MongoDB + Mongoose
- JWT Authentication
- Swagger/OpenAPI
- Helmet (Security)

**Frontend:**

- React 19
- TypeScript
- Vite
- TailwindCSS
- React Router
- Axios

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Form validation
- Toast notifications
- Responsive UI design
