import React, { useState } from 'react';
import { Bell, Plus, X, Trash2, Calendar } from 'lucide-react';

export default function Notices({ notices, setNotices }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'General',
    priority: 'Normal',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.description) {
      alert('Please provide title and announcement details.');
      return;
    }

    const noticeToAdd = {
      ...newNotice,
      id: Date.now(),
    };

    setNotices([noticeToAdd, ...notices]);
    setIsModalOpen(false);
    setNewNotice({
      title: '',
      category: 'General',
      priority: 'Normal',
      date: new Date().toISOString().split('T')[0],
      description: '',
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this notice?')) {
      setNotices(notices.filter((n) => n.id !== id));
    }
  };

  return (
    <div className="content-body">
      <div className="page-toolbar">
        <div>
          <h2>Notice Board & Announcements</h2>
          <p>Broadcast school circulars, event announcements, and administrative updates.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Post Notice
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="notice-list">
            {notices.map((notice) => (
              <div key={notice.id} className="notice-item">
                <div className="notice-top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="notice-title">{notice.title}</span>
                    <span className={`badge badge-priority-${notice.priority.toLowerCase()}`}>
                      {notice.priority} Priority
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        background: '#f1f5f9',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {notice.category}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(notice.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--danger)',
                      cursor: 'pointer',
                    }}
                    title="Delete Notice"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <p className="notice-desc">{notice.description}</p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    marginTop: '4px',
                  }}
                >
                  <Calendar size={13} /> Posted Date: {notice.date}
                </div>
              </div>
            ))}

            {notices.length === 0 && (
              <div className="empty-state">No announcements posted yet.</div>
            )}
          </div>
        </div>
      </div>

      {/* Add Notice Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3>Post New Notice</h3>
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
                  <label>Notice Title *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Science Fair Registration"
                    value={newNotice.title}
                    onChange={(e) =>
                      setNewNotice({ ...newNotice, title: e.target.value })
                    }
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      className="form-select"
                      value={newNotice.category}
                      onChange={(e) =>
                        setNewNotice({ ...newNotice, category: e.target.value })
                      }
                    >
                      <option value="General">General</option>
                      <option value="Exam">Exam</option>
                      <option value="Events">Events</option>
                      <option value="Holiday">Holiday</option>
                      <option value="Meeting">Meeting</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Priority</label>
                    <select
                      className="form-select"
                      value={newNotice.priority}
                      onChange={(e) =>
                        setNewNotice({ ...newNotice, priority: e.target.value })
                      }
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newNotice.date}
                    onChange={(e) =>
                      setNewNotice({ ...newNotice, date: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Notice Content / Description *</label>
                  <textarea
                    rows={4}
                    required
                    className="form-input"
                    placeholder="Enter detailed notice information here..."
                    value={newNotice.description}
                    onChange={(e) =>
                      setNewNotice({ ...newNotice, description: e.target.value })
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
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
