import React from 'react';
import { 
  MapPin, 
  Tag, 
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
      <div style={{ position: 'relative', height: '190px', background: 'var(--bg-secondary)', overflow: 'hidden', borderBottom: '3px solid #000000' }}>
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
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span className="badge badge-amber">
            <Tag size={11} />
            {item.category}
          </span>
        </div>

        {/* Condition Tag */}
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <span className="badge badge-emerald">
            {item.condition}
          </span>
        </div>
      </div>

      {/* Card Content with Generous Whitespace */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Title */}
          <h3 style={{ 
            fontSize: '1.15rem', 
            fontWeight: 900, 
            color: '#000000', 
            marginBottom: '10px', 
            lineHeight: '1.3',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.02em'
          }}>
            {item.title}
          </h3>

          {/* Owner & Trust Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <img 
              src={owner?.avatar || item.image} 
              alt={owner?.name || "Owner"}
              style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1.5px solid #000000' }}
            />
            <span style={{ fontSize: '0.82rem', color: '#222222', fontWeight: 800 }}>
              {owner?.name || "Campus Member"}
            </span>
            {owner?.trustScore && (
              <span style={{ 
                fontSize: '0.72rem', 
                background: 'var(--pop-periwinkle)', 
                color: '#000000', 
                padding: '2px 6px', 
                borderRadius: '4px', 
                border: '1.5px solid #000000',
                fontWeight: 900,
                boxShadow: '1.5px 1.5px 0px #000000'
              }}>
                {owner.trustScore}% Trust
              </span>
            )}
          </div>

          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#444444', marginBottom: '16px', fontWeight: 700 }}>
            <MapPin size={14} color="#FF6699" />
            <span>{item.location}</span>
          </div>
        </div>

        {/* Rates & CTA */}
        <div style={{ 
          paddingTop: '14px', 
          borderTop: '2.5px dashed #000000', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)' }}>
              ₹{item.dailyRate}<span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#555555' }}>/day</span>
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
