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

    setTimeout(() => {
      const result = parseNaturalLanguageQuery(searchQuery, items);
      setAiResult(result);
      setIsAnalyzing(false);
    }, 600);
  };

  const handleSelectPreset = (preset) => {
    setQuery(preset.query);
    handleRunAI(preset.query);
  };

  return (
    <div style={{
      background: '#FFE66D',
      border: '3px solid #222',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '32px',
      boxShadow: '6px 6px 0px #222',
      position: 'relative'
    }}>
      
      {/* Title & Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            background: '#FF6B9D',
            border: '2px solid #222',
            boxShadow: '2px 2px 0px #222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bot size={22} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#222', margin: 0 }}>
              AI Need-Based Discovery Engine 🤖
            </h2>
            <div style={{ fontSize: '0.78rem', color: '#555', fontWeight: 600 }}>
              Type your project need or select a preset prompt to get automatic gear bundles!
            </div>
          </div>
        </div>

        <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
          ✨ Smart NLP Parser
        </span>
      </div>

      {/* Natural Language Input Bar */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <input 
          type="text"
          className="input-field"
          placeholder="e.g. 'I need to shoot a 4K promo video reel for college fest with sound'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleRunAI(query)}
          style={{
            paddingRight: '130px',
            background: '#fff',
            fontSize: '0.95rem',
            fontWeight: 600,
            border: '3px solid #222',
            boxShadow: '3px 3px 0px #222'
          }}
        />
        <button
          onClick={() => handleRunAI(query)}
          disabled={isAnalyzing || !query.trim()}
          className="btn btn-emerald"
          style={{
            position: 'absolute',
            right: '6px',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '8px 16px',
            fontSize: '0.82rem',
            boxShadow: '2px 2px 0px #222'
          }}
        >
          {isAnalyzing ? (
            'Parsing...'
          ) : (
            <>
              <Zap size={14} />
              Match Gear
            </>
          )}
        </button>
      </div>

      {/* Preset Prompts Chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#222', textTransform: 'uppercase' }}>
          💡 Try Preset Prompts:
        </span>
        {PRESET_AI_PROMPTS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              background: '#fff',
              border: '2px solid #222',
              fontSize: '0.76rem',
              fontWeight: 700,
              color: '#222',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px #222',
              transition: 'all 0.12s ease'
            }}
          >
            {preset.icon} {preset.label}
          </button>
        ))}
      </div>

      {/* AI Search Results Box */}
      {aiResult && (
        <div style={{
          background: '#fff',
          border: '3px solid #222',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '4px 4px 0px #222',
          marginTop: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ fontWeight: 800, color: '#222', fontSize: '1rem' }}>
              🎯 AI Match Summary: <span style={{ color: '#FF6B9D' }}>{aiResult.intentName}</span>
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2ECC71', fontFamily: 'var(--font-mono)' }}>
              Confidence Score: {aiResult.confidenceScore}%
            </div>
          </div>

          <p style={{ fontSize: '0.86rem', color: '#555', marginBottom: '16px', fontWeight: 500 }}>
            {aiResult.reasoning}
          </p>

          {/* Matched Items */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            {aiResult.matchedItems.map(item => (
              <div 
                key={item.id}
                onClick={() => onSelectItem(item)}
                style={{
                  background: '#FFF3D6',
                  border: '2px solid #222',
                  borderRadius: '8px',
                  padding: '10px',
                  cursor: 'pointer',
                  boxShadow: '2px 2px 0px #222',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <img src={item.image} alt={item.title} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #222' }} />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#222', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#2ECC71', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                    ₹{item.dailyRate}/day
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bundle CTA */}
          {aiResult.bundleOption && (
            <div style={{
              background: '#C7F464',
              border: '2px solid #222',
              borderRadius: '8px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#222' }}>
                  📦 Recommended Bundle Offer ({aiResult.bundleOption.discount}% OFF)
                </div>
                <div style={{ fontSize: '0.76rem', color: '#333' }}>
                  Total Package: ₹{aiResult.bundleOption.totalPrice}/day (Saved ₹{aiResult.bundleOption.savings})
                </div>
              </div>
              <button 
                onClick={() => onSelectBundle(aiResult.bundleOption)}
                className="btn btn-sm btn-primary"
              >
                Borrow Bundle
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
