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
  PlusCircle, 
  CheckCircle2, 
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
    advanceExchangeStage,
    raiseDispute,
    resolveDispute,
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
      
      {/* Top Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAddModal={() => setShowAddModal(true)} 
        onLogout={onLogout}
      />

      {/* Main Body */}
      <main style={{ flex: 1, padding: '36px 0 60px' }}>
        <div className="container">
          
          {/* TAB 1: BROWSE */}
          {activeTab === 'browse' && (
            <div>
              
              <AiDiscovery 
                items={items}
                onSelectItem={(item) => setSelectedItem(item)}
                onSelectBundle={(bundle) => {
                  if (items.length > 0) setSelectedItem(items[0]);
                }}
              />

              {/* Minimal Search & Sort Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '24px'
              }}>
                
                {/* Search Bar */}
                <div style={{ position: 'relative', flex: '1', minWidth: '280px' }}>
                  <Search size={18} color="#1E1E1E" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Search campus resources..." 
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    style={{ paddingLeft: '44px', background: '#fff', borderRadius: 'var(--radius-full)' }}
                  />
                </div>

                {/* Sort selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E1E1E', textTransform: 'uppercase' }}>
                    Sort:
                  </span>
                  <select 
                    className="input-field"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{ width: '180px', padding: '10px 16px', background: '#fff', borderRadius: 'var(--radius-full)' }}
                  >
                    <option value="trust">Trust Score</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                  </select>
                </div>

              </div>

              {/* Minimal Category Pills Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="btn btn-sm"
                    style={{
                      background: selectedCategory === cat ? 'var(--pop-pink)' : '#fff',
                      color: selectedCategory === cat ? '#fff' : '#1E1E1E',
                      boxShadow: selectedCategory === cat ? '3px 3px 0px #1E1E1E' : 'none',
                      border: '2px solid #1E1E1E'
                    }}
                  >
                    <Tag size={13} />
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              {filteredItems.length === 0 ? (
                <div style={{
                  background: '#fff',
                  border: '2.5px solid #1E1E1E',
                  borderRadius: '24px',
                  padding: '56px 20px',
                  textAlign: 'center',
                  boxShadow: '4px 4px 0px #1E1E1E'
                }}>
                  <PackageSearch size={52} color="var(--pop-pink)" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E1E1E', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                    No resources found
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#666', marginBottom: '20px', fontWeight: 500 }}>
                    Try searching for another keyword or list your own equipment!
                  </p>
                  <button onClick={() => setShowAddModal(true)} className="btn btn-emerald btn-sm">
                    <PlusCircle size={16} /> List Resource Item
                  </button>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '28px'
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

          {/* TAB 2: EXCHANGES */}
          {activeTab === 'exchanges' && (
            <div>
              <div style={{
                background: 'var(--pop-yellow)',
                border: '2.5px solid #1E1E1E',
                borderRadius: '24px',
                padding: '28px',
                marginBottom: '32px',
                boxShadow: '4px 4px 0px #1E1E1E'
              }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E1E1E', marginBottom: '6px', fontFamily: 'var(--font-heading)' }}>
                  My Exchanges & Borrowing Status
                </h1>
                <p style={{ fontSize: '0.88rem', color: '#333', fontWeight: 600 }}>
                  Track your 10-stage exchange status, physical inspection checklists, and escrow refunds.
                </p>
              </div>

              {exchanges.length === 0 ? (
                <div style={{ background: '#fff', border: '2.5px solid #1E1E1E', borderRadius: '24px', padding: '56px', textAlign: 'center', boxShadow: '4px 4px 0px #1E1E1E' }}>
                  <PackageSearch size={48} color="var(--pop-blue)" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E1E1E' }}>No active exchanges</h3>
                  <p style={{ fontSize: '0.88rem', color: '#666', fontWeight: 500 }}>Browse the campus catalog to borrow gear!</p>
                </div>
              ) : (
                exchanges.map((ex) => (
                  <LifecycleTracker 
                    key={ex.id} 
                    exchange={ex} 
                    onRaiseDispute={(exchangeId, reason, amount) => raiseDispute(exchangeId, reason, amount)} 
                    onResolveDispute={(exchangeId, deduction, note) => resolveDispute(exchangeId, deduction, note)} 
                    onOpenRating={(exData) => setRatingExchange(exData)} 
                  />
                ))
              )}
            </div>
          )}

          {/* TAB 3: BROADCAST BOARD */}
          {activeTab === 'community' && <CommunityRequests />}

          {/* TAB 4: IMPACT */}
          {activeTab === 'impact' && <ImpactDashboard />}

          {/* TAB 5: ADMIN */}
          {activeTab === 'admin' && <AdminPanel />}

        </div>
      </main>

      {/* Modals */}
      {selectedItem && (
        <ItemDetailModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onConfirmRequest={handleConfirmBorrow}
        />
      )}

      {showAddModal && (
        <AddResourceModal onClose={() => setShowAddModal(false)} />
      )}

      {ratingExchange && (
        <RatingModal 
          exchange={ratingExchange} 
          onClose={() => setRatingExchange(null)} 
          onSubmitRating={(exchangeId, ratingData) => {
            advanceExchangeStage(exchangeId, {
              ...ratingData,
              timelineNote: `Peer trust rating submitted: ${ratingData.borrowerRating}/5 stars`
            });
            setRatingExchange(null);
          }}
        />
      )}

      {/* Toast Alerts */}
      {toastMessage && (
        <div className="toast-container">
          <div className={`toast toast-${toastMessage.type}`}>
            <CheckCircle2 size={18} />
            {toastMessage.message}
          </div>
        </div>
      )}

      {/* Minimal Footer */}
      <footer style={{
        background: '#FFFFFF',
        borderTop: '2.5px solid #1E1E1E',
        padding: '24px 0',
        marginTop: 'auto',
        fontSize: '0.85rem',
        color: '#555',
        textAlign: 'center',
        fontWeight: 600
      }}>
        <div className="container">
          <div style={{ fontWeight: 800, color: '#1E1E1E', marginBottom: '4px' }}>
            Campus Circular • Minimal Modern & Cartoonish UI
          </div>
          <div style={{ fontSize: '0.78rem', color: '#777' }}>
            Built with React, Express REST API, SQLite & AI Need-Based Discovery
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
