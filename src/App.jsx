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
  PackageSearch
} from 'lucide-react';

function CampusApp({ onLogout }) {
  const { 
    items, 
    currentUser, 
    toastMessage 
  } = useCampus();

  const [activeTab, setActiveTab] = useState('browse'); // browse, exchanges, community, impact, admin
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('trust'); // trust, priceAsc, priceDesc, rating

  // Modals state
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

  // Filtering & Sorting Items
  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch && item.isApproved;
  }).sort((a, b) => {
    if (sortBy === 'priceAsc') return a.dailyRate - b.dailyRate;
    if (sortBy === 'priceDesc') return b.dailyRate - a.dailyRate;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.rating || 5) - (a.rating || 5);
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header & Role Switcher */}
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
              {/* Hero AI Discovery Banner */}
              <AiDiscovery 
                items={items}
                onSelectItem={(item) => setSelectedItem(item)}
                onSelectBundle={(bundle) => {
                  if (bundle.items && bundle.items.length > 0) {
                    setSelectedItem(bundle.items[0]);
                  }
                }}
              />

              {/* Filter & Category Controls Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '24px'
              }}>
                
                {/* Category Pills */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        border: selectedCategory === cat ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                        background: selectedCategory === cat ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search & Sort dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="text"
                      className="input-field"
                      placeholder="Filter gear / block..."
                      value={searchFilter}
                      onChange={e => setSearchFilter(e.target.value)}
                      style={{ paddingLeft: '34px', paddingRight: '12px', paddingTop: '6px', paddingBottom: '6px', fontSize: '0.85rem', width: '180px' }}
                    />
                  </div>

                  <select 
                    className="input-field"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    style={{ paddingTop: '6px', paddingBottom: '6px', fontSize: '0.85rem', width: '150px' }}
                  >
                    <option value="trust">Sort: Highest Trust</option>
                    <option value="rating">Sort: Top Rating</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                  </select>
                </div>

              </div>

              {/* Items Grid */}
              {filteredItems.length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '20px'
                }}>
                  {filteredItems.map(item => (
                    <ItemCard 
                      key={item.id} 
                      item={item} 
                      onSelect={(selected) => setSelectedItem(selected)} 
                    />
                  ))}
                </div>
              ) : (
                /* Fallback & Smart Alternative Suggestion */
                <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
                  <PackageSearch size={40} color="var(--accent-cyan)" style={{ margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '6px' }}>
                    No exact items found in this filter
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    Would you like to broadcast a request to the student body or check alternative items?
                  </p>
                  <button 
                    onClick={() => setActiveTab('community')} 
                    className="btn btn-primary btn-sm"
                  >
                    Post Request on Campus Board
                  </button>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: ACTIVE EXCHANGES & 10-STAGE LIFECYCLE TRACKER */}
          {activeTab === 'exchanges' && (
            <LifecycleTracker onOpenRatingModal={(exchange) => setRatingExchange(exchange)} />
          )}

          {/* TAB 3: COMMUNITY BROADCAST BOARD */}
          {activeTab === 'community' && (
            <CommunityRequests />
          )}

          {/* TAB 4: CAMPUS IMPACT DASHBOARD */}
          {activeTab === 'impact' && (
            <ImpactDashboard />
          )}

          {/* TAB 5: ADMIN & MODERATION PANEL */}
          {activeTab === 'admin' && (
            <AdminPanel />
          )}

        </div>
      </main>

      {/* Global Modals */}
      {selectedItem && (
        <ItemDetailModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onBookingSuccess={() => setActiveTab('exchanges')}
        />
      )}

      {showAddModal && (
        <AddResourceModal onClose={() => setShowAddModal(false)} />
      )}

      {ratingExchange && (
        <RatingModal 
          exchange={ratingExchange} 
          onClose={() => setRatingExchange(null)} 
        />
      )}

      {/* Global Floating Toast Notifications */}
      {toastMessage && (
        <div className="toast-container">
          <div className={`toast toast-${toastMessage.type}`}>
            <CheckCircle2 size={18} />
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '24px 0',
        background: 'rgba(9, 13, 22, 0.95)',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div className="container">
          <div style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
            Campus Circular • WebFusion 2.0 Inter-College Competition
          </div>
          <div>
            Built with React, LocalStorage Simulation & AI Need-Based Discovery • Empowering Sustainable Peer Sharing
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

  const handleLogin = (role) => {
    // Switch to the appropriate user based on role
    if (role === 'admin') {
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
