import React, { useState } from 'react';
import { useCampus, LIFECYCLE_STAGES } from '../context/CampusContext';
import ConditionInspector from './ConditionInspector';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Camera, 
  DollarSign, 
  Star, 
  ArrowRight, 
  RotateCcw, 
  FileCheck,
  User,
  MapPin,
  Lock,
  MessageSquare,
  X,
  Tag,
  Scale
} from 'lucide-react';

export default function LifecycleTracker({ exchange, onRaiseDispute, onResolveDispute, onOpenRating }) {
  const { 
    currentUser, 
    advanceExchangeStage, 
    resolveDispute 
  } = useCampus();

  const [showInspector, setShowInspector] = useState(false);
  const [showDamageModal, setShowDamageModal] = useState(false);

  // Damage Form States
  const [damageType, setDamageType] = useState('Scratches & Cosmetic Damage');
  const [customDescription, setCustomDescription] = useState('');
  const [claimAmount, setClaimAmount] = useState(250);

  // Admin Arbitration States
  const [adminResolutionNote, setAdminResolutionNote] = useState('Deduction approved based on post-return inspection.');
  const [adminApprovedDeduction, setAdminApprovedDeduction] = useState(exchange.damageDeduction || 250);

  const isLender = currentUser.id === exchange.lenderId;
  const isBorrower = currentUser.id === exchange.borrowerId;
  const isAdmin = currentUser.role === 'admin';

  const handleNextStage = (extraState = {}) => {
    advanceExchangeStage(exchange.id, extraState);
  };

  const damageCategories = [
    'Scratches & Cosmetic Damage',
    'Broken Parts & Physical Dent',
    'Missing Accessories or Cable',
    'Device Malfunction / No Power',
    'Late Return & Heavy Wear'
  ];

  const handleFileDamageClaim = (e) => {
    e.preventDefault();
    const finalReason = customDescription.trim() 
      ? `${damageType}: ${customDescription.trim()}`
      : damageType;

    const finalAmount = Math.min(Number(claimAmount) || 0, exchange.securityDeposit);

    onRaiseDispute(exchange.id, finalReason, finalAmount);
    setShowDamageModal(false);
  };

  return (
    <div style={{
      background: '#fff',
      border: '2.5px solid #1E1E1E',
      borderRadius: '24px',
      padding: '28px',
      marginBottom: '28px',
      boxShadow: '4px 4px 0px #1E1E1E'
    }}>
      
      {/* Exchange Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '2px dashed #1E1E1E' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img src={exchange.itemImage} alt={exchange.itemTitle} style={{ width: '52px', height: '52px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #1E1E1E' }} />
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1E1E1E', fontFamily: 'var(--font-heading)' }}>{exchange.itemTitle}</div>
            <div style={{ fontSize: '0.78rem', color: '#666', fontWeight: 600 }}>
              Exchange ID: <strong style={{ fontFamily: 'var(--font-mono)' }}>{exchange.id}</strong> • Lender: {exchange.lenderName} • Borrower: {exchange.borrowerName}
            </div>
          </div>
        </div>

        <span className="badge badge-amber" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
          Stage {exchange.stageIndex}: {LIFECYCLE_STAGES[exchange.stageIndex]?.label}
        </span>
      </div>

      {/* 10-Stage Horizontal Stepper */}
      <div style={{ marginBottom: '28px', overflowX: 'auto', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', minWidth: '850px', justifyContent: 'space-between', position: 'relative' }}>
          {LIFECYCLE_STAGES.map((st, idx) => {
            const isPassed = idx < exchange.stageIndex;
            const isCurrent = idx === exchange.stageIndex;

            return (
              <div key={st.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative', zIndex: 2 }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: isCurrent ? 'var(--pop-pink)' : isPassed ? 'var(--pop-mint)' : '#fff',
                  border: '2.5px solid #1E1E1E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  color: '#1E1E1E',
                  boxShadow: isCurrent ? '3px 3px 0px #1E1E1E' : '2px 2px 0px #1E1E1E',
                  transform: isCurrent ? 'scale(1.12)' : 'none',
                  transition: 'all 0.15s ease'
                }}>
                  {isPassed ? <CheckCircle2 size={18} color="#1E1E1E" /> : idx}
                </div>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: isCurrent ? 'var(--pop-pink)' : '#1E1E1E', marginTop: '6px', textAlign: 'center', fontFamily: 'var(--font-heading)' }}>
                  {st.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Stage Actions Box */}
      <div style={{ background: '#FFF9E6', border: '2.5px solid #1E1E1E', borderRadius: '18px', padding: '22px', marginBottom: '20px', boxShadow: '3px 3px 0px #1E1E1E' }}>
        <div style={{ fontWeight: 800, color: '#1E1E1E', fontSize: '1rem', marginBottom: '8px', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
          📍 Current Action Needed (Stage {exchange.stageIndex}: {LIFECYCLE_STAGES[exchange.stageIndex]?.label})
        </div>
        <p style={{ fontSize: '0.88rem', color: '#444', marginBottom: '16px', fontWeight: 600 }}>
          {LIFECYCLE_STAGES[exchange.stageIndex]?.desc}
        </p>

        {/* Dynamic Action Buttons per Stage */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          
          {/* Stage 1: Requested */}
          {exchange.stageIndex === 1 && isLender && (
            <button onClick={() => handleNextStage({ timelineNote: "Lender accepted request." })} className="btn btn-emerald btn-sm">
              <CheckCircle2 size={16} /> Accept Borrow Request
            </button>
          )}

          {/* Stage 2: Accepted */}
          {exchange.stageIndex === 2 && (
            <button onClick={() => setShowInspector(true)} className="btn btn-primary btn-sm">
              <Camera size={16} /> Verify Pre-Handover Checklist
            </button>
          )}

          {/* Stage 3: Handover */}
          {exchange.stageIndex === 3 && (
            <button onClick={() => handleNextStage({ timelineNote: "Pre-borrow handover complete." })} className="btn btn-emerald btn-sm">
              <ArrowRight size={16} /> Confirm Physical Handover
            </button>
          )}

          {/* Stage 4: Borrowed */}
          {exchange.stageIndex === 4 && (
            <button onClick={() => handleNextStage({ timelineNote: "Resource return initiated." })} className="btn btn-secondary btn-sm">
              <RotateCcw size={16} /> Initiate Item Return
            </button>
          )}

          {/* Stage 5: Return Due */}
          {exchange.stageIndex === 5 && (
            <button onClick={() => handleNextStage({ timelineNote: "Item physically returned." })} className="btn btn-emerald btn-sm">
              <CheckCircle2 size={16} /> Hand Over Return Item
            </button>
          )}

          {/* Stage 6: Returned */}
          {exchange.stageIndex === 6 && isLender && (
            <button onClick={() => setShowInspector(true)} className="btn btn-primary btn-sm">
              <Camera size={16} /> Perform Return Condition Inspection
            </button>
          )}

          {/* Stage 7: Inspection */}
          {exchange.stageIndex === 7 && isLender && (
            <>
              <button onClick={() => handleNextStage({ damageReported: false, timelineNote: "Lender confirmed clean condition." })} className="btn btn-emerald btn-sm">
                <CheckCircle2 size={16} /> Approve Clean Return
              </button>
              <button onClick={() => setShowDamageModal(true)} className="btn btn-danger btn-sm">
                <AlertTriangle size={16} /> Report Damage / Claim Money
              </button>
            </>
          )}

          {/* Stage 8: Settlement */}
          {exchange.stageIndex === 8 && (
            <button onClick={() => onOpenRating(exchange)} className="btn btn-primary btn-sm">
              <Star size={16} /> Submit Peer Trust Rating
            </button>
          )}

        </div>
      </div>

      {/* Active Dispute Banner & Admin Arbitration Resolution */}
      {exchange.disputeRaised && (
        <div style={{
          background: exchange.disputeStatus === 'Resolved' ? '#B5EAD7' : '#FFDAC1',
          border: '2.5px solid #1E1E1E',
          borderRadius: '18px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '4px 4px 0px #1E1E1E',
          animation: 'bounceIn 0.25s ease-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1E1E1E', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-heading)' }}>
              <AlertTriangle size={20} color="#E55A5A" />
              {exchange.disputeStatus === 'Resolved' ? '✅ DISPUTE RESOLVED & SETTLED' : '⚠️ ACTIVE DISPUTE LOGGED & UNDER REVIEW'}
            </div>
            <span className={`badge ${exchange.disputeStatus === 'Resolved' ? 'badge-emerald' : 'badge-rose'}`}>
              Status: {exchange.disputeStatus}
            </span>
          </div>

          <div style={{ background: '#fff', border: '2px solid #1E1E1E', borderRadius: '12px', padding: '14px', marginBottom: '14px', fontSize: '0.85rem' }}>
            <div style={{ marginBottom: '4px' }}>
              <strong>Reported Issue:</strong> {exchange.damageDescription || "Physical damage reported on return."}
            </div>
            <div style={{ display: 'flex', gap: '20px', marginTop: '6px' }}>
              <div>Claimed Damage: <strong style={{ color: '#E55A5A' }}>₹{exchange.damageDeduction}</strong></div>
              <div>Security Deposit Held: <strong style={{ color: '#06D6A0' }}>₹{exchange.securityDeposit}</strong></div>
            </div>
            {exchange.disputeResolutionNote && (
              <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed #1E1E1E', color: '#555' }}>
                <strong>Arbitration Verdict:</strong> {exchange.disputeResolutionNote}
              </div>
            )}
          </div>

          {/* Admin Arbitration Box */}
          {exchange.disputeStatus !== 'Resolved' && (
            <div style={{ background: '#fff', padding: '16px', borderRadius: '14px', border: '2px solid #1E1E1E' }}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '10px', color: '#1E1E1E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Scale size={16} color="var(--pop-blue)" />
                Arbitration Panel: Approve Claim & Deduct Damage Money
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#1E1E1E', display: 'block', marginBottom: '4px' }}>
                    Approved Damage Deduction (₹):
                  </label>
                  <input 
                    type="number" 
                    className="input-field" 
                    max={exchange.securityDeposit}
                    value={adminApprovedDeduction} 
                    onChange={(e) => setAdminApprovedDeduction(Math.min(exchange.securityDeposit, Number(e.target.value)))} 
                  />
                  <div style={{ fontSize: '0.68rem', color: '#777', marginTop: '2px' }}>Max: ₹{exchange.securityDeposit} (Deposit)</div>
                </div>
                <div>
                  <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#1E1E1E', display: 'block', marginBottom: '4px' }}>
                    Arbitration Resolution Note:
                  </label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g. Damage inspected and approved deduction." 
                    value={adminResolutionNote} 
                    onChange={(e) => setAdminResolutionNote(e.target.value)} 
                  />
                </div>
              </div>
              <button 
                onClick={() => onResolveDispute(exchange.id, adminApprovedDeduction, adminResolutionNote)} 
                className="btn btn-emerald btn-sm"
              >
                <CheckCircle2 size={15} /> Issue Resolution & Claim ₹{adminApprovedDeduction} from Deposit
              </button>
            </div>
          )}
        </div>
      )}

      {/* Interactive Damage Report & Claim Modal */}
      {showDamageModal && (
        <div className="modal-overlay" onClick={() => setShowDamageModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            
            <div className="modal-header" style={{ background: 'var(--pop-pink)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={20} color="#1E1E1E" />
                <span style={{ fontWeight: 800, fontSize: '1rem', color: '#1E1E1E', fontFamily: 'var(--font-heading)' }}>
                  Report Damage & Claim Money
                </span>
              </div>
              <button onClick={() => setShowDamageModal(false)} style={{ background: '#fff', border: '2px solid #1E1E1E', borderRadius: '8px', cursor: 'pointer', padding: '4px' }}>
                <X size={18} color="#1E1E1E" />
              </button>
            </div>

            <form onSubmit={handleFileDamageClaim} className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ background: '#FFF9E6', border: '2px solid #1E1E1E', borderRadius: '12px', padding: '12px' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1E1E1E' }}>{exchange.itemTitle}</div>
                <div style={{ fontSize: '0.76rem', color: '#555' }}>
                  Borrower: <strong>{exchange.borrowerName}</strong> • Escrow Security Deposit Held: <strong style={{ color: '#06D6A0' }}>₹{exchange.securityDeposit}</strong>
                </div>
              </div>

              {/* Damage Category Pills */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1E1E1E', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  1. Select Damage Category:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {damageCategories.map(cat => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setDamageType(cat)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-full)',
                        border: '2px solid #1E1E1E',
                        background: damageType === cat ? 'var(--pop-yellow)' : '#fff',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: damageType === cat ? '2px 2px 0px #1E1E1E' : 'none'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Description Input */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1E1E1E', display: 'block', marginBottom: '4px' }}>
                  2. Specific Damage Description & Notes:
                </label>
                <textarea 
                  className="input-field" 
                  rows="3" 
                  placeholder="e.g. Visible deep scratch across lens barrel, power toggle loose on return..." 
                  value={customDescription} 
                  onChange={(e) => setCustomDescription(e.target.value)} 
                />
              </div>

              {/* Claim Amount */}
              <div style={{ background: '#FAF7F2', border: '2px solid #1E1E1E', borderRadius: '14px', padding: '16px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E1E1E', display: 'block', marginBottom: '8px' }}>
                  3. Damage Money Claim Amount (₹):
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                  <input 
                    type="number" 
                    className="input-field" 
                    required 
                    min="1" 
                    max={exchange.securityDeposit} 
                    value={claimAmount} 
                    onChange={(e) => setClaimAmount(Math.min(exchange.securityDeposit, Math.max(1, Number(e.target.value) || 1)))} 
                    style={{ background: '#fff', fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}
                  />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#555', whiteSpace: 'nowrap' }}>
                    / Max ₹{exchange.securityDeposit}
                  </span>
                </div>

                {/* Quick Presets */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {[100, 250, 500, exchange.securityDeposit].filter((v, i, arr) => v <= exchange.securityDeposit && arr.indexOf(v) === i).map(amt => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setClaimAmount(amt)}
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: '0.72rem', padding: '4px 10px' }}
                    >
                      {amt === exchange.securityDeposit ? `Full Deposit (₹${amt})` : `₹${amt}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-footer" style={{ margin: '0 -28px -28px', padding: '16px 28px' }}>
                <button type="button" onClick={() => setShowDamageModal(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-danger btn-sm">
                  <DollarSign size={15} /> Claim ₹{claimAmount} Damage Money & File Dispute
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Inspection Modal */}
      {showInspector && (
        <ConditionInspector 
          exchange={exchange} 
          onClose={() => setShowInspector(false)}
          onVerify={(data) => {
            setShowInspector(false);
            handleNextStage({ ...data, timelineNote: "Inspection photo verification completed." });
          }}
        />
      )}

    </div>
  );
}
