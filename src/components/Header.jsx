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
  LogOut
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenAddModal, onLogout }) {
  const { 
    users, 
    currentUser, 
    currentUserId, 
    switchUser, 
    exchanges, 
    communityRequests 
  } = useCampus();

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Active counts for badges
  const activeExchangesCount = exchanges.filter(ex => ex.stageIndex > 0 && ex.stageIndex < 9).length;
  const activeRequestsCount = communityRequests.filter(r => !r.fulfilled).length;
  const pendingDisputesCount = exchanges.filter(ex => ex.disputeRaised && ex.disputeStatus !== 'Resolved').length;

  return (
    <header style={{
      background: '#FFF8E7',
      borderBottom: '3px solid #222',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 0px #222'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
        padding: '0 20px'
      }}>
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('browse')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: '#FFE66D',
            border: '3px solid #222',
            boxShadow: '3px 3px 0px #222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Repeat size={24} color="#222" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ 
                fontFamily: 'var(--font-heading)', 
                fontWeight: 800, 
                fontSize: '1.4rem', 
                color: '#222'
              }}>
                Campus<span style={{ color: '#FF6B9D' }}>Circular</span>
              </span>
              <span className="badge badge-amber" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                90s RETRO
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#555', fontWeight: 600 }}>
              Trusted Peer Sharing • WebFusion 2.0
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('browse')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'browse' ? '#4ECDC4' : '#fff',
              color: '#222',
              border: '3px solid #222',
              boxShadow: activeTab === 'browse' ? '3px 3px 0px #222' : '2px 2px 0px #222',
              transform: activeTab === 'browse' ? 'translate(-2px, -2px)' : 'none'
            }}
          >
            <Sparkles size={15} />
            Browse & AI Match
          </button>

          <button
            onClick={() => setActiveTab('exchanges')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'exchanges' ? '#FFE66D' : '#fff',
              color: '#222',
              border: '3px solid #222',
              boxShadow: activeTab === 'exchanges' ? '3px 3px 0px #222' : '2px 2px 0px #222',
              transform: activeTab === 'exchanges' ? 'translate(-2px, -2px)' : 'none'
            }}
          >
            <Layers size={15} />
            My Exchanges
            {activeExchangesCount > 0 && (
              <span style={{
                background: '#FF6B9D',
                color: '#fff',
                fontSize: '0.68rem',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                border: '1px solid #222',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800
              }}>
                {activeExchangesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'community' ? '#B8B8FF' : '#fff',
              color: '#222',
              border: '3px solid #222',
              boxShadow: activeTab === 'community' ? '3px 3px 0px #222' : '2px 2px 0px #222',
              transform: activeTab === 'community' ? 'translate(-2px, -2px)' : 'none'
            }}
          >
            <Radio size={15} />
            Broadcast Board
            {activeRequestsCount > 0 && (
              <span style={{
                background: '#FFE66D',
                color: '#222',
                fontSize: '0.68rem',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                border: '1px solid #222',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800
              }}>
                {activeRequestsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('impact')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'impact' ? '#C7F464' : '#fff',
              color: '#222',
              border: '3px solid #222',
              boxShadow: activeTab === 'impact' ? '3px 3px 0px #222' : '2px 2px 0px #222',
              transform: activeTab === 'impact' ? 'translate(-2px, -2px)' : 'none'
            }}
          >
            <BarChart3 size={15} />
            Impact
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'admin' ? '#FF6B9D' : '#fff',
              color: activeTab === 'admin' ? '#fff' : '#222',
              border: '3px solid #222',
              boxShadow: activeTab === 'admin' ? '3px 3px 0px #222' : '2px 2px 0px #222',
              transform: activeTab === 'admin' ? 'translate(-2px, -2px)' : 'none'
            }}
          >
            <ShieldCheck size={15} />
            Admin Panel
            {pendingDisputesCount > 0 && (
              <span style={{
                background: '#FF6B6B',
                color: '#fff',
                fontSize: '0.68rem',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                border: '1px solid #222',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800
              }}>
                {pendingDisputesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Actions & Persona Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          <button 
            onClick={onOpenAddModal}
            className="btn btn-emerald btn-sm"
          >
            <PlusCircle size={16} />
            List Item
          </button>

          {/* User Profile Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#fff',
                border: '3px solid #222',
                borderRadius: '8px',
                padding: '4px 10px',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #222'
              }}
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #222' }}
              />
              <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#222' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#666', fontWeight: 600 }}>
                  {currentUser.role === 'admin' ? '🛡️ Admin' : '🎓 Student'}
                </div>
              </div>
              <ChevronDown size={14} color="#222" />
            </button>

            {showUserDropdown && (
              <div style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: '260px',
                background: '#fff',
                border: '3px solid #222',
                borderRadius: '12px',
                boxShadow: '6px 6px 0px #222',
                padding: '8px',
                zIndex: 200
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#888', textTransform: 'uppercase', padding: '6px 8px' }}>
                  Switch Active Persona
                </div>
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
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      background: u.id === currentUser.id ? '#FFE66D' : 'transparent',
                      border: u.id === currentUser.id ? '2px solid #222' : 'none',
                      marginBottom: '4px'
                    }}
                  >
                    <img src={u.avatar} alt={u.name} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #222' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#222' }}>{u.name}</div>
                      <div style={{ fontSize: '0.68rem', color: '#666' }}>{u.department}</div>
                    </div>
                    {u.id === currentUser.id && <CheckCircle2 size={16} color="#222" />}
                  </div>
                ))}
              </div>
            )}
          </div>

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
