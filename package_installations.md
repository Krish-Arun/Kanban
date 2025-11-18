# 📦 Package Installation Overview

This project follows a standard **MERN (MongoDB, Express, React, Node.js)** structure with **separate package managers** for the backend and frontend. Each part of the stack has its own `package.json`, so dependencies are installed independently.

### **1. Backend (server/)**

Inside the `server` directory, we install the core Node + Express dependencies used to build the REST API:

* **express** — web server for routing and HTTP handling
* **mongoose** — MongoDB ODM for schema + database communication
* **cors** — enables cross-origin requests from the React frontend
* **dotenv** — loads environment variables (`.env`)
* **nodemon** (dev only) — auto-restarts the server during development

Installation commands:

```bash
cd server
npm install express mongoose cors dotenv
npm install --save-dev nodemon
```

### **2. Frontend (client/)**

Inside the `client` directory, we use **Vite + React** for a fast development environment and modern frontend tooling.

Installed packages include:

* **react / react-dom** — UI library
* **axios** — used for making API calls to the backend
* **react-router-dom** — client-side routing
* **tailwindcss / postcss / autoprefixer** — styling and utility classes (configured with Vite)

Installation commands:

```bash
cd client
npm install
npm install axios react-router-dom
npm install -D tailwindcss@3.4.10 postcss autoprefixer
```

Vite generates a `/client/node_modules` folder for UI dependencies, while the backend keeps its own `/server/node_modules`.
These are **not committed to Git**, and must be installed separately by each developer.

---
