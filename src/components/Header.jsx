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
  LogOut
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenAddModal, onLogout }) {
  const { 
    users, 
    currentUser, 
    switchUser, 
    exchanges, 
    communityRequests 
  } = useCampus();

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const activeExchangesCount = exchanges.filter(ex => ex.stageIndex > 0 && ex.stageIndex < 9).length;
  const activeRequestsCount = communityRequests.filter(r => !r.fulfilled).length;
  const pendingDisputesCount = exchanges.filter(ex => ex.disputeRaised && ex.disputeStatus !== 'Resolved').length;

  return (
    <header style={{
      background: '#FFFFFF',
      borderBottom: '2.5px solid #1E1E1E',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '8px 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        
        {/* Playful Brand Logo */}
        <div 
          onClick={() => setActiveTab('browse')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            cursor: 'pointer',
            transform: 'rotate(-1deg)',
            transition: 'transform 0.2s ease'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--pop-yellow)',
            border: '2.5px solid #1E1E1E',
            boxShadow: '3px 3px 0px #1E1E1E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Repeat size={22} color="#1E1E1E" />
          </div>
          <div>
            <span style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 800, 
              fontSize: '1.35rem', 
              color: '#1E1E1E'
            }}>
              Campus<span style={{ color: 'var(--pop-pink)' }}>Circular</span>
            </span>
            <div style={{ fontSize: '0.7rem', color: '#666', fontWeight: 700, letterSpacing: '0.04em' }}>
              Trusted Peer Sharing ✨
            </div>
          </div>
        </div>

        {/* Minimal Cartoon Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('browse')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'browse' ? 'var(--pop-yellow)' : '#fff',
              color: '#1E1E1E',
              boxShadow: activeTab === 'browse' ? '3px 3px 0px #1E1E1E' : 'none',
              border: '2px solid #1E1E1E'
            }}
          >
            <Sparkles size={14} />
            Browse & AI
          </button>

          <button
            onClick={() => setActiveTab('exchanges')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'exchanges' ? '#BEE9E8' : '#fff',
              color: '#1E1E1E',
              boxShadow: activeTab === 'exchanges' ? '3px 3px 0px #1E1E1E' : 'none',
              border: '2px solid #1E1E1E'
            }}
          >
            <Layers size={14} />
            Exchanges
            {activeExchangesCount > 0 && (
              <span style={{
                background: 'var(--pop-pink)',
                color: '#fff',
                fontSize: '0.65rem',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
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
              background: activeTab === 'community' ? '#E2F0CB' : '#fff',
              color: '#1E1E1E',
              boxShadow: activeTab === 'community' ? '3px 3px 0px #1E1E1E' : 'none',
              border: '2px solid #1E1E1E'
            }}
          >
            <Radio size={14} />
            Requests
            {activeRequestsCount > 0 && (
              <span style={{
                background: 'var(--pop-yellow)',
                color: '#1E1E1E',
                fontSize: '0.65rem',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
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
              background: activeTab === 'impact' ? 'var(--pop-mint)' : '#fff',
              color: '#1E1E1E',
              boxShadow: activeTab === 'impact' ? '3px 3px 0px #1E1E1E' : 'none',
              border: '2px solid #1E1E1E'
            }}
          >
            <BarChart3 size={14} />
            Impact
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'admin' ? 'var(--pop-pink)' : '#fff',
              color: '#1E1E1E',
              boxShadow: activeTab === 'admin' ? '3px 3px 0px #1E1E1E' : 'none',
              border: '2px solid #1E1E1E'
            }}
          >
            <ShieldCheck size={14} />
            Admin
            {pendingDisputesCount > 0 && (
              <span style={{
                background: '#FF6B6B',
                color: '#fff',
                fontSize: '0.65rem',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
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

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          <button 
            onClick={onOpenAddModal}
            className="btn btn-emerald btn-sm"
          >
            <PlusCircle size={15} />
            + List Item
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
                border: '2px solid #1E1E1E',
                borderRadius: 'var(--radius-full)',
                padding: '4px 12px 4px 6px',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #1E1E1E'
              }}
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid #1E1E1E' }}
              />
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1E1E1E' }}>
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown size={14} color="#1E1E1E" />
            </button>

            {showUserDropdown && (
              <div style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: '240px',
                background: '#fff',
                border: '2.5px solid #1E1E1E',
                borderRadius: '16px',
                boxShadow: '4px 4px 0px #1E1E1E',
                padding: '8px',
                zIndex: 200
              }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#888', textTransform: 'uppercase', padding: '6px 8px' }}>
                  Switch Profile
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
                      padding: '8px 10px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      background: u.id === currentUser.id ? 'var(--pop-yellow)' : 'transparent',
                      border: u.id === currentUser.id ? '1.5px solid #1E1E1E' : 'none',
                      marginBottom: '4px'
                    }}
                  >
                    <img src={u.avatar} alt={u.name} style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1px solid #1E1E1E' }} />
                    <div style={{ flex: 1, fontSize: '0.82rem', fontWeight: 700, color: '#1E1E1E' }}>
                      {u.name}
                    </div>
                    {u.id === currentUser.id && <CheckCircle2 size={16} color="#1E1E1E" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onLogout}
            className="btn btn-sm btn-secondary"
            title="Sign out"
            style={{ padding: '6px 10px', borderRadius: '50%' }}
          >
            <LogOut size={15} />
          </button>

        </div>

      </div>
    </header>
  );
}
