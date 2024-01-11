import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';

const users: User[] = [];

const register = async (req, res) => {
  const { username, password } = req.body;

  // Check that we have the correct payload
  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required'
    });
  }

  // Check that we don't have duplicates
  const duplicate = users.find((u) => u.username === username);
  if (duplicate) {
    return res.status(409).json({ message: 'User already exist' });
  }

  try {
    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store new user
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  // Check that we have the correct payload
  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required'
    });
  }

  // Retrieve user
  const user = users.find((u) => u.username === username);

  // Check if we found the user and the password matches
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate access token and refresh token
  const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  // Save refresh token
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
  });

  res.json({ accessToken });
};

const refresh = (req, res) => {
  // Get refresh token from cookies
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, { username }) => {
    if (err) {
      // Invalid token
      return res.status(403).json({ message: 'Forbidden' });
    }

    const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  });
};

const logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};

export default {
  register,
  login,
  refresh,
  logout
};
