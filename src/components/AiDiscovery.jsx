import React, { useState } from 'react';
import { PRESET_AI_PROMPTS, parseNaturalLanguageQuery } from '../data/aiPrompts';
import { 
  Zap, 
  ArrowRight, 
  Bot,
  Sparkles,
  CheckCircle2,
  Package
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
    }, 500);
  };

  const handleSelectPreset = (preset) => {
    setQuery(preset.query);
    handleRunAI(preset.query);
  };

  return (
    <div style={{
      background: 'var(--pop-periwinkle)',
      border: '3px solid #000000',
      borderRadius: '20px',
      padding: '32px',
      marginBottom: '36px',
      boxShadow: '6px 6px 0px #000000',
      position: 'relative'
    }}>
      
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'var(--pop-yellow)',
            border: '3px solid #000000',
            boxShadow: '3px 3px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bot size={26} color="#000000" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#000000', margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
              AI Need-Based Discovery Engine
            </h2>
            <div style={{ fontSize: '0.84rem', color: '#111111', fontWeight: 700 }}>
              Tell us what project or exam you are preparing for to match gear bundles instantly!
            </div>
          </div>
        </div>

        <span className="badge badge-amber" style={{ fontSize: '0.78rem' }}>
          Smart NLP Match
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
            paddingRight: '150px',
            background: '#FFFFFF',
            fontSize: '0.96rem',
            fontWeight: 700,
            borderRadius: '12px',
            border: '3px solid #000000',
            boxShadow: '4px 4px 0px #000000',
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
            padding: '8px 22px',
            fontSize: '0.88rem',
            borderRadius: '8px'
          }}
        >
          {isAnalyzing ? (
            'Parsing...'
          ) : (
            <>
              <Zap size={16} />
              Match Gear
            </>
          )}
        </button>
      </div>

      {/* Preset Prompts */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Presets:
        </span>
        {PRESET_AI_PROMPTS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handleSelectPreset(preset)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: '#FFFFFF',
              border: '2.5px solid #000000',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: '#000000',
              cursor: 'pointer',
              boxShadow: '2.5px 2.5px 0px #000000',
              transition: 'all 0.12s ease',
              fontFamily: 'var(--font-heading)'
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* AI Result Panel */}
      {aiResult && (
        <div style={{
          background: '#FFFFFF',
          border: '3px solid #000000',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '5px 5px 0px #000000',
          marginTop: '24px',
          animation: 'popIn 0.25s ease-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ fontWeight: 900, color: '#000000', fontSize: '1.15rem', fontFamily: 'var(--font-heading)' }}>
              Match Found: <span style={{ background: 'var(--pop-yellow)', padding: '2px 8px', border: '2px solid #000000', borderRadius: '4px' }}>{aiResult.bundleName || "Smart Recommendation"}</span>
            </div>
            <div style={{ fontSize: '0.84rem', fontWeight: 900, color: '#000000', background: 'var(--pop-mint)', padding: '3px 8px', border: '2px solid #000000', borderRadius: '6px' }}>
              {aiResult.confidence || 95}% Confidence
            </div>
          </div>

          <p style={{ fontSize: '0.9rem', color: '#333333', marginBottom: '18px', fontWeight: 600 }}>
            {aiResult.explanation}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px', marginBottom: '18px' }}>
            {(aiResult.items || []).map(item => (
              <div 
                key={item.id}
                onClick={() => onSelectItem(item)}
                style={{
                  background: 'var(--bg-primary)',
                  border: '2.5px solid #000000',
                  borderRadius: '10px',
                  padding: '12px',
                  cursor: 'pointer',
                  boxShadow: '3px 3px 0px #000000',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <img src={item.image} alt={item.title} style={{ width: '46px', height: '46px', borderRadius: '6px', objectFit: 'cover', border: '1.5px solid #000000' }} />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#000000', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontFamily: 'var(--font-heading)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#000000', fontWeight: 900 }}>
                    ₹{item.dailyRate}/day
                  </div>
                </div>
              </div>
            ))}
          </div>

          {aiResult.discount > 0 && (
            <div style={{
              background: 'var(--pop-yellow)',
              border: '2.5px solid #000000',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '3px 3px 0px #000000'
            }}>
              <div>
                <div style={{ fontSize: '0.96rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)' }}>
                  Recommended Bundle Package ({aiResult.discount}% Discount)
                </div>
                <div style={{ fontSize: '0.82rem', color: '#222222', fontWeight: 700 }}>
                  Combined bundle offer for all matched resources
                </div>
              </div>
              <button 
                onClick={() => onSelectBundle && onSelectBundle(aiResult)}
                className="btn btn-sm btn-primary"
              >
                Borrow Package
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
