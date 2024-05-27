Implementation Brief for Rentify
Project Overview
Rentify is a web application to facilitate renting, allowing users to register as buyers or sellers, post and view rental properties, and manage interactions securely.

Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)

Backend Implementation

server.js: Sets up the Express.js server, connects to MongoDB, defines routes, and serves static frontend files.
Models:
user.model.js: Defines User schema with fields and methods for password hashing and authentication.
property.model.js: Defines Property schema with details and user reference.
Routes:
auth.routes.js: Handles user registration and login, issuing JWT tokens.
property.routes.js: Manages property posting, viewing, and deletion, using authentication middleware.
Middleware:
auth.middleware.js: Verifies JWT tokens for protected routes.

Frontend Implementation

index.html: Main HTML structure with navigation links for different actions.
styles.css: Provides styling with a gradient background, form design, and property cards.
app.js: Handles dynamic content rendering, form submissions, interactions with backend API, and manages JWT tokens in localStorage.

Key Functionalities

User Registration and Login: Users can register as buyers or sellers and log in to receive JWT tokens.
Property Management: Sellers can post, view, and delete properties. Buyers can view listed properties.
Security: Authentication with JWT ensures that only authorized users can access protected routes.

How to Run the Application

1) Start MongoDB: Ensure MongoDB is running locally.
2) Setup Environment Variables: Create a .env file with MongoDB URI and JWT secret.
3) Install Dependencies: Navigate to backend and run npm install.
4)Start the Server: Run node server.js from the backend directory.
5) Open the Frontend: Open index.html from the frontend directory in a web browser.
