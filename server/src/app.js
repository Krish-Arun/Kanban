// app.js

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Existing items

app.use("/auth", authRoutes);
app.use("/items", itemRoutes);

export default app;
