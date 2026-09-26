import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './db.js';
import authRoutes from './routes/authRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import User from './models/User.js';

// Load environment variables
dotenv.config({ path: './server/.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Read Atlas URI from .env (user must set their own real Atlas URI there)
const MONGO_URI = process.env.MONGO_URI;

// Global mongoose setting — fail fast, no buffering
mongoose.set('bufferCommands', false);

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

// Seed initial demo accounts once Atlas is connected
const seedDefaultAccounts = async () => {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      console.log('Seeding demo accounts into MongoDB Atlas...');
      await User.create([
        { fullName: 'Dr. R.K. Pandey',      email: 'principal@sjpcollege.ac.in',         password: 'password123', role: 'Principal / Administrator', phone: '+91 94150 11001', avatar: 'RP' },
        { fullName: 'Shri Devendra Kumar',  email: 'devendra.maths@sjpcollege.ac.in',     password: 'password123', role: 'Faculty Teacher',            phone: '+91 94150 11009', avatar: 'DK' },
        { fullName: 'Meena Awasthi',        email: 'meena.student@sjpcollege.ac.in',      password: 'password123', role: 'Student / Guardian',         phone: '+91 94507 77777', avatar: 'MA' },
      ]);
      console.log('Demo accounts seeded. Use password: password123');
    }
  } catch (err) {
    console.warn('Seed error:', err.message);
  }
};

// Try connecting to MongoDB Atlas
if (MONGO_URI && MONGO_URI.startsWith('mongodb')) {
  console.log('Attempting MongoDB Atlas connection...');
  mongoose
    .connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
      db.atlasConnected = true;
      console.log('✅ MongoDB Atlas connected successfully!');
      await seedDefaultAccounts();
    })
    .catch((err) => {
      db.atlasConnected = false;
      console.warn(`⚠️  MongoDB Atlas unavailable: ${err.message}`);
      console.log('📦 Running with secure in-memory database (fallback mode).');
    });
} else {
  console.log('No MONGO_URI set in server/.env — running in in-memory mode.');
  console.log('To connect MongoDB Atlas, add your Atlas URI to server/.env as MONGO_URI=...');
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'Online',
    service: 'SJP Inter College ERP Backend',
    database: db.atlasConnected ? 'MongoDB Atlas ☁️' : 'In-Memory Database 📦',
    mongoStatus: db.atlasConnected ? 'Connected' : 'Fallback Active',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 School ERP Server running → http://localhost:${PORT}`);
});
