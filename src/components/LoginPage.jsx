import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  Repeat, 
  ShieldCheck, 
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
      }, 500);
    }
  };

  const impactStats = [
    { label: "Members", value: `${users.length}`, icon: Users },
    { label: "Sharing", value: "LIVE", icon: Repeat },
    { label: "Trust Score", value: "100%", icon: TrendingUp },
    { label: "Eco Impact", value: "Clean", icon: Leaf }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'var(--bg-primary)'
    }}>

      {/* Main Neo-Brutalism Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        width: '100%',
        maxWidth: '1020px',
        minHeight: '580px',
        border: '3px solid #000000',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '8px 8px 0px #000000',
        background: '#FFFFFF',
        animation: 'popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>

        {/* LEFT HERO PANEL - Periwinkle Neo-Brutalism */}
        <div style={{
          background: 'var(--pop-periwinkle)',
          padding: '48px 42px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '3px solid #000000',
          position: 'relative'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'var(--pop-yellow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #000000',
                boxShadow: '3px 3px 0px #000000'
              }}>
                <Repeat size={26} color="#000000" />
              </div>
              <div>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                  Campus<span style={{ color: '#FFFFFF', textShadow: '2px 2px 0px #000000' }}>Circular</span>
                </span>
                <div style={{ fontSize: '0.75rem', color: '#000000', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  WebFusion 2.0 • CodeCrafters
                </div>
              </div>
            </div>

            {/* Chunky Neo-Brutalist Heading as in the image */}
            <h1 style={{ 
              fontSize: '2.6rem', 
              fontWeight: 900, 
              lineHeight: '1.1', 
              marginBottom: '16px', 
              color: '#000000', 
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.04em'
            }}>
              From Ownership<br />
              <span style={{ 
                background: 'var(--pop-yellow)', 
                padding: '2px 12px', 
                borderRadius: '8px',
                border: '3px solid #000000',
                display: 'inline-block',
                transform: 'rotate(-1.5deg)',
                boxShadow: '4px 4px 0px #000000',
                color: '#000000'
              }}>
                to Access.
              </span>
            </h1>

            <p style={{ fontSize: '0.96rem', color: '#111111', lineHeight: '1.6', marginBottom: '24px', fontWeight: 600 }}>
              High-contrast, transparent resource sharing platform for college students to discover, lend, borrow, and settle campus gear with locked escrow security.
            </p>

            <div style={{
              background: '#FFFFFF',
              border: '3px solid #000000',
              borderRadius: '12px',
              padding: '14px 18px',
              boxShadow: '4px 4px 0px #000000',
              fontWeight: 800,
              fontSize: '0.88rem',
              color: '#000000'
            }}>
              "Why buy what someone nearby already has?"
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.74rem', color: '#000000', fontWeight: 900, textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.06em' }}>
              Platform Overview
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {impactStats.map((stat, i) => (
                <div key={i} style={{
                  background: '#FFFFFF',
                  border: '2.5px solid #000000',
                  borderRadius: '10px',
                  padding: '10px 6px',
                  textAlign: 'center',
                  boxShadow: '2.5px 2.5px 0px #000000'
                }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.64rem', color: '#333333', fontWeight: 800, textTransform: 'uppercase' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div style={{
          background: '#FFFFFF',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          
          {/* Mode Tabs */}
          <div style={{
            display: 'flex',
            background: 'var(--bg-primary)',
            border: '3px solid #000000',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '22px',
            boxShadow: '3px 3px 0px #000000'
          }}>
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                background: authMode === 'login' ? 'var(--pop-yellow)' : 'transparent',
                color: '#000000',
                fontWeight: 900,
                fontSize: '0.88rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                borderRight: authMode === 'login' ? '2.5px solid #000000' : 'none',
                boxShadow: authMode === 'login' ? '2px 2px 0px #000000' : 'none'
              }}
            >
              <LogIn size={16} />
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                background: authMode === 'register' ? 'var(--pop-mint)' : 'transparent',
                color: '#000000',
                fontWeight: 900,
                fontSize: '0.88rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: authMode === 'register' ? '2px 2px 0px #000000' : 'none'
              }}
            >
              <UserPlus size={16} />
              Register
            </button>
          </div>

          {/* Role Selection */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase', display: 'block', marginBottom: '8px', letterSpacing: '0.04em' }}>
              Select Role
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              
              <div 
                onClick={() => handleSelectRole('student')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: selectedRole === 'student' ? 'var(--pop-mint)' : '#FFFFFF',
                  border: '3px solid #000000',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: selectedRole === 'student' ? '4px 4px 0px #000000' : '2px 2px 0px #000000',
                  transform: selectedRole === 'student' ? 'translate(-1px, -1px)' : 'none',
                  transition: 'all 0.12s ease'
                }}
              >
                <GraduationCap size={22} color="#000000" />
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)' }}>Student</div>
                  <div style={{ fontSize: '0.68rem', color: '#222222', fontWeight: 700 }}>Borrow & Lend</div>
                </div>
              </div>

              <div 
                onClick={() => handleSelectRole('admin')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: selectedRole === 'admin' ? 'var(--pop-pink)' : '#FFFFFF',
                  border: '3px solid #000000',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: selectedRole === 'admin' ? '4px 4px 0px #000000' : '2px 2px 0px #000000',
                  transform: selectedRole === 'admin' ? 'translate(-1px, -1px)' : 'none',
                  transition: 'all 0.12s ease'
                }}
              >
                <ShieldCheck size={22} color="#000000" />
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)' }}>Admin</div>
                  <div style={{ fontSize: '0.68rem', color: '#222222', fontWeight: 700 }}>Moderator</div>
                </div>
              </div>

            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit}>
            
            {authMode === 'register' && (
              <>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#000000', display: 'block', marginBottom: '4px' }}>Full Name:</label>
                  <input type="text" className="input-field" required placeholder="e.g. Ananya Patel" value={regName} onChange={(e) => setRegName(e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#000000', display: 'block', marginBottom: '4px' }}>Dept:</label>
                    <input type="text" className="input-field" placeholder="IT / CS / Mech" value={regDept} onChange={(e) => setRegDept(e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#000000', display: 'block', marginBottom: '4px' }}>Year:</label>
                    <input type="text" className="input-field" placeholder="3rd Year" value={regYear} onChange={(e) => setRegYear(e.target.value)} />
                  </div>
                </div>
              </>
            )}

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#000000', display: 'block', marginBottom: '4px' }}>
                Campus Email:
              </label>
              <input 
                type="email" className="input-field" required placeholder="yourname@tsec.edu"
                value={authMode === 'register' ? regEmail : email}
                onChange={(e) => authMode === 'register' ? setRegEmail(e.target.value) : setEmail(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#000000', display: 'block', marginBottom: '4px' }}>
                Password:
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
              className="btn btn-emerald btn-lg"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                boxShadow: '4px 4px 0px #000000'
              }}
            >
              {isSubmitting ? 'Processing...' : authMode === 'register' ? (
                <><UserPlus size={18} /> Create Profile & Sign In</>
              ) : (
                <><LogIn size={18} /> Sign In as {selectedRole === 'admin' ? 'Admin' : 'Student'}</>
              )}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
