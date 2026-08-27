import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  Radio, 
  PlusCircle, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Tag, 
  Send,
  HelpCircle,
  Sparkles 
} from 'lucide-react';

export default function CommunityRequests() {
  const { communityRequests, addCommunityRequest, fulfillRequest, currentUser } = useCampus();
  const [showPostModal, setShowPostModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cameras & Audio');
  const [neededDate, setNeededDate] = useState('Tomorrow by 2:00 PM');
  const [budget, setBudget] = useState('₹200/day');
  const [description, setDescription] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    addCommunityRequest({
      title,
      category,
      neededDate,
      budget,
      description
    });
    setShowPostModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      {/* Top Action Header */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Radio size={20} color="var(--accent-cyan)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              Campus Community Need Broadcast Board
            </h2>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
            Can't find what you need in the catalog? Broadcast your requirement to all campus members in your hostel or department.
          </p>
        </div>

        <button 
          onClick={() => setShowPostModal(true)}
          className="btn btn-primary"
        >
          <PlusCircle size={16} />
          Post New Request
        </button>
      </div>

      {/* Grid of Broadcast Requests */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
        {communityRequests.map(req => (
          <div 
            key={req.id}
            className="glass-panel"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              border: req.fulfilled ? '1px solid rgba(16,185,129,0.3)' : '1px solid var(--border-card)'
            }}
          >
            {/* Requester Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={req.requesterAvatar} alt={req.requesterName} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>{req.requesterName}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{req.department}</div>
                </div>
              </div>

              <span className={`badge ${req.fulfilled ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.66rem' }}>
                {req.fulfilled ? '✓ FULFILLED' : 'LOOKING'}
              </span>
            </div>

            {/* Title & Description */}
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
              {req.title}
            </h3>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px', flex: 1 }}>
              {req.description}
            </p>

            {/* Need date & Budget */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.78rem',
              marginBottom: '14px'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Needed: </span>
                <strong style={{ color: '#fff' }}>{req.neededDate}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Budget: </span>
                <strong style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>{req.budget}</strong>
              </div>
            </div>

            {/* Action CTA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                {req.responses} peer offers received
              </span>

              {!req.fulfilled ? (
                <button 
                  onClick={() => fulfillRequest(req.id)}
                  className="btn btn-emerald btn-sm"
                >
                  <Send size={14} />
                  I Have This Gear
                </button>
              ) : (
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  Matched with campus lender
                </span>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="modal-overlay" onClick={() => setShowPostModal(false)}>
          <div className="modal-content" style={{ maxWidth: '560px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#fff' }}>
                Broadcast a Campus Gear Request
              </h3>
              <button onClick={() => setShowPostModal(false)} style={{ background: 'none', border: 'none', color: '#fff' }}>✕</button>
            </div>

            <form onSubmit={handlePostSubmit}>
              <div className="modal-body">
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                    What item/gear are you looking for?
                  </label>
                  <input 
                    type="text" 
                    className="input-field"
                    required
                    placeholder="e.g. TI-84 Graphing Calculator / Gimbal Stabilizer"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                      Category:
                    </label>
                    <select 
                      className="input-field" 
                      value={category} 
                      onChange={e => setCategory(e.target.value)}
                    >
                      <option value="Cameras & Audio">Cameras & Audio</option>
                      <option value="Academic & Calculators">Academic & Calculators</option>
                      <option value="Tech & Electronics">Tech & Electronics</option>
                      <option value="Sports & Fitness">Sports & Fitness</option>
                      <option value="Event & Decor">Event & Decor</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                      Offered Budget:
                    </label>
                    <input 
                      type="text" 
                      className="input-field"
                      placeholder="e.g. ₹150/day or Free"
                      value={budget}
                      onChange={e => setBudget(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                    Needed When & Location:
                  </label>
                  <input 
                    type="text" 
                    className="input-field"
                    placeholder="e.g. Today by 4 PM (Hostel 2)"
                    value={neededDate}
                    onChange={e => setNeededDate(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                    Additional context / assignment details:
                  </label>
                  <textarea 
                    className="input-field"
                    rows="3"
                    required
                    placeholder="Briefly explain what you need it for..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowPostModal(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Broadcast Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
