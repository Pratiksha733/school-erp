import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { db } from '../db.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'sjp_inter_college_secret_key_2026_jwt_token_auth';

// ─── In-Memory user store (fallback when Atlas is unavailable) ────────────────
export const inMemoryUsers = [
    { _id: 'mem1', fullName: 'Dr. R.K. Pandey', email: 'principal@sjpcollege.ac.in', passwordHash: bcrypt.hashSync('password123', 10), role: 'Principal / Administrator', phone: '+91 94150 11001', avatar: 'RP' },
    { _id: 'mem2', fullName: 'Shri Devendra Kumar', email: 'devendra.maths@sjpcollege.ac.in', passwordHash: bcrypt.hashSync('password123', 10), role: 'Faculty Teacher', phone: '+91 94150 11009', avatar: 'DK' },
    { _id: 'mem3', fullName: 'Meena Awasthi', email: 'meena.student@sjpcollege.ac.in', passwordHash: bcrypt.hashSync('password123', 10), role: 'Student / Guardian', phone: '+91 94507 77777', avatar: 'MA' },
];

// Helper – generate 7-day JWT
const genToken = (id) =>
    jwt.sign({ id: String(id) }, JWT_SECRET, { expiresIn: '7d' });

// Helper – check if Atlas is truly ready (readyState 1 = connected)
const atlasReady = () => db.atlasConnected && mongoose.connection.readyState === 1;

// ─── POST /api/auth/signup ────────────────────────────────────────────────────
router.post('/signup', async(req, res) => {
    try {
        const { fullName, email, password, role, phone } = req.body;
        if (!fullName || !email || !password)
            return res.status(400).json({ success: false, message: 'Full name, email, and password are required.' });

        const cleanEmail = email.toLowerCase().trim();
        const avatar = fullName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'SJP';

        // ── Path A: MongoDB Atlas ──
        if (atlasReady()) {
            const exists = await User.findOne({ email: cleanEmail });
            if (exists)
                return res.status(400).json({ success: false, message: 'Email already registered.' });

            const user = await User.create({ fullName, email: cleanEmail, password, role: role || 'Faculty Teacher', phone: phone || '', avatar });
            const token = genToken(user._id);
            return res.status(201).json({ success: true, message: 'Registered in MongoDB Atlas ☁️', database: 'MongoDB Atlas', token, user: { id: user._id, name: user.fullName, email: user.email, role: user.role, phone: user.phone, avatar: user.avatar } });
        }

        // ── Path B: In-Memory fallback ──
        if (inMemoryUsers.find(u => u.email === cleanEmail))
            return res.status(400).json({ success: false, message: 'Email already registered.' });

        const newUser = { _id: `mem_${Date.now()}`, fullName, email: cleanEmail, passwordHash: bcrypt.hashSync(password, 10), role: role || 'Faculty Teacher', phone: phone || '', avatar };
        inMemoryUsers.push(newUser);
        const token = genToken(newUser._id);
        return res.status(201).json({ success: true, message: 'Registered successfully 📦', database: 'In-Memory', token, user: { id: newUser._id, name: newUser.fullName, email: newUser.email, role: newUser.role, phone: newUser.phone, avatar: newUser.avatar } });

    } catch (err) {
        console.error('Signup error:', err);
        return res.status(500).json({ success: false, message: err.message || 'Server error during signup.' });
    }
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ success: false, message: 'Email and password are required.' });

        const cleanEmail = email.toLowerCase().trim();

        // ── Path A: MongoDB Atlas ──
        if (atlasReady()) {
            const user = await User.findOne({ email: cleanEmail });
            if (!user)
                return res.status(401).json({ success: false, message: 'No account found with this email.' });
            const match = await user.matchPassword(password);
            if (!match)
                return res.status(401).json({ success: false, message: 'Incorrect password.' });
            const token = genToken(user._id);
            return res.json({ success: true, message: 'Logged in via MongoDB Atlas ☁️', database: 'MongoDB Atlas', token, user: { id: user._id, name: user.fullName, email: user.email, role: user.role, phone: user.phone, avatar: user.avatar } });
        }

        // ── Path B: In-Memory fallback ──
        const memUser = inMemoryUsers.find(u => u.email === cleanEmail);
        if (!memUser)
            return res.status(401).json({ success: false, message: 'No account found with this email.' });
        const match = bcrypt.compareSync(password, memUser.passwordHash);
        if (!match)
            return res.status(401).json({ success: false, message: 'Incorrect password.' });
        const token = genToken(memUser._id);
        return res.json({ success: true, message: 'Logged in successfully 📦', database: 'In-Memory', token, user: { id: memUser._id, name: memUser.fullName, email: memUser.email, role: memUser.role, phone: memUser.phone, avatar: memUser.avatar } });

    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ success: false, message: err.message || 'Server error during login.' });
    }
});

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
router.get('/me', protect, (req, res) => {
    res.json({ success: true, user: { id: req.user._id, name: req.user.fullName, email: req.user.email, role: req.user.role, phone: req.user.phone, avatar: req.user.avatar } });
});

export default router;