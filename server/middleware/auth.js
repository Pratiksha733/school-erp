import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import { inMemoryUsers } from '../routes/authRoutes.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'sjp_inter_college_secret_key_2026_jwt_token_auth';

export const protect = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        // Try Atlas first if connected
        if (db.atlasConnected && mongoose.connection.readyState === 1 && !userId.startsWith('mem')) {
            try {
                const user = await User.findById(userId).select('-password');
                if (user) {
                    req.user = user;
                    return next();
                }
            } catch (_) { /* fall through */ }
        }

        // In-memory fallback
        const memUser = inMemoryUsers.find(u => u._id === userId);
        if (memUser) {
            req.user = { _id: memUser._id, fullName: memUser.fullName, email: memUser.email, role: memUser.role, phone: memUser.phone, avatar: memUser.avatar };
            return next();
        }

        req.user = { _id: userId, fullName: 'SJP User', email: '', role: 'Faculty Teacher', phone: '', avatar: 'SJP' };
        return next();

    } catch (err) {
        return res.status(401).json({ success: false, message: 'Token is invalid or expired.' });
    }
};