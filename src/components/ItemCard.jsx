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
        border: '2.5px solid #1E1E1E',
        borderRadius: '20px',
        boxShadow: '4px 4px 0px #1E1E1E',
        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative'
      }}
    >
      {/* Clean Cover Image */}
      <div style={{ position: 'relative', height: '190px', background: '#F3EFE6', overflow: 'hidden', borderBottom: '2.5px solid #1E1E1E' }}>
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
            fontSize: '1.08rem', 
            fontWeight: 800, 
            color: '#1E1E1E', 
            marginBottom: '10px', 
            lineHeight: '1.35',
            fontFamily: 'var(--font-heading)'
          }}>
            {item.title}
          </h3>

          {/* Owner & Trust Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <img 
              src={owner?.avatar || item.image} 
              alt={owner?.name || "Owner"}
              style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1.5px solid #1E1E1E' }}
            />
            <span style={{ fontSize: '0.8rem', color: '#555', fontWeight: 700 }}>
              {owner?.name || "Campus Member"}
            </span>
            {owner?.trustScore && (
              <span style={{ 
                fontSize: '0.7rem', 
                background: '#B5EAD7', 
                color: '#1E1E1E', 
                padding: '2px 6px', 
                borderRadius: 'var(--radius-full)', 
                border: '1.5px solid #1E1E1E',
                fontWeight: 800
              }}>
                {owner.trustScore}% Trust
              </span>
            )}
          </div>

          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#666', marginBottom: '16px', fontWeight: 600 }}>
            <MapPin size={14} color="#FF85A1" />
            <span>{item.location}</span>
          </div>
        </div>

        {/* Rates & CTA */}
        <div style={{ 
          paddingTop: '14px', 
          borderTop: '2px dashed #1E1E1E', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E1E1E', fontFamily: 'var(--font-heading)' }}>
              ₹{item.dailyRate}<span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#666' }}>/day</span>
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
