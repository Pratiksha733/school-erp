import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  CalendarClock, 
  Bell 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, currentUser }) {
  const allMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'classes', label: 'Classes (6th - 12th)', icon: BookOpen },
    { id: 'schedule', label: 'Class Schedule', icon: CalendarClock },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'teachers', label: 'Faculty & Staff (35+ / 5)', icon: GraduationCap },
    { id: 'notices', label: 'Notices', icon: Bell },
  ];

  const menuItems = allMenuItems.filter((item) => {
    const role = currentUser?.role || '';
    const isAdmin = role.includes('Principal') || role.includes('Administrator') || role.includes('Admin');
    const isTeacher = role.includes('Teacher') || role.includes('Faculty');

    if (isAdmin) return true;
    if (isTeacher) return ['dashboard', 'schedule', 'students', 'notices'].includes(item.id);
    return ['dashboard', 'schedule', 'notices'].includes(item.id);
  });

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="school-logo-icon">SJP</div>
        <div className="school-info">
          <h2>SHRI JANKI PRASAD</h2>
          <span>Inter College, Hardoi</span>
        </div>
      </div>

      <nav style={{ flex: 1 }}>
        <ul className="nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p>Patseni, Kachhauna, Hardoi</p>
        <p style={{ marginTop: '4px', opacity: 0.7 }}>U.P. Board Code: 1408</p>
      </div>
    </aside>
  );
}
