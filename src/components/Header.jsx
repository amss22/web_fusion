import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  Sparkles, 
  ShieldCheck, 
  PlusCircle, 
  Layers, 
  Repeat, 
  BarChart3, 
  Radio, 
  ChevronDown, 
  CheckCircle2, 
  Bell, 
  ShieldAlert,
  UserCheck,
  Building2,
  Sparkle,
  LogOut
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenAddModal, onLogout }) {
  const { 
    users, 
    currentUser, 
    switchUser, 
    exchanges, 
    notifications, 
    platformConfig 
  } = useCampus();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Active pending actions count
  const activeExchangesCount = exchanges.filter(ex => 
    ex.status !== 'Rated' && (ex.borrowerId === currentUser.id || ex.lenderId === currentUser.id || currentUser.role === 'admin')
  ).length;

  const pendingDisputesCount = exchanges.filter(ex => ex.disputeRaised && ex.disputeStatus === 'Under Review').length;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 500,
      background: 'rgba(9, 13, 22, 0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-card)',
      padding: '12px 0'
    }}>
      <div className="container flex-between" style={{ gap: '16px' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('browse')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #06b6d4, #10b981)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
          }}>
            <Repeat size={24} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '1.25rem', 
                fontWeight: 800, 
                letterSpacing: '-0.02em',
                background: 'linear-gradient(90deg, #fff, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Campus<span style={{ color: 'var(--accent-cyan)', WebkitTextFillColor: 'var(--accent-cyan)' }}>Circular</span>
              </span>
              <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                LIVE CAMPUS
              </span>
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              "Why buy what someone nearby already has?"
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button 
            onClick={() => setActiveTab('browse')}
            className={`btn btn-sm ${activeTab === 'browse' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Sparkles size={16} />
            Browse & AI Match
          </button>

          <button 
            onClick={() => setActiveTab('exchanges')}
            className={`btn btn-sm ${activeTab === 'exchanges' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ position: 'relative' }}
          >
            <Repeat size={16} />
            Active Exchanges
            {activeExchangesCount > 0 && (
              <span style={{
                background: 'var(--accent-emerald)',
                color: '#fff',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.7rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                marginLeft: '4px'
              }}>
                {activeExchangesCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => setActiveTab('community')}
            className={`btn btn-sm ${activeTab === 'community' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Radio size={16} />
            Community Board
          </button>

          <button 
            onClick={() => setActiveTab('impact')}
            className={`btn btn-sm ${activeTab === 'impact' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <BarChart3 size={16} />
            Impact
          </button>

          <button 
            onClick={() => setActiveTab('admin')}
            className={`btn btn-sm ${activeTab === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ position: 'relative' }}
          >
            <ShieldCheck size={16} />
            Admin Panel
            {pendingDisputesCount > 0 && (
              <span style={{
                background: 'var(--accent-rose)',
                color: '#fff',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.7rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                marginLeft: '4px'
              }}>
                {pendingDisputesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Actions & Role Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Post Listing CTA */}
          <button 
            onClick={onOpenAddModal}
            className="btn btn-emerald btn-sm"
          >
            <PlusCircle size={16} />
            List Item
          </button>

          {/* Interactive Role Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                padding: '5px 12px 5px 6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-cyan)' }}
              />
              <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                    {currentUser.name.split(' ')[0]}
                  </span>
                  {currentUser.role === 'admin' ? (
                    <span className="badge badge-rose" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>ADMIN</span>
                  ) : (
                    <span className="badge badge-emerald" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                      {currentUser.trustScore}% TRUST
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {currentUser.role === 'admin' ? 'Campus Moderator' : currentUser.department.split(' ')[0]}
                </div>
              </div>
              <ChevronDown size={14} color="var(--text-muted)" />
            </div>

            {/* Switcher Modal / Dropdown */}
            {showUserDropdown && (
              <div 
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '320px',
                  padding: '12px',
                  zIndex: 1000,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Switch Test Persona (Simulate Roles)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {users.map(u => (
                    <div 
                      key={u.id}
                      onClick={() => {
                        switchUser(u.id);
                        setShowUserDropdown(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 10px',
                        borderRadius: 'var(--radius-sm)',
                        background: u.id === currentUser.id ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        border: u.id === currentUser.id ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <img src={u.avatar} alt={u.name} style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#fff' }}>{u.name}</span>
                          {u.role === 'admin' ? (
                            <span className="badge badge-rose" style={{ fontSize: '0.6rem' }}>Admin</span>
                          ) : (
                            <span className="badge badge-cyan" style={{ fontSize: '0.6rem' }}>{u.trustScore}%</span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {u.department} • {u.year}
                        </div>
                      </div>
                      {u.id === currentUser.id && <CheckCircle2 size={16} color="var(--accent-cyan)" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="btn btn-sm btn-secondary"
            title="Sign out"
            style={{ padding: '6px 10px' }}
          >
            <LogOut size={16} />
          </button>

        </div>

      </div>
    </header>
  );
}
