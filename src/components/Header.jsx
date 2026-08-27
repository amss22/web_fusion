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
      borderBottom: '3px solid #000000',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 0px #000000'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        
        {/* Playful Brand Logo */}
        <div 
          onClick={() => setActiveTab('browse')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            cursor: 'pointer',
            transform: 'rotate(-1deg)',
            transition: 'transform 0.15s ease'
          }}
        >
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            background: 'var(--pop-yellow)',
            border: '3px solid #000000',
            boxShadow: '3px 3px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Repeat size={24} color="#000000" />
          </div>
          <div>
            <span style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 900, 
              fontSize: '1.45rem', 
              color: '#000000',
              letterSpacing: '-0.03em'
            }}>
              Campus<span style={{ color: 'var(--pop-periwinkle)', textShadow: '1.5px 1.5px 0px #000000' }}>Circular</span>
            </span>
            <div style={{ fontSize: '0.72rem', color: '#000000', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Trusted Peer Sharing
            </div>
          </div>
        </div>

        {/* Neo-Brutalist Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setActiveTab('browse')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'browse' ? 'var(--pop-yellow)' : '#FFFFFF',
              color: '#000000',
              boxShadow: activeTab === 'browse' ? '3px 3px 0px #000000' : '2px 2px 0px #000000',
              border: '2.5px solid #000000',
              transform: activeTab === 'browse' ? 'translate(-2px, -2px)' : 'none'
            }}
          >
            <Sparkles size={15} />
            Browse & AI
          </button>

          <button
            onClick={() => setActiveTab('exchanges')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'exchanges' ? 'var(--pop-periwinkle)' : '#FFFFFF',
              color: '#000000',
              boxShadow: activeTab === 'exchanges' ? '3px 3px 0px #000000' : '2px 2px 0px #000000',
              border: '2.5px solid #000000',
              transform: activeTab === 'exchanges' ? 'translate(-2px, -2px)' : 'none'
            }}
          >
            <Layers size={15} />
            Exchanges
            {activeExchangesCount > 0 && (
              <span style={{
                background: 'var(--pop-pink)',
                color: '#000000',
                fontSize: '0.68rem',
                borderRadius: '6px',
                padding: '1px 5px',
                border: '1.5px solid #000000',
                fontWeight: 900
              }}>
                {activeExchangesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'community' ? 'var(--pop-mint)' : '#FFFFFF',
              color: '#000000',
              boxShadow: activeTab === 'community' ? '3px 3px 0px #000000' : '2px 2px 0px #000000',
              border: '2.5px solid #000000',
              transform: activeTab === 'community' ? 'translate(-2px, -2px)' : 'none'
            }}
          >
            <Radio size={15} />
            Requests
            {activeRequestsCount > 0 && (
              <span style={{
                background: 'var(--pop-yellow)',
                color: '#000000',
                fontSize: '0.68rem',
                borderRadius: '6px',
                padding: '1px 5px',
                border: '1.5px solid #000000',
                fontWeight: 900
              }}>
                {activeRequestsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('impact')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'impact' ? 'var(--pop-cyan)' : '#FFFFFF',
              color: '#000000',
              boxShadow: activeTab === 'impact' ? '3px 3px 0px #000000' : '2px 2px 0px #000000',
              border: '2.5px solid #000000',
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
              background: activeTab === 'admin' ? 'var(--pop-pink)' : '#FFFFFF',
              color: '#000000',
              boxShadow: activeTab === 'admin' ? '3px 3px 0px #000000' : '2px 2px 0px #000000',
              border: '2.5px solid #000000',
              transform: activeTab === 'admin' ? 'translate(-2px, -2px)' : 'none'
            }}
          >
            <ShieldCheck size={15} />
            Admin
            {pendingDisputesCount > 0 && (
              <span style={{
                background: '#FF0000',
                color: '#FFFFFF',
                fontSize: '0.68rem',
                borderRadius: '6px',
                padding: '1px 5px',
                border: '1.5px solid #000000',
                fontWeight: 900
              }}>
                {pendingDisputesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          <button 
            onClick={onOpenAddModal}
            className="btn btn-emerald btn-sm"
          >
            <PlusCircle size={16} />
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
                background: '#FFFFFF',
                border: '2.5px solid #000000',
                borderRadius: '10px',
                padding: '4px 12px 4px 6px',
                cursor: 'pointer',
                boxShadow: '2.5px 2.5px 0px #000000'
              }}
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1.5px solid #000000' }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)' }}>
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown size={14} color="#000000" />
            </button>

            {showUserDropdown && (
              <div style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: '240px',
                background: '#FFFFFF',
                border: '3px solid #000000',
                borderRadius: '12px',
                boxShadow: '5px 5px 0px #000000',
                padding: '8px',
                zIndex: 200
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#666666', textTransform: 'uppercase', padding: '6px 8px' }}>
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
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: u.id === currentUser.id ? 'var(--pop-yellow)' : 'transparent',
                      border: u.id === currentUser.id ? '2px solid #000000' : 'none',
                      marginBottom: '4px'
                    }}
                  >
                    <img src={u.avatar} alt={u.name} style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #000000' }} />
                    <div style={{ flex: 1, fontSize: '0.82rem', fontWeight: 800, color: '#000000' }}>
                      {u.name}
                    </div>
                    {u.id === currentUser.id && <CheckCircle2 size={16} color="#000000" />}
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
            <LogOut size={15} />
          </button>

        </div>

      </div>
    </header>
  );
}
