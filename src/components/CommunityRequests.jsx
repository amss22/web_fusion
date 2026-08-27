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
  Tag
} from 'lucide-react';

export default function CommunityRequests() {
  const { communityRequests, addCommunityRequest, fulfillRequest, currentUser } = useCampus();
  const [showAddForm, setShowAddForm] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Academic & Calculators');
  const [neededDate, setNeededDate] = useState('Tomorrow');
  const [budget, setBudget] = useState('₹100 - ₹300');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addCommunityRequest({
      title,
      category,
      neededDate,
      budget,
      description
    });

    setTitle('');
    setDescription('');
    setShowAddForm(false);
  };

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
              Campus Gear Broadcast Board 📢
            </h1>
          </div>
          <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#222' }}>
            Looking for unlisted equipment or urgent project gear? Broadcast your request to campus peers!
          </p>
        </div>

        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-emerald"
        >
          <PlusCircle size={16} />
          {showAddForm ? 'Close Form' : 'Broadcast Need'}
        </button>
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
            📢 Post New Campus Need:
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

            <button type="submit" className="btn btn-emerald btn-sm">
              <Send size={14} /> Publish Broadcast
            </button>
          </form>
        </div>
      )}

      {/* Broadcast Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '18px' }}>
        {communityRequests.map(req => (
          <div key={req.id} style={{
            background: req.fulfilled ? '#FFF3D6' : '#fff',
            border: '3px solid #222',
            borderRadius: '12px',
            padding: '18px',
            boxShadow: '4px 4px 0px #222',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>
                  <Tag size={10} /> {req.category}
                </span>
                <span className={`badge ${req.fulfilled ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.68rem' }}>
                  {req.fulfilled ? 'Fulfilled ✓' : 'Active Request'}
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
                <span>• {req.department}</span>
              </div>
            </div>

            <div style={{
              paddingTop: '10px',
              borderTop: '2px solid #222',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#555' }}>
                ⏰ Needed: <strong style={{ color: '#222' }}>{req.neededDate}</strong>
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
