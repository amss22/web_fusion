import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  X, 
  PlusCircle, 
  Image, 
  Tag, 
  DollarSign, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  ListChecks, 
  Check,
  PackagePlus
} from 'lucide-react';

export default function AddResourceModal({ onClose }) {
  const { addResource } = useCampus();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cameras & Audio');
  const [hourlyRate, setHourlyRate] = useState(50);
  const [dailyRate, setDailyRate] = useState(250);
  const [deposit, setDeposit] = useState(1000);
  const [condition, setCondition] = useState('Like New');
  const [location, setLocation] = useState('Block A - Media Lab');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80');
  const [description, setDescription] = useState('');
  const [borrowingRules, setBorrowingRules] = useState('');
  const [accessoryInput, setAccessoryInput] = useState('');
  const [includedAccessories, setIncludedAccessories] = useState(['Original Carry Bag', "Charging Cable & Power Adapter"]);

  const sampleImages = [
    { label: 'Camera / Audio', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80' },
    { label: 'Calculator', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80' },
    { label: 'Robotics / Arduino', url: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=600&q=80' },
    { label: 'Sports Racket', url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80' }
  ];

  const handleAddAccessory = () => {
    if (accessoryInput.trim()) {
      setIncludedAccessories(prev => [...prev, accessoryInput.trim()]);
      setAccessoryInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addResource({
      title,
      category,
      hourlyRate: Number(hourlyRate),
      dailyRate: Number(dailyRate),
      deposit: Number(deposit),
      condition,
      location,
      image,
      description,
      borrowingRules,
      includedAccessories,
      checklistItems: [
        { name: "Item exterior in stated condition", defaultChecked: true },
        { name: "All listed accessories present", defaultChecked: true }
      ]
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#222', marginLeft: '6px' }}>
              List New Campus Resource
            </span>
          </div>
          <button onClick={onClose} style={{ background: '#fff', border: '2px solid #222', borderRadius: '6px', cursor: 'pointer', padding: '4px', boxShadow: '2px 2px 0px #222' }}>
            <X size={18} color="#222" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222', display: 'block', marginBottom: '4px' }}>Resource Title:</label>
            <input type="text" className="input-field" required placeholder="e.g. Sony Alpha A7 III Mirrorless Camera" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222', display: 'block', marginBottom: '4px' }}>Category:</label>
              <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Cameras & Audio</option>
                <option>Academic & Calculators</option>
                <option>Tech & Electronics</option>
                <option>Sports & Fitness</option>
                <option>Event & Decor</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222', display: 'block', marginBottom: '4px' }}>Condition:</label>
              <select className="input-field" value={condition} onChange={(e) => setCondition(e.target.value)}>
                <option>Like New</option>
                <option>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
            </div>
          </div>

          {/* Pricing Grid */}
          <div style={{ background: '#FFE66D', border: '2.5px solid #222', borderRadius: '10px', padding: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: 800, color: '#222' }}>Hourly Rate (₹):</label>
              <input type="number" className="input-field" required value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: 800, color: '#222' }}>Daily Rate (₹):</label>
              <input type="number" className="input-field" required value={dailyRate} onChange={(e) => setDailyRate(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: 800, color: '#222' }}>Security Deposit (₹):</label>
              <input type="number" className="input-field" required value={deposit} onChange={(e) => setDeposit(e.target.value)} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222', display: 'block', marginBottom: '4px' }}>Pickup Campus Location:</label>
            <input type="text" className="input-field" required placeholder="e.g. Block A - Media Lab / Hostel 1" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222', display: 'block', marginBottom: '4px' }}>Detailed Description:</label>
            <textarea className="input-field" rows="3" required placeholder="Describe specifications, contents, and usage guidance..." value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222', display: 'block', marginBottom: '4px' }}>Image URL (or select sample):</label>
            <input type="text" className="input-field" value={image} onChange={(e) => setImage(e.target.value)} style={{ marginBottom: '8px' }} />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {sampleImages.map((s, i) => (
                <button type="button" key={i} onClick={() => setImage(s.url)} className="btn btn-sm btn-secondary" style={{ fontSize: '0.7rem', padding: '4px 8px' }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-footer" style={{ margin: '0 -24px -24px', padding: '16px 24px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">Cancel</button>
            <button type="submit" className="btn btn-emerald btn-sm">Publish Listing to Campus</button>
          </div>

        </form>

      </div>
    </div>
  );
}
