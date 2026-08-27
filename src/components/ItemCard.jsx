import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Star, 
  Tag, 
  CheckCircle2, 
  UserCheck, 
  ArrowRight,
  Clock
} from 'lucide-react';

export default function ItemCard({ item, owner, onSelectItem }) {
  return (
    <div 
      className="glass-panel"
      onClick={() => onSelectItem(item)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        overflow: 'hidden',
        background: '#fff',
        border: '3px solid #222',
        borderRadius: '12px',
        boxShadow: '4px 4px 0px #222',
        transition: 'all 0.15s ease',
        position: 'relative'
      }}
    >
      {/* Top Banner Image with Category Overlay */}
      <div style={{ position: 'relative', height: '180px', background: '#FFF3D6', overflow: 'hidden', borderBottom: '3px solid #222' }}>
        <img 
          src={item.image} 
          alt={item.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Category Pill */}
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
          <span className="badge badge-amber">
            <Tag size={11} />
            {item.category}
          </span>
        </div>

        {/* Condition Tag */}
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <span className="badge badge-emerald">
            {item.condition}
          </span>
        </div>

        {/* Status Indicator */}
        <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          <span className={`badge ${item.status === 'Available' ? 'badge-cyan' : 'badge-rose'}`}>
            {item.status}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Title */}
          <h3 style={{ 
            fontSize: '1.05rem', 
            fontWeight: 800, 
            color: '#222', 
            marginBottom: '8px', 
            lineHeight: '1.3' 
          }}>
            {item.title}
          </h3>

          {/* Owner & Trust Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <img 
              src={owner?.avatar || item.image} 
              alt={owner?.name || "Owner"}
              style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1px solid #222' }}
            />
            <span style={{ fontSize: '0.78rem', color: '#555', fontWeight: 700 }}>
              {owner?.name || "Campus Member"}
            </span>
            {owner?.trustScore && (
              <span style={{ 
                fontSize: '0.7rem', 
                background: '#FFE66D', 
                color: '#222', 
                padding: '1px 5px', 
                borderRadius: '4px', 
                border: '1px solid #222',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)'
              }}>
                ★ {owner.trustScore}% Trust
              </span>
            )}
          </div>

          {/* Location & Distance */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#666', marginBottom: '14px' }}>
            <MapPin size={13} color="#FF6B9D" />
            <span style={{ fontWeight: 600 }}>{item.location}</span>
            <span style={{ color: '#888' }}>• {item.distance}</span>
          </div>
        </div>

        {/* Rates & Quick CTA */}
        <div style={{ 
          paddingTop: '12px', 
          borderTop: '2px solid #222', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#222', fontFamily: 'var(--font-mono)' }}>
              ₹{item.dailyRate}<span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666' }}>/day</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#666', fontWeight: 600 }}>
              Deposit: ₹{item.deposit}
            </div>
          </div>

          <button 
            className="btn btn-sm btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              onSelectItem(item);
            }}
          >
            Borrow
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
