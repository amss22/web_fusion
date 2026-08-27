import React from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  TrendingUp, 
  Repeat, 
  Leaf, 
  Users, 
  Award, 
  Zap,
  DollarSign,
  Heart,
  ShieldCheck
} from 'lucide-react';

export default function ImpactDashboard() {
  const { impactStats, users, items } = useCampus();

  const leaderboards = [...users].sort((a, b) => (b.trustScore || 0) - (a.trustScore || 0));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Top Banner */}
      <div style={{
        background: '#C7F464',
        border: '3px solid #222',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '6px 6px 0px #222',
        color: '#222'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Leaf size={28} color="#222" />
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#222' }}>
            Campus Circular Economy Impact Dashboard
          </h1>
        </div>
        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#333' }}>
          Visualizing collective student savings, e-waste reduction, and resource optimization metrics across college departments.
        </p>
      </div>

      {/* 4 Big Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        
        <div style={{ background: '#FFE66D', border: '3px solid #222', borderRadius: '12px', padding: '20px', boxShadow: '4px 4px 0px #222' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#222', textTransform: 'uppercase' }}>Total Saved</span>
            <DollarSign size={20} color="#222" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#222', fontFamily: 'var(--font-mono)' }}>
            {impactStats.totalMoneySaved}
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#444', marginTop: '4px' }}>
            Student money saved vs buying new
          </div>
        </div>

        <div style={{ background: '#4ECDC4', border: '3px solid #222', borderRadius: '12px', padding: '20px', boxShadow: '4px 4px 0px #222' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#222', textTransform: 'uppercase' }}>Resources Reused</span>
            <Repeat size={20} color="#222" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#222', fontFamily: 'var(--font-mono)' }}>
            {impactStats.totalResourcesReused}
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1a5c57', marginTop: '4px' }}>
            Borrow cycles completed
          </div>
        </div>

        <div style={{ background: '#FF6B9D', border: '3px solid #222', borderRadius: '12px', padding: '20px', boxShadow: '4px 4px 0px #222' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#222', textTransform: 'uppercase' }}>CO₂ Prevented</span>
            <Leaf size={20} color="#222" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#222', fontFamily: 'var(--font-mono)' }}>
            {impactStats.co2SavedKg} kg
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
            E-waste emissions offset
          </div>
        </div>

        <div style={{ background: '#B8B8FF', border: '3px solid #222', borderRadius: '12px', padding: '20px', boxShadow: '4px 4px 0px #222' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#222', textTransform: 'uppercase' }}>On-Time Rate</span>
            <ShieldCheck size={20} color="#222" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#222', fontFamily: 'var(--font-mono)' }}>
            {impactStats.onTimeRate}
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#333', marginTop: '4px' }}>
            Punctual return record
          </div>
        </div>

      </div>

      {/* Leaderboard & Department Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Campus Leaderboard */}
        <div style={{ background: '#fff', border: '3px solid #222', borderRadius: '16px', padding: '20px', boxShadow: '4px 4px 0px #222' }}>
          <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#222', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="#FF6B9D" />
            Top Trusted Peer Sharers
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {leaderboards.map((u, rank) => (
              <div key={u.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: rank === 0 ? '#FFE66D' : rank === 1 ? '#FFF3D6' : '#fff',
                border: '2px solid #222',
                borderRadius: '8px',
                boxShadow: '2px 2px 0px #222'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#222', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>
                    #{rank + 1}
                  </div>
                  <img src={u.avatar} alt={u.name} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #222' }} />
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#222' }}>{u.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#666' }}>{u.department}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2ECC71', fontFamily: 'var(--font-mono)' }}>
                    {u.trustScore}%
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#666', fontWeight: 700 }}>
                    {u.successfulExchanges} exchanges
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Circular Economy Info */}
        <div style={{ background: '#fff', border: '3px solid #222', borderRadius: '16px', padding: '20px', boxShadow: '4px 4px 0px #222' }}>
          <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#222', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={20} color="#4ECDC4" />
            How Circular Economy Helps Campus
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#FFF3D6', padding: '12px', border: '2px solid #222', borderRadius: '8px' }}>
              <div style={{ fontWeight: 800, color: '#222', fontSize: '0.88rem', marginBottom: '2px' }}>
                1. Reduces Student Financial Burden
              </div>
              <div style={{ fontSize: '0.78rem', color: '#444' }}>
                Students save up to 85% by borrowing high-cost gear (cameras, lab sensors, calculators) for exact project durations instead of purchasing outright.
              </div>
            </div>

            <div style={{ background: '#FFF3D6', padding: '12px', border: '2px solid #222', borderRadius: '8px' }}>
              <div style={{ fontWeight: 800, color: '#222', fontSize: '0.88rem', marginBottom: '2px' }}>
                2. Maximizes Equipment Lifecycle
              </div>
              <div style={{ fontSize: '0.78rem', color: '#444' }}>
                Prevents idle resources from sitting unused in hostel rooms, increasing utility rate per device by 4.5x.
              </div>
            </div>

            <div style={{ background: '#FFF3D6', padding: '12px', border: '2px solid #222', borderRadius: '8px' }}>
              <div style={{ fontWeight: 800, color: '#222', fontSize: '0.88rem', marginBottom: '2px' }}>
                3. Builds Transparent Peer Trust
              </div>
              <div style={{ fontSize: '0.78rem', color: '#444' }}>
                Escrow locks, damage checks, and mutual ratings foster a safe campus ecosystem backed by faculty moderation.
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
