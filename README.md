🚀 Hackathon Project: Role-Based Auth System with JWT

This project was built during a hackathon and focuses on implementing robust authentication (AuthN) and authorization (AuthZ) using modern web practices.

✅ Key Features

🔐 JWT-based Authentication

Secure login & token generation

Access token embedded with custom payload

👤 Role-Based Authorization

Supports admin, student, and other roles

Middleware protects routes based on role

📬 Postman Tested

All endpoints tested with POSTMAN collections (included)

✅ Token Verification

Tokens are verified on each protected route

Invalid or expired tokens are gracefully handled

📚 Express.js API Structure

Clean separation of concerns: routes, controllers, middleware

Modular codebase for scalability

🔧 Tech Stack

Node.js + Express.js

MongoDB with Mongoose

JWT (jsonwebtoken)

Postman for API testing

🔑 Concepts Covered

Term

Use

Authentication (AuthN)

Verifies identity (e.g., login via email/password)

Authorization (AuthZ)

Grants access based on user role

JWT

Encodes user data + permissions

Payload

Stores role, email, etc., inside the token

POSTMAN

Used for endpoint testing

Token Verification

Middleware to validate every incoming request

📁 Folder Structure

├── controllers/
├── models/
├── routes/
├── middleware/
├── .env
└── index.js

📌 Sample JWT Payload

{
  "id": "64abc1234",
  "role": "admin",
  "email": "admin@domain.com"
}

🛡️ Use Case

Admin-only dashboard access

Student route protection

Prevent unauthorized API use

📦 How to Run

npm install
npm run dev

🎯 Summary

A lightweight, production-ready authentication + role-based authorization system built with scalability, clarity, and hackathon speed in mind.

Built with ❤️ for Hackathon use-cases by Sumit 

