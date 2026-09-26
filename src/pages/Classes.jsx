import React, { useState } from 'react';
import { BookOpen, Plus, X, User, MapPin, Clock, Filter } from 'lucide-react';

export default function Classes({ classes, setClasses }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sectionFilter, setSectionFilter] = useState('All');

  const [newClass, setNewClass] = useState({
    name: '',
    gradeNumber: '10',
    classTeacher: '',
    room: '',
    totalStudents: 50,
    schedule: '8:00 AM - 2:00 PM',
  });

  const filteredClasses = classes.filter((c) => {
    if (sectionFilter === 'All') return true;
    if (sectionFilter === 'junior') return ['6', '7', '8'].includes(c.gradeNumber);
    if (sectionFilter === 'highschool') return ['9', '10'].includes(c.gradeNumber);
    if (sectionFilter === 'inter') return ['11', '12'].includes(c.gradeNumber);
    return true;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newClass.name) {
      alert('Please provide a class name.');
      return;
    }

    const classToAdd = {
      ...newClass,
      id: Date.now(),
    };

    setClasses([...classes, classToAdd]);
    setIsModalOpen(false);
    setNewClass({
      name: '',
      gradeNumber: '10',
      classTeacher: '',
      room: '',
      totalStudents: 50,
      schedule: '8:00 AM - 2:00 PM',
    });
  };

  return (
    <div className="content-body">
      <div className="page-toolbar">
        <div>
          <h2>Classes (6th to 12th)</h2>
          <p>Section allocation, room numbers, and class teachers across Junior, High School & Intermediate wings.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Add Class
        </button>
      </div>

      {/* Filter Tabs for 6th to 12th */}
      <div style={{ marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div className="tab-pills">
          <button
            type="button"
            className={`tab-pill-btn ${sectionFilter === 'All' ? 'active' : ''}`}
            onClick={() => setSectionFilter('All')}
          >
            All Classes (6th-12th)
          </button>
          <button
            type="button"
            className={`tab-pill-btn ${sectionFilter === 'junior' ? 'active' : ''}`}
            onClick={() => setSectionFilter('junior')}
          >
            Junior (6th - 8th)
          </button>
          <button
            type="button"
            className={`tab-pill-btn ${sectionFilter === 'highschool' ? 'active' : ''}`}
            onClick={() => setSectionFilter('highschool')}
          >
            High School (9th - 10th)
          </button>
          <button
            type="button"
            className={`tab-pill-btn ${sectionFilter === 'inter' ? 'active' : ''}`}
            onClick={() => setSectionFilter('inter')}
          >
            Intermediate (11th - 12th)
          </button>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="cards-grid">
        {filteredClasses.map((c) => (
          <div key={c.id} className="info-card">
            <div className="info-card-header">
              <div
                className="avatar-circle"
                style={{ background: '#f5f3ff', color: '#7c3aed' }}
              >
                <BookOpen size={20} />
              </div>
              <div className="info-card-title">
                <h4>{c.name}</h4>
                <span>{c.totalStudents} Enrolled Students</span>
              </div>
            </div>

            <div className="info-card-details">
              <div className="detail-row">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={14} color="var(--text-muted)" /> Class Teacher:
                </span>
                <strong>{c.classTeacher || 'Not Assigned'}</strong>
              </div>

              <div className="detail-row">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="var(--text-muted)" /> Room:
                </span>
                <strong>{c.room || 'TBD'}</strong>
              </div>

              <div className="detail-row">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="var(--text-muted)" /> Daily Schedule:
                </span>
                <span>{c.schedule}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3>Add New Class Section</h3>
              <button
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Class / Grade *</label>
                  <select
                    className="form-select"
                    value={newClass.gradeNumber}
                    onChange={(e) => {
                      const grade = e.target.value;
                      setNewClass({ 
                        ...newClass, 
                        gradeNumber: grade,
                        name: `Class ${grade} - Section A`
                      });
                    }}
                  >
                    <option value="6">Class 6th</option>
                    <option value="7">Class 7th</option>
                    <option value="8">Class 8th</option>
                    <option value="9">Class 9th</option>
                    <option value="10">Class 10th (High School)</option>
                    <option value="11">Class 11th (Intermediate)</option>
                    <option value="12">Class 12th (Intermediate)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Full Section Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Class 11 - Science Stream"
                    value={newClass.name}
                    onChange={(e) =>
                      setNewClass({ ...newClass, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Class Teacher</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Shri S.N. Singh"
                    value={newClass.classTeacher}
                    onChange={(e) =>
                      setNewClass({ ...newClass, classTeacher: e.target.value })
                    }
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label>Room Number</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Room 204"
                      value={newClass.room}
                      onChange={(e) =>
                        setNewClass({ ...newClass, room: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Total Students</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="50"
                      value={newClass.totalStudents}
                      onChange={(e) =>
                        setNewClass({
                          ...newClass,
                          totalStudents: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Daily Schedule / Timing</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="8:00 AM - 2:00 PM"
                    value={newClass.schedule}
                    onChange={(e) =>
                      setNewClass({ ...newClass, schedule: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
