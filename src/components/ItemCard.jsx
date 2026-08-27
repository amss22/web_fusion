import React from 'react';
import { 
  MapPin, 
  ArrowRight
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
        background: '#FFFFFF',
        border: '3px solid #000000',
        borderRadius: '16px',
        boxShadow: '5px 5px 0px #000000',
        transition: 'all 0.15s ease',
        position: 'relative'
      }}
    >
      {/* Cover Image */}
      <div style={{ position: 'relative', height: '180px', background: 'var(--bg-secondary)', overflow: 'hidden', borderBottom: '3px solid #000000' }}>
        <img 
          src={item.image} 
          alt={item.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Condition Tag - top right, small */}
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <span style={{
            background: 'var(--pop-mint)',
            color: '#000',
            fontSize: '0.68rem',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: '4px',
            border: '2px solid #000',
            boxShadow: '2px 2px 0px #000',
            fontFamily: 'var(--font-body)',
            textTransform: 'uppercase'
          }}>
            {item.condition}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Category - inline small label */}
          <div style={{ marginBottom: '8px' }}>
            <span style={{
              background: 'var(--pop-yellow)',
              color: '#000',
              fontSize: '0.66rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '4px',
              border: '1.5px solid #000',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
              letterSpacing: '0.03em'
            }}>
              {item.category}
            </span>
          </div>

          {/* Title - use body font for readability */}
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: 800, 
            color: '#000000', 
            marginBottom: '10px', 
            lineHeight: '1.35',
            fontFamily: 'var(--font-body)',
            letterSpacing: '-0.01em'
          }}>
            {item.title}
          </h3>

          {/* Owner & Trust Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <img 
              src={owner?.avatar || item.image} 
              alt={owner?.name || "Owner"}
              style={{ width: '22px', height: '22px', borderRadius: '4px', border: '1.5px solid #000000' }}
            />
            <span style={{ fontSize: '0.78rem', color: '#222222', fontWeight: 700 }}>
              {owner?.name || "Campus Member"}
            </span>
            {owner?.trustScore && (
              <span style={{ 
                fontSize: '0.68rem', 
                background: 'var(--pop-periwinkle)', 
                color: '#000000', 
                padding: '1px 5px', 
                borderRadius: '4px', 
                border: '1.5px solid #000000',
                fontWeight: 800
              }}>
                {owner.trustScore}%
              </span>
            )}
          </div>

          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.76rem', color: '#555', marginBottom: '12px', fontWeight: 600 }}>
            <MapPin size={13} color="#FF6699" />
            <span>{item.location}</span>
          </div>
        </div>

        {/* Rates & CTA */}
        <div style={{ 
          paddingTop: '12px', 
          borderTop: '2px dashed #000000', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#000000', fontFamily: 'var(--font-body)' }}>
            ₹{item.dailyRate}<span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#555' }}>/day</span>
          </div>

          <button 
            className="btn btn-sm btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              onSelectItem(item);
            }}
            style={{ fontSize: '0.78rem', padding: '5px 12px' }}
          >
            Borrow
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </div>
  );
}
