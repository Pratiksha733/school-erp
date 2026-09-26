import mongoose from 'mongoose';

mongoose.set('bufferCommands', false);

const attendanceRecordSchema = new mongoose.Schema(
  {
    targetId: { type: String, required: true }, // e.g. student id or teacher id
    targetType: { type: String, enum: ['student', 'teacher', 'peon'], required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    status: { type: String, enum: ['present', 'absent'], required: true },
    totalPresent: { type: Number, default: 0 },
    totalSessions: { type: Number, default: 0 },
    attendancePercent: { type: Number, default: 100 },
  },
  {
    timestamps: true,
    bufferCommands: false,
    autoCreate: false,
    autoIndex: false,
  }
);

attendanceRecordSchema.index({ targetId: 1, date: 1 }, { unique: true });

const AttendanceRecord = mongoose.model('AttendanceRecord', attendanceRecordSchema);
export default AttendanceRecord;
