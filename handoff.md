# 📦 **RateEverything — PROJECT CONTEXT & ARCHITECTURE HANDOFF REPORT**

## 🎯 **Purpose**

RateEverything is a full-stack MERN project that allows users to:

* Create items (name + category)
* View all items
* Rate items (1–5 stars)
* Leave a written review
* Automatically analyze each review using a “Judgement Engine”
* Display all reviews per item, including judgement analysis
* Track average rating per item
* Identify each reviewer via a simple username (no authentication)

The entire system is intentionally simple so multiple developers can work without environment or auth overhead.

---

# ⚙️ **Tech Stack**

### **Frontend**

* **React 19**
* **Vite**
* **React Router DOM 7**
* **Tailwind CSS 3.4**
* **Axios**

### **Backend**

* **Node.js (ESM)**
* **Express 4**
* **Mongoose 8**
* **MongoDB (local instance)**
* **dotenv**

### **Key Architectural Principle**

➡️ **Items contain embedded reviews**
➡️ **Reviews are NOT a separate MongoDB collection**
➡️ All review information (username, rating, review text, judgement analysis) is stored inside the `Item.reviews[]` array.

---

# 🗂 **Directory Structure**

```
RateEverything/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx              ← username gating + routes
│       ├── api/items.js         ← axios API
│       ├── components/
│       │   └── RatingStars.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── AddItem.jsx
│           ├── ItemDetails.jsx  ← review form + review list
│           ├── EnterUsername.jsx
│           └── NotFound.jsx
│
└── server/
    ├── package.json
    ├── .env.example
    └── src/
        ├── index.js             ← connects DB + starts server
        ├── app.js               ← express + CORS + JSON + routes
        ├── config/
        │   └── db.js
        ├── models/
        │   └── Item.js          ← items + embedded reviews
        ├── controllers/
        │   └── itemController.js
        ├── routes/
        │   └── itemRoutes.js
        └── utils/
            └── analyzeReview.js ← Judgement Engine
```

---

# 🧠 **Backend Logic Overview**

## 🟩 Models

### **Item Model**

Each item contains:

```js
{
  name: String,
  category: String,
  averageRating: Number,
  reviews: [
    {
      username: String,
      rating: Number,
      review: String,
      judgement: {
        judgementText: String,
        judgementTags: [String],
        sentimentScore: Number,
        contradictionDetected: Boolean,
        stats: { wordCount, charCount, emojiCount, exaggerationCount }
      },
      createdAt: Date
    }
  ]
}
```

The `judgement` field is injected by the Judgement Engine.

---

## 🟩 Judgement Engine — `utils/analyzeReview.js`

Given a written review + star rating, this module:

* Extracts sentiment
* Detects emojis, exaggeration words, contradictions
* Categorizes the review (`hater`, `enjoyer`, `dramatic`, etc.)
* Assigns a judgement text line + tags
* Returns a structured judgement object stored inside the review.

---

## 🟩 Controllers — `itemController.js`

### **GET /items**

Returns all items.

### **GET /items/:id**

Returns a single item, including all embedded reviews.

### **POST /items**

Creates a new item.

### **POST /items/:id/review**

Adds a review:

* Writes username, rating, and review
* Generates judgement object through `analyzeReview()`
* Pushes into Item.reviews[]
* Recalculates averageRating

---

## 🟩 Routes — `itemRoutes.js`

```
GET    /items
GET    /items/:id
POST   /items
POST   /items/:id/review
```

There is **NO** separate `reviewRoutes.js`.
Everything is nested under `/items`.

---

# 🎨 **Frontend Logic Overview**

## 🟢 Username Flow

On first page load:

* App checks localStorage for `username`
* If missing → show EnterUsername.jsx
* After entering username, store it and proceed

No authentication or sessions needed.

---

## 🟢 ItemDetails.jsx

When a user opens an item:

* Fetches the item via `/items/:id`
* Displays item name, category, average rating
* Shows a review form:

  * Star selection component
  * Textbox
  * Submit button
* Submits review to `/items/:id/review`
* Reloads updated item with new reviews + judgement
* Reviews list displays:

  * username
  * star rating
  * review text
  * judgement text + tags

---

## 🟢 AddItem.jsx

Allows creation of new items using:

```
POST /items
```

---

## 🟢 Home.jsx

Displays a list of all existing items.

---

# 🔐 **Environment Variables**

`.env.example`:

```
MONGO_URI=mongodb://127.0.0.1:27017/
PORT=5000
```

Developers create their own `.env` locally.

---

# 💡 **Developer Rules & Notes**

### ✔ No review collection — embedded reviews only

### ✔ No separate review routes — they live under `/items/:id/review`

### ✔ No authentication — username stored locally

### ✔ Do NOT move the Judgement Engine into index.js

### ✔ Keep backend modular:

* routes → controllers → models → utils → db

### ✔ MongoDB names are flexible, the URI decides the DB