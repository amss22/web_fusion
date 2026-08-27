import React, { useState } from 'react';
import { PRESET_AI_PROMPTS, parseNaturalLanguageQuery } from '../data/aiPrompts';
import { 
  Zap, 
  ArrowRight, 
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
      background: '#FFF9E6',
      border: '2.5px solid #1E1E1E',
      borderRadius: '24px',
      padding: '28px',
      marginBottom: '32px',
      boxShadow: '4px 4px 0px #1E1E1E',
      position: 'relative'
    }}>
      
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'var(--pop-pink)',
            border: '2.5px solid #1E1E1E',
            boxShadow: '2px 2px 0px #1E1E1E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bot size={24} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1E1E1E', margin: 0, fontFamily: 'var(--font-heading)' }}>
              AI Need-Based Discovery Engine 🤖
            </h2>
            <div style={{ fontSize: '0.82rem', color: '#555', fontWeight: 600 }}>
              Tell us what project you are working on to match gear automatically!
            </div>
          </div>
        </div>

        <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
          ✨ Smart NLP Match
        </span>
      </div>

      {/* Input Bar */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <input 
          type="text"
          className="input-field"
          placeholder="e.g. 'I need to shoot a 4K promo video reel for college fest with sound'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleRunAI(query)}
          style={{
            paddingRight: '140px',
            background: '#fff',
            fontSize: '0.95rem',
            fontWeight: 600,
            borderRadius: 'var(--radius-full)',
            border: '2.5px solid #1E1E1E',
            boxShadow: '3px 3px 0px #1E1E1E',
            paddingLeft: '20px'
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
            padding: '8px 20px',
            fontSize: '0.85rem'
          }}
        >
          {isAnalyzing ? (
            'Parsing...'
          ) : (
            <>
              <Zap size={15} />
              Match Gear
            </>
          )}
        </button>
      </div>

      {/* Preset Prompts */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1E1E1E', textTransform: 'uppercase' }}>
          💡 Presets:
        </span>
        {PRESET_AI_PROMPTS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: '#fff',
              border: '2px solid #1E1E1E',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#1E1E1E',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px #1E1E1E',
              transition: 'all 0.15s ease'
            }}
          >
            {preset.icon} {preset.label}
          </button>
        ))}
      </div>

      {/* AI Result Panel */}
      {aiResult && (
        <div style={{
          background: '#fff',
          border: '2.5px solid #1E1E1E',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '4px 4px 0px #1E1E1E',
          marginTop: '20px',
          animation: 'bounceIn 0.3s ease-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ fontWeight: 800, color: '#1E1E1E', fontSize: '1.05rem', fontFamily: 'var(--font-heading)' }}>
              🎯 Match Found: <span style={{ color: 'var(--pop-pink)' }}>{aiResult.intentName}</span>
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#06D6A0' }}>
              {aiResult.confidenceScore}% Confidence
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#555', marginBottom: '18px', fontWeight: 500 }}>
            {aiResult.reasoning}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px', marginBottom: '18px' }}>
            {aiResult.matchedItems.map(item => (
              <div 
                key={item.id}
                onClick={() => onSelectItem(item)}
                style={{
                  background: '#FAF7F2',
                  border: '2px solid #1E1E1E',
                  borderRadius: '14px',
                  padding: '12px',
                  cursor: 'pointer',
                  boxShadow: '2px 2px 0px #1E1E1E',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <img src={item.image} alt={item.title} style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #1E1E1E' }} />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E1E1E', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--pop-blue)', fontWeight: 800 }}>
                    ₹{item.dailyRate}/day
                  </div>
                </div>
              </div>
            ))}
          </div>

          {aiResult.bundleOption && (
            <div style={{
              background: '#B5EAD7',
              border: '2px solid #1E1E1E',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1E1E1E' }}>
                  📦 Recommended Bundle Package ({aiResult.bundleOption.discount}% Discount)
                </div>
                <div style={{ fontSize: '0.8rem', color: '#333', fontWeight: 600 }}>
                  Total Package: ₹{aiResult.bundleOption.totalPrice}/day (You save ₹{aiResult.bundleOption.savings})
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
