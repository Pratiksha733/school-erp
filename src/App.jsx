import React, { useState, useEffect } from 'react';
import './App.css';

// Authentication
import Auth from './pages/Auth';
import { getAuthProfile } from './services/api';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Pages
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import Schedule from './pages/Schedule';
import Notices from './pages/Notices';

// Mock Data
import {
  initialStudents,
  initialTeachers,
  initialPeons,
  initialClasses,
  initialNotices,
} from './data/mockData';

export default function App() {
  // Authentication State: null means user sees Login & Sign Up page first
  const [currentUser, setCurrentUser] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [isVerifyingToken, setIsVerifyingToken] = useState(true);

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');

  // Shared School ERP State
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [peons, setPeons] = useState(initialPeons);
  const [classes, setClasses] = useState(initialClasses);
  const [notices, setNotices] = useState(initialNotices);

  // Check existing JWT Token in LocalStorage on startup
  useEffect(() => {
    const savedToken = localStorage.getItem('school_erp_token');
    const savedUser = localStorage.getItem('school_erp_user');

    if (savedToken) {
      setJwtToken(savedToken);

      // Verify token with MongoDB backend
      getAuthProfile(savedToken)
        .then((res) => {
          if (res.success && res.user) {
            setCurrentUser(res.user);
          } else if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
          }
        })
        .catch(() => {
          if (savedUser) {
            try {
              setCurrentUser(JSON.parse(savedUser));
            } catch (e) {
              localStorage.removeItem('school_erp_token');
            }
          }
        })
        .finally(() => {
          setIsVerifyingToken(false);
        });
    } else {
      setIsVerifyingToken(false);
    }
  }, []);

  // Handle successful login or signup from Auth component
  const handleLoginSuccess = (user, token) => {
    setCurrentUser(user);
    if (token) {
      setJwtToken(token);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('school_erp_token');
    localStorage.removeItem('school_erp_user');
    setCurrentUser(null);
    setJwtToken(null);
    setActiveTab('dashboard');
  };

  // Tab Title helper
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'SHRI JANKI PRASAD INTER COLLEGE - ERP Portal';
      case 'classes':
        return 'Classes & Wings (6th to 12th)';
      case 'schedule':
        return 'Daily Bell Schedule & Timetable (8:00 AM - 2:00 PM)';
      case 'students':
        return 'Student Directory & Records';
      case 'teachers':
        return 'Faculty & Support Staff (35+ Teachers | 5 Peons)';
      case 'notices':
        return 'Notice Board & Announcements';
      default:
        return 'School ERP';
    }
  };

  // If still checking token, show a brief loader
  if (isVerifyingToken) {
    return (
      <div className="auth-wrapper" style={{ color: '#fff', fontSize: '14px', gap: '10px' }}>
        <div className="spin-icon" style={{ width: '28px', height: '28px', border: '3px solid rgba(255,255,255,0.2)', borderTopColor: '#2563eb', borderRadius: '50%' }}></div>
        <span>Verifying JWT Session Token...</span>
      </div>
    );
  }

  // If user is not logged in, display the Login & Sign Up page first
  if (!currentUser) {
    return <Auth onLogin={handleLoginSuccess} />;
  }

  return (
    <div className="app-container">
      {/* Sidebar navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} currentUser={currentUser} />

      {/* Main content wrapper */}
      <div className="main-wrapper">
        <Header
          title={getTabTitle()}
          user={currentUser}
          jwtToken={jwtToken}
          onLogout={handleLogout}
        />

        <main>
          {activeTab === 'dashboard' && (
            <Dashboard
              students={students}
              teachers={teachers}
              classes={classes}
              peons={peons}
              notices={notices}
              currentUser={currentUser}
              jwtToken={jwtToken}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'classes' && (
            <Classes classes={classes} setClasses={setClasses} />
          )}

          {activeTab === 'schedule' && <Schedule />}

          {activeTab === 'students' && (
            <Students
              students={students}
              setStudents={setStudents}
              teachers={teachers}
              classes={classes}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'teachers' && (
            <Teachers
              teachers={teachers}
              setTeachers={setTeachers}
              peons={peons}
              setPeons={setPeons}
            />
          )}

          {activeTab === 'notices' && (
            <Notices notices={notices} setNotices={setNotices} />
          )}
        </main>
      </div>
    </div>
  );
}
