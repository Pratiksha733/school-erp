import React, { useState } from "react";
import {
  Search, UserPlus, X, Mail, Phone,
  GraduationCap, UserCheck, CheckCircle, XCircle, Award,
} from "lucide-react";
import { markAttendance } from "../services/api";

export default function Teachers({ teachers, setTeachers, peons, setPeons }) {
  const [activeTab, setActiveTab] = useState("teachers");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isPeonModalOpen, setIsPeonModalOpen] = useState(false);

  const [teacherAttendance, setTeacherAttendance] = useState({});
  const [peonAttendance, setPeonAttendance] = useState({});

  const markTeacherAttendance = async (id, status) => {
    const nextStatus = teacherAttendance[id] === status ? null : status;
    setTeacherAttendance((prev) => ({ ...prev, [id]: nextStatus }));

    if (nextStatus) {
      try {
        const res = await markAttendance({
          targetId: `teacher_${id}`,
          targetType: "teacher",
          status: nextStatus,
        });

        if (res.success && res.attendancePercent !== undefined) {
          // Automatically update teacher's attendance percentage
          setTeachers((prevTeachers) =>
            prevTeachers.map((t) =>
              t.id === id ? { ...t, attendancePercent: res.attendancePercent } : t
            )
          );
        }
      } catch (err) {
        console.warn("MongoDB attendance sync error:", err.message);
      }
    }
  };

  const markPeonAttendance = async (id, status) => {
    const nextStatus = peonAttendance[id] === status ? null : status;
    setPeonAttendance((prev) => ({ ...prev, [id]: nextStatus }));

    if (nextStatus) {
      try {
        await markAttendance({
          targetId: `peon_${id}`,
          targetType: "peon",
          status: nextStatus,
        });
      } catch (err) {
        console.warn("MongoDB peon attendance sync error:", err.message);
      }
    }
  };

  const principal = teachers.find((t) => t.id === 1) || {
    id: 1, name: "Dr. R.K. Pandey", subject: "Principal & Hindi Lit.",
    email: "rk.pandey@sjpcollege.ac.in", phone: "+91 94150 11001",
    assignedClass: "Class 12 (Arts)", experience: "22 Years",
  };

  const [newTeacher, setNewTeacher] = useState({
    name: "", subject: "", email: "", phone: "", assignedClass: "Class 10-A", experience: "5 Years",
  });
  const [newPeon, setNewPeon] = useState({
    name: "", designation: "Classroom Attendant (Peon)", dutyArea: "Campus Wing",
    phone: "", experience: "5 Years", status: "Active",
  });

  const teacherList = teachers.filter((t) => t.id !== 1);
  const filteredTeachers = teacherList.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPeons = peons.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.dutyArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTeacherSubmit = (e) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.subject) { alert("Please fill in teacher name and subject."); return; }
    setTeachers([{ ...newTeacher, id: Date.now() }, ...teachers]);
    setIsTeacherModalOpen(false);
    setNewTeacher({ name: "", subject: "", email: "", phone: "", assignedClass: "Class 10-A", experience: "5 Years" });
  };
  const handlePeonSubmit = (e) => {
    e.preventDefault();
    if (!newPeon.name) { alert("Please fill in staff member name."); return; }
    setPeons([{ ...newPeon, id: Date.now() }, ...peons]);
    setIsPeonModalOpen(false);
    setNewPeon({ name: "", designation: "Classroom Attendant (Peon)", dutyArea: "Campus Wing", phone: "", experience: "5 Years", status: "Active" });
  };

  const teacherPresentCount = Object.values(teacherAttendance).filter((v) => v === "present").length;
  const teacherAbsentCount = Object.values(teacherAttendance).filter((v) => v === "absent").length;
  const peonPresentCount = Object.values(peonAttendance).filter((v) => v === "present").length;
  const peonAbsentCount = Object.values(peonAttendance).filter((v) => v === "absent").length;

  const getInitials = (name, prefixes) =>
    name.replace(new RegExp(`^(${prefixes})\\s*`), "").split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <div className="content-body">
      <div className="page-toolbar">
        <div>
          <h2>Faculty &amp; Staff Directory</h2>
          <p>
            {activeTab === "teachers"
              ? `Displaying ${teacherList.length} qualified teaching faculty members.`
              : activeTab === "peons"
              ? `Displaying ${peons.length} dedicated support staff & peons.`
              : "Principal — Head of Institution"}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {activeTab === "teachers" && (
            <button className="btn btn-primary" onClick={() => setIsTeacherModalOpen(true)}>
              <UserPlus size={16} /> Add Teacher
            </button>
          )}
          {activeTab === "peons" && (
            <button className="btn btn-primary" onClick={() => setIsPeonModalOpen(true)}>
              <UserPlus size={16} /> Add Support Staff
            </button>
          )}
        </div>
      </div>

      {/* Tab Pills */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "14px" }}>
        <div className="tab-pills">
          <button type="button" className={`tab-pill-btn ${activeTab === "principal" ? "active" : ""}`}
            onClick={() => { setActiveTab("principal"); setSearchTerm(""); }}>
            <Award size={16} /> Principal
          </button>
          <button type="button" className={`tab-pill-btn ${activeTab === "teachers" ? "active" : ""}`}
            onClick={() => setActiveTab("teachers")}>
            <GraduationCap size={16} /> Teachers &amp; Faculty ({teacherList.length})
          </button>
          <button type="button" className={`tab-pill-btn ${activeTab === "peons" ? "active" : ""}`}
            onClick={() => setActiveTab("peons")}>
            <UserCheck size={16} /> Support Staff / Peons ({peons.length})
          </button>
        </div>
        {activeTab !== "principal" && (
          <div className="search-input-wrapper">
            <Search className="search-icon-inside" size={16} />
            <input type="text" className="search-input"
              placeholder={activeTab === "teachers" ? "Search teacher by name, subject..." : "Search staff by name, duty area..."}
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        )}
      </div>

      {/* ── PRINCIPAL TAB ── */}
      {activeTab === "principal" && (
        <div>
          <div className="principal-hero-card">
            <div className="principal-avatar">
              {getInitials(principal.name, "Dr\\.|Shri|Smt\\.")}
            </div>
            <div className="principal-info">
              <div className="principal-badge"><Award size={14} /> Principal — Head of Institution</div>
              <h2 className="principal-name">{principal.name}</h2>
              <p className="principal-subject">{principal.subject}</p>
              <div className="principal-meta-grid">
                <div className="principal-meta-item">
                  <span className="principal-meta-label">Teaching Experience</span>
                  <strong>{principal.experience}</strong>
                </div>
                <div className="principal-meta-item">
                  <span className="principal-meta-label">Assigned Class</span>
                  <strong>{principal.assignedClass}</strong>
                </div>
                <div className="principal-meta-item">
                  <span className="principal-meta-label"><Mail size={13} style={{verticalAlign:"middle",marginRight:"4px"}} />Email</span>
                  <strong>{principal.email}</strong>
                </div>
                <div className="principal-meta-item">
                  <span className="principal-meta-label"><Phone size={13} style={{verticalAlign:"middle",marginRight:"4px"}} />Phone</span>
                  <strong>{principal.phone}</strong>
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, marginRight: "12px", color: "var(--text-muted)" }}>
                  Today&apos;s Attendance:
                </span>
                <button className={`attendance-btn present-btn${teacherAttendance[principal.id] === "present" ? " selected" : ""}`}
                  onClick={() => markTeacherAttendance(principal.id, "present")}>
                  <CheckCircle size={15} /> Present
                </button>
                <button className={`attendance-btn absent-btn${teacherAttendance[principal.id] === "absent" ? " selected" : ""}`}
                  onClick={() => markTeacherAttendance(principal.id, "absent")}>
                  <XCircle size={15} /> Absent
                </button>
              </div>
              {teacherAttendance[principal.id] && (
                <div style={{ marginTop: "10px" }}>
                  <span className={`badge ${teacherAttendance[principal.id] === "present" ? "badge-active" : "badge-absent"}`}>
                    Marked {teacherAttendance[principal.id] === "present" ? "✓ Present" : "✗ Absent"} Today
                  </span>
                </div>
              )}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "24px" }}>
            <div className="stat-card" style={{ background: "var(--primary-light)", border: "1px solid #bfdbfe" }}>
              <p className="stat-label">Institution</p>
              <p className="stat-value" style={{ fontSize: "15px" }}>SHRI JANKI PRASAD INTER COLLEGE</p>
            </div>
            <div className="stat-card" style={{ background: "var(--success-bg)", border: "1px solid #a7f3d0" }}>
              <p className="stat-label">Affiliation</p>
              <p className="stat-value" style={{ fontSize: "15px" }}>U.P. State Board</p>
            </div>
            <div className="stat-card" style={{ background: "var(--warning-bg)", border: "1px solid #fde68a" }}>
              <p className="stat-label">College Code</p>
              <p className="stat-value" style={{ fontSize: "15px" }}>1408</p>
            </div>
            <div className="stat-card" style={{ background: "var(--purple-bg)", border: "1px solid #ddd6fe" }}>
              <p className="stat-label">Location</p>
              <p className="stat-value" style={{ fontSize: "15px" }}>Patseni, Hardoi, U.P.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── TEACHERS TAB ── */}
      {activeTab === "teachers" && (
        <>
          <div className="attendance-summary-bar">
            <span>
              Today &mdash; <strong style={{ color: "var(--success)" }}>{teacherPresentCount} Present</strong>
              {" / "}
              <strong style={{ color: "var(--danger)" }}>{teacherAbsentCount} Absent</strong>
              {" / "}
              <span style={{ color: "var(--text-muted)" }}>
                {teacherList.length - teacherPresentCount - teacherAbsentCount} Not Marked
              </span>
            </span>
          </div>
          <div className="cards-grid">
            {filteredTeachers.map((teacher) => {
              const att = teacherAttendance[teacher.id];
              return (
                <div key={teacher.id} className={`info-card${att === "present" ? " card-present" : att === "absent" ? " card-absent" : ""}`}>
                  <div className="info-card-header">
                    <div className="avatar-circle">{getInitials(teacher.name, "Dr\\.|Shri|Smt\\.") || "TR"}</div>
                    <div className="info-card-title">
                      <h4>{teacher.name}</h4>
                      <span>{teacher.subject}</span>
                    </div>
                  </div>
                  <div className="info-card-details">
                    <div className="detail-row"><span>Class Assigned:</span><strong>{teacher.assignedClass}</strong></div>
                    <div className="detail-row"><span>Teaching Exp:</span><strong>{teacher.experience}</strong></div>
                    <div className="detail-row">
                      <span>Attendance Rate:</span>
                      <strong style={{ color: (teacher.attendancePercent || 100) >= 85 ? "var(--success)" : "var(--warning)" }}>
                        {teacher.attendancePercent || 100}%
                      </strong>
                    </div>
                    <div className="detail-row" style={{ marginTop: "4px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Mail size={13} /> {teacher.email}</span>
                    </div>
                    <div className="detail-row">
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Phone size={13} /> {teacher.phone}</span>
                    </div>
                  </div>
                  <div className="attendance-btn-row">
                    <button className={`attendance-btn present-btn${att === "present" ? " selected" : ""}`}
                      onClick={() => markTeacherAttendance(teacher.id, "present")}>
                      <CheckCircle size={14} /> Present
                    </button>
                    <button className={`attendance-btn absent-btn${att === "absent" ? " selected" : ""}`}
                      onClick={() => markTeacherAttendance(teacher.id, "absent")}>
                      <XCircle size={14} /> Absent
                    </button>
                  </div>
                  {att && (
                    <div style={{ textAlign: "center", marginTop: "6px" }}>
                      <span className={`badge ${att === "present" ? "badge-active" : "badge-absent"}`}>
                        {att === "present" ? "✓ Present" : "✗ Absent"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {filteredTeachers.length === 0 && <div className="empty-state">No teachers found matching your search.</div>}
        </>
      )}

      {/* ── PEONS TAB ── */}
      {activeTab === "peons" && (
        <>
          <div className="attendance-summary-bar">
            <span>
              Today &mdash; <strong style={{ color: "var(--success)" }}>{peonPresentCount} Present</strong>
              {" / "}
              <strong style={{ color: "var(--danger)" }}>{peonAbsentCount} Absent</strong>
              {" / "}
              <span style={{ color: "var(--text-muted)" }}>
                {peons.length - peonPresentCount - peonAbsentCount} Not Marked
              </span>
            </span>
          </div>
          <div className="cards-grid">
            {filteredPeons.map((peon) => {
              const att = peonAttendance[peon.id];
              return (
                <div key={peon.id} className={`info-card${att === "present" ? " card-present" : att === "absent" ? " card-absent" : ""}`}>
                  <div className="info-card-header">
                    <div className="avatar-circle peon">{getInitials(peon.name, "Shri|Smt\\.") || "PN"}</div>
                    <div className="info-card-title">
                      <h4>{peon.name}</h4>
                      <span style={{ color: "var(--warning)", fontWeight: 600 }}>{peon.designation}</span>
                    </div>
                  </div>
                  <div className="info-card-details">
                    <div className="detail-row"><span>Duty Area / Location:</span><strong>{peon.dutyArea}</strong></div>
                    <div className="detail-row"><span>Service Years:</span><strong>{peon.experience}</strong></div>
                    <div className="detail-row"><span>Status:</span><span className="badge badge-active">{peon.status}</span></div>
                    <div className="detail-row" style={{ marginTop: "4px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Phone size={13} /> {peon.phone}</span>
                    </div>
                  </div>
                  <div className="attendance-btn-row">
                    <button className={`attendance-btn present-btn${att === "present" ? " selected" : ""}`}
                      onClick={() => markPeonAttendance(peon.id, "present")}>
                      <CheckCircle size={14} /> Present
                    </button>
                    <button className={`attendance-btn absent-btn${att === "absent" ? " selected" : ""}`}
                      onClick={() => markPeonAttendance(peon.id, "absent")}>
                      <XCircle size={14} /> Absent
                    </button>
                  </div>
                  {att && (
                    <div style={{ textAlign: "center", marginTop: "6px" }}>
                      <span className={`badge ${att === "present" ? "badge-active" : "badge-absent"}`}>
                        {att === "present" ? "✓ Present" : "✗ Absent"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {filteredPeons.length === 0 && <div className="empty-state">No staff members found matching your search.</div>}
        </>
      )}

      {/* ── ADD TEACHER MODAL ── */}
      {isTeacherModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3>Add Faculty Member</h3>
              <button className="modal-close-btn" onClick={() => setIsTeacherModalOpen(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleTeacherSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Teacher Name *</label>
                  <input type="text" required className="form-input" placeholder="e.g. Shri Rajesh Mishra"
                    value={newTeacher.name} onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Subject / Department *</label>
                  <input type="text" required className="form-input" placeholder="e.g. Chemistry / Physics"
                    value={newTeacher.subject} onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="form-group">
                    <label>Assigned Class</label>
                    <input type="text" className="form-input" placeholder="e.g. Class 11-A"
                      value={newTeacher.assignedClass} onChange={(e) => setNewTeacher({ ...newTeacher, assignedClass: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Experience</label>
                    <input type="text" className="form-input" placeholder="e.g. 8 Years"
                      value={newTeacher.experience} onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-input" placeholder="e.g. faculty@sjpcollege.ac.in"
                    value={newTeacher.email} onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" className="form-input" placeholder="e.g. +91 94150 00000"
                    value={newTeacher.phone} onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsTeacherModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Teacher</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── ADD PEON MODAL ── */}
      {isPeonModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3>Add Support Staff / Peon</h3>
              <button className="modal-close-btn" onClick={() => setIsPeonModalOpen(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handlePeonSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Staff Full Name *</label>
                  <input type="text" required className="form-input" placeholder="e.g. Shri Munna Lal"
                    value={newPeon.name} onChange={(e) => setNewPeon({ ...newPeon, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Designation *</label>
                  <select className="form-select" value={newPeon.designation}
                    onChange={(e) => setNewPeon({ ...newPeon, designation: e.target.value })}>
                    <option value="Head Peon (Senior Sevak)">Head Peon (Senior Sevak)</option>
                    <option value="Classroom Attendant (Peon)">Classroom Attendant (Peon)</option>
                    <option value="Junior Wing &amp; Bell Incharge (Peon)">Junior Wing &amp; Bell Incharge (Peon)</option>
                    <option value="Campus &amp; Science Lab Attendant (Peon)">Campus &amp; Science Lab Attendant (Peon)</option>
                    <option value="Office Attendant">Office Attendant</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Duty Area / Assigned Wing</label>
                  <input type="text" className="form-input" placeholder="e.g. Middle Wing (Classes 9 &amp; 10)"
                    value={newPeon.dutyArea} onChange={(e) => setNewPeon({ ...newPeon, dutyArea: e.target.value })} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="form-group">
                    <label>Service Experience</label>
                    <input type="text" className="form-input" placeholder="e.g. 6 Years"
                      value={newPeon.experience} onChange={(e) => setNewPeon({ ...newPeon, experience: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" className="form-input" placeholder="e.g. +91 94520 00000"
                      value={newPeon.phone} onChange={(e) => setNewPeon({ ...newPeon, phone: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsPeonModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Support Staff</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
