import React from 'react';
import { LogOut, KeyRound, ShieldCheck } from 'lucide-react';

export default function Header({ title, user, jwtToken, onLogout }) {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="top-header">
      <div className="header-title">
        <h1>{title}</h1>
      </div>

      <div className="header-actions">
        <div className="current-date-badge">
          📅 {currentDate}
        </div>

        {jwtToken && (
          <div className="jwt-header-badge" title="Authenticated via JSON Web Token & MongoDB">
            <ShieldCheck size={13} color="#10b981" />
            <span>JWT Active</span>
          </div>
        )}
        
        <div className="admin-profile">
          <div className="admin-avatar">
            {user ? (user.avatar || 'JP') : 'JP'}
          </div>
          <div className="admin-text">
            <span className="admin-name">{user ? user.name : 'Principal Office'}</span>
            <span className="admin-role">{user ? user.role : 'SJP Inter College'}</span>
          </div>

          {onLogout && (
            <button
              type="button"
              className="btn-header-logout"
              onClick={onLogout}
              title="Sign Out of ERP Portal"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
