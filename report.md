ay, this file is just for myself, will be deleting later, im not gonna gitignore it in case any of you need a short summary as well

---

# 📦 **RateEverything — CURRENT PROJECT CONTEXT**

## ✅ **STACK**

* **Frontend:** React 19 + Vite + React Router DOM 7 + Tailwind 3.4.10
* **Backend:** Node.js (manual install), Express 4, Mongoose 8
* **Database:** MongoDB Community local (`mongod --dbpath`)
* **Dev Tools:** axios, nodemon
* **Environment:** Windows 10, PowerShell 7, no WSL, manual Node install
* **Package managers:** npm (works), npx (broken), Tailwind init done via direct CLI call

---

# 🗂 **DIRECTORY TREE (RELATIVE TO /RateEverything)**

```
RateEverything/
├── client/
│   ├── index.html
│   ├── package.json        ← contains "type": "module"
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── src/
│   │   ├── main.jsx
│   │   ├── index.css       ← Tailwind directives
│   │   ├── App.jsx         ← Router + Navbar + Routes
│   │   ├── api/
│   │   │   └── items.js    ← axios calls to backend
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── ItemCard.jsx
│   │   │   ├── RatingStars.jsx   (if created)
│   │   │   └── Loader.jsx        (if created)
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── AddItem.jsx       ← form calls addItem()
│   │       ├── ItemDetails.jsx
│   │       └── NotFound.jsx
│   └── vite.config.js
│
├── server/
│   ├── package.json        ← contains "type": "module"
│   ├── .env                ← NOT committed
│   ├── .env.example        ← safe template
│   └── src/
│       ├── index.js        ← loads dotenv, connectDB(), start server
│       ├── app.js          ← express, CORS, JSON, /items routes
│       ├── config/
│       │   └── db.js       ← mongoose.connect()
│       ├── models/
│       │   └── Item.js     ← name, category, rating, ratingsCount
│       ├── controllers/
│       │   └── itemController.js
│       └── routes/
│           └── itemRoutes.js
│
└── README.md
```

---

# ⚙️ **BACKEND API ENDPOINTS**

## `GET /items`

Return all items.

## `GET /items/:id`

Return one item.

## `POST /items`

Body:

```json
{ "name": "...", "category": "..." }
```

## `POST /items/:id/rate`

Body:

```json
{ "rating": 4 }
```

**Rating is averaged using ratingsCount.**

---

# 🧪 **CURRENT FUNCTIONAL STATE**

### ✔ MongoDB

Runs via:

```
C:/Mongo/mongodb/bin/mongod.exe --dbpath C:/Mongo/data
```

**Config file not used** (hangs).
Using direct dbpath works perfectly.

### ✔ Backend

Starts successfully with:

```
cd server
npm run dev
```

Shows:

```
MongoDB connected ✔
Server running at http://localhost:5000
```

### ✔ Frontend

Runs with:

```
cd client
npm run dev
```

Router working.
Tailwind working.
API file using axios pointed to backend:

```
http://localhost:5000/items
```

### ✔ Add item page

Form → addItem() → backend → Mongo → redirects to Home.

### ✔ Items load from Mongo

Home fetches data from backend and displays ItemCards.

---

# 🔐 **SECRETS & GIT**

`.env` contains:

```
MONGO_URI=mongodb://127.0.0.1:27017/
PORT=5000
```

`.gitignore` blocks:

* `node_modules/`
* `server/.env`

`.env.example` exists and is safe.

Everything else is safe to push.

---

# 💡 **NOTES ABOUT NODE ENVIRONMENT**

* Manual Node ZIP installation
* `npm` works
* `npx` is BROKEN
  → Tailwind was initialized using direct CLI:

```
node node_modules/tailwindcss/lib/cli.js init -p
```


