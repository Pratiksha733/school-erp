import express from 'express';
import mongoose from 'mongoose';
import { db } from '../db.js';
import AttendanceRecord from '../models/AttendanceRecord.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// In-Memory store for attendance when Atlas is disconnected
export const inMemoryAttendance = {};
// Structure: { [targetId]: { dateRecords: { 'YYYY-MM-DD': 'present'|'absent' }, totalPresent: Number, totalSessions: Number, attendancePercent: Number } }

const atlasReady = () => db.atlasConnected && mongoose.connection.readyState === 1;

// ─── POST /api/attendance/mark ────────────────────────────────────────────────
router.post('/mark', async(req, res) => {
    try {
        const { targetId, targetType, status, date } = req.body;
        if (!targetId || !targetType || !status) {
            return res.status(400).json({ success: false, message: 'targetId, targetType, and status are required.' });
        }

        const todayDate = date || new Date().toISOString().split('T')[0];
        const idStr = String(targetId);

        // ── Path A: MongoDB Atlas ──
        if (atlasReady()) {
            // Find existing or create
            let record = await AttendanceRecord.findOne({ targetId: idStr, date: todayDate });
            const isNewForDate = !record;

            if (isNewForDate) {
                // Find previous records for this target to compute aggregate
                const history = await AttendanceRecord.find({ targetId: idStr });
                let totalPresent = history.reduce((acc, h) => acc + (h.status === 'present' ? 1 : 0), 0) + (status === 'present' ? 1 : 0);
                let totalSessions = history.length + 1;
                let attendancePercent = Math.round((totalPresent / totalSessions) * 100);

                record = await AttendanceRecord.create({
                    targetId: idStr,
                    targetType,
                    date: todayDate,
                    status,
                    totalPresent,
                    totalSessions,
                    attendancePercent,
                });
            } else {
                // Toggle/update existing date status
                record.status = status;
                const history = await AttendanceRecord.find({ targetId: idStr });
                let totalPresent = history.reduce((acc, h) => acc + (h.status === 'present' ? 1 : 0), 0);
                let totalSessions = history.length;
                let attendancePercent = Math.round((totalPresent / totalSessions) * 100);

                record.totalPresent = totalPresent;
                record.totalSessions = totalSessions;
                record.attendancePercent = attendancePercent;
                await record.save();
            }

            return res.json({
                success: true,
                message: 'Attendance saved to MongoDB Atlas ☁️',
                database: 'MongoDB Atlas',
                targetId: idStr,
                date: todayDate,
                status,
                attendancePercent: record.attendancePercent,
                totalPresent: record.totalPresent,
                totalSessions: record.totalSessions,
            });
        }

        // ── Path B: In-Memory Fallback ──
        if (!inMemoryAttendance[idStr]) {
            inMemoryAttendance[idStr] = {
                dateRecords: {},
                totalPresent: 0,
                totalSessions: 0,
                attendancePercent: 100,
            };
        }

        const item = inMemoryAttendance[idStr];
        item.dateRecords[todayDate] = status;

        // Recalculate percent
        const dates = Object.keys(item.dateRecords);
        const presentCount = dates.filter(d => item.dateRecords[d] === 'present').length;
        const sessionCount = dates.length;
        const computedPercent = Math.round((presentCount / sessionCount) * 100);

        item.totalPresent = presentCount;
        item.totalSessions = sessionCount;
        item.attendancePercent = computedPercent;

        return res.json({
            success: true,
            message: 'Attendance saved in-memory 📦',
            database: 'In-Memory',
            targetId: idStr,
            date: todayDate,
            status,
            attendancePercent: item.attendancePercent,
            totalPresent: item.totalPresent,
            totalSessions: item.totalSessions,
        });

    } catch (err) {
        console.error('Attendance mark error:', err);
        return res.status(500).json({ success: false, message: err.message || 'Server error marking attendance.' });
    }
});

// ─── GET /api/attendance/all ──────────────────────────────────────────────────
router.get('/all', async(req, res) => {
    try {
        if (atlasReady()) {
            const records = await AttendanceRecord.find({});
            return res.json({ success: true, database: 'MongoDB Atlas', records });
        }

        return res.json({ success: true, database: 'In-Memory', records: inMemoryAttendance });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

export default router;