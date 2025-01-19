# APIConnectX
**APIConnectX** is a robust authentication and API management system designed for secure user authentication and public API access. Built with modern security practices, it combines JWT (JSON Web Token) based authentication with API key management, making it perfect for both direct user interactions and automated third-party integrations.
## 📖 Table of Contents

- Features
- How to Use
- Project Structure
- Dependencies
- Installation
- Running the Services
- API Documentation
- Security Features
- Database Schema
- Troubleshooting



## 🚀 Features

### Secure Authentication

- JWT-based user authentication
- API key management for public access
- Password hashing with bcrypt
- Rate limiting protection


### Data Management

- CRUD operations for candidate data
- MongoDB integration
- Input validation and sanitization


### Developer Experience

- Modern React dashboard
- Comprehensive API documentation
- Automated error handling
- CORS configuration
- Detailed logging



## 🎯 How to Use
### 1) For End Users

- Register an account through the web interface
- Log in to access the dashboard
- View and manage your API key
- Add and manage candidates
- Access API documentation

### 2) For Developers

- Clone the repository
- Set up environment variables
- Install dependencies for each service
- Start the services
- Integrate with the public API using your API key

### 3) For API Integration

- Obtain an API key through registration
- Use the API key in request headers
- Access public API endpoints
- Handle rate limits and errors
- Process API responses

## Setup Description
### Main Service
The main service is a core component of the authentication system that handles user authentication, authorization using JWT (JSON Web Tokens), and manages candidate data. It provides secure endpoints for user registration, login, and candidate management.
### Public-API-Service
The Public API Service is a microservice that provides API key-based access to user profiles and candidate data from the main service. It acts as a middleware layer that authenticates requests using API keys and forwards them to the main service.
### Frontend
APIConnectX is a React-based web application that provides a user interface for managing API keys and candidates. The application includes user authentication, candidate management, and API documentation features.

## Dependencies
### Main Service
- **bcryptjs (v2.4.3):** A library for hashing passwords securely 

- **cors (v2.8.5):** Middleware for enabling Cross-Origin Resource Sharing (CORS)

- **dotenv (v16.4.7):** .env variable management

- **express (v4.21.2):** A web framework for building REST APIs and web applications.

- **joi (v17.13.3):** used for data validation, ensuring input adheres to specified rules.

- **jsonwebtoken (v9.0.2):** A library for creating and verifying JSON Web Tokens (JWT)

- **mongoose (v8.9.5):** provides schema-based data modeling and seamless interaction with the MongoDB database.
 - **nodemon (v3.1.9):** automatically restarts the Node.js application 

### Public API Service
- **express (v4.21.2):** Web framework for Node.js
- **axios (v1.7.9):** HTTP client for making requests to the main service
- **cors (v2.8.5):** Cross-Origin Resource Sharing middleware
- **dotenv (v16.4.7):** Environment variables management
- **express-rate-limit (v7.5.0):** Rate limiting middleware
## Prerequisites
* Node.js (v14 or higher)
* MongoDB
* React
* npm or yarn

## 🚀 Installation

Clone the repository

<pre> <code> 
  git clone https://github.com/yourusername/APIConnectX.git  
</code> </pre>

### Set up environment variables
create .env. files seperately for Main-service , Public-api-service and frontend and fill in the environment variables as per the following


 **Main Service (.env)**
 
<pre> <code>  
  MONGODB_URI="your-mongodb-connection-string"
  
  JWT_SECRET="your-jwt-secret" 
  
  export PORT=3000 export FRONTEND_URL="http://localhost:3002"  
</code> </pre>

**Public API Service (.env)**
<pre><code>
  PORT=3001
  
  MAIN_SERVICE_URL=http://localhost:3000
  
  NODE_ENV=development
  
</code></pre>


**Frontend (.env)**
<pre><code>
  VITE_API_URL=http://localhost:3000
  
  VITE_PUBLIC_API_URL=http://localhost:3001

</code></pre>


## Install dependencies and start services
Use the following commands on terminal to start with the project

### Main Service
<pre> <code>
  cd main-service // to navigate to main-service directory
  
  npm install
  
  npm run dev
</code></pre>

The service will start running on localhost://3000(this is configurable based on .env file)



### Public API Service
open a new terminal and use the following commands.
<pre><code>
  cd public-api-service // to navigate to public-api-service firectory
  
  npm install
  
  npm start
  
</code></pre>

The service will start running on localhost://3001(this is configurable based on .env file)


### Frontend
open a new terminal and use the following commands.
<pre><code>
  cd frontend // to initialise frontend
  
  npm install
  
  npm run dev 
    
</pre></code>

The service will start running on localhost://3002(this is configurable based on .env file)


## 📚 API Documentation

### 1) Authentication Endpoints

if testing directly , use localhost://3000 for these endpoints.

**1.1 Registers new user**

<b>Method: POST  
Endpoint: /api/register</b>  

Headers:
<pre><code>Content-Type: application/json</code></pre>

Request Body:
<pre><code>{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "password123"
}</code></pre>

**Response (201 Created)** 

Response Example:
<pre><code>{
  "token": "jwt-token-string",
  "api_key": "generated-api-key"
}</code></pre>

**1.2 Logging in existing user**

<b>Method: POST  
Endpoint: /api/login</b>  

Headers:
<pre><code>Content-Type: application/json</code></pre>

Request Body:
<pre><code>{
  "email": "john@example.com",
  "password": "password123"
}</code></pre>

**Response (200 OK)**

Response Example:
<pre><code>{
  "token": "jwt-token-string",
  "api_key": "generated-api-key"
}</code></pre>

### 2) Candidate Management

if testing directly , use localhost://3000 for these endpoints.


2.1) **Adds new candidate**

<b>Method: POST  
Endpoint: /api/candidate</b>  

Headers:
<pre><code>Authorization: Bearer {jwt_token}
Content-Type: application/json</code></pre>

Request Body:
<pre><code>{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com"
}</code></pre>

**Response (201 Created)** 

Response Example:
<pre><code>{
  "_id": "candidate-id",
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com",
  "user_id": "user-id",
  "created_at": "timestamp"
}</code></pre>

**2.2) Get user's candidates**

<b>Method: GET  
Endpoint: /api/candidate</b>  

Headers:
<pre><code>Authorization: Bearer {jwt_token}</code></pre>

**Response (200 OK)**  
Response Example:
<pre><code>[
  {
    "_id": "candidate-id",
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane@example.com",
    "user_id": "user-id",
    "created_at": "timestamp"
  },
  {
    "_id": "candidate-id-2",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "user_id": "user-id",
    "created_at": "timestamp"
  }
]</code></pre>

### 3) Public API Routes (Using API Key)

if testing directly , use localhost://3001 for these endpoints.


**3.1) Get user profile using API key**

<b>Method: POST  
Endpoint: /api/public/profile</b>  

Headers:
<pre><code>Content-Type: application/json
x-api-key: {api_key}</code></pre>

**Response (200 OK)**

Response Example:
<pre><code>{
  "id": "user-id",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "created_at": "timestamp"
}</code></pre>

**3.2) Get user's candidates using API key**

<b>Method: GET  
Endpoint: /api/public/candidate</b>  

Headers:
<pre><code>x-api-key: {api_key}</code></pre>

**Response (200 OK)**

Response Example:
<pre><code>[
  {
    "_id": "candidate-id",
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane@example.com",
    "user_id": "user-id",
    "created_at": "timestamp"
  },
  {
    "_id": "candidate-id-2",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "user_id": "user-id",
    "created_at": "timestamp"
  }
]</code></pre>

### Error Responses

**400 Bad Request**
<pre><code>{
  "error": "Invalid input data"
}</code></pre>

**401 Unauthorized**
<pre><code>{
  "error": "Invalid token or API key"
}</code></pre>

**404 Not Found**
<pre><code>{
  "error": "Resource not found"
}</code></pre>

**429 Too Many Requests**
<pre><code>{
  "error": "Rate limit exceeded. Please try again later."
}</code></pre>

**500 Internal Server Error**
<pre><code>{
  "error": "Internal server error"
}</code></pre>

## 📊Database Schema

### User Model
<pre><code>
  

{  
 
  first_name: String,    // required, 2-50 chars  
  last_name: String,     // required, 2-50 chars
  email: String,         // required, unique, lowercase
  password_hash: String, // required, hashed
  api_key: String,       // unique
  created_at: Date       // default: current timestamp
}
  </code></pre>
  
### Candidate Model
<pre><code>
  
{
  first_name: String,  // required, 2-50 chars
  last_name: String,   // required, 2-50 chars
  email: String,       // required, unique
  user_id: ObjectId,   // reference to user
  created_at: Date     // default: current timestamp
}
</code></pre>



## 🔒 Security Features
* Password hashing using bcrypt (10 rounds)
* JWT tokens with 24-hour expiration
* 64-character hexadecimal API keys
* Rate limiting (200 requests/hour per API key)
* CORS protection
* Input validation and sanitization
* XSS protection
* HTTP-only cookies
* Request size limiting
* Security headers (Helmet)

## Troubleshooting Guide

### Common Issues
1. MongoDB Connection:
   - Verify MongoDB URI
   - Check MongoDB service status
   - Verify network connectivity

2. Authentication Issues:
   - Check JWT token format
   - Verify API key format
   - Clear browser localStorage

3. CORS Issues:
   - Verify environment variables
   - Check CORS configuration
   - Ensure all services are running

