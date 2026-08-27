import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  Repeat, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff,
  GraduationCap,
  CheckCircle2,
  Leaf,
  Users,
  TrendingUp,
  UserPlus,
  LogIn
} from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const { users, registerUser } = useCampus();
  const [authMode, setAuthMode] = useState('login');
  const [selectedRole, setSelectedRole] = useState('student');
  
  const [email, setEmail] = useState('rahul.sharma@tsec.edu');
  const [password, setPassword] = useState('campus2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        setEmail('rahul.sharma@tsec.edu');
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
      if (newUser) onLogin(newUser.role, newUser.id);
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        onLogin(selectedRole);
      }, 600);
    }
  };

  const impactStats = [
    { label: "Active Members", value: `${users.length}`, icon: Users, color: '#4ECDC4' },
    { label: "Sharing System", value: "LIVE", icon: Repeat, color: '#FF6B9D' },
    { label: "Safety", value: "100%", icon: TrendingUp, color: '#C7F464' },
    { label: "Eco Impact", value: "✓", icon: Leaf, color: '#FFE66D' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    }}>

      {/* Main Container - Retro Window */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        width: '100%',
        maxWidth: '1000px',
        minHeight: '580px',
        border: '3px solid #222',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '8px 8px 0px #222',
        animation: 'popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>

        {/* LEFT PANEL: Branding */}
        <div style={{
          background: '#4ECDC4',
          padding: '40px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '3px solid #222',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative circles */}
          <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: '#FFE66D', border: '3px solid #222', opacity: 0.6 }} />
          <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: '#FF6B9D', border: '3px solid #222', opacity: 0.5 }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                background: '#FFE66D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #222',
                boxShadow: '3px 3px 0px #222'
              }}>
                <Repeat size={26} color="#222" />
              </div>
              <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0, color: '#222' }}>
                  Campus<span style={{ color: '#fff' }}>Circular</span>
                </h1>
                <div style={{ fontSize: '0.78rem', color: '#1a6b65', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  WebFusion 2.0 • CodeCrafters
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: '1.3', marginBottom: '12px', color: '#222' }}>
              From Ownership<br />
              <span style={{ 
                background: '#FFE66D', 
                padding: '2px 8px', 
                border: '2px solid #222',
                display: 'inline-block',
                transform: 'rotate(-1deg)'
              }}>to Access.</span>
            </h2>

            <p style={{ fontSize: '0.9rem', color: '#1a5c57', lineHeight: '1.6', marginBottom: '20px', fontWeight: 500 }}>
              A trusted peer-to-peer platform for college students to discover, share, lend, borrow & settle campus resources — safely & transparently.
            </p>

            {/* Quote Box */}
            <div style={{
              background: '#fff',
              border: '3px solid #222',
              borderRadius: '8px',
              padding: '12px 16px',
              boxShadow: '3px 3px 0px #222',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Sparkles size={18} color="#FF6B9D" />
              <span style={{ fontSize: '0.84rem', color: '#222', fontWeight: 600, fontStyle: 'italic' }}>
                "Why buy what someone nearby already has?" 🤔
              </span>
            </div>
          </div>

          {/* Bottom: Impact Stats */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.72rem', color: '#1a5c57', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.06em' }}>
              ⚡ Campus Stats
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {impactStats.map((stat, i) => (
                <div key={i} style={{
                  background: '#fff',
                  border: '2px solid #222',
                  borderRadius: '8px',
                  padding: '8px 6px',
                  textAlign: 'center',
                  boxShadow: '2px 2px 0px #222'
                }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#222', fontFamily: 'var(--font-mono)' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.6rem', color: '#666', fontWeight: 600, textTransform: 'uppercase' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Auth Form */}
        <div style={{
          background: '#FFF8E7',
          padding: '36px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          
          {/* Mode Switcher Tabs */}
          <div style={{
            display: 'flex',
            background: '#fff',
            border: '3px solid #222',
            borderRadius: '8px',
            marginBottom: '18px',
            overflow: 'hidden',
            boxShadow: '3px 3px 0px #222'
          }}>
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                borderRight: '2px solid #222',
                background: authMode === 'login' ? '#FFE66D' : '#fff',
                color: '#222',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
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
                padding: '10px',
                border: 'none',
                background: authMode === 'register' ? '#C7F464' : '#fff',
                color: '#222',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <UserPlus size={15} />
              Register
            </button>
          </div>

          {/* Role Selection */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#222', textTransform: 'uppercase', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
              👤 Select Role
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              
              <div 
                onClick={() => handleSelectRole('student')}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: selectedRole === 'student' ? '#4ECDC4' : '#fff',
                  border: '3px solid #222',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: selectedRole === 'student' ? '4px 4px 0px #222' : '2px 2px 0px #222',
                  transform: selectedRole === 'student' ? 'translate(-2px, -2px)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <GraduationCap size={20} color="#222" />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#222' }}>Student</div>
                  <div style={{ fontSize: '0.66rem', color: selectedRole === 'student' ? '#1a5c57' : '#888' }}>Borrow & Lend</div>
                </div>
                {selectedRole === 'student' && <CheckCircle2 size={16} color="#222" style={{ marginLeft: 'auto' }} />}
              </div>

              <div 
                onClick={() => handleSelectRole('admin')}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: selectedRole === 'admin' ? '#FF6B9D' : '#fff',
                  border: '3px solid #222',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: selectedRole === 'admin' ? '4px 4px 0px #222' : '2px 2px 0px #222',
                  transform: selectedRole === 'admin' ? 'translate(-2px, -2px)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <ShieldCheck size={20} color="#222" />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#222' }}>Admin</div>
                  <div style={{ fontSize: '0.66rem', color: selectedRole === 'admin' ? '#7a2a42' : '#888' }}>Moderator</div>
                </div>
                {selectedRole === 'admin' && <CheckCircle2 size={16} color="#222" style={{ marginLeft: 'auto' }} />}
              </div>

            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit}>
            
            {authMode === 'register' && (
              <>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#222', display: 'block', marginBottom: '4px' }}>Full Name:</label>
                  <input type="text" className="input-field" required placeholder="e.g. Ananya Patel" value={regName} onChange={(e) => setRegName(e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#222', display: 'block', marginBottom: '4px' }}>Dept:</label>
                    <input type="text" className="input-field" placeholder="IT / CS / Mech" value={regDept} onChange={(e) => setRegDept(e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#222', display: 'block', marginBottom: '4px' }}>Year:</label>
                    <input type="text" className="input-field" placeholder="3rd Year" value={regYear} onChange={(e) => setRegYear(e.target.value)} />
                  </div>
                </div>
              </>
            )}

            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#222', display: 'block', marginBottom: '4px' }}>
                📧 Campus Email:
              </label>
              <input 
                type="email" className="input-field" required placeholder="yourname@tsec.edu"
                value={authMode === 'register' ? regEmail : email}
                onChange={(e) => authMode === 'register' ? setRegEmail(e.target.value) : setEmail(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#222', display: 'block', marginBottom: '4px' }}>
                🔒 Password:
              </label>
              <input 
                type={showPassword ? 'text' : 'password'} className="input-field" required placeholder="Enter password"
                value={authMode === 'register' ? regPassword : password}
                onChange={(e) => authMode === 'register' ? setRegPassword(e.target.value) : setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="btn"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                background: selectedRole === 'admin' ? '#FF6B9D' : '#4ECDC4',
                color: '#222',
                borderRadius: '8px',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? '⏳ Processing...' : authMode === 'register' ? (
                <><UserPlus size={16} /> Create Profile & Sign In</>
              ) : (
                <><LogIn size={16} /> Sign In as {selectedRole === 'admin' ? 'Admin 🛡️' : 'Student 🎓'}</>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          {authMode === 'login' && (
            <div style={{
              marginTop: '14px',
              padding: '10px 12px',
              background: '#fff',
              border: '2px solid #222',
              borderRadius: '8px',
              fontSize: '0.74rem',
              color: '#555',
              boxShadow: '2px 2px 0px #222'
            }}>
              <div style={{ fontWeight: 700, color: '#222', marginBottom: '2px', textTransform: 'uppercase', fontSize: '0.68rem' }}>
                💡 Demo Credentials (auto-filled):
              </div>
              <div>🎓 <strong>Student</strong>: rahul.sharma@tsec.edu / campus2026</div>
              <div>🛡️ <strong>Admin</strong>: admin@tsec.edu / admin2026</div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
