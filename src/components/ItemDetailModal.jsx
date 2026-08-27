import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  FileText, 
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function ItemDetailModal({ item, onClose, onBookingSuccess }) {
  const { users, currentUser, platformConfig, createExchangeRequest } = useCampus();

  const owner = users.find(u => u.id === item.ownerId) || {
    name: "Campus Peer",
    trustScore: 92,
    avatar: item.image,
    department: "Campus Member",
    year: "3rd Year",
    successfulExchanges: 15,
    disputes: 0
  };

  const [durationType, setDurationType] = useState('Daily');
  const [durationValue, setDurationValue] = useState(1);
  const [pickupLocation, setPickupLocation] = useState(item.location);
  const [purpose, setPurpose] = useState('');
  const [agreementConfirmed, setAgreementConfirmed] = useState(false);

  // Financial Calculations
  const rate = durationType === 'Hourly' ? item.hourlyRate : item.dailyRate;
  const borrowingCharge = rate * durationValue;
  const platformFee = Math.round(borrowingCharge * (platformConfig.platformFeePercent / 100));
  const securityDeposit = item.deposit;
  const totalEscrowAmount = borrowingCharge + platformFee + securityDeposit;

  const handleConfirmBorrow = (e) => {
    e.preventDefault();
    if (!agreementConfirmed) return;

    const newExchange = createExchangeRequest({
      item,
      durationType,
      durationValue,
      pickupLocation,
      purpose
    });

    onBookingSuccess(newExchange);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '840px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-cyan">{item.category}</span>
            <span className="badge badge-emerald">{item.condition}</span>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '24px' }}>
          
          {/* Left Column: Image, Accessories, Owner Profile */}
          <div>
            <img 
              src={item.image} 
              alt={item.title} 
              style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}
            />

            {/* Owner Trust Box */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>
                Resource Owner & Trust Metrics
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <img src={owner.avatar} alt={owner.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-cyan)' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{owner.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{owner.department} • {owner.year}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                    {owner.trustScore}%
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Trust Score</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                    {owner.successfulExchanges}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Exchanges</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                    {owner.disputes === 0 ? '0' : owner.disputes}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Disputes</div>
                </div>
              </div>
            </div>

            {/* Included Accessories */}
            {item.includedAccessories && (
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '6px' }}>
                  Included Accessories:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {item.includedAccessories.map((acc, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={13} color="var(--accent-emerald)" />
                      <span>{acc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Configuration, Escrow Math & Agreement */}
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              {item.title}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
              {item.description}
            </p>

            <form onSubmit={handleConfirmBorrow}>
              {/* Duration Type Selector */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0', display: 'block', marginBottom: '6px' }}>
                  Select Borrowing Duration:
                </label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setDurationType('Hourly')}
                    className={`btn btn-sm ${durationType === 'Hourly' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1 }}
                  >
                    <Clock size={14} />
                    Hourly (₹{item.hourlyRate}/hr)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDurationType('Daily')}
                    className={`btn btn-sm ${durationType === 'Daily' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1 }}
                  >
                    <Calendar size={14} />
                    Daily (₹{item.dailyRate}/day)
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input 
                    type="range" 
                    min="1" 
                    max={durationType === 'Hourly' ? 12 : 7}
                    value={durationValue}
                    onChange={(e) => setDurationValue(Number(e.target.value))}
                    style={{ flex: 1, accentColor: 'var(--accent-cyan)' }}
                  />
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-mono)', minWidth: '65px', textAlign: 'right' }}>
                    {durationValue} {durationType === 'Hourly' ? (durationValue === 1 ? 'hour' : 'hours') : (durationValue === 1 ? 'day' : 'days')}
                  </span>
                </div>
              </div>

              {/* Purpose / Project Note */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                  Intended Campus Purpose:
                </label>
                <input 
                  type="text"
                  className="input-field"
                  placeholder="e.g. Media club video shoot / Math exam prep"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  style={{ padding: '8px 12px', fontSize: '0.86rem' }}
                />
              </div>

              {/* Mandatory Transparent Escrow Breakdown Formula */}
              <div style={{
                background: 'rgba(6, 182, 212, 0.06)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
                    Transparent Escrow Breakdown
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Reflects in Admin Ledger
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem' }}>
                  <div className="flex-between">
                    <span style={{ color: 'var(--text-secondary)' }}>Borrowing Charge ({durationValue} {durationType.toLowerCase()}):</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>₹{borrowingCharge}</span>
                  </div>

                  <div className="flex-between">
                    <span style={{ color: 'var(--text-secondary)' }}>Platform Maintenance Fee ({platformConfig.platformFeePercent}%):</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>₹{platformFee}</span>
                  </div>

                  <div className="flex-between">
                    <span style={{ color: 'var(--text-secondary)' }}>Refundable Security Deposit (100% Refundable):</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent-emerald)' }}>₹{securityDeposit}</span>
                  </div>

                  <div style={{ borderTop: '1px dashed rgba(255,255,255,0.15)', marginTop: '4px', paddingTop: '6px' }} className="flex-between">
                    <span style={{ fontWeight: 700, color: '#fff' }}>Total Escrow Amount:</span>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                      ₹{totalEscrowAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Digital Borrowing Agreement Checkbox */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 12px',
                marginBottom: '16px'
              }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  <input 
                    type="checkbox" 
                    checked={agreementConfirmed}
                    onChange={(e) => setAgreementConfirmed(e.target.checked)}
                    style={{ marginTop: '2px', accentColor: 'var(--accent-cyan)' }}
                  />
                  <span>
                    I accept the <strong style={{ color: '#fff' }}>Digital Borrowing Agreement</strong>. I pledge to follow the owner's usage rules, participate in Before/After condition photos, and return the item on time to avoid late fees (₹{platformConfig.lateFeePerHour}/hr).
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={!agreementConfirmed}
                  className="btn btn-emerald btn-sm"
                  style={{ opacity: agreementConfirmed ? 1 : 0.5 }}
                >
                  <Lock size={15} />
                  Lock Escrow & Confirm (₹{totalEscrowAmount})
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
