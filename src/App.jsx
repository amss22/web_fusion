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
  Tag,
  Zap,
  X
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
    toastMessage,
    urgentAlerts,
    dismissUrgentAlert
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

      {/* Urgent Alert Banner */}
      {urgentAlerts && urgentAlerts.length > 0 && (
        <div className="container" style={{ paddingTop: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {urgentAlerts.map(alert => (
              <div key={alert.id} className="urgent-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <div style={{
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '8px',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Zap size={20} color="#FFE853" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', marginBottom: '2px' }}>
                      URGENT: {alert.title}
                    </div>
                    <div style={{ fontSize: '0.76rem', opacity: 0.9, fontWeight: 600 }}>
                      {alert.requesterName} needs this by {alert.neededDate} - {alert.category}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => {
                      setActiveTab('community');
                      dismissUrgentAlert(alert.id);
                    }}
                    className="urgent-banner-dismiss"
                    style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid #FFF' }}
                  >
                    View & Help
                  </button>
                  <button
                    onClick={() => dismissUrgentAlert(alert.id)}
                    className="urgent-banner-dismiss"
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

              {/* Neo-Brutalist Search & Sort Bar */}
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
                  <Search size={18} color="#000000" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Search campus resources by name, category, or location..." 
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    style={{ paddingLeft: '46px', background: '#FFFFFF' }}
                  />
                </div>

                {/* Sort selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
                    Sort:
                  </span>
                  <select 
                    className="input-field"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{ width: '190px', padding: '11px 16px', background: '#FFFFFF' }}
                  >
                    <option value="trust">Trust Score</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                  </select>
                </div>

              </div>

              {/* Category Pills Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="btn btn-sm"
                    style={{
                      background: selectedCategory === cat ? 'var(--pop-pink)' : '#FFFFFF',
                      color: '#000000',
                      boxShadow: selectedCategory === cat ? '3.5px 3.5px 0px #000000' : '2px 2px 0px #000000',
                      border: '2.5px solid #000000',
                      transform: selectedCategory === cat ? 'translate(-2px, -2px)' : 'none'
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
                  background: '#FFFFFF',
                  border: '3px solid #000000',
                  borderRadius: '16px',
                  padding: '56px 20px',
                  textAlign: 'center',
                  boxShadow: '6px 6px 0px #000000'
                }}>
                  <PackageSearch size={52} color="#000000" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#000000', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                    No resources found
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#444444', marginBottom: '20px', fontWeight: 600 }}>
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
                background: 'var(--pop-periwinkle)',
                border: '3px solid #000000',
                borderRadius: '16px',
                padding: '30px',
                marginBottom: '32px',
                boxShadow: '6px 6px 0px #000000'
              }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#000000', marginBottom: '6px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                  My Exchanges & Borrowing Status
                </h1>
                <p style={{ fontSize: '0.92rem', color: '#111111', fontWeight: 700 }}>
                  Track your 10-stage exchange status, physical inspection checklists, and escrow refunds.
                </p>
              </div>

              {exchanges.length === 0 ? (
                <div style={{ background: '#FFFFFF', border: '3px solid #000000', borderRadius: '16px', padding: '56px', textAlign: 'center', boxShadow: '6px 6px 0px #000000' }}>
                  <PackageSearch size={48} color="var(--pop-blue)" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#000000', fontFamily: 'var(--font-heading)' }}>No active exchanges</h3>
                  <p style={{ fontSize: '0.9rem', color: '#444444', fontWeight: 600 }}>Browse the campus catalog to borrow gear!</p>
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

      {/* Neo-Brutalist Footer */}
      <footer style={{
        background: '#FFFFFF',
        borderTop: '3px solid #000000',
        padding: '28px 0',
        marginTop: 'auto',
        fontSize: '0.88rem',
        color: '#222222',
        textAlign: 'center',
        fontWeight: 700
      }}>
        <div className="container">
          <div style={{ fontWeight: 900, color: '#000000', marginBottom: '4px', fontSize: '1rem', fontFamily: 'var(--font-heading)' }}>
            Campus Circular
          </div>
          <div style={{ fontSize: '0.82rem', color: '#555555' }}>
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
