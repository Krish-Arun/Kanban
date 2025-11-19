import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    await User.create({ username, password });
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: "Username already exists" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const match = await user.comparePassword(password);
  if (!match) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, username });
};
