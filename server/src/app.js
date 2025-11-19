// app.js

import express from "express";
import cors from "cors";

import itemRoutes from "./routes/itemRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Existing items
app.use("/items", itemRoutes);

export default app;
