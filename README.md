Product API – Week 2 Assignment
A simple Node.js + Express REST API for managing products. This project implements CRUD operations, middleware validation, authentication, and query filtering, as required in the assignment.
Features
• In-memory product database (no external DB required)
• CRUD Operations: Create, Read, Update, Delete products
• Middleware Implementations: Authentication (auth.js), Request validation (validateProduct.js)
• Query and filter support: search, category filter, pagination
• Product statistics endpoint (/api/products/stats)
• Environment variables for configuration
Folder Structure

project/
│
├── server.js                  # Main entry point
│
├── routes/
│   └── productRoutes.js       # Handles all product routes
│
├── middleware/
│   ├── auth.js                # API key authentication middleware
│   └── validateProduct.js     # Validates product POST/PUT body
│
├── .env                       # Environment variables (not committed)
├── .env.example               # Example of environment variables
├── package.json
└── README.md

Installation & Setup
• Clone the repository: git clone <your_repo_url> && cd express-js-server-side-framework-Nattydread777
• Install dependencies: npm install
• Create .env file based on .env.example (PORT=3000, API_KEY=test-key)
• Start the server: npm start (Server runs on http://localhost:5000)
Authentication
Protected routes (POST, PUT, DELETE) require a valid API key in the request header.

Header:
  x-api-key: test-key

Example:
curl -X POST http://localhost:3000/api/products \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: test-key' \
  -d '{"name":"Monitor","description":"24 inch","price":200,"category":"electronics"}'
API Documentation
Base URL: http://localhost:3000/api/products

GET / – Fetch all products with optional filters (category, q, page, limit)
GET /search?q=term – Search products by name
GET /stats – View total and count by category
GET /:id – Retrieve a specific product by ID
POST / – Add a new product (Protected with x-api-key)
PUT /:id – Update product details (Protected)
DELETE /:id – Remove a product (Protected)
Middleware Summary
auth.js – Protects routes using API key verification
validateProduct.js – Validates and sanitizes incoming product data
Example Environment File (.env.example)
PORT=3000
API_KEY=test-key
Tools & Dependencies
• express – Web server
• uuid – Generates unique product IDs
• dotenv – Loads environment variables
• body-parser – Parses JSON requests
Notes
No database required; data is stored in memory.
Static routes (/search, /stats) must appear before parameter routes (/:id).
Update the .env file to change PORT or API_KEY.
Use Postman or cURL for testing endpoints.
Author
Nathaniel Usikpedo
Week 2 Node.js API Assignment Submission
Course: Backend Development – PLP / MongoDB Week 2
Date: October 2025
