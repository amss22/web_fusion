import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  ShieldCheck, 
  AlertTriangle, 
  UserX, 
  UserCheck, 
  Sliders, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Search,
  Lock,
  RefreshCw,
  Scale
} from 'lucide-react';

export default function AdminPanel() {
  const { 
    users, 
    items, 
    exchanges, 
    platformConfig, 
    updatePlatformConfig, 
    setItemApproval, 
    toggleUserSuspension, 
    resolveDispute,
    purgeAndResetDatabase
  } = useCampus();

  const [feePercent, setFeePercent] = useState(platformConfig.platformFeePercent || 5);
  const [lateFee, setLateFee] = useState(platformConfig.lateFeePerHour || 25);
  const [searchUser, setSearchUser] = useState('');

  const disputes = exchanges.filter(ex => ex.disputeRaised);
  const pendingApprovals = items.filter(i => !i.isApproved);
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchUser.toLowerCase()) || u.department.toLowerCase().includes(searchUser.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: '#FF6B9D',
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
            <ShieldCheck size={28} color="#222" />
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#222' }}>
              Campus Administration & Governance Panel
            </h1>
          </div>
          <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#222' }}>
            Arbitrate peer disputes, moderate resource listings, manage user trust scores, and configure platform economics.
          </p>
        </div>

        <button onClick={purgeAndResetDatabase} className="btn btn-secondary btn-sm" style={{ background: '#fff' }}>
          <RefreshCw size={14} /> Wipe & Reset DB
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Platform Economics Config */}
        <div style={{ background: '#fff', border: '3px solid #222', borderRadius: '16px', padding: '20px', boxShadow: '4px 4px 0px #222' }}>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#222', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={18} color="#4ECDC4" />
            Platform Economics Configuration
          </div>

          <div style={{ marginBottom: '16px', background: '#FFF3D6', padding: '14px', borderRadius: '8px', border: '2px solid #222' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#222', display: 'block', marginBottom: '6px' }}>
              Platform Service Fee: <strong style={{ color: '#FF6B9D', fontFamily: 'var(--font-mono)' }}>{feePercent}%</strong>
            </label>
            <input 
              type="range" 
              min="0" 
              max="15" 
              value={feePercent} 
              onChange={(e) => setFeePercent(Number(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          <div style={{ marginBottom: '16px', background: '#FFF3D6', padding: '14px', borderRadius: '8px', border: '2px solid #222' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#222', display: 'block', marginBottom: '6px' }}>
              Overdue Late Fee (₹/hour): <strong style={{ color: '#FF6B9D', fontFamily: 'var(--font-mono)' }}>₹{lateFee}/hr</strong>
            </label>
            <input 
              type="range" 
              min="5" 
              max="100" 
              step="5"
              value={lateFee} 
              onChange={(e) => setLateFee(Number(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          <button 
            onClick={() => updatePlatformConfig({ platformFeePercent: feePercent, lateFeePerHour: lateFee })}
            className="btn btn-emerald btn-sm" 
            style={{ width: '100%' }}
          >
            Save Economic Settings
          </button>
        </div>

        {/* Dispute Arbitration Queue */}
        <div style={{ background: '#fff', border: '3px solid #222', borderRadius: '16px', padding: '20px', boxShadow: '4px 4px 0px #222' }}>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#222', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Scale size={18} color="#FF6B9D" />
            Dispute Arbitration Queue ({disputes.length})
          </div>

          {disputes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#888', fontWeight: 600, fontSize: '0.85rem' }}>
              No active disputes! Campus community is operating smoothly.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {disputes.map(ex => (
                <div key={ex.id} style={{ background: '#FFE66D', border: '2px solid #222', borderRadius: '8px', padding: '12px', boxShadow: '2px 2px 0px #222' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#222' }}>{ex.itemTitle}</div>
                  <div style={{ fontSize: '0.74rem', color: '#444', marginBottom: '6px' }}>
                    Reason: {ex.damageDescription} | Security Deposit: ₹{ex.securityDeposit}
                  </div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: ex.disputeStatus === 'Resolved' ? '#2ECC71' : '#FF6B6B' }}>
                    Status: {ex.disputeStatus}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* User Moderation Table */}
      <div style={{ background: '#fff', border: '3px solid #222', borderRadius: '16px', padding: '20px', boxShadow: '4px 4px 0px #222' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#222' }}>
            Campus User Profiles & Moderation ({users.length})
          </div>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search student by name..." 
            value={searchUser} 
            onChange={(e) => setSearchUser(e.target.value)}
            style={{ width: '220px', padding: '6px 12px', fontSize: '0.8rem' }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#FFF3D6', borderBottom: '2px solid #222' }}>
                <th style={{ padding: '10px' }}>User</th>
                <th style={{ padding: '10px' }}>Role</th>
                <th style={{ padding: '10px' }}>Trust Score</th>
                <th style={{ padding: '10px' }}>Exchanges</th>
                <th style={{ padding: '10px' }}>Status</th>
                <th style={{ padding: '10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={u.avatar} alt={u.name} style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1px solid #222' }} />
                    <div>
                      <div style={{ fontWeight: 800, color: '#222' }}>{u.name}</div>
                      <div style={{ fontSize: '0.68rem', color: '#666' }}>{u.department}</div>
                    </div>
                  </td>
                  <td style={{ padding: '10px', fontWeight: 700 }}>{u.role === 'admin' ? 'Admin' : 'Student'}</td>
                  <td style={{ padding: '10px', fontWeight: 800, color: '#2ECC71', fontFamily: 'var(--font-mono)' }}>{u.trustScore}%</td>
                  <td style={{ padding: '10px', fontWeight: 700 }}>{u.successfulExchanges}</td>
                  <td style={{ padding: '10px' }}>
                    <span className={`badge ${u.isSuspended ? 'badge-rose' : 'badge-emerald'}`}>
                      {u.isSuspended ? 'Suspended' : 'Active'}
                    </span>
                  </td>
                  <td style={{ padding: '10px' }}>
                    <button 
                      onClick={() => toggleUserSuspension(u.id)}
                      className={`btn btn-sm ${u.isSuspended ? 'btn-emerald' : 'btn-danger'}`}
                      style={{ fontSize: '0.7rem', padding: '3px 8px' }}
                    >
                      {u.isSuspended ? 'Unsuspend' : 'Suspend'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
