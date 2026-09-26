import React, { useState, useEffect } from 'react';
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Database,
  Loader2
} from 'lucide-react';
import { collegeInfo } from '../data/mockData';
import { loginUser, registerUser, checkBackendHealth } from '../services/api';

export default function Auth({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'online' | 'offline' | 'checking'

  // Check backend server connection on mount
  useEffect(() => {
    checkBackendHealth()
      .then((res) => {
        if (res.status === 'Online') {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      })
      .catch(() => setBackendStatus('offline'));
  }, []);

  // Login Form State
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'Principal / Administrator',
    rememberMe: true,
  });

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    role: 'Faculty Teacher',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  // Handle Login Submit with Backend MongoDB & JWT
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    if (!loginData.email || !loginData.password) {
      setErrorMsg('Please enter your email and password.');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Attempt MongoDB API Login & JWT token retrieval
      const response = await loginUser({
        email: loginData.email.trim(),
        password: loginData.password,
      });

      if (response.success && response.token) {
        localStorage.setItem('school_erp_token', response.token);
        localStorage.setItem('school_erp_user', JSON.stringify(response.user));
        setSuccessMsg('JWT token generated! Redirecting to Dashboard...');
        setTimeout(() => {
          onLogin(response.user, response.token);
        }, 500);
      }
    } catch (apiError) {
      console.warn('Backend Login Error:', apiError.message);

      // If backend is unreachable or MongoDB offline, provide clear error
      if (apiError.message && (apiError.message.includes('Failed to fetch') || apiError.message.includes('NetworkError'))) {
        setErrorMsg('Backend server on port 5000 is not running. Start server via "npm run server" or use quick demo login.');
      } else {
        setErrorMsg(apiError.message || 'Invalid credentials or user not found in database.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Sign Up Submit with Backend MongoDB & JWT
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!signUpData.fullName || !signUpData.email || !signUpData.password) {
      setErrorMsg('Please fill in all mandatory fields.');
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    if (signUpData.password.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Attempt MongoDB API Registration & JWT generation
      const response = await registerUser({
        fullName: signUpData.fullName.trim(),
        email: signUpData.email.trim(),
        password: signUpData.password,
        role: signUpData.role,
        phone: signUpData.phone || '',
      });

      if (response.success && response.token) {
        localStorage.setItem('school_erp_token', response.token);
        localStorage.setItem('school_erp_user', JSON.stringify(response.user));
        setSuccessMsg('Account registered in MongoDB & JWT token issued! Redirecting...');
        setTimeout(() => {
          onLogin(response.user, response.token);
        }, 600);
      }
    } catch (apiError) {
      console.warn('Backend Register Error:', apiError.message);
      if (apiError.message && (apiError.message.includes('Failed to fetch') || apiError.message.includes('NetworkError'))) {
        setErrorMsg('Backend server on port 5000 is not running. Please start via "npm run server" to save to MongoDB.');
      } else {
        setErrorMsg(apiError.message || 'Registration failed. Email might already be taken.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Quick One-Click Demo Access
  const handleQuickLogin = async (roleType, email, name, avatar) => {
    setIsLoading(true);
    setErrorMsg('');

    // Pre-fill fields for user visibility
    setLoginData({ email, password: 'password123', role: roleType, rememberMe: true });

    try {
      // Try backend first
      const response = await loginUser({
        email: email,
        password: 'password123',
      });

      if (response.success && response.token) {
        localStorage.setItem('school_erp_token', response.token);
        localStorage.setItem('school_erp_user', JSON.stringify(response.user));
        onLogin(response.user, response.token);
        return;
      }
    } catch (err) {
      console.log('Quick login fallback with local session token');
    }

    const mockToken = `jwt_mock_${Date.now()}_${btoa(email)}`;
    const mockUser = { name, email, role: roleType, avatar };
    localStorage.setItem('school_erp_token', mockToken);
    localStorage.setItem('school_erp_user', JSON.stringify(mockUser));
    onLogin(mockUser, mockToken);
    setIsLoading(false);
  };

  return (
    <div className="auth-wrapper">
      {/* Background decoration elements */}
      <div className="auth-bg-blob blob-1"></div>
      <div className="auth-bg-blob blob-2"></div>

      <div className="auth-card-container">
        {/* Left Branding Showcase Column */}
        <div className="auth-brand-pane">
          <div className="auth-brand-header">
            <div className="auth-school-logo">SJP</div>
            <div>
              <h2 className="auth-brand-name">SHRI JANKI PRASAD</h2>
              <span className="auth-brand-sub">Inter College, Patseni, Hardoi</span>
            </div>
          </div>

          <div className="auth-brand-visual">
            <div className="auth-photo-card">
              <img
                src={collegeInfo.bannerImage}
                alt="Shri Janki Prasad Inter College Campus"
                className="auth-campus-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="auth-photo-badge">
                <Sparkles size={13} color="#fde047" />
                <span>U.P. Board Affiliated &bull; Code: 1408</span>
              </div>
            </div>
          </div>

          {/* Backend JWT & MongoDB Security Info */}
          <div className="auth-features-list">
            <div className="auth-feature-item">
              <div className="auth-feat-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
                <Database size={16} />
              </div>
              <div>
                <strong>MongoDB Database Integration</strong>
                <p>Stores secure user profiles, credentials &amp; permissions</p>
              </div>
            </div>

            <div className="auth-feature-item">
              <div className="auth-feat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <KeyRound size={16} />
              </div>
              <div>
                <strong>JSON Web Token (JWT) Security</strong>
                <p>7-day signed Bearer token authorization to Dashboard</p>
              </div>
            </div>

            <div className="auth-feature-item">
              <div className="auth-feat-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                <ShieldCheck size={16} />
              </div>
              <div>
                <strong>Bcrypt Password Hashing</strong>
                <p>10-round salted password encryption at rest</p>
              </div>
            </div>
          </div>

          <div className="auth-brand-footer">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>&copy; {new Date().getFullYear()} SJP Inter College &bull; Estd. 1985</span>
              <span style={{ fontSize: '10px', color: backendStatus === 'online' ? '#10b981' : '#f59e0b', fontWeight: 700 }}>
                ● API: {backendStatus.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Right Form Column (Login / Signup) */}
        <div className="auth-form-pane">
          {/* Tabs Switcher: Login vs Sign Up */}
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab-btn ${!isSignUp ? 'active' : ''}`}
              onClick={() => { setIsSignUp(false); setErrorMsg(''); setSuccessMsg(''); }}
            >
              <LogIn size={16} /> Sign In / Login
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${isSignUp ? 'active' : ''}`}
              onClick={() => { setIsSignUp(true); setErrorMsg(''); setSuccessMsg(''); }}
            >
              <UserPlus size={16} /> Register / Sign Up
            </button>
          </div>

          {/* Form Header Info */}
          <div className="auth-form-title-area">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="jwt-badge">
                <KeyRound size={11} /> JWT &amp; MongoDB Auth
              </span>
            </div>
            <h3>{!isSignUp ? 'Sign In to School ERP Portal' : 'Register New User in MongoDB'}</h3>
            <p>
              {!isSignUp
                ? 'Enter your registered credentials to receive a verified JWT session token.'
                : 'Create an encrypted user account on the Node.js + Express backend.'}
            </p>
          </div>

          {/* Error & Success Alerts */}
          {errorMsg && (
            <div className="auth-alert error">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="auth-alert success">
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ── LOGIN FORM ─────────────────────────────────────────── */}
          {!isSignUp ? (
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-group">
                <label>Login Role</label>
                <select
                  className="form-select"
                  value={loginData.role}
                  onChange={(e) => setLoginData({ ...loginData, role: e.target.value })}
                >
                  <option value="Principal / Administrator">Principal / Administrator</option>
                  <option value="Faculty Teacher">Faculty Teacher (Class Incharge)</option>
                  <option value="Office & Support Staff">Office &amp; Support Staff</option>
                  <option value="Student / Guardian">Student / Guardian</option>
                </select>
              </div>
              <div className="form-group">
                <label>Email Address / Username *</label>
                <div className="auth-input-container">
                  <Mail className="auth-input-icon" size={16} />
                  <input
                    type="email"
                    required
                    className="form-input auth-input"
                    placeholder="e.g. principal@sjpcollege.ac.in"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Password *</label>
                  <span style={{ fontSize: '11px', color: 'var(--primary)', cursor: 'pointer' }}>
                    Default: password123
                  </span>
                </div>
                <div className="auth-input-container">
                  <Lock className="auth-input-icon" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="form-input auth-input"
                    placeholder="Enter password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <input
                    type="checkbox"
                    checked={loginData.rememberMe}
                    onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  Save JWT Token in LocalStorage
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="spin-icon" /> Authenticating with MongoDB...
                  </>
                ) : (
                  <>
                    <LogIn size={16} /> Sign In &amp; Generate JWT Token
                  </>
                )}
              </button>

              {/* Quick Demo Access Bar */}
              <div className="auth-demo-section">
                <div className="auth-demo-header">
                  <span>Quick One-Click Demo Access</span>
                </div>
                <div className="auth-demo-buttons">
                  <button
                    type="button"
                    className="auth-demo-chip admin"
                    onClick={() => handleQuickLogin('Principal / Administrator', 'principal@sjpcollege.ac.in', 'Dr. R.K. Pandey', 'RP')}
                  >
                    👑 Principal
                  </button>
                  <button
                    type="button"
                    className="auth-demo-chip teacher"
                    onClick={() => handleQuickLogin('Faculty Teacher', 'devendra.maths@sjpcollege.ac.in', 'Shri Devendra Kumar', 'DK')}
                  >
                    👨‍🏫 Teacher
                  </button>
                  <button
                    type="button"
                    className="auth-demo-chip student"
                    onClick={() => handleQuickLogin('Student / Guardian', 'meena.student@sjpcollege.ac.in', 'Meena Awasthi', 'MA')}
                  >
                    🎓 Student
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* ── SIGN UP FORM ────────────────────────────────────────── */
            <form onSubmit={handleSignUpSubmit} className="auth-form">
              <div className="form-group">
                <label>Full Name *</label>
                <div className="auth-input-container">
                  <User className="auth-input-icon" size={16} />
                  <input
                    type="text"
                    required
                    className="form-input auth-input"
                    placeholder="e.g. Shri Rajesh Mishra"
                    value={signUpData.fullName}
                    onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Role in College *</label>
                  <select
                    className="form-select"
                    value={signUpData.role}
                    onChange={(e) => setSignUpData({ ...signUpData, role: e.target.value })}
                  >
                    <option value="Faculty Teacher">Faculty Teacher</option>
                    <option value="Principal / Administrator">Administrator</option>
                    <option value="Office & Support Staff">Support Staff</option>
                    <option value="Student / Guardian">Student / Guardian</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. +91 94150 00000"
                    value={signUpData.phone}
                    onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <div className="auth-input-container">
                  <Mail className="auth-input-icon" size={16} />
                  <input
                    type="email"
                    required
                    className="form-input auth-input"
                    placeholder="e.g. rajesh@sjpcollege.ac.in"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Password *</label>
                  <div className="auth-input-container">
                    <Lock className="auth-input-icon" size={16} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="form-input auth-input"
                      placeholder="Min 4 chars"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm Password *</label>
                  <div className="auth-input-container">
                    <Lock className="auth-input-icon" size={16} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="form-input auth-input"
                      placeholder="Re-enter password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <input
                    type="checkbox"
                    required
                    checked={signUpData.agreeTerms}
                    onChange={(e) => setSignUpData({ ...signUpData, agreeTerms: e.target.checked })}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  I agree to SJP Inter College ERP regulations &amp; policies
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="spin-icon" /> Creating MongoDB User &amp; JWT...
                  </>
                ) : (
                  <>
                    <UserPlus size={16} /> Register User &amp; Get JWT Token
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
