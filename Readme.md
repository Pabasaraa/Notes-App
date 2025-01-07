# Project README

This project is a full-stack application consisting of a backend powered by Node.js and Express, and a frontend built with React and Vite. This README will guide you through the steps to set up and run both parts of the application.

## Table of Contents

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Backend Setup](#backend-setup-nodejs-express)
  - [Frontend Setup](#frontend-setup-vite-react)
- [Running the Application](#running-the-application)
- [Screenshots](#screenshots)

## Installation

### Prerequisites

Make sure you have the following tools installed:

- Node.js (version 14.x or above)
- npm or yarn (for managing packages)

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
```

### Backend Setup (Node.js, Express)

1. Navigate to the backend folder:
   `bash
    cd backend
    `

2. Install the required dependencies:
   `bash
    npm install
    `

3. Configure environment variables: - Create a `.env` file in the backend folder with necessary environment variables (PORT, MONGO_URL).

4. Start the backend server:
   `bash
    npm start
    `
   This will start the Express server, and it will be available at `http://localhost:5000` (or whatever port you have configured in `.env`).

### Frontend Setup (Vite, React)

1. Navigate to the frontend folder:
   `bash
    cd frontend
    `

2. Install the required dependencies:
   `bash
    npm install
    `

3. Start the Vite development server:
   `bash
    npm run dev
    `
   This will start the Vite development server, and it will be available at `http://localhost:3000`.

## Running the Application

After following the setup steps for both the backend and frontend:

1. Start the backend server (`npm start` inside the backend folder).
2. Start the frontend server (`npm run dev` inside the frontend folder).

The application will be available at:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

Make sure the frontend is correctly connected to the backend, and you should be able to interact with the application.

## Screenshots

Here are some screenshots of the application:

### Frontend

### Backend
