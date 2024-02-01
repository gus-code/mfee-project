import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RequestHandler, Request, Response } from 'express';

import { User } from '../models/user';

const users: User[] = [];

const register: RequestHandler = async(req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const duplicatedItem = users.find(user => user.username === username);
    if (duplicatedItem) {
        return res.status(409).json({ message: 'User already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });

        res.status(201).json({ message: 'User created succesfully' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const login: RequestHandler = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const currentUser = users.find(user => user.username === username);

    if (!currentUser || !(await bcrypt.compare(password, currentUser.password))) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
};

const logout: RequestHandler = (req: Request, res: Response) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'User Logged Out Succesfully' });
};

const refreshToken: RequestHandler = (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, { username }) => {
        if(err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const newAccessToken = jwt.sign([username], process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.json({ newAccessToken });
    });
};

export default {
    register,
    login,
    logout,
    refreshToken
}