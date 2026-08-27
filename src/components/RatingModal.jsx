import React, { useState } from 'react';
import { 
  Star, 
  X, 
  CheckCircle2, 
  Heart, 
  MessageSquare,
  Award
} from 'lucide-react';

export default function RatingModal({ exchange, onClose, onSubmitRating }) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitRating(exchange.id, {
      borrowerRating: rating,
      borrowerFeedback: feedback,
      lenderRating: rating,
      lenderFeedback: feedback
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        
        <div className="modal-header">
          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#222' }}>
            ⭐ Submit Peer Trust Feedback
          </div>
          <button onClick={onClose} style={{ background: '#fff', border: '2px solid #222', borderRadius: '6px', cursor: 'pointer', padding: '4px' }}>
            <X size={18} color="#222" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#222', marginBottom: '8px' }}>
              How was your experience sharing <strong style={{ color: '#FF6B9D' }}>{exchange.itemTitle}</strong>?
            </div>
            
            {/* Star selector */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '12px 0' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    background: star <= rating ? '#FFE66D' : '#fff',
                    border: '2px solid #222',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    boxShadow: '2px 2px 0px #222'
                  }}
                >
                  ★
                </button>
              ))}
            </div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FF6B9D' }}>
              {rating === 5 ? 'Excellent & Punctual! 🌟' : rating >= 4 ? 'Good Peer Experience 👍' : 'Fair Exchange'}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#222', display: 'block', marginBottom: '4px' }}>
              Peer Review & Comments:
            </label>
            <textarea 
              className="input-field" 
              rows="3" 
              placeholder="e.g. Great communication, item was kept in perfect condition!" 
              value={feedback} 
              onChange={(e) => setFeedback(e.target.value)} 
            />
          </div>

          <button type="submit" className="btn btn-emerald" style={{ width: '100%', padding: '12px' }}>
            Submit Rating & Update Trust Scores
          </button>

        </form>

      </div>
    </div>
  );
}
