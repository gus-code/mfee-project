import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { RequestHandler } from 'express';

const users :User[] = [];

const register = async (req, res) =>{
    const { username , password} = req.body;

    if(!username || ! password){
        return res.status(400).json({message: 'username and password are required'});
    }

    const duplicated = users.find((u) => u.username === username);
    if(duplicated){
        return res.status(409).json({message: 'user already exist'});
    }

    try {
        const passwordHas = await bcrypt.hash(password, 10);
        users.push({ username, password:passwordHas})
        res.status(201).json({message: 'user registered successfull'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}

const login = async (req,res) =>{
    const { username , password} = req.body;

    if(!username || ! password){
        return res.status(400).json({message: 'username and password are required'});
    }

    const storedUser = users.find(u => u.username === username);
    if(!storedUser || !(await bcrypt.compare(password, storedUser.password))){
        return res.status(401).json({message: 'invalid credentials'});
    }
    const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m'});
    const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d'});

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge : 1 * 24 * 60 * 60 * 1000
    });

    res.json({accessToken});
}

const logout: RequestHandler = (req,res) =>{
    res.clearCookie('refreshToken');
    res.json('Looged out successfully');
}

const refresh = (req,res) =>{
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({message: 'Unauthorized'});
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, { username }) =>{
        if(err){
            return res.status(401).json({message: 'Unauthorized'});
        }

        const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m'});
        res.json({accessToken});
    });
}

export default {
    register,
    login,
    logout,
    refresh
}