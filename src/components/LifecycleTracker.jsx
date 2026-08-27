import React, { useState } from 'react';
import { useCampus, LIFECYCLE_STAGES } from '../context/CampusContext';
import ConditionInspector from './ConditionInspector';
import { 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldAlert, 
  FileCheck, 
  Camera, 
  RotateCcw, 
  Award, 
  DollarSign, 
  User, 
  AlertTriangle,
  Send,
  Sparkles,
  MapPin
} from 'lucide-react';

export default function LifecycleTracker({ onOpenRatingModal }) {
  const { 
    exchanges, 
    currentUser, 
    advanceExchangeStage, 
    raiseDispute, 
    platformConfig 
  } = useCampus();

  const [selectedExchangeId, setSelectedExchangeId] = useState(exchanges[0]?.id || null);
  const [showDamageForm, setShowDamageForm] = useState(false);
  const [damageReason, setDamageReason] = useState('');
  const [damageAmount, setDamageAmount] = useState(300);

  const activeExchange = exchanges.find(ex => ex.id === selectedExchangeId) || exchanges[0];

  if (!activeExchange) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--text-secondary)' }}>No active borrowing exchanges found.</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>
          Browse available campus gear to initiate a borrow request!
        </p>
      </div>
    );
  }

  const isLender = currentUser.id === activeExchange.lenderId;
  const isBorrower = currentUser.id === activeExchange.borrowerId;
  const isAdmin = currentUser.role === 'admin';

  const handleNextStep = () => {
    advanceExchangeStage(activeExchange.id);
  };

  const handleSubmitDispute = (e) => {
    e.preventDefault();
    raiseDispute(activeExchange.id, damageReason, Number(damageAmount));
    setShowDamageForm(false);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }}>
      
      {/* Left Sidebar: List of Active Exchanges */}
      <div className="glass-panel" style={{ padding: '16px', height: 'fit-content' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
          Your Active Exchanges ({exchanges.length})
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {exchanges.map(ex => {
            const isSelected = ex.id === activeExchange.id;
            return (
              <div 
                key={ex.id}
                onClick={() => {
                  setSelectedExchangeId(ex.id);
                  setShowDamageForm(false);
                }}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                    {ex.id}
                  </span>
                  <span className={`badge ${ex.disputeRaised ? 'badge-rose' : 'badge-emerald'}`} style={{ fontSize: '0.62rem' }}>
                    {ex.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {ex.itemTitle}
                </div>

                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Escrow: ₹{ex.totalEscrowAmount}</span>
                  <span>{ex.borrowerName.split(' ')[0]} ⇄ {ex.lenderName.split(' ')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Detailed 10-Stage Visual Tracker & Live Action Simulation */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        
        {/* Header summary of selected exchange */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img 
              src={activeExchange.itemImage} 
              alt={activeExchange.itemTitle} 
              style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--border-card)' }} 
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  {activeExchange.itemTitle}
                </h3>
                <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                  {activeExchange.id}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                Lender: <strong style={{ color: '#fff' }}>{activeExchange.lenderName}</strong> • Borrower: <strong style={{ color: '#fff' }}>{activeExchange.borrowerName}</strong>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Locked Escrow</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              ₹{activeExchange.totalEscrowAmount}
            </div>
          </div>
        </div>

        {/* 10-STAGE INTERACTIVE LIFECYCLE STEPPER */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '14px' }}>
            Live 10-Stage Borrowing Lifecycle Progress
          </div>

          {/* Stepper Grid / Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gap: '6px',
            position: 'relative'
          }}>
            {LIFECYCLE_STAGES.map((stage, idx) => {
              const isPast = idx < activeExchange.stageIndex;
              const isCurrent = idx === activeExchange.stageIndex;
              const isFuture = idx > activeExchange.stageIndex;

              let nodeBg = 'rgba(255, 255, 255, 0.05)';
              let nodeBorder = 'var(--border-subtle)';
              let textColor = 'var(--text-muted)';

              if (isPast) {
                nodeBg = 'rgba(16, 185, 129, 0.2)';
                nodeBorder = 'var(--accent-emerald)';
                textColor = 'var(--accent-emerald)';
              } else if (isCurrent) {
                nodeBg = 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(99, 102, 241, 0.3))';
                nodeBorder = 'var(--accent-cyan)';
                textColor = '#fff';
              }

              return (
                <div 
                  key={stage.key}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '8px 4px',
                    borderRadius: 'var(--radius-sm)',
                    background: nodeBg,
                    border: `1px solid ${nodeBorder}`,
                    transition: 'all 0.3s ease',
                    boxShadow: isCurrent ? '0 0 15px rgba(6, 182, 212, 0.3)' : 'none'
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: isPast ? 'var(--accent-emerald)' : isCurrent ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '4px'
                  }}>
                    {isPast ? '✓' : idx + 1}
                  </div>
                  <div style={{ fontSize: '0.66rem', fontWeight: isCurrent ? 800 : 600, color: textColor, lineHeight: '1.2' }}>
                    {stage.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CURRENT STAGE ACTION CARD */}
        <div style={{
          background: 'rgba(6, 182, 212, 0.04)',
          border: '1px solid rgba(6, 182, 212, 0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-cyan">Current Stage: {activeExchange.status}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {LIFECYCLE_STAGES[activeExchange.stageIndex]?.desc}
              </span>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Pickup Location: <strong style={{ color: '#fff' }}>{activeExchange.pickupLocation}</strong>
            </div>
          </div>

          {/* Action Simulation Triggers Based on Current Stage */}
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            
            {/* Stage 1: Requested */}
            {activeExchange.stageIndex === 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>
                  Lender ({activeExchange.lenderName}) can accept or decline this borrow request.
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={handleNextStep} className="btn btn-emerald btn-sm">
                    <CheckCircle2 size={16} />
                    Accept Request (Lender Action)
                  </button>
                </div>
              </div>
            )}

            {/* Stage 2: Accepted */}
            {activeExchange.stageIndex === 2 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>
                  Meetup scheduled at {activeExchange.pickupLocation}. Proceed to Handover & Pre-Check.
                </span>
                <button onClick={handleNextStep} className="btn btn-primary btn-sm">
                  <Camera size={16} />
                  Start Handover & Upload Before Photos
                </button>
              </div>
            )}

            {/* Stage 3: Handover */}
            {activeExchange.stageIndex === 3 && (
              <div style={{ width: '100%' }}>
                <div style={{ fontSize: '0.85rem', color: '#e2e8f0', marginBottom: '10px' }}>
                  Both parties inspect the resource and verify physical condition baseline photos.
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button onClick={handleNextStep} className="btn btn-emerald btn-sm">
                    <CheckCircle2 size={16} />
                    Confirm Handover & Release Item to Borrower
                  </button>
                </div>
              </div>
            )}

            {/* Stage 4: Borrowed */}
            {activeExchange.stageIndex === 4 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>
                  Item is actively in use. Return deadline: <strong>{new Date(activeExchange.returnDeadline).toLocaleString()}</strong>
                </span>
                <button onClick={handleNextStep} className="btn btn-primary btn-sm">
                  <Clock size={16} />
                  Simulate Approaching Return Deadline
                </button>
              </div>
            )}

            {/* Stage 5: Return Due */}
            {activeExchange.stageIndex === 5 && (
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', fontWeight: 600 }}>
                    ⚠️ Return Window Active (Simulated 3 hrs overdue: ₹{activeExchange.lateFee || 50} late fee accrued)
                  </span>
                  <button onClick={handleNextStep} className="btn btn-emerald btn-sm">
                    <RotateCcw size={16} />
                    Initiate Physical Return to Lender
                  </button>
                </div>
              </div>
            )}

            {/* Stage 6: Returned */}
            {activeExchange.stageIndex === 6 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>
                  Resource received by lender. Ready for post-use condition check & inspection.
                </span>
                <button onClick={handleNextStep} className="btn btn-primary btn-sm">
                  <Camera size={16} />
                  Start Inspection
                </button>
              </div>
            )}

            {/* Stage 7: Inspection */}
            {activeExchange.stageIndex === 7 && (
              <div style={{ width: '100%' }}>
                <ConditionInspector 
                  exchange={activeExchange}
                  isInspectionMode={true}
                  onVerifyInspection={handleNextStep}
                  onReportDamage={() => setShowDamageForm(true)}
                />
              </div>
            )}

            {/* Stage 8: Settlement */}
            {activeExchange.stageIndex === 8 && (
              <div style={{ width: '100%' }}>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  marginBottom: '14px'
                }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-emerald)', marginBottom: '8px' }}>
                    Financial Settlement Ledger Completed:
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.82rem' }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Deposit Refund to Borrower:</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                        ₹{activeExchange.refundToBorrower}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Lender Payout:</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                        ₹{activeExchange.payoutToLender}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Platform Retained Fee:</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                        ₹{activeExchange.platformFee}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => onOpenRatingModal(activeExchange)} className="btn btn-emerald btn-sm">
                    <Award size={16} />
                    Rate Peer & Close Exchange (Final Stage)
                  </button>
                </div>
              </div>
            )}

            {/* Stage 9: Rated */}
            {activeExchange.stageIndex === 9 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={20} color="var(--accent-emerald)" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                    Exchange Completed Successfully! Trust Scores & Impact Updated.
                  </span>
                </div>
                <span className="badge badge-emerald">COMPLETED</span>
              </div>
            )}

          </div>
        </div>

        {/* Damage Reporting Modal / Inline Form */}
        {showDamageForm && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.4)',
            borderRadius: 'var(--radius-md)',
            padding: '18px',
            marginBottom: '20px'
          }}>
            <h4 style={{ color: 'var(--accent-rose)', fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} />
              Raise Damage or Loss Dispute to Admin
            </h4>
            <form onSubmit={handleSubmitDispute}>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '0.78rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                  Describe Damage / Missing Accessories:
                </label>
                <input 
                  type="text" 
                  className="input-field" 
                  required
                  placeholder="e.g. Scratched front lens element / Missing tripod mounting screw"
                  value={damageReason}
                  onChange={(e) => setDamageReason(e.target.value)}
                  style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.78rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                  Proposed Deduction from Borrower's Security Deposit (₹):
                </label>
                <input 
                  type="number" 
                  className="input-field" 
                  min="50"
                  max={activeExchange.securityDeposit}
                  value={damageAmount}
                  onChange={(e) => setDamageAmount(e.target.value)}
                  style={{ padding: '8px 12px', fontSize: '0.85rem', width: '200px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowDamageForm(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-danger btn-sm">
                  <Send size={14} />
                  Submit Dispute to Admin
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Dispute Status Banner if Active */}
        {activeExchange.disputeRaised && (
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span className="badge badge-amber">Dispute Status: {activeExchange.disputeStatus}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Campus Moderation Queue</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#fef3c7', margin: 0 }}>
              <strong>Claim:</strong> {activeExchange.damageDescription} (Claimed deduction: ₹{activeExchange.damageDeduction})
            </p>
            {activeExchange.disputeResolutionNote && (
              <p style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', marginTop: '6px', fontWeight: 600 }}>
                ✓ Admin Resolution: {activeExchange.disputeResolutionNote}
              </p>
            )}
          </div>
        )}

        {/* Exchange Audit Trail Timeline */}
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
            Exchange Audit Trail & Log
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeExchange.timeline.map((event, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.8rem'
                }}
              >
                <span className="badge badge-cyan" style={{ fontSize: '0.64rem', padding: '2px 6px' }}>
                  {event.stage}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', minWidth: '85px' }}>
                  {event.time}
                </span>
                <span style={{ color: '#e2e8f0', flex: 1 }}>
                  {event.note}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
