import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  X, 
  UploadCloud, 
  Tag, 
  DollarSign, 
  ShieldAlert, 
  MapPin, 
  CheckCircle, 
  Plus 
} from 'lucide-react';

export default function AddResourceModal({ onClose }) {
  const { addResource } = useCampus();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cameras & Audio');
  const [condition, setCondition] = useState('Like New');
  const [hourlyRate, setHourlyRate] = useState(50);
  const [dailyRate, setDailyRate] = useState(200);
  const [deposit, setDeposit] = useState(1000);
  const [location, setLocation] = useState('Block A - Media Lab');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80');
  const [description, setDescription] = useState('');
  const [accessoryInput, setAccessoryInput] = useState('');
  const [accessories, setAccessories] = useState(['Protective Carry Case', 'Original Charger']);
  const [rules, setRules] = useState('Handle carefully. Return fully charged.');

  const sampleImages = [
    { label: "Camera Gear", url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80" },
    { label: "Calculator", url: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80" },
    { label: "Electronics", url: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=600&q=80" },
    { label: "Sports Racket", url: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80" },
    { label: "Speaker", url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80" }
  ];

  const handleAddAccessory = () => {
    if (accessoryInput.trim()) {
      setAccessories(prev => [...prev, accessoryInput.trim()]);
      setAccessoryInput('');
    }
  };

  const handleRemoveAccessory = (index) => {
    setAccessories(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addResource({
      title,
      category,
      condition,
      hourlyRate: Number(hourlyRate),
      dailyRate: Number(dailyRate),
      deposit: Number(deposit),
      location,
      image,
      description,
      includedAccessories: accessories,
      borrowingRules: rules,
      checklistItems: [
        { name: "Item exterior in stated condition", defaultChecked: true },
        { name: "All listed accessories present", defaultChecked: true }
      ]
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#fff' }}>
            List Your Resource on Campus Circular
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            
            {/* Title */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                Resource Title & Model:
              </label>
              <input 
                type="text" 
                className="input-field"
                required
                placeholder="e.g. Canon EOS 200D DSLR or TI-84 Plus Graphing Calculator"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            {/* Category & Condition */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                  Category:
                </label>
                <select className="input-field" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="Cameras & Audio">Cameras & Audio</option>
                  <option value="Academic & Calculators">Academic & Calculators</option>
                  <option value="Tech & Electronics">Tech & Electronics</option>
                  <option value="Sports & Fitness">Sports & Fitness</option>
                  <option value="Event & Decor">Event & Decor</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                  Condition:
                </label>
                <select className="input-field" value={condition} onChange={e => setCondition(e.target.value)}>
                  <option value="Like New">Like New (Flawless)</option>
                  <option value="Excellent">Excellent (Minor cosmetic)</option>
                  <option value="Good">Good (Fully functional)</option>
                </select>
              </div>
            </div>

            {/* Rates & Security Deposit */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                  Hourly Rate (₹):
                </label>
                <input 
                  type="number"
                  className="input-field"
                  required
                  min="0"
                  value={hourlyRate}
                  onChange={e => setHourlyRate(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                  Daily Rate (₹):
                </label>
                <input 
                  type="number"
                  className="input-field"
                  required
                  min="0"
                  value={dailyRate}
                  onChange={e => setDailyRate(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                  Refundable Deposit (₹):
                </label>
                <input 
                  type="number"
                  className="input-field"
                  required
                  min="0"
                  value={deposit}
                  onChange={e => setDeposit(e.target.value)}
                />
              </div>
            </div>

            {/* Campus Location */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                Pickup Campus Location / Block:
              </label>
              <input 
                type="text" 
                className="input-field"
                required
                placeholder="e.g. Block A Media Lab / Hostel 2 Room 104"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>

            {/* Image Preview & Quick Presets */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                Resource Photo URL:
              </label>
              <input 
                type="url" 
                className="input-field"
                value={image}
                onChange={e => setImage(e.target.value)}
                style={{ marginBottom: '6px' }}
              />
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Quick Presets:</span>
                {sampleImages.map((s, i) => (
                  <button 
                    key={i} 
                    type="button"
                    onClick={() => setImage(s.url)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '2px 6px', fontSize: '0.72rem', color: 'var(--text-secondary)', cursor: 'pointer' }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Included Accessories Tag Builder */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                Included Accessories:
              </label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                <input 
                  type="text"
                  className="input-field"
                  placeholder="Add accessory (e.g. Lens hood, USB cable)"
                  value={accessoryInput}
                  onChange={e => setAccessoryInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddAccessory())}
                  style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                />
                <button type="button" onClick={handleAddAccessory} className="btn btn-secondary btn-sm">
                  Add
                </button>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {accessories.map((acc, i) => (
                  <span key={i} className="badge badge-cyan" style={{ cursor: 'pointer' }} onClick={() => handleRemoveAccessory(i)}>
                    {acc} ✕
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                Description & Highlights:
              </label>
              <textarea 
                className="input-field"
                rows="2"
                required
                placeholder="Give specifications, compatibility notes, and instructions..."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-emerald btn-sm">
              Publish Listing to Campus
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
