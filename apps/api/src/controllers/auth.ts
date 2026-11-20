import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user';
import { RequestHandler } from 'express';

interface TokenPayload extends JwtPayload {
    username: string;
}

const users: User[] = [];

const register: RequestHandler = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }

    const duplicate = users.find(u => u.username === username);
    if (duplicate) {
        return res.status(409).json({ message: 'User already exist' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' })
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const login: RequestHandler = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }

    const user = users.find(u => u.username === username);

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '1d' });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
}

const logout: RequestHandler = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
}

const refresh: RequestHandler = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
        (err, decoded) => {
            if (err || !decoded || typeof decoded === 'string') {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const { username } = decoded as TokenPayload;

            const accessToken = jwt.sign(
                { username },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: '15m' }
            );

            res.json({ accessToken });
        }
    );
};

export default {
    register,
    login,
    logout,
    refresh
}

