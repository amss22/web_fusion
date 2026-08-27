import React, { useState } from 'react';
import { 
  Camera, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  AlertCircle,
  FileCheck
} from 'lucide-react';

export default function ConditionInspector({ exchange, onClose, onVerify }) {
  const [checklist, setChecklist] = useState(
    (exchange.checklistItems || [
      { name: "Item exterior clean & undamaged", defaultChecked: true },
      { name: "All cables & accessories present", defaultChecked: true },
      { name: "Functional power & operation verified", defaultChecked: true }
    ]).map(c => ({ ...c, checked: true }))
  );

  const toggleCheck = (idx) => {
    setChecklist(prev => prev.map((item, i) => i === idx ? { ...item, checked: !item.checked } : item));
  };

  const allChecked = checklist.every(c => c.checked);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
        
        <div className="modal-header">
          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#222' }}>
            Physical Handover & Inspection Checklist
          </div>
          <button onClick={onClose} style={{ background: '#fff', border: '2px solid #222', borderRadius: '6px', cursor: 'pointer', padding: '4px' }}>
            <X size={18} color="#222" />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ background: '#FFF3D6', border: '2px solid #222', borderRadius: '8px', padding: '12px' }}>
            <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#222' }}>{exchange.itemTitle}</div>
            <div style={{ fontSize: '0.74rem', color: '#555' }}>
              Verify condition photos and physical checklist prior to completing stage transition.
            </div>
          </div>

          {/* Photo Comparison */}
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#222', textTransform: 'uppercase', marginBottom: '8px' }}>
              Verified Baseline Photos:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ border: '2px solid #222', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={exchange.itemImage} alt="Baseline" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                <div style={{ background: '#222', color: '#fff', fontSize: '0.7rem', padding: '4px 8px', fontWeight: 700 }}>Pre-Borrow Photo</div>
              </div>
              <div style={{ border: '2px solid #222', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={exchange.itemImage} alt="Return check" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                <div style={{ background: '#4ECDC4', color: '#222', fontSize: '0.7rem', padding: '4px 8px', fontWeight: 700 }}>Current Inspection</div>
              </div>
            </div>
          </div>

          {/* Inspection Items */}
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#222', textTransform: 'uppercase', marginBottom: '8px' }}>
              Physical Inspection Verification Checklist:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {checklist.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    background: item.checked ? '#C7F464' : '#fff',
                    border: '2px solid #222',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#222',
                    boxShadow: '2px 2px 0px #222'
                  }}
                >
                  <input type="checkbox" checked={item.checked} onChange={() => {}} style={{ width: '16px', height: '16px' }} />
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => onVerify({ preChecklistVerified: true })}
            disabled={!allChecked}
            className="btn btn-emerald" 
            style={{ width: '100%', padding: '12px', opacity: allChecked ? 1 : 0.6 }}
          >
            Confirm & Verify Condition Checklist
          </button>

        </div>

      </div>
    </div>
  );
}
