import React from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  MapPin, 
  ShieldCheck, 
  Star, 
  Clock, 
  Tag, 
  ArrowUpRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function ItemCard({ item, onSelect }) {
  const { users } = useCampus();
  const owner = users.find(u => u.id === item.ownerId) || { name: 'Campus Peer', trustScore: 90, avatar: item.image };

  const getConditionColor = (cond) => {
    if (cond === 'Like New') return 'badge-emerald';
    if (cond === 'Excellent') return 'badge-cyan';
    return 'badge-amber';
  };

  return (
    <div 
      onClick={() => onSelect(item)}
      className="glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
        e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(6, 182, 212, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.borderColor = 'var(--border-card)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
    >
      {/* Image & Top Badges */}
      <div style={{ position: 'relative', height: '190px', width: '100%', overflow: 'hidden' }}>
        <img 
          src={item.image} 
          alt={item.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          className="item-card-image"
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(9,13,22,0.4) 0%, transparent 40%, rgba(9,13,22,0.85) 100%)'
        }} />

        {/* Category & Status Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          <span className="badge badge-purple" style={{ backdropFilter: 'blur(8px)', background: 'rgba(168, 85, 247, 0.3)' }}>
            {item.category}
          </span>
        </div>

        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <span className={`badge ${getConditionColor(item.condition)}`} style={{ backdropFilter: 'blur(8px)' }}>
            {item.condition}
          </span>
        </div>

        {/* Distance & Location on image bottom */}
        <div style={{ position: 'absolute', bottom: '10px', left: '12px', display: 'flex', alignItems: 'center', gap: '5px', color: '#e2e8f0', fontSize: '0.78rem' }}>
          <MapPin size={13} color="var(--accent-cyan)" />
          <span style={{ fontWeight: 500 }}>{item.location}</span>
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>({item.distance})</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Title */}
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px', lineHeight: '1.3', color: '#fff' }}>
          {item.title}
        </h3>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {item.description}
        </p>

        {/* Owner Info & Trust Score */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 10px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img 
              src={owner.avatar} 
              alt={owner.name} 
              style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} 
            />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}>
              {owner.name}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} color="var(--accent-emerald)" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
              {owner.trustScore}% Trust
            </span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Borrow Rates
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                ₹{item.dailyRate}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>/day</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>• ₹{item.hourlyRate}/hr</span>
            </div>
          </div>

          <button 
            className="btn btn-primary btn-sm"
            style={{ padding: '6px 12px' }}
          >
            Borrow
            <ArrowUpRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
