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
  LogOut,
  Coins
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenAddModal, onOpenRedeemModal, onLogout }) {
  const { 
    users, 
    currentUser, 
    switchUser, 
    exchanges, 
    communityRequests,
    platformConfig,
    redeemTokens
  } = useCampus();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showTokenDropdown, setShowTokenDropdown] = useState(false);

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
        height: '68px',
        gap: '16px',
        maxWidth: '1280px',
        padding: '0 24px'
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
            transition: 'transform 0.15s ease',
            flexShrink: 0
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '9px',
            background: 'var(--pop-yellow)',
            border: '2.5px solid #000000',
            boxShadow: '2.5px 2.5px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Repeat size={20} color="#000000" />
          </div>
          <div>
            <span style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 900, 
              fontSize: '1.25rem', 
              color: '#000000',
              letterSpacing: '-0.03em',
              display: 'block',
              lineHeight: 1.1
            }}>
              Campus<span style={{ color: 'var(--pop-periwinkle)', textShadow: '1px 1px 0px #000000' }}>Circular</span>
            </span>
            <div style={{ fontSize: '0.64rem', color: '#333333', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px' }}>
              Trusted Peer Sharing
            </div>
          </div>
        </div>

        {/* Neo-Brutalist Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'nowrap' }}>
          <button
            onClick={() => setActiveTab('browse')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'browse' ? 'var(--pop-yellow)' : '#FFFFFF',
              color: '#000000',
              boxShadow: activeTab === 'browse' ? '2.5px 2.5px 0px #000000' : '1.5px 1.5px 0px #000000',
              border: '2px solid #000000',
              transform: activeTab === 'browse' ? 'translate(-1px, -1px)' : 'none',
              fontSize: '0.8rem',
              padding: '6px 13px',
              gap: '6px',
              fontWeight: 800
            }}
          >
            <Sparkles size={14} />
            Browse & AI
          </button>

          <button
            onClick={() => setActiveTab('exchanges')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'exchanges' ? 'var(--pop-periwinkle)' : '#FFFFFF',
              color: '#000000',
              boxShadow: activeTab === 'exchanges' ? '2.5px 2.5px 0px #000000' : '1.5px 1.5px 0px #000000',
              border: '2px solid #000000',
              transform: activeTab === 'exchanges' ? 'translate(-1px, -1px)' : 'none',
              fontSize: '0.8rem',
              padding: '6px 13px',
              gap: '6px',
              fontWeight: 800
            }}
          >
            <Layers size={14} />
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
              boxShadow: activeTab === 'community' ? '2.5px 2.5px 0px #000000' : '1.5px 1.5px 0px #000000',
              border: '2px solid #000000',
              transform: activeTab === 'community' ? 'translate(-1px, -1px)' : 'none',
              fontSize: '0.8rem',
              padding: '6px 13px',
              gap: '6px',
              fontWeight: 800
            }}
          >
            <Radio size={14} />
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
              boxShadow: activeTab === 'impact' ? '2.5px 2.5px 0px #000000' : '1.5px 1.5px 0px #000000',
              border: '2px solid #000000',
              transform: activeTab === 'impact' ? 'translate(-1px, -1px)' : 'none',
              fontSize: '0.8rem',
              padding: '6px 13px',
              gap: '6px',
              fontWeight: 800
            }}
          >
            <BarChart3 size={14} />
            Impact
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'admin' ? 'var(--pop-pink)' : '#FFFFFF',
              color: '#000000',
              boxShadow: activeTab === 'admin' ? '2.5px 2.5px 0px #000000' : '1.5px 1.5px 0px #000000',
              border: '2px solid #000000',
              transform: activeTab === 'admin' ? 'translate(-1px, -1px)' : 'none',
              fontSize: '0.8rem',
              padding: '6px 13px',
              gap: '6px',
              fontWeight: 800
            }}
          >
            <ShieldCheck size={14} />
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          
          <button 
            onClick={onOpenAddModal}
            className="btn btn-emerald btn-sm"
            style={{ fontSize: '0.78rem', padding: '6px 12px', gap: '5px', fontWeight: 800 }}
          >
            <PlusCircle size={14} />
            + List Item
          </button>

          {/* Token Badge & Redeem Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { setShowTokenDropdown(!showTokenDropdown); setShowUserDropdown(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: 'var(--pop-yellow)',
                border: '2px solid #000',
                borderRadius: '8px',
                padding: '5px 10px',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #000',
                fontSize: '0.78rem',
                fontWeight: 800,
                color: '#000'
              }}
            >
              <Coins size={15} color="#000" />
              {currentUser.tokenBalance || 0}
            </button>

            {showTokenDropdown && (
              <div style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: '280px',
                background: '#FFFFFF',
                border: '3px solid #000',
                borderRadius: '12px',
                boxShadow: '5px 5px 0px #000',
                padding: '14px',
                zIndex: 200
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#666', textTransform: 'uppercase' }}>
                    Reward Tokens
                  </div>
                  <div style={{
                    background: 'var(--pop-yellow)',
                    border: '2px solid #000',
                    borderRadius: '6px',
                    padding: '2px 8px',
                    fontSize: '0.82rem',
                    fontWeight: 900,
                    color: '#000',
                    boxShadow: '1.5px 1.5px 0px #000'
                  }}>
                    <Coins size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    {currentUser.tokenBalance || 0} tokens
                  </div>
                </div>

                <div style={{ fontSize: '0.72rem', color: '#666', fontWeight: 600, marginBottom: '10px' }}>
                  Earn {platformConfig.tokensPerCompletedExchange || 15} tokens per completed exchange. Redeem for wallet credit:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {(platformConfig.discountCoupons || []).map(coupon => (
                    <div
                      key={coupon.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '2px solid #000',
                        background: (currentUser.tokenBalance || 0) >= coupon.tokenCost ? '#FFF' : '#F5F5F5'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#000' }}>
                          {coupon.label}
                        </div>
                        <div style={{ fontSize: '0.66rem', fontWeight: 600, color: '#888' }}>
                          Cost: {coupon.tokenCost} tokens
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          redeemTokens(coupon.id);
                          setShowTokenDropdown(false);
                        }}
                        disabled={(currentUser.tokenBalance || 0) < coupon.tokenCost}
                        style={{
                          background: (currentUser.tokenBalance || 0) >= coupon.tokenCost ? 'var(--pop-mint)' : '#DDD',
                          border: '2px solid #000',
                          borderRadius: '6px',
                          padding: '3px 10px',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          cursor: (currentUser.tokenBalance || 0) >= coupon.tokenCost ? 'pointer' : 'not-allowed',
                          color: '#000',
                          boxShadow: (currentUser.tokenBalance || 0) >= coupon.tokenCost ? '1.5px 1.5px 0px #000' : 'none'
                        }}
                      >
                        Redeem
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '2px dashed #000' }}>
                  <button
                    onClick={() => {
                      setShowTokenDropdown(false);
                      if (onOpenRedeemModal) onOpenRedeemModal();
                    }}
                    className="btn btn-sm btn-primary"
                    style={{ width: '100%', fontSize: '0.75rem', padding: '6px' }}
                  >
                    Open Rewards Store & Perks →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#FFFFFF',
                border: '2px solid #000000',
                borderRadius: '8px',
                padding: '4px 10px 4px 6px',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #000000'
              }}
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1.5px solid #000000' }}
              />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#000000', fontFamily: 'var(--font-body)' }}>
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown size={13} color="#000000" />
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
