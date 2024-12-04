# Lost Treasure

## Description

This project is the backend for the application designed using modern JavaScript/TypeScript technologies. It implements a **hexagonal architecture** and focuses on **user management**, **treasure handling**, and **authentication services**. The application provides various APIs for user and treasure management, including operations like registering users, adding rewards, and managing treasures.

## Features

- **User Management**:
  - Register new users.
  - Login and logout functionality.
  - Add rewards to users.
  - Retrieve users and their rewards.
- **Treasure Management**:
  - Create and manage treasures.
  - Retrieve all treasures.
- **Authentication**:
  - JWT-based login and registration for authentication.
- **Hexagonal Architecture**:
  - The application is structured around the hexagonal architecture pattern, with ports and adapters separating the core logic from external services like databases and third-party APIs.

## Technologies

- **Backend**:
  - Node.js
  - Express.js
  - TypeScript
  - Jest (for testing)
- **Architecture**:
  - Hexagonal Architecture
- **APIs**:
  - RESTful APIs for user and treasure management
- **Database**:
  - Custom repository pattern (using firebase store).

## Installation

To set up the project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org) (version 14 or higher)
- [Yarn](https://yarnpkg.com/) (optional, but recommended for package management)

### Setup

```bash
git clone https://github.com/Ahidine/Lost-treasure-game-backend
cd Lost-treasure-game-backend
yarn
yarn start
```

## API Documentation

- **User API**:

  - POST /users/register
    - Register a new user.
    - Request Body: { name, email, password }
    - Response: User data and a JWT token.
  - POST /users/login
    - Login a user and return a JWT token.
    - Request Body: { email, password }
    - Response: User data and a JWT token.
  - GET /users
    - all users.
    - Response: List of users.
  - GET /users/:id
    - Retrieve a user by ID.
    - Response: User data.
  - POST /users/:id/rewards
    - Add a reward to a user.
    - Request Body: Reward data.
    - Response: Updated user data.
  - GET /users/:id/rewards
    - Get all rewards for a user.
    - Response: List of rewards.

- **Treasure API**:

- POST /treasures

  - Add a new treasure.
  - Request Body: Treasure data (name, position, hint, etc.)
  - Response: Treasure creation status.

- GET /treasures
  - Retrieve all treasures.
  - Response: List of treasures.
