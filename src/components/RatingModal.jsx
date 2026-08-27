import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import confetti from 'canvas-confetti';
import { 
  Star, 
  X, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  HeartHandshake 
} from 'lucide-react';

export default function RatingModal({ exchange, onClose }) {
  const { submitRating, currentUser } = useCampus();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('Item was in flawless condition and return was right on time! Highly recommended campus peer.');

  const isLender = currentUser.id === exchange.lenderId;
  const peerName = isLender ? exchange.borrowerName : exchange.lenderName;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log(err);
    }

    submitRating(exchange.id, {
      borrowerRating: isLender ? undefined : rating,
      borrowerFeedback: isLender ? undefined : feedback,
      lenderRating: isLender ? rating : undefined,
      lenderFeedback: isLender ? feedback : undefined
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '1.15rem', margin: 0, color: '#fff' }}>
              Rate Peer & Update Trust Score
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ textAlign: 'center' }}>
            
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: '2px solid var(--accent-amber)'
            }}>
              <HeartHandshake size={32} color="var(--accent-amber)" />
            </div>

            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '6px' }}>
              How was your exchange with {peerName}?
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Your rating directly updates their campus Trust Score and boosts community reliability.
            </p>

            {/* Star Rating Interactive Selector */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  <Star 
                    size={32} 
                    fill={(hoverRating || rating) >= star ? '#f59e0b' : 'transparent'} 
                    color={(hoverRating || rating) >= star ? '#f59e0b' : 'var(--text-muted)'} 
                  />
                </button>
              ))}
            </div>

            {/* Feedback text area */}
            <div style={{ textAlign: 'left', marginBottom: '14px' }}>
              <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '6px' }}>
                Peer Testimonial / Review:
              </label>
              <textarea 
                className="input-field"
                rows="3"
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="Share your experience (on-time return, gear condition, friendliness)..."
                required
              />
            </div>

          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
              Skip
            </button>
            <button type="submit" className="btn btn-emerald btn-sm">
              <Sparkles size={16} />
              Submit Rating & Close Exchange
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
