import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import UserSchema from '../schemas/User';

const register: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await UserSchema.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserSchema.create({ username, password: hashedPassword });

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'SOmething WenT WRoNG' });
  }
};

const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  const user = await UserSchema.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '1d' });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ accessToken });
};

const logout: RequestHandler = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully!' });
};

const refresh = (req: any, res: any) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: 'Unauthorized!'
    });
  }

  jwt.verify(refreshToken, process.env.REFRESS_TOKEN_SECRET || '', (err: any, { username }: any) => {
    if (err) {
      return res.status(403).json({
        message: 'Forbidden!'
      });
    }

    const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: '15m' });
    res.json({ accessToken });
  });
};

export default {
  register,
  login,
  logout,
  refresh
};
