import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ error: "No token provided" });

  const token = header.split(" ")[1];

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data; // contains { username }
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
