import React, { useState } from 'react';
import { PRESET_AI_PROMPTS, parseNaturalLanguageQuery } from '../data/aiPrompts';
import { 
  Sparkles, 
  Search, 
  Zap, 
  PackageCheck, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  CheckCircle, 
  Info,
  SlidersHorizontal,
  Bot
} from 'lucide-react';

export default function AiDiscovery({ items, onSelectItem, onSelectBundle }) {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const handleRunAI = (searchQuery) => {
    if (!searchQuery.trim()) return;
    setIsAnalyzing(true);
    setAiResult(null);

    // Simulate realistic AI thought stream
    setTimeout(() => {
      const result = parseNaturalLanguageQuery(searchQuery, items);
      setAiResult(result);
      setIsAnalyzing(false);
    }, 700);
  };

  const handleSelectPreset = (preset) => {
    setQuery(preset.query);
    handleRunAI(preset.query);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background ambient light */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '180px',
        height: '180px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Title & AI Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bot size={18} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
              AI-Assisted Need-Based Discovery
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
              Describe your assignment, shoot, or project in natural language. We'll find or bundle the exact gear you need.
            </p>
          </div>
        </div>

        <span className="badge badge-purple">
          <Sparkles size={12} />
          NLP Powered
        </span>
      </div>

      {/* Input bar */}
      <div style={{ position: 'relative', display: 'flex', gap: '10px', marginBottom: '14px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search 
            size={18} 
            color="var(--text-muted)" 
            style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input 
            type="text" 
            className="input-field" 
            placeholder="e.g. 'I need to shoot a reel for our club fest tomorrow' or 'Exam prep for Machine Drawing tonight'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRunAI(query)}
            style={{ paddingLeft: '44px', fontSize: '0.95rem' }}
          />
        </div>

        <button 
          onClick={() => handleRunAI(query)} 
          disabled={!query.trim() || isAnalyzing}
          className="btn btn-primary"
        >
          {isAnalyzing ? (
            <>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: '#fff',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Find Best Fit
            </>
          )}
        </button>
      </div>

      {/* Sample Prompt Chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Try asking:</span>
        {PRESET_AI_PROMPTS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectPreset(preset)}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-full)',
              padding: '4px 12px',
              color: 'var(--text-secondary)',
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* AI Results Output Container */}
      {aiResult && (
        <div style={{
          marginTop: '20px',
          padding: '18px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          animation: 'fadeIn 0.3s ease'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                Match Confidence: {aiResult.confidence}%
              </span>
              {aiResult.discount > 0 && (
                <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                  {aiResult.discount}% Bundle Savings
                </span>
              )}
            </div>

            <button 
              onClick={() => setAiResult(null)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Clear
            </button>
          </div>

          <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '6px' }}>
            {aiResult.bundleName}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            {aiResult.explanation}
          </p>

          {/* Matched Items Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '12px',
            marginBottom: '16px'
          }}>
            {aiResult.items.map(item => (
              <div 
                key={item.id}
                onClick={() => onSelectItem(item)}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-card)';
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} 
                />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    ₹{item.dailyRate}/day • {item.distance}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    ⭐ {item.rating} • {item.condition}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action CTA */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
            <button 
              onClick={() => onSelectItem(aiResult.items[0])}
              className="btn btn-secondary btn-sm"
            >
              View Primary Item
            </button>
            <button 
              onClick={() => onSelectBundle(aiResult)}
              className="btn btn-emerald btn-sm"
            >
              <PackageCheck size={16} />
              Borrow Recommended Bundle (1-Click)
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
