
---

# Travel Atelier
Travel Atelier is a modern, full-stack web application designed to provide users with a seamless experience for browsing and booking international travel destinations. The project features a dynamic Vue.js frontend, a secure Node.js/Express backend, and a suite of professional features including user authentication, live messaging, and interactive UI animations.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Setup and Installation](#project-setup-and-installation)
- [Running the Application](#running-the-application)
- [Website Functionality](#website-functionality)
  - [User Authentication](#user-authentication)
  - [Page Breakdown](#page-breakdown)
- [Backend API Endpoints](#backend-api-endpoints)

## Features

-   **Dynamic Homepage:** An engaging hero section with a functional search bar that redirects and filters results.
-   **Interactive Destination Browser:** A beautifully animated page that loads travel destinations from the backend API, complete with live search.
-   **Full User Authentication:** Secure system for user registration, login, and logout using JSON Web Tokens (JWT).
-   **Protected Routes:** Key pages like `Customer List` and `Customer Messages` are only accessible to authenticated users.
-   **Backend-Connected Forms:** The registration, contact, and booking forms are all fully connected to the backend server.
-   **Live Messaging System:** Messages submitted through the contact form are immediately available for viewing on the (protected) `Customer Messages` page.
-   **Embedded Google Maps:** An interactive map on the contact page shows the business location.
-   **Professional UI/UX:** Enhanced with smooth page transitions, interactive hover effects, and animated focus states for a polished user experience.

## Tech Stack

-   **Frontend:**
    -   [Vue.js 3](https://vuejs.org/) (with Composition API and `<script setup>`)
    -   [Vue Router](https://router.vuejs.org/) for client-side routing.
    -   [Vite](https://vitejs.dev/) as the frontend build tool.
-   **Backend:**
    -   [Node.js](https://nodejs.org/) as the runtime environment.
    -   [Express.js](https://expressjs.com/) for building the REST API.
    -   [JSON Web Token (JWT)](https://jwt.io/) for secure authentication.
-   **Development:**
    -   [Concurrently](https://github.com/open-cli-tools/concurrently) to run both frontend and backend servers with a single command.
    -   [Nodemon](https://nodemon.io/) for live-reloading the backend server during development.

## Project Setup and Installation

To run this project on a local machine, you will need [Node.js](https://nodejs.org/) (v16 or higher) and npm installed.

1.  **Clone the repository:**
    ```bash
    git clone https://your-repository-url.git
    cd your-project-folder
    ```

2.  **Install Frontend Dependencies:**
    Open a terminal in the project's **root directory** and run:
    ```bash
    npm install
    ```

3.  **Install Backend Dependencies:**
    Navigate into the `backend` folder and install its dependencies:
    ```bash
    cd backend
    npm install
    cd ..
    ```

## Running the Application

From the **root directory** of the project, run the following single command:

```bash
npm run dev
```

This command uses `concurrently` to perform two actions simultaneously:
-   Starts the Vue.js frontend development server (typically on `http://localhost:5173`).
-   Starts the Node.js backend server with Nodemon (on `http://localhost:3000`).

Once both servers are running, open your web browser and navigate to the frontend URL provided in the terminal (e.g., `http://localhost:5173`).

## Website Functionality

### User Authentication

The website features a complete authentication system.
-   **Registration:** Users can create a new account. Upon successful registration, they are automatically logged in.
-   **Login:** Users can log in with their credentials. A default user is available for testing:
    -   **Email:** `user@example.com`
    -   **Password:** `password`
-   **Session Persistence:** Login state is maintained across page refreshes and browser sessions using a JWT stored in local storage.
-   **Protected Routes:** Certain routes are protected by a navigation guard. If a logged-out user attempts to access them, they will be redirected to the login page.

### Page Breakdown

-   **/ (Home):** The main landing page with a functional search bar.
-   **/bookings:** Displays all available travel destinations, fetched from the backend. Features live search filtering and interactive card animations.
-   **/about:** A static page with information about Travel Atelier.
-   **/contact:** A page with a contact form that sends messages to the backend and an embedded Google Map.
-   **/bookhere:** A form for booking a trip. This form is protected and requires the user to be logged in.
-   **/login:** The user login page.
-   **/register:** The user registration page.
-   **/customer-list (Protected):** Displays a list of all registered users.
-   **/customer-messages (Protected):** Displays messages submitted through the contact form in real-time.

## Backend API Endpoints

The backend server runs on `http://localhost:3000` and provides the following REST API endpoints.

| Method | Endpoint                    | Description                                         | Protected |
| :----- | :-------------------------- | :-------------------------------------------------- | :-------- |
| `POST` | `/api/register`             | Creates a new user account and returns a JWT.       | No        |
| `POST` | `/api/login`                | Authenticates a user and returns a JWT.             | No        |
| `POST` | `/api/contact-messages`     | Submits a new message from the contact form.        | No        |
| `GET`  | `/api/messages`             | Retrieves a list of all submitted contact messages. | No        |
| `POST` | `/api/bookings`             | Creates a new booking for the authenticated user.   | **Yes**   |

---