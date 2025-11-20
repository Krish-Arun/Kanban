import User from "../models/User.js";
import jwt from "jsonwebtoken";

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password });
    const token = signToken(user);

    res.json({
      user: { username: user.username },
      token
    });
  } catch (e) {
    res.status(400).json({ message: "Username already exists" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user)
    return res.status(400).json({ message: "Invalid credentials" });

  const match = await user.comparePassword(password);
  if (!match)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = signToken(user);

  res.json({
    user: { username: user.username },
    token
  });
};
