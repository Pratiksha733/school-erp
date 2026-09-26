import React, { useState } from 'react';
import { CalendarClock, Clock, BookOpen, User, Bell } from 'lucide-react';
import { dailyBellSchedule, classTimeTables, initialClasses } from '../data/mockData';

export default function Schedule() {
  const [selectedGrade, setSelectedGrade] = useState('10');

  // Fallback timetable if class specific is not in mock
  const activeTimetable = classTimeTables[selectedGrade] || [
    { period: "1", time: "8:30 - 9:15", subject: "Hindi", teacher: "Subject Faculty" },
    { period: "2", time: "9:15 - 10:00", subject: "English", teacher: "Subject Faculty" },
    { period: "3", time: "10:00 - 10:45", subject: "Mathematics", teacher: "Subject Faculty" },
    { period: "4", time: "10:45 - 11:30", subject: "Science", teacher: "Subject Faculty" },
    { period: "Lunch", time: "11:30 - 12:05", subject: "Recess Break", teacher: "Staff On Duty" },
    { period: "5", time: "12:05 - 12:50", subject: "Social Science", teacher: "Subject Faculty" },
    { period: "6", time: "12:50 - 1:30", subject: "Sanskrit / Drawing", teacher: "Subject Faculty" },
    { period: "7", time: "1:30 - 2:00", subject: "Physical Training (PTI)", teacher: "Shri Santosh Kumar" }
  ];

  return (
    <div className="content-body">
      <div className="page-toolbar">
        <div>
          <h2>Daily Class Schedule & Timetable</h2>
          <p>Standard bell timing from 8:00 AM to 2:00 PM for Classes 6th to 12th.</p>
        </div>
      </div>

      {/* College Bell Timetable Card */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="var(--primary)" />
            <h3>Standard Daily Bell Schedule</h3>
          </div>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Monday to Saturday (Assembly at 8:00 AM)
          </span>
        </div>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Period / Event</th>
                <th>Time Duration</th>
                <th>Session Type</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {dailyBellSchedule.map((row, idx) => (
                <tr 
                  key={idx}
                  className={row.type === 'prayer' ? 'period-row-prayer' : row.type === 'break' ? 'period-row-break' : ''}
                >
                  <td>
                    <span className="badge-period">{row.period}</span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{row.time}</td>
                  <td>
                    <span className={`badge ${row.type === 'prayer' ? 'badge-priority-high' : row.type === 'break' ? 'badge-active' : 'badge-priority-normal'}`}>
                      {row.type.toUpperCase()}
                    </span>
                  </td>
                  <td>{row.activity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Class Specific Timetable Viewer */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarClock size={18} color="var(--purple)" />
            <h3>Class-wise Period Timetable</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Select Class:</span>
            <select
              className="form-select"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              style={{ width: '160px', padding: '7px 12px' }}
            >
              <option value="6">Class 6th</option>
              <option value="7">Class 7th</option>
              <option value="8">Class 8th</option>
              <option value="9">Class 9th</option>
              <option value="10">Class 10th (High School)</option>
              <option value="11">Class 11th</option>
              <option value="12">Class 12th (Intermediate)</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Timing</th>
                <th>Subject</th>
                <th>Teacher In-Charge</th>
              </tr>
            </thead>
            <tbody>
              {activeTimetable.map((slot, index) => (
                <tr 
                  key={index}
                  className={slot.subject.includes('Break') ? 'period-row-break' : ''}
                >
                  <td>
                    <strong>Period {slot.period}</strong>
                  </td>
                  <td>{slot.time}</td>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>
                    {slot.subject}
                  </td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} color="var(--text-muted)" />
                      {slot.teacher}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
