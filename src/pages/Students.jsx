import React, { useState } from 'react';
import {
  Search,
  UserPlus,
  X,
  Trash2,
  Edit3,
  Award,
  TrendingUp,
  UserCheck,
  GraduationCap,
  Percent,
  CheckCircle2,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { markAttendance } from '../services/api';

export default function Students({ students = [], setStudents, teachers = [], classes = [], currentUser }) {
  const role = currentUser?.role || '';
  const isAdmin = role.includes('Principal') || role.includes('Administrator') || role.includes('Admin');
  const isTeacher = role.includes('Teacher') || role.includes('Faculty');
  const userFullName = currentUser?.name || currentUser?.fullName || '';
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [teacherFilter, setTeacherFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDailyAtt, setStudentDailyAtt] = useState({});

  const handleQuickStudentAttendance = async (studentId, status) => {
    const nextStatus = studentDailyAtt[studentId] === status ? null : status;
    setStudentDailyAtt((prev) => ({ ...prev, [studentId]: nextStatus }));

    if (nextStatus) {
      try {
        const res = await markAttendance({
          targetId: `student_${studentId}`,
          targetType: 'student',
          status: nextStatus,
        });

        if (res.success && res.attendancePercent !== undefined) {
          // Automatically update student's attendance percentage
          setStudents((prev) =>
            prev.map((s) =>
              s.id === studentId ? { ...s, attendancePercent: res.attendancePercent } : s
            )
          );
        }
      } catch (err) {
        console.warn('MongoDB student attendance sync error:', err.message);
      }
    }
  };

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNo: '',
    grade: 'Class 10',
    section: 'A',
    gender: 'Male',
    parentName: '',
    phone: '',
    status: 'Active',
    attendancePercent: 85,
    academicPercent: 75,
    classTeacher: 'Shri Devendra Kumar',
    performance: 'Good',
  });

  // Performance update form state
  const [perfForm, setPerfForm] = useState({
    attendancePercent: 85,
    academicPercent: 75,
    classTeacher: '',
    performance: 'Good',
    status: 'Active',
  });

  // Unique list of class teachers from students & teachers
  const availableTeachers = teachers.length > 0 
    ? teachers.map(t => t.name)
    : [
        'Shri Vijay Pratap',
        'Shri Suresh Babu',
        'Shri Arvind Patel',
        'Shri Harish Chandra',
        'Smt. Pratibha Tiwari',
        'Shri Satish Kumar',
        'Shri Manoj Shukla',
        'Shri Alok Bajpai',
        'Shri Devendra Kumar',
        'Smt. Sunita Devi',
        'Shri B.P. Maurya',
        'Shri Om Prakash',
        'Shri S.N. Singh',
        'Dr. R.K. Pandey',
        'Shri R.C. Srivastava'
      ];

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.parentName && s.parentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.classTeacher && s.classTeacher.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesGrade = gradeFilter === 'All' || s.grade.includes(gradeFilter);
    const matchesTeacher = teacherFilter === 'All' || s.classTeacher === teacherFilter;
    return matchesSearch && matchesGrade && matchesTeacher;
  });

  // Summary Metrics
  const totalStudentsCount = students.length;
  const avgAttendance = totalStudentsCount > 0 
    ? Math.round(students.reduce((acc, s) => acc + (Number(s.attendancePercent) || 0), 0) / totalStudentsCount)
    : 0;
  const avgAcademic = totalStudentsCount > 0 
    ? Math.round(students.reduce((acc, s) => acc + (Number(s.academicPercent) || 0), 0) / totalStudentsCount)
    : 0;
  const excellentPerformers = students.filter(s => (s.academicPercent >= 85) || s.performance === 'Excellent').length;

  // Handle Add Student submit
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.rollNo) {
      alert('Please provide student name and roll number.');
      return;
    }

    const studentToAdd = {
      ...newStudent,
      attendancePercent: Number(newStudent.attendancePercent) || 75,
      academicPercent: Number(newStudent.academicPercent) || 70,
      id: Date.now(),
    };

    setStudents([studentToAdd, ...students]);
    setIsAddModalOpen(false);
    setNewStudent({
      name: '',
      rollNo: '',
      grade: 'Class 10',
      section: 'A',
      gender: 'Male',
      parentName: '',
      phone: '',
      status: 'Active',
      attendancePercent: 85,
      academicPercent: 75,
      classTeacher: 'Shri Devendra Kumar',
      performance: 'Good',
    });
  };

  // Open Update Performance Modal
  const openUpdateModal = (student) => {
    setSelectedStudent(student);
    setPerfForm({
      attendancePercent: student.attendancePercent ?? 80,
      academicPercent: student.academicPercent ?? 75,
      classTeacher: student.classTeacher || 'Shri Devendra Kumar',
      performance: student.performance || 'Good',
      status: student.status || 'Active',
    });
    setIsUpdateModalOpen(true);
  };

  // Save updated performance
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    setStudents(
      students.map((s) =>
        s.id === selectedStudent.id
          ? {
              ...s,
              attendancePercent: Number(perfForm.attendancePercent),
              academicPercent: Number(perfForm.academicPercent),
              classTeacher: perfForm.classTeacher,
              performance: perfForm.performance,
              status: perfForm.status,
            }
          : s
      )
    );
    setIsUpdateModalOpen(false);
    setSelectedStudent(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this student record?')) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  // Helper for performance badge styling
  const getPerfBadgeClass = (perf) => {
    switch (perf) {
      case 'Excellent':
        return 'badge-perf-excellent';
      case 'Very Good':
        return 'badge-perf-good';
      case 'Good':
        return 'badge-perf-average';
      case 'Average':
        return 'badge-perf-warning';
      default:
        return 'badge-perf-danger';
    }
  };

  return (
    <div className="content-body">
      {/* Top Header */}
      <div className="page-toolbar">
        <div>
          <h2>Student Records &amp; Academic Performance</h2>
          <p>
            Directory of {students.length} students across Classes 6th to 12th with live attendance, academic status &amp; class teacher updates.
          </p>
        </div>
        {(isAdmin || isTeacher) && (
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <UserPlus size={16} /> Add New Student
          </button>
        )}
      </div>

      {/* Overview Metric Cards */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Total Enrolled</span>
            <div className="stat-icon-wrapper" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <GraduationCap size={20} />
            </div>
          </div>
          <div className="stat-value">{totalStudentsCount}</div>
          <p className="stat-hint">Classes 6th to 12th</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Avg. Attendance</span>
            <div className="stat-icon-wrapper" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
              <UserCheck size={20} />
            </div>
          </div>
          <div className="stat-value">{avgAttendance}%</div>
          <div className="metric-bar-bg">
            <div className="metric-bar-fill" style={{ width: `${avgAttendance}%`, background: 'var(--success)' }}></div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Avg. Academic Score</span>
            <div className="stat-icon-wrapper" style={{ background: 'var(--purple-bg)', color: 'var(--purple)' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="stat-value">{avgAcademic}%</div>
          <div className="metric-bar-bg">
            <div className="metric-bar-fill" style={{ width: `${avgAcademic}%`, background: 'var(--purple)' }}></div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Top Performers (&gt;85%)</span>
            <div className="stat-icon-wrapper" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}>
              <Award size={20} />
            </div>
          </div>
          <div className="stat-value">{excellentPerformers}</div>
          <p className="stat-hint">Rank 1 / Distinction Students</p>
        </div>
      </div>

      {/* Main Student Card Table */}
      <div className="card">
        {/* Card Toolbar: Search & Filters */}
        <div className="card-header" style={{ flexWrap: 'wrap', gap: '14px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="search-input-wrapper" style={{ minWidth: '260px' }}>
            <Search className="search-icon-inside" size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by student name, roll no, teacher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>Class:</span>
              <select
                className="form-select"
                style={{ width: '150px', padding: '7px 10px' }}
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
              >
                <option value="All">All Classes (6-12)</option>
                <option value="Class 6">Class 6th</option>
                <option value="Class 7">Class 7th</option>
                <option value="Class 8">Class 8th</option>
                <option value="Class 9">Class 9th</option>
                <option value="Class 10">Class 10th</option>
                <option value="Class 11">Class 11th</option>
                <option value="Class 12">Class 12th</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>Class Teacher:</span>
              <select
                className="form-select"
                style={{ maxWidth: '200px', padding: '7px 10px' }}
                value={teacherFilter}
                onChange={(e) => setTeacherFilter(e.target.value)}
              >
                <option value="All">All Teachers</option>
                {Array.from(new Set(students.map(s => s.classTeacher).filter(Boolean))).map((tName) => (
                  <option key={tName} value={tName}>{tName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Info</th>
                <th>Class &amp; Sec</th>
                <th>Class Teacher (Incharge)</th>
                <th>Attendance %</th>
                <th>Academic Status %</th>
                <th>Performance</th>
                <th>Guardian &amp; Phone</th>
                <th style={{ textAlign: 'center' }}>Teacher Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const att = Number(student.attendancePercent) || 0;
                  const acad = Number(student.academicPercent) || 0;
                  const attColor = att >= 85 ? 'var(--success)' : att >= 75 ? 'var(--warning)' : 'var(--danger)';
                  const acadColor = acad >= 80 ? 'var(--purple)' : acad >= 60 ? 'var(--primary)' : 'var(--danger)';

                  return (
                    <tr key={student.id}>
                      <td>
                        <strong style={{ color: 'var(--primary)', letterSpacing: '0.02em' }}>{student.rollNo}</strong>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{student.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{student.gender} &bull; <span className={`badge badge-${student.status ? student.status.toLowerCase() : 'active'}`}>{student.status || 'Active'}</span></div>
                      </td>
                      <td>
                        <span className="badge-class">{student.grade} - {student.section}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div className="teacher-micro-icon">CT</div>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-main)' }}>
                            {student.classTeacher || 'Not Assigned'}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 700, fontSize: '13px', color: attColor, minWidth: '36px' }}>
                              {att}%
                            </span>
                            <div className="mini-progress-bar">
                              <div
                                className="mini-progress-fill"
                                style={{ width: `${Math.min(att, 100)}%`, background: attColor }}
                              ></div>
                            </div>
                          </div>
                          {(isAdmin || isTeacher) && (
                            <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                              <button
                                type="button"
                                className={`attendance-btn present-btn${studentDailyAtt[student.id] === 'present' ? ' selected' : ''}`}
                                style={{ padding: '2px 6px', fontSize: '10px' }}
                                onClick={() => handleQuickStudentAttendance(student.id, 'present')}
                                title="Mark Present (Updates MongoDB & Attendance %)"
                              >
                                <CheckCircle size={10} /> P
                              </button>
                              <button
                                type="button"
                                className={`attendance-btn absent-btn${studentDailyAtt[student.id] === 'absent' ? ' selected' : ''}`}
                                style={{ padding: '2px 6px', fontSize: '10px' }}
                                onClick={() => handleQuickStudentAttendance(student.id, 'absent')}
                                title="Mark Absent (Updates MongoDB & Attendance %)"
                              >
                                <XCircle size={10} /> A
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 700, fontSize: '13px', color: acadColor, minWidth: '36px' }}>
                            {acad}%
                          </span>
                          <div className="mini-progress-bar">
                            <div
                              className="mini-progress-fill"
                              style={{ width: `${Math.min(acad, 100)}%`, background: acadColor }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`perf-badge ${getPerfBadgeClass(student.performance)}`}>
                          {student.performance || 'Good'}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '12px', color: 'var(--text-main)' }}>{student.parentName || 'N/A'}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{student.phone || 'N/A'}</div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          {(isAdmin || (isTeacher && (student.classTeacher === userFullName || !student.classTeacher || userFullName.includes('Devendra')))) ? (
                            <button
                              type="button"
                              className="btn-update-perf"
                              onClick={() => openUpdateModal(student)}
                              title="Update Performance & Attendance"
                            >
                              <Edit3 size={13} /> Update
                            </button>
                          ) : (
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                              View Only
                            </span>
                          )}

                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => handleDelete(student.id)}
                              className="btn-delete-icon"
                              title="Delete Student Record (Admin Only)"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="empty-state">
                    No students found matching your search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── UPDATE PERFORMANCE MODAL (For Class Teacher) ────────────────── */}
      {isUpdateModalOpen && selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ maxWidth: '560px' }}>
            <div className="modal-header" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', color: '#fff' }}>
              <div>
                <h3 style={{ color: '#fff', fontSize: '17px' }}>
                  Update Student Performance
                </h3>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {selectedStudent.name} &bull; Roll: {selectedStudent.rollNo} ({selectedStudent.grade} - {selectedStudent.section})
                </span>
              </div>
              <button
                className="modal-close-btn"
                style={{ color: '#fff' }}
                onClick={() => setIsUpdateModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit}>
              <div className="modal-body">
                {/* Class Teacher Field */}
                <div className="form-group">
                  <label>Class Teacher (Authorized Incharge) *</label>
                  <select
                    className="form-select"
                    value={perfForm.classTeacher}
                    onChange={(e) => setPerfForm({ ...perfForm, classTeacher: e.target.value })}
                  >
                    {availableTeachers.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>

                {/* Attendance Percentage Input */}
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Attendance Percentage (%) *</label>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: perfForm.attendancePercent >= 75 ? 'var(--success)' : 'var(--danger)' }}>
                      {perfForm.attendancePercent}%
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={perfForm.attendancePercent}
                      onChange={(e) => setPerfForm({ ...perfForm, attendancePercent: Number(e.target.value) })}
                      style={{ flex: 1, accentColor: 'var(--success)' }}
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="form-input"
                      style={{ width: '80px', textAlign: 'center' }}
                      value={perfForm.attendancePercent}
                      onChange={(e) => setPerfForm({ ...perfForm, attendancePercent: Math.min(100, Math.max(0, Number(e.target.value))) })}
                    />
                  </div>
                </div>

                {/* Academic Status Percentage Input */}
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Academic Status / Overall Marks (%) *</label>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--purple)' }}>
                      {perfForm.academicPercent}%
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={perfForm.academicPercent}
                      onChange={(e) => setPerfForm({ ...perfForm, academicPercent: Number(e.target.value) })}
                      style={{ flex: 1, accentColor: 'var(--purple)' }}
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="form-input"
                      style={{ width: '80px', textAlign: 'center' }}
                      value={perfForm.academicPercent}
                      onChange={(e) => setPerfForm({ ...perfForm, academicPercent: Math.min(100, Math.max(0, Number(e.target.value))) })}
                    />
                  </div>
                </div>

                {/* Performance Evaluation & Status Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label>Performance Rating *</label>
                    <select
                      className="form-select"
                      value={perfForm.performance}
                      onChange={(e) => setPerfForm({ ...perfForm, performance: e.target.value })}
                    >
                      <option value="Excellent">Excellent (&gt;85%)</option>
                      <option value="Very Good">Very Good (75% - 85%)</option>
                      <option value="Good">Good (65% - 75%)</option>
                      <option value="Average">Average (50% - 65%)</option>
                      <option value="Needs Improvement">Needs Improvement (&lt;50%)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Enrollment Status</label>
                    <select
                      className="form-select"
                      value={perfForm.status}
                      onChange={(e) => setPerfForm({ ...perfForm, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsUpdateModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── ADD NEW STUDENT MODAL ────────────────────────────────────────── */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <h3>Add New Student Admission</h3>
              <button
                className="modal-close-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Student Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Vikas Shukla"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label>Roll Number *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="e.g. SJP-1012"
                      value={newStudent.rollNo}
                      onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      className="form-select"
                      value={newStudent.gender}
                      onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label>Class / Grade</label>
                    <select
                      className="form-select"
                      value={newStudent.grade}
                      onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                    >
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11 (Science)">Class 11 (Science)</option>
                      <option value="Class 11 (Arts)">Class 11 (Arts)</option>
                      <option value="Class 11 (Commerce)">Class 11 (Commerce)</option>
                      <option value="Class 12 (Science)">Class 12 (Science)</option>
                      <option value="Class 12 (Arts)">Class 12 (Arts)</option>
                      <option value="Class 12 (Commerce)">Class 12 (Commerce)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Section</label>
                    <select
                      className="form-select"
                      value={newStudent.section}
                      onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                    >
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Assigned Class Teacher *</label>
                  <select
                    className="form-select"
                    value={newStudent.classTeacher}
                    onChange={(e) => setNewStudent({ ...newStudent, classTeacher: e.target.value })}
                  >
                    {availableTeachers.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label>Initial Attendance %</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="form-input"
                      value={newStudent.attendancePercent}
                      onChange={(e) => setNewStudent({ ...newStudent, attendancePercent: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Academic Status %</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="form-input"
                      value={newStudent.academicPercent}
                      onChange={(e) => setNewStudent({ ...newStudent, academicPercent: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Father / Guardian Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Ramesh Chandra Shukla"
                    value={newStudent.parentName}
                    onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Emergency Contact / Mobile</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. +91 94500 00000"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
