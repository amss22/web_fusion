import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Settings, 
  Users, 
  DollarSign, 
  Scale, 
  TrendingUp, 
  Ban, 
  UserCheck, 
  Package, 
  Sliders 
} from 'lucide-react';

export default function AdminPanel() {
  const { 
    users, 
    items, 
    exchanges, 
    platformConfig, 
    updatePlatformConfig, 
    setItemApproval, 
    resolveDispute, 
    toggleUserSuspension,
    impactStats 
  } = useCampus();

  const [activeAdminTab, setActiveAdminTab] = useState('disputes'); // disputes, approvals, users, config
  const [feeInput, setFeeInput] = useState(platformConfig.platformFeePercent);
  const [lateFeeInput, setLateFeeInput] = useState(platformConfig.lateFeePerHour);

  // Selected dispute for resolution modal/action
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [approvedDeduction, setApprovedDeduction] = useState(0);
  const [adminVerdictNote, setAdminVerdictNote] = useState('');

  const pendingDisputes = exchanges.filter(ex => ex.disputeRaised && ex.disputeStatus === 'Under Review');
  const pendingApprovals = items.filter(i => !i.isApproved);
  const totalPlatformEarnings = exchanges.reduce((acc, ex) => acc + (ex.platformFee || 0), 2450);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    updatePlatformConfig({
      platformFeePercent: Number(feeInput),
      lateFeePerHour: Number(lateFeeInput)
    });
  };

  const handleExecuteResolution = (e) => {
    e.preventDefault();
    if (!selectedDispute) return;
    resolveDispute(selectedDispute.id, approvedDeduction, adminVerdictNote);
    setSelectedDispute(null);
    setAdminVerdictNote('');
  };

  return (
    <div>
      {/* Top Admin Summary Banner */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #f43f5e, #be123c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(244, 63, 94, 0.3)'
            }}>
              <ShieldCheck size={22} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                Campus Circular Governance & Admin Panel
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                Monitor peer exchanges, arbitrate damage disputes, approve listings, and configure platform economics.
              </p>
            </div>
          </div>

          <span className="badge badge-rose">Official Campus Moderator</span>
        </div>

        {/* 4 Key Admin Metric Tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Disputes</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: pendingDisputes.length > 0 ? 'var(--accent-rose)' : 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
              {pendingDisputes.length}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Platform Treasury Fee</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              ₹{totalPlatformEarnings}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Campus Listings</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)' }}>
              {items.length}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Current Service Fee</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
              {platformConfig.platformFeePercent}%
            </div>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveAdminTab('disputes')}
          className={`btn btn-sm ${activeAdminTab === 'disputes' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <Scale size={15} />
          Dispute Arbitration ({pendingDisputes.length})
        </button>

        <button 
          onClick={() => setActiveAdminTab('users')}
          className={`btn btn-sm ${activeAdminTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <Users size={15} />
          User Moderation & Trust ({users.length})
        </button>

        <button 
          onClick={() => setActiveAdminTab('config')}
          className={`btn btn-sm ${activeAdminTab === 'config' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <Settings size={15} />
          Fee & Economics Configuration
        </button>
      </div>

      {/* TAB 1: DISPUTES */}
      {activeAdminTab === 'disputes' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#fff' }}>
            Reported Damage & Late Return Disputes
          </h3>

          {pendingDisputes.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={32} color="var(--accent-emerald)" style={{ margin: '0 auto 10px' }} />
              <div>Zero pending disputes! Campus exchanges are running smoothly.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {pendingDisputes.map(dispute => (
                <div 
                  key={dispute.id}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="badge badge-rose">DISPUTE: {dispute.id}</span>
                      <strong style={{ color: '#fff' }}>{dispute.itemTitle}</strong>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Escrow Deposit: ₹{dispute.securityDeposit}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: '#fca5a5', marginBottom: '10px' }}>
                    <strong>Lender Claim ({dispute.lenderName}):</strong> "{dispute.damageDescription}" (Proposed Deduction: ₹{dispute.damageDeduction})
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => {
                        setSelectedDispute(dispute);
                        setApprovedDeduction(dispute.damageDeduction);
                        setAdminVerdictNote(`Approved damage repair compensation of ₹${dispute.damageDeduction}`);
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      <Scale size={15} />
                      Adjudicate & Resolve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* DISPUTE RESOLUTION MODAL */}
      {selectedDispute && (
        <div className="modal-overlay" onClick={() => setSelectedDispute(null)}>
          <div className="modal-content" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#fff' }}>
                Arbitrate Dispute: {selectedDispute.id}
              </h3>
              <button onClick={() => setSelectedDispute(null)} style={{ background: 'none', border: 'none', color: '#fff' }}>✕</button>
            </div>
            
            <form onSubmit={handleExecuteResolution}>
              <div className="modal-body">
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  Review damage claim for <strong>{selectedDispute.itemTitle}</strong>. Decide how much to deduct from the borrower's ₹{selectedDispute.securityDeposit} security deposit.
                </p>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '6px' }}>
                    Approved Deduction Amount from Deposit (₹):
                  </label>
                  <input 
                    type="number"
                    className="input-field"
                    max={selectedDispute.securityDeposit}
                    value={approvedDeduction}
                    onChange={(e) => setApprovedDeduction(e.target.value)}
                    required
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Remaining ₹{selectedDispute.securityDeposit - approvedDeduction} will be refunded to borrower.
                  </span>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '6px' }}>
                    Official Moderator Reason / Verdict Note:
                  </label>
                  <textarea 
                    className="input-field"
                    rows="3"
                    value={adminVerdictNote}
                    onChange={(e) => setAdminVerdictNote(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setSelectedDispute(null)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-emerald btn-sm">
                  Confirm Official Verdict
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: USERS & TRUST */}
      {activeAdminTab === 'users' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#fff' }}>
            Campus Member Trust Scores & Moderation
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            {users.map(u => (
              <div 
                key={u.id}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: u.isSuspended ? '1px solid var(--accent-rose)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <img src={u.avatar} alt={u.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>{u.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.department}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  <span>Trust Score: <strong style={{ color: 'var(--accent-emerald)' }}>{u.trustScore}%</strong></span>
                  <span>Exchanges: <strong style={{ color: '#fff' }}>{u.successfulExchanges}</strong></span>
                </div>

                {u.role !== 'admin' && (
                  <button 
                    onClick={() => toggleUserSuspension(u.id)}
                    className={`btn btn-sm ${u.isSuspended ? 'btn-emerald' : 'btn-danger'}`}
                    style={{ width: '100%', fontSize: '0.78rem' }}
                  >
                    {u.isSuspended ? (
                      <>
                        <UserCheck size={14} />
                        Lift Suspension
                      </>
                    ) : (
                      <>
                        <Ban size={14} />
                        Flag / Suspend Account
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PLATFORM FEE CONFIG */}
      {activeAdminTab === 'config' && (
        <div className="glass-panel" style={{ padding: '24px', maxWidth: '600px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#fff' }}>
            Configurable Platform Economics
          </h3>

          <form onSubmit={handleSaveConfig}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.85rem', color: '#e2e8f0', display: 'block', marginBottom: '6px' }}>
                Campus Platform / Service Fee Percentage:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input 
                  type="range"
                  min="0"
                  max="15"
                  value={feeInput}
                  onChange={(e) => setFeeInput(e.target.value)}
                  style={{ flex: 1, accentColor: 'var(--accent-cyan)' }}
                />
                <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-mono)', minWidth: '45px' }}>
                  {feeInput}%
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Directly affects the escrow formula: Borrow Charge + Platform Fee ({feeInput}%) + Security Deposit
              </span>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.85rem', color: '#e2e8f0', display: 'block', marginBottom: '6px' }}>
                Default Overdue Late Fee per Hour (₹):
              </label>
              <input 
                type="number"
                className="input-field"
                value={lateFeeInput}
                onChange={(e) => setLateFeeInput(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-emerald btn-sm">
              Save Platform Configuration
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
