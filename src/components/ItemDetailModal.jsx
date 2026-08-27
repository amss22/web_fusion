import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Lock, 
  Info,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ItemDetailModal({ item, onClose, onConfirmRequest }) {
  const { users, currentUser, platformConfig } = useCampus();
  const owner = users.find(u => u.id === item.ownerId) || { name: "Campus Peer", avatar: item.image, trustScore: 95 };

  const [durationType, setDurationType] = useState('Daily');
  const [durationValue, setDurationValue] = useState(1);
  const [pickupLocation, setPickupLocation] = useState(item.location);
  const [purpose, setPurpose] = useState('');
  const [agreeToRules, setAgreeToRules] = useState(false);

  // Escrow Calculations
  const rate = durationType === 'Hourly' ? item.hourlyRate : item.dailyRate;
  const borrowingCharge = rate * durationValue;
  const platformFee = Math.max(
    platformConfig.minPlatformFee || 10,
    Math.round(borrowingCharge * ((platformConfig.platformFeePercent || 5) / 100))
  );
  const securityDeposit = item.deposit;
  const totalEscrow = borrowingCharge + platformFee + securityDeposit;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeToRules) return;

    onConfirmRequest({
      item,
      durationType,
      durationValue,
      pickupLocation,
      purpose
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Retro Window Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#222', marginLeft: '6px' }}>
              Resource Agreement & Escrow Calculator
            </span>
          </div>
          <button 
            onClick={onClose}
            style={{ 
              background: '#fff', 
              border: '2px solid #222', 
              borderRadius: '6px', 
              cursor: 'pointer',
              padding: '4px',
              boxShadow: '2px 2px 0px #222'
            }}
          >
            <X size={18} color="#222" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            
            {/* Left: Item Info & Checklist */}
            <div>
              <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '3px solid #222', marginBottom: '16px', boxShadow: '3px 3px 0px #222' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                  <span className="badge badge-amber">{item.category}</span>
                </div>
              </div>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#222', marginBottom: '8px' }}>
                {item.title}
              </h2>

              {/* Owner card */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                background: '#FFF3D6',
                border: '2px solid #222',
                borderRadius: '8px',
                marginBottom: '16px',
                boxShadow: '2px 2px 0px #222'
              }}>
                <img src={owner.avatar} alt={owner.name} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #222' }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#222' }}>{owner.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#555' }}>
                    {owner.department} • <strong style={{ color: '#2ECC71' }}>★ {owner.trustScore}% Trust Score</strong>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.84rem', color: '#444', lineHeight: '1.5', marginBottom: '16px' }}>
                {item.description}
              </p>

              {/* Checklist */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#222', textTransform: 'uppercase', marginBottom: '8px' }}>
                  📋 Inspection Checklist Items:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {item.checklistItems?.map((check, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#333', background: '#fff', padding: '6px 10px', border: '1.5px solid #222', borderRadius: '6px' }}>
                      <CheckCircle2 size={14} color="#2ECC71" />
                      {check.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Escrow Calculator & Booking Form */}
            <div>
              <form onSubmit={handleSubmit}>
                
                <div style={{ background: '#FFE66D', border: '3px solid #222', borderRadius: '12px', padding: '16px', marginBottom: '16px', boxShadow: '3px 3px 0px #222' }}>
                  <div style={{ fontWeight: 800, color: '#222', fontSize: '0.9rem', marginBottom: '12px', textTransform: 'uppercase' }}>
                    ⏱️ Select Duration:
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setDurationType('Daily')}
                      style={{
                        padding: '8px',
                        border: '2px solid #222',
                        borderRadius: '6px',
                        background: durationType === 'Daily' ? '#4ECDC4' : '#fff',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        boxShadow: '2px 2px 0px #222'
                      }}
                    >
                      Daily Rate (₹{item.dailyRate}/day)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDurationType('Hourly')}
                      style={{
                        padding: '8px',
                        border: '2px solid #222',
                        borderRadius: '6px',
                        background: durationType === 'Hourly' ? '#4ECDC4' : '#fff',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        boxShadow: '2px 2px 0px #222'
                      }}
                    >
                      Hourly Rate (₹{item.hourlyRate}/hr)
                    </button>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#222', display: 'block', marginBottom: '4px' }}>
                      Duration ({durationType === 'Daily' ? 'Days' : 'Hours'}):
                    </label>
                    <input 
                      type="number"
                      min="1"
                      max="14"
                      className="input-field"
                      value={durationValue}
                      onChange={(e) => setDurationValue(Math.max(1, parseInt(e.target.value) || 1))}
                      style={{ background: '#fff' }}
                    />
                  </div>
                </div>

                {/* Escrow Breakdown Box */}
                <div style={{
                  background: '#fff',
                  border: '3px solid #222',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '16px',
                  boxShadow: '3px 3px 0px #222'
                }}>
                  <div style={{ fontWeight: 800, color: '#222', fontSize: '0.9rem', marginBottom: '12px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Lock size={15} color="#FF6B9D" />
                    Escrow Breakdown:
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: '#444', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Borrowing Fee ({durationValue} {durationType.toLowerCase()}):</span>
                      <strong style={{ color: '#222', fontFamily: 'var(--font-mono)' }}>₹{borrowingCharge}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Platform Service Fee ({platformConfig.platformFeePercent}%):</span>
                      <strong style={{ color: '#222', fontFamily: 'var(--font-mono)' }}>₹{platformFee}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Refundable Security Deposit:</span>
                      <strong style={{ color: '#2ECC71', fontFamily: 'var(--font-mono)' }}>₹{securityDeposit}</strong>
                    </div>
                  </div>

                  <div style={{
                    paddingTop: '10px',
                    borderTop: '2px dashed #222',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '1rem',
                    fontWeight: 900,
                    color: '#222'
                  }}>
                    <span>Total Escrow Lock:</span>
                    <span style={{ fontSize: '1.25rem', color: '#FF6B9D', fontFamily: 'var(--font-mono)' }}>
                      ₹{totalEscrow}
                    </span>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <input 
                    type="checkbox"
                    id="rulesAgree"
                    checked={agreeToRules}
                    onChange={(e) => setAgreeToRules(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', marginTop: '2px' }}
                  />
                  <label htmlFor="rulesAgree" style={{ fontSize: '0.78rem', color: '#333', cursor: 'pointer', lineHeight: '1.4', fontWeight: 600 }}>
                    I agree to follow the borrowing guidelines, return by deadline, and inspect item condition prior to handover.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!agreeToRules}
                  className="btn btn-emerald"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '1rem',
                    opacity: agreeToRules ? 1 : 0.6
                  }}
                >
                  Confirm Request & Lock Escrow (₹{totalEscrow})
                  <ArrowRight size={16} />
                </button>

              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
