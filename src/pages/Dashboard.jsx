import React from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Bell, 
  ArrowRight, 
  UserCheck, 
  CalendarClock, 
  MapPin, 
  Award,
  Trophy,
  Medal,
  Star,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  BookmarkCheck
} from 'lucide-react';
import { collegeInfo, dailyBellSchedule } from '../data/mockData';

export default function Dashboard({ students = [], teachers = [], classes = [], peons = [], notices = [], setActiveTab }) {
  const stats = [
    {
      title: 'Classes (6th to 12th)',
      value: `${classes.length} Sections`,
      subtitle: 'Class 6th to 12th',
      icon: BookOpen,
      colorClass: 'purple',
      tab: 'classes',
    },
    {
      title: 'Teaching Faculty',
      value: `${teachers.length} Teachers`,
      subtitle: '35+ Qualified Staff',
      icon: GraduationCap,
      colorClass: 'green',
      tab: 'teachers',
    },
    {
      title: 'Support Staff (Peons)',
      value: `${peons.length} Peons`,
      subtitle: 'Dedicated Campus Sevak',
      icon: UserCheck,
      colorClass: 'gold',
      tab: 'teachers',
    },
    {
      title: 'Daily Class Schedule',
      value: '7 Periods',
      subtitle: '8:00 AM - 2:00 PM',
      icon: CalendarClock,
      colorClass: 'blue',
      tab: 'schedule',
    },
  ];

  // College Achievements & Academic Excellence data
  const achievements = [
    {
      icon: Trophy,
      title: '100% Board Pass Rate',
      subtitle: 'U.P. Board High School & Intermediate 2025-26',
      badge: 'Board Record',
      color: '#f59e0b',
      bg: '#fffbeb',
      border: '#fde68a'
    },
    {
      icon: Medal,
      title: 'District Rank 1 Topper',
      subtitle: 'Hardoi District Merit in Senior Secondary Science',
      badge: 'Merit Roll',
      color: '#8b5cf6',
      bg: '#f5f3ff',
      border: '#ddd6fe'
    },
    {
      icon: Star,
      title: '45+ Distinction Holders',
      subtitle: 'Scored >80% aggregate in State Board Examinations',
      badge: 'High Honors',
      color: '#10b981',
      bg: '#ecfdf5',
      border: '#a7f3d0'
    },
    {
      icon: Award,
      title: 'Best Eco-Campus Award',
      subtitle: 'Recognized for infrastructure, labs & discipline',
      badge: 'State Honor',
      color: '#2563eb',
      bg: '#eff6ff',
      border: '#bfdbfe'
    }
  ];

  // Top Student Toppers / Academic Hall of Fame
  const topPerformers = [
    { name: 'Meena Awasthi', grade: 'Class 12 (Science)', score: '95.0%', rank: 'Rank 1 & District Topper', teacher: 'Shri S.N. Singh', tag: 'Gold Medal' },
    { name: 'Kavya Singh', grade: 'Class 8 (Section A)', score: '94.0%', rank: 'Rank 1 (Middle Wing)', teacher: 'Smt. Pratibha Tiwari', tag: 'Excellence' },
    { name: 'Sakshi Verma', grade: 'Class 10 (Section A)', score: '92.0%', rank: 'Rank 1 (High School)', teacher: 'Shri Devendra Kumar', tag: 'Silver Medal' },
    { name: 'Pooja Devi', grade: 'Class 7 (Section A)', score: '91.0%', rank: 'Rank 1 (Junior Section)', teacher: 'Shri Arvind Patel', tag: 'Distinction' },
  ];

  return (
    <div className="content-body">
      {/* College Hero Picture Banner */}
      <div className="college-hero">
        <img
          src={collegeInfo.bannerImage}
          alt="Shri Janki Prasad Inter College Campus"
          className="college-hero-bg"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="college-hero-overlay"></div>
        <div className="college-hero-content">
          <div className="college-badge-strip">
            <span className="hero-pill gold">★ {collegeInfo.established}</span>
            <span className="hero-pill">U.P. Board Code: 1408</span>
            <span className="hero-pill">Classes 6th to 12th</span>
            <span className="hero-pill">35+ Faculty | 5 Peons</span>
          </div>
          <h1 className="college-hero-title">{collegeInfo.name}</h1>
          <p className="college-hero-subtitle">
            <MapPin size={16} /> {collegeInfo.location}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className="stat-card" 
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveTab(stat.tab)}
            >
              <div className={`stat-icon ${stat.colorClass}`}>
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.title}</div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{stat.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── ACADEMIC EXCELLENCE & COLLEGE ACHIEVEMENTS SECTION ───────────── */}
      <div className="card" style={{ marginBottom: '28px', overflow: 'hidden' }}>
        <div className="card-header" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', color: '#ffffff', padding: '20px 24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '6px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Sparkles size={14} color="#fde047" />
                <span style={{ color: '#fde047', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>College Pride</span>
              </div>
              <span style={{ color: '#94a3b8', fontSize: '12px' }}>U.P. Board Affiliated &bull; Code 1408</span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
              Academic Excellence &amp; Institutional Achievements
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '2px' }}>
              Highlights of student distinctions, state board merit standings, and college milestones.
            </p>
          </div>
          <button 
            className="btn btn-secondary" 
            style={{ background: 'rgba(255,255,255,0.12)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', fontSize: '12px' }}
            onClick={() => setActiveTab('students')}
          >
            View Student Records <ArrowRight size={14} />
          </button>
        </div>

        <div className="card-body" style={{ padding: '24px' }}>
          {/* Achievement Pillars 4-Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            {achievements.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  style={{
                    background: item.bg,
                    border: `1px solid ${item.border}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div 
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '8px',
                        background: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.color,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <span 
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: item.color,
                        background: '#ffffff',
                        padding: '2px 8px',
                        borderRadius: '99px',
                        border: `1px solid ${item.border}`
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '3px' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Academic Toppers Spotlight / Hall of Fame */}
          <div style={{ background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trophy size={18} color="#d97706" />
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                  Academic Hall of Fame &mdash; Top Board Performers
                </h4>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                Session 2025-2026
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {topPerformers.map((topper, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '14px',
                    position: 'relative',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-main)' }}>
                      {topper.name}
                    </div>
                    <span 
                      style={{
                        fontSize: '13px',
                        fontWeight: 800,
                        color: 'var(--purple)',
                        background: 'var(--purple-bg)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '1px solid #ddd6fe'
                      }}
                    >
                      {topper.score}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, marginBottom: '4px' }}>
                    {topper.grade}
                  </div>
                  <div style={{ fontSize: '11px', color: '#059669', fontWeight: 700, marginBottom: '6px' }}>
                    ★ {topper.rank}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px dashed #e2e8f0', paddingTop: '6px' }}>
                    Class Incharge: <strong>{topper.teacher}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Daily Class Bell Schedule Overview & Recent Notices */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        {/* Daily Bell Schedule Snippet */}
        <div className="card">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarClock size={18} color="var(--primary)" />
              <h3>College Daily Bell Schedule</h3>
            </div>
            <button 
              className="btn btn-secondary" 
              style={{ padding: '6px 12px', fontSize: '12px' }}
              onClick={() => setActiveTab('schedule')}
            >
              Full Timetable <ArrowRight size={14} />
            </button>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Timing</th>
                  <th>Activity / Class</th>
                </tr>
              </thead>
              <tbody>
                {dailyBellSchedule.slice(0, 6).map((item, idx) => (
                  <tr 
                    key={idx}
                    className={item.type === 'prayer' ? 'period-row-prayer' : item.type === 'break' ? 'period-row-break' : ''}
                  >
                    <td><strong>{item.period}</strong></td>
                    <td style={{ whiteSpace: 'nowrap' }}>{item.time}</td>
                    <td>{item.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Latest College Notices */}
        <div className="card">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell size={18} color="var(--orange)" />
              <h3>Notice Board &amp; Circulars</h3>
            </div>
            <button 
              className="btn btn-secondary" 
              style={{ padding: '6px 12px', fontSize: '12px' }}
              onClick={() => setActiveTab('notices')}
            >
              All Notices <ArrowRight size={14} />
            </button>
          </div>
          <div className="card-body">
            <div className="notice-list">
              {notices.map((notice) => (
                <div key={notice.id} className="notice-item">
                  <div className="notice-top">
                    <span className="notice-title">{notice.title}</span>
                    <span className={`badge badge-priority-${notice.priority.toLowerCase()}`}>
                      {notice.priority}
                    </span>
                  </div>
                  <p className="notice-desc">{notice.description}</p>
                  <span className="notice-date">📅 {notice.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
