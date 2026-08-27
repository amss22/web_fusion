import React from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  TrendingUp, 
  Leaf, 
  Users, 
  Clock, 
  Repeat, 
  DollarSign, 
  Award, 
  Sparkles,
  PieChart,
  CheckCircle2
} from 'lucide-react';

export default function ImpactDashboard() {
  const { impactStats, items, exchanges, users } = useCampus();

  const categories = [
    { name: "Cameras & Audio", count: 42, pct: 35, color: "#06b6d4" },
    { name: "Academic & Calculators", count: 34, pct: 28, color: "#10b981" },
    { name: "Tech & Electronics", count: 24, pct: 20, color: "#6366f1" },
    { name: "Sports & Fitness", count: 12, pct: 10, color: "#f59e0b" },
    { name: "Event & Sound", count: 8, pct: 7, color: "#a855f7" }
  ];

  return (
    <div>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Leaf size={22} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
              Campus Circular Impact & Sustainability Dashboard
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Quantifying the economic savings, electronic waste prevention, and collective trust of our campus community.
            </p>
          </div>
        </div>
      </div>

      {/* 5 Core Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        
        {/* Money Saved */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Student Money Saved
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(16,185,129,0.15)', color: 'var(--accent-emerald)' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
            {impactStats.totalMoneySaved}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Avoided retail buying costs
          </div>
        </div>

        {/* Resources Reused */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Resources Reused
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(6,182,212,0.15)', color: 'var(--accent-cyan)' }}>
              <Repeat size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
            {impactStats.totalResourcesReused}x
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Idle gear utilized by peers
          </div>
        </div>

        {/* E-Waste / CO2 Diverted */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              CO₂ & E-Waste Saved
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(99,102,241,0.15)', color: 'var(--accent-indigo)' }}>
              <Leaf size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a5b4fc', fontFamily: 'var(--font-mono)' }}>
            {impactStats.co2SavedKg} kg
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Emissions & manufacturing saved
          </div>
        </div>

        {/* On-Time Return Rate */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              On-Time Return Rate
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(245,158,11,0.15)', color: 'var(--accent-amber)' }}>
              <Clock size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
            {impactStats.onTimeRate}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            High community accountability
          </div>
        </div>

      </div>

      {/* Category Breakdown & Campus Leaderboard Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        
        {/* Popular Categories */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
            Most Shared Campus Gear Categories
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {categories.map((cat, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: '#fff' }}>{cat.name}</span>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {cat.count} exchanges ({cat.pct}%)
                  </span>
                </div>
                <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${cat.pct}%`, background: cat.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Campus Sharers Leaderboard */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="var(--accent-amber)" />
            Campus Circular Champions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {users.slice(0, 3).map((u, rank) => (
              <div 
                key={u.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: rank === 0 ? '#f59e0b' : rank === 1 ? '#94a3b8' : '#cd7f32',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  #{rank + 1}
                </div>

                <img src={u.avatar} alt={u.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>{u.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{u.successfulExchanges} completed shares</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                    {u.trustScore}%
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Trust Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
