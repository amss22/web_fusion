import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  X, 
  Coins, 
  Gift, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Coffee,
  BookOpen,
  Printer,
  ShieldCheck,
  Tag
} from 'lucide-react';

export default function RedeemModal({ onClose }) {
  const { currentUser, platformConfig, redeemTokens } = useCampus();
  const [activeTab, setActiveTab] = useState('wallet');
  const [redeemedVouchers, setRedeemedVouchers] = useState([]);

  const campusPartners = [
    { id: 'v-canteen', title: 'Central Canteen Voucher', partner: 'Campus Food Court', tokenCost: 60, benefit: '₹30 off any meal/snack combo', icon: Coffee, color: '#FFE853' },
    { id: 'v-stationery', title: 'Stationery & Drafting Kit', partner: 'Campus Co-op Store', tokenCost: 80, benefit: '₹50 off lab journals & sheets', icon: BookOpen, color: '#FF6699' },
    { id: 'v-print', title: 'Print & Plotter Lab Credits', partner: 'Media & Reprography Cell', tokenCost: 40, benefit: '20 pages free laser prints/drawings', icon: Printer, color: '#48CAE4' }
  ];

  const handleRedeemVoucher = (voucher) => {
    const success = redeemTokens('coupon-50'); // uses standard redemption mechanism
    if (success) {
      const code = `CC-${voucher.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setRedeemedVouchers(prev => [...prev, { ...voucher, code, date: new Date().toLocaleDateString() }]);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        
        {/* Header */}
        <div className="modal-header" style={{ background: 'var(--pop-yellow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Coins size={22} color="#000" />
            <span style={{ fontWeight: 900, fontSize: '1.1rem', color: '#000', fontFamily: 'var(--font-heading)' }}>
              Token Rewards & Redemption Center
            </span>
          </div>
          <button 
            onClick={onClose}
            style={{ 
              background: '#fff', 
              border: '2px solid #000', 
              borderRadius: '6px', 
              cursor: 'pointer',
              padding: '4px',
              boxShadow: '2px 2px 0px #000'
            }}
          >
            <X size={18} color="#000" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          
          {/* Balance Hero Card */}
          <div style={{
            background: 'var(--pop-periwinkle)',
            border: '3px solid #000',
            borderRadius: '14px',
            padding: '20px',
            boxShadow: '4px 4px 0px #000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#000', textTransform: 'uppercase', marginBottom: '4px' }}>
                Your Reward Balance
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#000', fontFamily: 'var(--font-heading)' }}>
                  {currentUser.tokenBalance || 0}
                </span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#222' }}>
                  Tokens
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#111', fontWeight: 700, marginTop: '4px' }}>
                🪙 Earn +15 tokens on every completed borrower/lender deal
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#333' }}>Wallet Balance:</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#000', fontFamily: 'var(--font-mono)' }}>
                ₹{currentUser.walletBalance || 0}
              </div>
            </div>
          </div>

          {/* Sub-tabs */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
            <button
              onClick={() => setActiveTab('wallet')}
              className="btn btn-sm"
              style={{
                background: activeTab === 'wallet' ? 'var(--pop-mint)' : '#FFF',
                color: '#000',
                border: '2px solid #000',
                boxShadow: activeTab === 'wallet' ? '2.5px 2.5px 0px #000' : '1.5px 1.5px 0px #000',
                fontSize: '0.82rem'
              }}
            >
              <Gift size={14} />
              Wallet Discount Credits
            </button>
            <button
              onClick={() => setActiveTab('campus')}
              className="btn btn-sm"
              style={{
                background: activeTab === 'campus' ? 'var(--pop-mint)' : '#FFF',
                color: '#000',
                border: '2px solid #000',
                boxShadow: activeTab === 'campus' ? '2.5px 2.5px 0px #000' : '1.5px 1.5px 0px #000',
                fontSize: '0.82rem'
              }}
            >
              <Tag size={14} />
              Campus Partner Perks
            </button>
          </div>

          {/* TAB 1: Wallet Discount Credits */}
          {activeTab === 'wallet' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {(platformConfig.discountCoupons || []).map(coupon => {
                const canAfford = (currentUser.tokenBalance || 0) >= coupon.tokenCost;
                return (
                  <div key={coupon.id} style={{
                    background: canAfford ? '#FFFFFF' : '#FAFAFA',
                    border: '2.5px solid #000',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: canAfford ? '3px 3px 0px #000' : '2px 2px 0px #AAA',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{
                          background: 'var(--pop-pink)',
                          color: '#000',
                          fontSize: '0.72rem',
                          fontWeight: 900,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: '1.5px solid #000'
                        }}>
                          {coupon.label}
                        </span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#000' }}>
                          {coupon.tokenCost} pts
                        </span>
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 900, color: '#000', marginBottom: '4px' }}>
                        ₹{coupon.discountAmount} Direct Credit
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#555', lineHeight: '1.4' }}>
                        Adds ₹{coupon.discountAmount} instantly to your wallet for borrowing fees and escrow.
                      </div>
                    </div>

                    <button
                      onClick={() => redeemTokens(coupon.id)}
                      disabled={!canAfford}
                      className="btn btn-sm"
                      style={{
                        background: canAfford ? 'var(--pop-mint)' : '#E0E0E0',
                        color: '#000',
                        cursor: canAfford ? 'pointer' : 'not-allowed',
                        border: '2px solid #000',
                        boxShadow: canAfford ? '2px 2px 0px #000' : 'none',
                        fontSize: '0.8rem',
                        padding: '8px 12px'
                      }}
                    >
                      {canAfford ? 'Redeem to Wallet' : `Need ${coupon.tokenCost - (currentUser.tokenBalance || 0)} More`}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: Campus Partner Perks */}
          {activeTab === 'campus' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {campusPartners.map(partner => {
                const IconComponent = partner.icon;
                const canAfford = (currentUser.tokenBalance || 0) >= partner.tokenCost;
                return (
                  <div key={partner.id} style={{
                    background: '#FFFFFF',
                    border: '2.5px solid #000',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '3px 3px 0px #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        background: partner.color,
                        border: '2px solid #000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '2px 2px 0px #000'
                      }}>
                        <IconComponent size={22} color="#000" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#000' }}>
                          {partner.title}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#666', fontWeight: 700 }}>
                          {partner.partner} • <strong style={{ color: '#000' }}>{partner.benefit}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRedeemVoucher(partner)}
                      disabled={!canAfford}
                      className="btn btn-sm"
                      style={{
                        background: canAfford ? 'var(--pop-yellow)' : '#E0E0E0',
                        color: '#000',
                        cursor: canAfford ? 'pointer' : 'not-allowed',
                        border: '2px solid #000',
                        fontSize: '0.78rem',
                        boxShadow: canAfford ? '2px 2px 0px #000' : 'none'
                      }}
                    >
                      {canAfford ? `Redeem (${partner.tokenCost} pts)` : `Need ${partner.tokenCost - (currentUser.tokenBalance || 0)}`}
                    </button>
                  </div>
                );
              })}

              {redeemedVouchers.length > 0 && (
                <div style={{ marginTop: '14px', background: '#F0FFF4', border: '2px solid #2ECC71', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2ECC71', marginBottom: '8px' }}>
                    Active Voucher Codes:
                  </div>
                  {redeemedVouchers.map((v, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, padding: '4px 0' }}>
                      <span>{v.title} ({v.partner})</span>
                      <strong style={{ background: '#FFF', padding: '2px 8px', border: '1px solid #000', borderRadius: '4px' }}>{v.code}</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
