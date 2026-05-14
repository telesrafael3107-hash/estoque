import express from 'express';
import cors from 'cors';
import { DatabasePostgres } from './dataBasePostgres.js';
import './createTable.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const db = new DatabasePostgres();

// autenticação (auth)
//Register
app.post('/auth/register', async(req, res) => {
    const { name, email, password, setor } = req.body;

    const userExists = await db.findUserByEmail(email);
    if (userExists) return res.status(400).json({msg: 'Email já existe'});

    await db.createUser({name, email, password, setor});
    res.status(201).json({ msg: 'Usuario criado'});
});

//Login

