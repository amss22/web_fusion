import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  Repeat, 
  ShieldCheck, 
  User, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff,
  GraduationCap,
  Building2,
  CheckCircle2,
  Leaf,
  Users,
  TrendingUp,
  UserPlus,
  LogIn
} from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const { users, registerUser } = useCampus();
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [selectedRole, setSelectedRole] = useState('student'); // 'student' or 'admin'
  
  // Login fields
  const [email, setEmail] = useState('student@tsec.edu');
  const [password, setPassword] = useState('campus2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Registration fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regDept, setRegDept] = useState('Computer Engineering');
  const [regYear, setRegYear] = useState('3rd Year');

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    if (authMode === 'login') {
      if (role === 'admin') {
        setEmail('admin@tsec.edu');
        setPassword('admin2026');
      } else {
        setEmail('student@tsec.edu');
        setPassword('campus2026');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (authMode === 'register') {
      const newUser = await registerUser({
        name: regName,
        email: regEmail,
        password: regPassword,
        role: selectedRole,
        department: regDept,
        year: regYear
      });

      setIsSubmitting(false);
      if (newUser) {
        onLogin(newUser.role, newUser.id);
      }
    } else {
      // Simulate auth check
      setTimeout(() => {
        setIsSubmitting(false);
        onLogin(selectedRole);
      }, 600);
    }
  };

  const impactStats = [
    { label: "Active Members", value: `${users.length} Users`, icon: Users },
    { label: "Sharing System", value: "Live DB", icon: Repeat },
    { label: "Safety Rating", value: "100%", icon: TrendingUp },
    { label: "CO₂ Impact", value: "Clean", icon: Leaf }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Animated Background Orbs */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
        animation: 'floatOrb1 8s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
        animation: 'floatOrb2 10s ease-in-out infinite',
        pointerEvents: 'none'
      }} />

      {/* Main Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        width: '100%',
        maxWidth: '1020px',
        minHeight: '620px',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.7), 0 0 40px rgba(6, 182, 212, 0.1)',
        animation: 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>

        {/* LEFT PANEL: Branding & Info */}
        <div style={{
          background: 'linear-gradient(160deg, rgba(6, 182, 212, 0.15) 0%, rgba(15, 23, 42, 0.95) 40%, rgba(99, 102, 241, 0.1) 100%)',
          backdropFilter: 'blur(20px)',
          padding: '44px 38px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #06b6d4, #10b981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)'
              }}>
                <Repeat size={28} color="#fff" />
              </div>
              <div>
                <h1 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 800, 
                  margin: 0,
                  background: 'linear-gradient(90deg, #fff, #94a3b8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Campus<span style={{ WebkitTextFillColor: 'var(--accent-cyan)' }}>Circular</span>
                </h1>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  WebFusion 2.0 • CodeCrafters
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: '1.35', marginBottom: '12px', color: '#f1f5f9' }}>
              Create Your Own<br />
              <span style={{ color: 'var(--accent-cyan)' }}>Campus Profile & Gear List.</span>
            </h2>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
              All default items have been cleared. Sign in or register your custom user profile to list and borrow your own resources.
            </p>

            <div style={{
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px'
            }}>
              <Sparkles size={18} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.82rem', color: '#e2e8f0', fontStyle: 'italic' }}>
                "Why buy what someone nearby already has?"
              </span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px' }}>
              Campus System Metrics
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {impactStats.map((stat, i) => (
                <div key={i} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <stat.icon size={15} color="var(--accent-emerald)" />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Auth Tabs & Form */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.94)',
          backdropFilter: 'blur(20px)',
          padding: '40px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          
          {/* Mode Switcher Tabs */}
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px',
            border: '1px solid var(--border-subtle)'
          }}>
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: authMode === 'login' ? 'var(--accent-cyan)' : 'transparent',
                color: authMode === 'login' ? '#fff' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <LogIn size={15} />
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: authMode === 'register' ? 'var(--accent-emerald)' : 'transparent',
                color: authMode === 'register' ? '#fff' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <UserPlus size={15} />
              Register New Profile
            </button>
          </div>

          {/* Role Selection */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Select Role Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              
              <div 
                onClick={() => handleSelectRole('student')}
                style={{
                  padding: '12px 10px',
                  borderRadius: 'var(--radius-md)',
                  background: selectedRole === 'student' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: selectedRole === 'student' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <GraduationCap size={18} color="var(--accent-cyan)" />
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#fff' }}>Student</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Borrow & Lend</div>
                </div>
              </div>

              <div 
                onClick={() => handleSelectRole('admin')}
                style={{
                  padding: '12px 10px',
                  borderRadius: 'var(--radius-md)',
                  background: selectedRole === 'admin' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: selectedRole === 'admin' ? '1px solid var(--accent-rose)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ShieldCheck size={18} color="var(--accent-rose)" />
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#fff' }}>Campus Admin</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Moderator</div>
                </div>
              </div>

            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit}>
            
            {/* Registration specific fields */}
            {authMode === 'register' && (
              <>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.78rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                    Full Name:
                  </label>
                  <input 
                    type="text"
                    className="input-field"
                    required
                    placeholder="e.g. Ananya Patel"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                      Department:
                    </label>
                    <input 
                      type="text"
                      className="input-field"
                      placeholder="e.g. IT / CS / Mech"
                      value={regDept}
                      onChange={(e) => setRegDept(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                      Year:
                    </label>
                    <input 
                      type="text"
                      className="input-field"
                      placeholder="e.g. 3rd Year"
                      value={regYear}
                      onChange={(e) => setRegYear(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '0.78rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                Campus Email Address:
              </label>
              <input 
                type="email"
                className="input-field"
                required
                placeholder="yourname@tsec.edu"
                value={authMode === 'register' ? regEmail : email}
                onChange={(e) => authMode === 'register' ? setRegEmail(e.target.value) : setEmail(e.target.value)}
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.78rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                Password:
              </label>
              <input 
                type="password"
                className="input-field"
                required
                placeholder="Enter password"
                value={authMode === 'register' ? regPassword : password}
                onChange={(e) => authMode === 'register' ? setRegPassword(e.target.value) : setPassword(e.target.value)}
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
              />
            </div>

            {/* Submit CTA */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="btn btn-emerald"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.95rem',
                fontWeight: 700
              }}
            >
              {isSubmitting ? (
                'Processing...'
              ) : authMode === 'register' ? (
                <>
                  <UserPlus size={16} />
                  Create Profile & Sign In
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In as {selectedRole === 'admin' ? 'Campus Admin' : 'Student'}
                </>
              )}
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
