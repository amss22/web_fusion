import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  Repeat, 
  ShieldCheck, 
  Sparkles, 
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
    { label: "Active Members", value: `${users.length}`, icon: Users, color: '#BEE9E8' },
    { label: "Sharing System", value: "LIVE", icon: Repeat, color: '#FFDAC1' },
    { label: "Safety Rating", value: "100%", icon: TrendingUp, color: '#B5EAD7' },
    { label: "Eco Saved", value: "Clean", icon: Leaf, color: '#FFD166' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative'
    }}>

      {/* Main Minimal Cartoon Window */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        width: '100%',
        maxWidth: '960px',
        minHeight: '560px',
        border: '2.5px solid #1E1E1E',
        borderRadius: '28px',
        overflow: 'hidden',
        boxShadow: '6px 6px 0px #1E1E1E',
        animation: 'bounceIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        background: '#FFFFFF'
      }}>

        {/* LEFT PANEL */}
        <div style={{
          background: 'var(--pop-yellow)',
          padding: '44px 38px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '2.5px solid #1E1E1E',
          position: 'relative'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                background: 'var(--pop-pink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2.5px solid #1E1E1E',
                boxShadow: '3px 3px 0px #1E1E1E'
              }}>
                <Repeat size={26} color="#fff" />
              </div>
              <div>
                <h1 style={{ fontSize: '1.7rem', fontWeight: 800, margin: 0, color: '#1E1E1E', fontFamily: 'var(--font-heading)' }}>
                  Campus<span style={{ color: 'var(--pop-pink)' }}>Circular</span>
                </h1>
                <div style={{ fontSize: '0.76rem', color: '#555', fontWeight: 700, letterSpacing: '0.04em' }}>
                  WebFusion 2.0 • CodeCrafters
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: '1.3', marginBottom: '14px', color: '#1E1E1E', fontFamily: 'var(--font-heading)' }}>
              From Ownership<br />
              <span style={{ 
                background: '#fff', 
                padding: '2px 10px', 
                borderRadius: 'var(--radius-full)',
                border: '2px solid #1E1E1E',
                display: 'inline-block',
                transform: 'rotate(-1.5deg)',
                boxShadow: '2px 2px 0px #1E1E1E'
              }}>to Access.</span>
            </h2>

            <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.6', marginBottom: '24px', fontWeight: 500 }}>
              A trusted digital peer-to-peer platform for college students to discover, share, lend, borrow, and settle campus gear safely.
            </p>

            <div style={{
              background: '#fff',
              border: '2.5px solid #1E1E1E',
              borderRadius: '16px',
              padding: '14px 18px',
              boxShadow: '3px 3px 0px #1E1E1E',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Sparkles size={18} color="var(--pop-pink)" />
              <span style={{ fontSize: '0.85rem', color: '#1E1E1E', fontWeight: 700, fontStyle: 'italic' }}>
                "Why buy what someone nearby already has?"
              </span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: '#555', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>
              Campus Stats
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {impactStats.map((stat, i) => (
                <div key={i} style={{
                  background: '#fff',
                  border: '2px solid #1E1E1E',
                  borderRadius: '12px',
                  padding: '10px 6px',
                  textAlign: 'center',
                  boxShadow: '2px 2px 0px #1E1E1E'
                }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1E1E1E', fontFamily: 'var(--font-heading)' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.62rem', color: '#666', fontWeight: 700, textTransform: 'uppercase' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{
          background: '#FFFFFF',
          padding: '44px 38px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          
          {/* Mode Tabs */}
          <div style={{
            display: 'flex',
            background: '#FAF7F2',
            border: '2.5px solid #1E1E1E',
            borderRadius: 'var(--radius-full)',
            padding: '4px',
            marginBottom: '20px',
            boxShadow: '2px 2px 0px #1E1E1E'
          }}>
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: authMode === 'login' ? 'var(--pop-yellow)' : 'transparent',
                color: '#1E1E1E',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
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
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: authMode === 'register' ? 'var(--pop-mint)' : 'transparent',
                color: '#1E1E1E',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
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
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#1E1E1E', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Select Role
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              
              <div 
                onClick={() => handleSelectRole('student')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '16px',
                  background: selectedRole === 'student' ? '#BEE9E8' : '#FAF7F2',
                  border: '2.5px solid #1E1E1E',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: selectedRole === 'student' ? '3px 3px 0px #1E1E1E' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <GraduationCap size={20} color="#1E1E1E" />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1E1E1E' }}>Student</div>
                  <div style={{ fontSize: '0.66rem', color: '#666', fontWeight: 600 }}>Borrow & Lend</div>
                </div>
              </div>

              <div 
                onClick={() => handleSelectRole('admin')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '16px',
                  background: selectedRole === 'admin' ? 'var(--pop-pink)' : '#FAF7F2',
                  border: '2.5px solid #1E1E1E',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: selectedRole === 'admin' ? '3px 3px 0px #1E1E1E' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <ShieldCheck size={20} color="#1E1E1E" />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1E1E1E' }}>Admin</div>
                  <div style={{ fontSize: '0.66rem', color: '#1E1E1E', fontWeight: 600 }}>Moderator</div>
                </div>
              </div>

            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit}>
            
            {authMode === 'register' && (
              <>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#1E1E1E', display: 'block', marginBottom: '4px' }}>Full Name:</label>
                  <input type="text" className="input-field" required placeholder="e.g. Ananya Patel" value={regName} onChange={(e) => setRegName(e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#1E1E1E', display: 'block', marginBottom: '4px' }}>Dept:</label>
                    <input type="text" className="input-field" placeholder="IT / CS / Mech" value={regDept} onChange={(e) => setRegDept(e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#1E1E1E', display: 'block', marginBottom: '4px' }}>Year:</label>
                    <input type="text" className="input-field" placeholder="3rd Year" value={regYear} onChange={(e) => setRegYear(e.target.value)} />
                  </div>
                </div>
              </>
            )}

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#1E1E1E', display: 'block', marginBottom: '4px' }}>
                Campus Email:
              </label>
              <input 
                type="email" className="input-field" required placeholder="yourname@tsec.edu"
                value={authMode === 'register' ? regEmail : email}
                onChange={(e) => authMode === 'register' ? setRegEmail(e.target.value) : setEmail(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#1E1E1E', display: 'block', marginBottom: '4px' }}>
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
              className="btn btn-emerald"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem'
              }}
            >
              {isSubmitting ? 'Processing...' : authMode === 'register' ? (
                <><UserPlus size={16} /> Create Profile & Sign In</>
              ) : (
                <><LogIn size={16} /> Sign In as {selectedRole === 'admin' ? 'Admin' : 'Student'}</>
              )}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
