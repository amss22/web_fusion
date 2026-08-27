import React, { useState } from 'react';
import { useCampus, CampusProvider } from './context/CampusContext';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import AiDiscovery from './components/AiDiscovery';
import ItemCard from './components/ItemCard';
import ItemDetailModal from './components/ItemDetailModal';
import LifecycleTracker from './components/LifecycleTracker';
import ImpactDashboard from './components/ImpactDashboard';
import CommunityRequests from './components/CommunityRequests';
import AdminPanel from './components/AdminPanel';
import AddResourceModal from './components/AddResourceModal';
import RatingModal from './components/RatingModal';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Sparkles, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  PackageSearch,
  Tag
} from 'lucide-react';

function CampusApp({ onLogout }) {
  const { 
    items, 
    currentUser, 
    users,
    exchanges,
    createExchangeRequest,
    toastMessage 
  } = useCampus();

  const [activeTab, setActiveTab] = useState('browse');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('trust');

  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [ratingExchange, setRatingExchange] = useState(null);

  const categories = [
    'All',
    'Cameras & Audio',
    'Academic & Calculators',
    'Tech & Electronics',
    'Sports & Fitness',
    'Event & Decor'
  ];

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch && item.isApproved;
  }).sort((a, b) => {
    if (sortBy === 'priceAsc') return a.dailyRate - b.dailyRate;
    if (sortBy === 'priceDesc') return b.dailyRate - a.dailyRate;
    return b.rating - a.rating;
  });

  const getItemOwner = (ownerId) => {
    return users.find(u => u.id === ownerId) || { name: "Campus Member", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", trustScore: 95 };
  };

  const handleConfirmBorrow = async (requestData) => {
    await createExchangeRequest(requestData);
    setSelectedItem(null);
    setActiveTab('exchanges');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      
      {/* Retro Top Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAddModal={() => setShowAddModal(true)} 
        onLogout={onLogout}
      />

      {/* Main App Content Body */}
      <main style={{ flex: 1, padding: '32px 0 60px' }}>
        <div className="container">
          
          {/* TAB 1: BROWSE & AI DISCOVERY */}
          {activeTab === 'browse' && (
            <div>
              
              {/* AI Discovery Header Box */}
              <AiDiscovery 
                items={items}
                onSelectItem={(item) => setSelectedItem(item)}
                onSelectBundle={(bundle) => {
                  if (items.length > 0) setSelectedItem(items[0]);
                }}
              />

              {/* Catalog Controls Header */}
              <div style={{
                background: '#fff',
                border: '3px solid #222',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                boxShadow: '4px 4px 0px #222',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                
                {/* Search input */}
                <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
                  <Search size={18} color="#222" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Search gear, calculators, location..." 
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    style={{ paddingLeft: '40px', background: '#fff' }}
                  />
                </div>

                {/* Sort Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#222', textTransform: 'uppercase' }}>
                    Sort By:
                  </label>
                  <select 
                    className="input-field"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{ width: '180px', padding: '10px 14px', background: '#fff' }}
                  >
                    <option value="trust">⭐ Trust Rating</option>
                    <option value="priceAsc">💰 Price: Low to High</option>
                    <option value="priceDesc">💎 Price: High to Low</option>
                  </select>
                </div>

              </div>

              {/* Category Pills Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="btn btn-sm"
                    style={{
                      background: selectedCategory === cat ? '#FF6B9D' : '#fff',
                      color: selectedCategory === cat ? '#fff' : '#222',
                      border: '3px solid #222',
                      boxShadow: selectedCategory === cat ? '3px 3px 0px #222' : '2px 2px 0px #222',
                      transform: selectedCategory === cat ? 'translate(-2px, -2px)' : 'none'
                    }}
                  >
                    <Tag size={13} />
                    {cat}
                  </button>
                ))}
              </div>

              {/* Items Grid */}
              {filteredItems.length === 0 ? (
                <div style={{
                  background: '#fff',
                  border: '3px solid #222',
                  borderRadius: '16px',
                  padding: '48px 20px',
                  textAlign: 'center',
                  boxShadow: '6px 6px 0px #222'
                }}>
                  <PackageSearch size={48} color="#FF6B9D" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#222', marginBottom: '6px' }}>
                    No items match your filter
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#666', marginBottom: '16px' }}>
                    Try searching for another resource or click "+ List Item" to share your own equipment!
                  </p>
                  <button onClick={() => setShowAddModal(true)} className="btn btn-emerald btn-sm">
                    <PlusCircle size={16} /> List Resource Item
                  </button>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '24px'
                }}>
                  {filteredItems.map((item) => (
                    <ItemCard 
                      key={item.id} 
                      item={item} 
                      owner={getItemOwner(item.ownerId)} 
                      onSelectItem={(i) => setSelectedItem(i)}
                    />
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 2: ACTIVE & COMPLETED EXCHANGES */}
          {activeTab === 'exchanges' && (
            <div>
              <div style={{
                background: '#FFE66D',
                border: '3px solid #222',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
                boxShadow: '6px 6px 0px #222'
              }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#222', marginBottom: '4px' }}>
                  My Active & Past Resource Exchanges 🔄
                </h1>
                <p style={{ fontSize: '0.86rem', color: '#333', fontWeight: 600 }}>
                  Track 10-stage borrowing status, handover checklists, return due timers, and dispute logs.
                </p>
              </div>

              {exchanges.length === 0 ? (
                <div style={{ background: '#fff', border: '3px solid #222', borderRadius: '16px', padding: '48px', textAlign: 'center', boxShadow: '6px 6px 0px #222' }}>
                  <HelpCircle size={48} color="#4ECDC4" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#222' }}>No active exchanges yet</h3>
                  <p style={{ fontSize: '0.86rem', color: '#666' }}>Browse campus listings to borrow gear!</p>
                </div>
              ) : (
                exchanges.map((ex) => (
                  <LifecycleTracker 
                    key={ex.id} 
                    exchange={ex} 
                    onRaiseDispute={() => {}} 
                    onResolveDispute={() => {}} 
                    onOpenRating={(exData) => setRatingExchange(exData)} 
                  />
                ))
              )}
            </div>
          )}

          {/* TAB 3: BROADCAST BOARD */}
          {activeTab === 'community' && <CommunityRequests />}

          {/* TAB 4: IMPACT DASHBOARD */}
          {activeTab === 'impact' && <ImpactDashboard />}

          {/* TAB 5: ADMIN PANEL */}
          {activeTab === 'admin' && <AdminPanel />}

        </div>
      </main>

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemDetailModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onConfirmRequest={handleConfirmBorrow}
        />
      )}

      {/* Add Resource Modal */}
      {showAddModal && (
        <AddResourceModal onClose={() => setShowAddModal(false)} />
      )}

      {/* Rating Modal */}
      {ratingExchange && (
        <RatingModal 
          exchange={ratingExchange} 
          onClose={() => setRatingExchange(null)} 
          onSubmitRating={() => setRatingExchange(null)}
        />
      )}

      {/* Global Toast Alerts */}
      {toastMessage && (
        <div className="toast-container">
          <div className={`toast toast-${toastMessage.type}`}>
            <CheckCircle2 size={18} />
            {toastMessage.message}
          </div>
        </div>
      )}

      {/* Retro Footer */}
      <footer style={{
        background: '#FFF8E7',
        borderTop: '3px solid #222',
        padding: '24px 0',
        marginTop: 'auto',
        fontSize: '0.82rem',
        color: '#555',
        textAlign: 'center',
        fontWeight: 600
      }}>
        <div className="container">
          <div style={{ fontWeight: 800, color: '#222', marginBottom: '4px' }}>
            Campus Circular • 90s Retro & Neo-Brutalist Interface
          </div>
          <div>
            Built with React, Express REST API, SQLite Local Database & AI Need-Based Discovery
          </div>
        </div>
      </footer>

    </div>
  );
}

function AppWithAuth() {
  const { switchUser } = useCampus();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('cc_logged_in') === 'true';
  });

  const handleLogin = (role, userId) => {
    if (userId) {
      switchUser(userId);
    } else if (role === 'admin') {
      switchUser('admin1');
    } else {
      switchUser('u1');
    }
    localStorage.setItem('cc_logged_in', 'true');
    localStorage.setItem('cc_login_role', role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('cc_logged_in');
    localStorage.removeItem('cc_login_role');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <CampusApp onLogout={handleLogout} />;
}

export default function App() {
  return (
    <CampusProvider>
      <AppWithAuth />
    </CampusProvider>
  );
}
