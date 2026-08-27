import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  Radio, 
  PlusCircle, 
  Clock, 
  DollarSign, 
  MessageSquare, 
  CheckCircle2, 
  Send, 
  User, 
  AlertCircle,
  Tag,
  Zap,
  AlertTriangle,
  Wallet,
  X
} from 'lucide-react';

export default function CommunityRequests() {
  const { 
    communityRequests, 
    addCommunityRequest, 
    addUrgentRequest,
    fulfillRequest, 
    currentUser, 
    platformConfig 
  } = useCampus();

  const [showAddForm, setShowAddForm] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Academic & Calculators');
  const [neededDate, setNeededDate] = useState('Tomorrow');
  const [budget, setBudget] = useState('\u20b9100 - \u20b9300');
  const [description, setDescription] = useState('');

  const urgentFee = platformConfig.urgentRequestFee || 50;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const reqData = { title, category, neededDate, budget, description };

    if (isUrgent) {
      await addUrgentRequest(reqData);
    } else {
      addCommunityRequest(reqData);
    }

    setTitle('');
    setDescription('');
    setIsUrgent(false);
    setShowAddForm(false);
  };

  // Sort: urgent unfulfilled first, then regular unfulfilled, then fulfilled
  const sortedRequests = [...communityRequests].sort((a, b) => {
    if (a.fulfilled !== b.fulfilled) return a.fulfilled ? 1 : -1;
    if (a.isUrgent !== b.isUrgent) return a.isUrgent ? -1 : 1;
    return 0;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div style={{
        background: '#B8B8FF',
        border: '3px solid #222',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '6px 6px 0px #222',
        color: '#222',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <Radio size={28} color="#222" />
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#222' }}>
              Campus Gear Broadcast Board
            </h1>
          </div>
          <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#222' }}>
            Looking for unlisted equipment or urgent project gear? Broadcast your request to campus peers!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn btn-emerald"
          >
            <PlusCircle size={16} />
            {showAddForm ? 'Close Form' : 'Broadcast Need'}
          </button>
        </div>
      </div>

      {/* Broadcast Request Form */}
      {showAddForm && (
        <div style={{
          background: '#fff',
          border: '3px solid #222',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '4px 4px 0px #222',
          animation: 'popIn 0.2s ease-out'
        }}>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#222', marginBottom: '14px' }}>
            Post New Campus Need:
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#222' }}>Request Title:</label>
                <input type="text" className="input-field" required placeholder="e.g. Need 3D printer PLA filament roll" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#222' }}>Category:</label>
                <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>Academic & Calculators</option>
                  <option>Cameras & Audio</option>
                  <option>Tech & Electronics</option>
                  <option>Sports & Fitness</option>
                  <option>Event & Decor</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#222' }}>Needed By:</label>
                <input type="text" className="input-field" placeholder="Today / Tomorrow" value={neededDate} onChange={(e) => setNeededDate(e.target.value)} />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#222' }}>Description & Project Need:</label>
              <textarea className="input-field" rows="3" required placeholder="Explain what project or exam you need this for..." value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            {/* Urgent Toggle Section */}
            <div style={{
              background: isUrgent ? '#FFF0F0' : '#F8F8F8',
              border: isUrgent ? '2.5px solid #FF3333' : '2px solid #DDD',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '16px',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Zap size={20} color={isUrgent ? '#FF3333' : '#999'} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: isUrgent ? '#FF3333' : '#333' }}>
                      Mark as URGENT Request
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#666', fontWeight: 600 }}>
                      Sends a priority notification to ALL campus users instantly
                    </div>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button 
                  type="button"
                  onClick={() => setIsUrgent(!isUrgent)}
                  style={{
                    width: '52px',
                    height: '28px',
                    borderRadius: '14px',
                    border: '2.5px solid #000',
                    background: isUrgent ? '#FF3333' : '#DDD',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.2s ease',
                    boxShadow: '2px 2px 0px #000',
                    flexShrink: 0
                  }}
                >
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#FFF',
                    border: '2px solid #000',
                    position: 'absolute',
                    top: '3px',
                    left: isUrgent ? '26px' : '3px',
                    transition: 'left 0.2s ease'
                  }} />
                </button>
              </div>

              {/* Fee Breakdown (shown when toggled ON) */}
              {isUrgent && (
                <div style={{
                  marginTop: '14px',
                  paddingTop: '12px',
                  borderTop: '2px dashed #FF3333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  animation: 'popIn 0.15s ease-out'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      background: '#FF3333',
                      color: '#FFF',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      border: '2px solid #000',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      boxShadow: '2px 2px 0px #000'
                    }}>
                      Platform Fee: {'\u20b9'}{urgentFee}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#666', fontWeight: 600 }}>
                      <AlertTriangle size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                      Charged immediately from your wallet
                    </div>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    fontSize: '0.82rem', 
                    fontWeight: 800,
                    color: currentUser.walletBalance >= urgentFee ? '#1A8C3D' : '#FF3333'
                  }}>
                    <Wallet size={15} />
                    Wallet: {'\u20b9'}{currentUser.walletBalance}
                    {currentUser.walletBalance < urgentFee && (
                      <span style={{ color: '#FF3333', fontSize: '0.72rem' }}> (Insufficient)</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className={`btn ${isUrgent ? 'btn-danger' : 'btn-emerald'} btn-sm`}>
                {isUrgent ? <Zap size={14} /> : <Send size={14} />}
                {isUrgent ? 'Send Urgent Broadcast' : 'Publish Broadcast'}
              </button>
              {isUrgent && (
                <span style={{ fontSize: '0.76rem', color: '#FF3333', fontWeight: 700, alignSelf: 'center' }}>
                  +{'\u20b9'}{urgentFee} fee will be charged
                </span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Broadcast Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '18px' }}>
        {sortedRequests.map(req => (
          <div 
            key={req.id} 
            className={req.isUrgent && !req.fulfilled ? 'urgent-card' : ''}
            style={{
              background: req.fulfilled ? '#FFF3D6' : req.isUrgent ? '#FFF5F5' : '#fff',
              border: req.isUrgent && !req.fulfilled ? '3px solid #FF3333' : '3px solid #222',
              borderRadius: '12px',
              padding: '18px',
              boxShadow: '4px 4px 0px #222',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {req.isUrgent && !req.fulfilled && (
                    <span style={{
                      background: '#FF3333',
                      color: '#FFF',
                      fontSize: '0.66rem',
                      fontWeight: 900,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      border: '2px solid #000',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      animation: 'urgentBadgePulse 1.5s ease-in-out infinite',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Zap size={10} />
                      URGENT
                    </span>
                  )}
                  <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>
                    <Tag size={10} /> {req.category}
                  </span>
                </div>
                <span className={`badge ${req.fulfilled ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.68rem' }}>
                  {req.fulfilled ? 'Fulfilled' : req.isUrgent ? 'Priority Active' : 'Active Request'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#222', marginBottom: '8px' }}>
                {req.title}
              </h3>

              <p style={{ fontSize: '0.84rem', color: '#444', marginBottom: '14px', lineHeight: '1.4' }}>
                {req.description}
              </p>

              {/* Requester Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', color: '#666', marginBottom: '12px' }}>
                <img src={req.requesterAvatar} alt={req.requesterName} style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1px solid #222' }} />
                <span style={{ fontWeight: 700, color: '#222' }}>{req.requesterName}</span>
                <span>- {req.department}</span>
                {req.isUrgent && req.urgentFeePaid && (
                  <span style={{
                    background: '#FFE853',
                    color: '#000',
                    fontSize: '0.64rem',
                    fontWeight: 800,
                    padding: '1px 6px',
                    borderRadius: '4px',
                    border: '1.5px solid #000'
                  }}>
                    {'\u20b9'}{req.urgentFeePaid} fee paid
                  </span>
                )}
              </div>
            </div>

            <div style={{
              paddingTop: '10px',
              borderTop: req.isUrgent && !req.fulfilled ? '2px solid #FF3333' : '2px solid #222',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#555' }}>
                Needed: <strong style={{ color: req.isUrgent ? '#FF3333' : '#222' }}>{req.neededDate}</strong>
              </div>

              {!req.fulfilled && req.requesterId !== currentUser.id && (
                <button onClick={() => fulfillRequest(req.id)} className="btn btn-emerald btn-sm">
                  <CheckCircle2 size={14} /> Offer Gear
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
