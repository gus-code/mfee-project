// Controller for authentication endpoints
// Handles user registration, login, token refresh, logout, and user info
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { User } from "../models/user.js";

// Initialize lowdb for local user storage
const adapter = new JSONFile<{ users: User[] }>("db-users.json");
const db = new Low(adapter, { users: [] });

const register = async (req, res) => {
  const { username, password, name } = req.body;

  if (
    typeof name !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  await db.read();
  const duplicate = db.data.users.find((u) => u.username === username);
  if (duplicate) {
    return res.status(409).json({ message: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.data.users.push({ name, username, password: hashedPassword });
    await db.write();

    // Auth
    const accessToken = jwt.sign(
      { username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30d" }
    );
    const refreshToken = jwt.sign(
      { username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(201).json({ message: "User registered and logged in" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (typeof username !== "string" || typeof password !== "string") {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  await db.read();
  const user = db.data.users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  const refreshToken = jwt.sign(
    { username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.status(200).json({ message: "Login successful" });
};

const refresh = (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || !decoded?.username) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({ message: "Access token refreshed" });
  });
};

const logout = (_req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
};

const me = async (req, res) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) return res.status(401).json({ user: null });

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err || !decoded?.username) {
        return res.status(401).json({ user: null });
      }

      await db.read();
      const user = db.data.users.find((u) => u.username === decoded.username);
      if (!user) return res.status(404).json({ user: null });

      res.json({
        user: {
          name: user.name,
          username: user.username,
        },
      });
    }
  );
};

export default {
  register,
  login,
  refresh,
  logout,
  me,
};
