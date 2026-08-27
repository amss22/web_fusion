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
  MessageSquare
} from 'lucide-react';

export default function LifecycleTracker({ exchange, onRaiseDispute, onResolveDispute, onOpenRating }) {
  const { 
    currentUser, 
    advanceExchangeStage, 
    resolveDispute 
  } = useCampus();

  const [showInspector, setShowInspector] = useState(false);
  const [damageClaimAmount, setDamageClaimAmount] = useState(250);
  const [disputeReason, setDisputeReason] = useState('');
  const [adminResolutionNote, setAdminResolutionNote] = useState('');
  const [adminApprovedDeduction, setAdminApprovedDeduction] = useState(150);

  const isLender = currentUser.id === exchange.lenderId;
  const isBorrower = currentUser.id === exchange.borrowerId;
  const isAdmin = currentUser.role === 'admin';

  const handleNextStage = (extraState = {}) => {
    advanceExchangeStage(exchange.id, extraState);
  };

  return (
    <div style={{
      background: '#fff',
      border: '3px solid #222',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '6px 6px 0px #222'
    }}>
      
      {/* Exchange Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '2px solid #222' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={exchange.itemImage} alt={exchange.itemTitle} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', border: '2px solid #222' }} />
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#222' }}>{exchange.itemTitle}</div>
            <div style={{ fontSize: '0.76rem', color: '#666' }}>
              Exchange ID: <strong style={{ fontFamily: 'var(--font-mono)' }}>{exchange.id}</strong> • Lender: {exchange.lenderName} • Borrower: {exchange.borrowerName}
            </div>
          </div>
        </div>

        <span className="badge badge-amber" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
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
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isCurrent ? '#FF6B9D' : isPassed ? '#C7F464' : '#fff',
                  border: '3px solid #222',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  color: '#222',
                  boxShadow: isCurrent ? '3px 3px 0px #222' : '2px 2px 0px #222',
                  transform: isCurrent ? 'scale(1.15)' : 'none',
                  transition: 'all 0.15s ease'
                }}>
                  {isPassed ? <CheckCircle2 size={18} color="#222" /> : idx}
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 800, color: isCurrent ? '#FF6B9D' : '#222', marginTop: '6px', textAlign: 'center' }}>
                  {st.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Stage Actions Box */}
      <div style={{ background: '#FFE66D', border: '3px solid #222', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '4px 4px 0px #222' }}>
        <div style={{ fontWeight: 800, color: '#222', fontSize: '1rem', marginBottom: '8px', textTransform: 'uppercase' }}>
          📍 Current Action Needed (Stage {exchange.stageIndex}: {LIFECYCLE_STAGES[exchange.stageIndex]?.label})
        </div>
        <p style={{ fontSize: '0.86rem', color: '#333', marginBottom: '16px', fontWeight: 600 }}>
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
              <button onClick={() => onRaiseDispute(exchange.id, "Scratches/Damage found on return", damageClaimAmount)} className="btn btn-danger btn-sm">
                <AlertTriangle size={16} /> Report Damage / Raise Dispute
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

      {/* Admin Dispute Panel if Dispute Active */}
      {exchange.disputeRaised && (
        <div style={{ background: '#FF6B9D', color: '#fff', border: '3px solid #222', borderRadius: '12px', padding: '18px', marginBottom: '20px', boxShadow: '4px 4px 0px #222' }}>
          <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '6px', color: '#222' }}>
            ⚠️ ACTIVE DISPUTE LOGGED
          </div>
          <div style={{ fontSize: '0.84rem', marginBottom: '12px', color: '#222' }}>
            Reason: {exchange.damageDescription} | Claimed Damage: ₹{exchange.damageDeduction}
          </div>

          {isAdmin && exchange.disputeStatus !== 'Resolved' && (
            <div style={{ background: '#fff', padding: '14px', borderRadius: '8px', border: '2px solid #222', color: '#222' }}>
              <div style={{ fontWeight: 800, fontSize: '0.88rem', marginBottom: '8px' }}>
                🛡️ Campus Admin Arbitration Verdict:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px', marginBottom: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700 }}>Approved Damage Deduction (₹):</label>
                  <input type="number" className="input-field" value={adminApprovedDeduction} onChange={(e) => setAdminApprovedDeduction(Number(e.target.value))} />
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700 }}>Arbitration Note:</label>
                  <input type="text" className="input-field" placeholder="Admin reasoning" value={adminResolutionNote} onChange={(e) => setAdminResolutionNote(e.target.value)} />
                </div>
              </div>
              <button onClick={() => onResolveDispute(exchange.id, adminApprovedDeduction, adminResolutionNote)} className="btn btn-emerald btn-sm">
                Issue Admin Resolution
              </button>
            </div>
          )}
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
