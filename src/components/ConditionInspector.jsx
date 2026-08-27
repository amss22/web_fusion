import React, { useState } from 'react';
import { 
  Camera, 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  UploadCloud, 
  CheckCircle2, 
  Sliders, 
  ShieldCheck, 
  Maximize2 
} from 'lucide-react';

export default function ConditionInspector({ exchange, isInspectionMode = false, onVerifyInspection, onReportDamage }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [checklist, setChecklist] = useState([
    { id: 'c1', label: 'Exterior body & casing intact with zero new cracks/dents', checked: true },
    { id: 'c2', label: 'All optical/functional parts operating normally', checked: true },
    { id: 'c3', label: 'Included cables, accessories & chargers returned complete', checked: true },
    { id: 'c4', label: 'Cleaned and returned in original condition', checked: true }
  ]);

  const [afterImage, setAfterImage] = useState(
    exchange.postReturnPhotos?.[0] || 
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80"
  );
  const beforeImage = exchange.preBorrowPhotos?.[0] || exchange.itemImage;

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
  };

  const allChecked = checklist.every(c => c.checked);

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.85)',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      marginTop: '16px'
    }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Camera size={18} color="var(--accent-cyan)" />
          <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
            Before & After Condition Verification
          </h4>
        </div>
        <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
          Proof-of-State Comparison
        </span>
      </div>

      {/* Side-by-Side Interactive Comparison Viewer */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '16px'
      }}>
        
        {/* Before Photo */}
        <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '180px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <img src={beforeImage} alt="Before Handover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
            <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
              ✓ BEFORE HANDOVER
            </span>
          </div>
          <div style={{ position: 'absolute', bottom: '6px', left: '8px', fontSize: '0.7rem', color: '#fff', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>
            Verified on Handover
          </div>
        </div>

        {/* After Photo */}
        <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '180px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <img src={afterImage} alt="After Return" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
              📸 POST-RETURN STATE
            </span>
          </div>
          <div style={{ position: 'absolute', bottom: '6px', left: '8px', fontSize: '0.7rem', color: '#fff', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>
            Current Physical Return
          </div>
        </div>

      </div>

      {/* Checklist Verification */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Physical Inspection Checklist:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {checklist.map(c => (
            <div 
              key={c.id} 
              onClick={() => toggleCheck(c.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                color: c.checked ? '#fff' : 'var(--text-muted)'
              }}
            >
              {c.checked ? <CheckSquare size={15} color="var(--accent-emerald)" /> : <Square size={15} color="var(--text-muted)" />}
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      {isInspectionMode && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
          <button 
            onClick={onReportDamage}
            className="btn btn-danger btn-sm"
          >
            <AlertTriangle size={15} />
            Report Damage / Defect
          </button>
          
          <button 
            onClick={onVerifyInspection}
            disabled={!allChecked}
            className="btn btn-emerald btn-sm"
            style={{ opacity: allChecked ? 1 : 0.5 }}
          >
            <CheckCircle2 size={15} />
            Approve Perfect Condition & Settle
          </button>
        </div>
      )}

    </div>
  );
}
