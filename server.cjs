const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'campus_circular.db');
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err);
  } else {
    console.log('Connected to local SQLite database:', DB_PATH);
  }
});

// Full Initial Users
const INITIAL_USERS = [
  {
    id: "u1",
    email: "rahul.sharma@tsec.edu",
    password: "campus2026",
    name: "Rahul Sharma",
    role: "student",
    department: "Mechanical Engineering",
    year: "3rd Year (Semester 5)",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
    verified: 1,
    trustScore: 94,
    rating: 4.8,
    successfulExchanges: 18,
    lateReturns: 1,
    disputes: 0,
    moneySaved: "₹14,200",
    walletBalance: 2500,
    room: "Hostel 3, Room 204",
    phone: "+91 98765 43210",
    isSuspended: 0
  },
  {
    id: "u2",
    email: "priya.nair@tsec.edu",
    password: "campus2026",
    name: "Priya Nair",
    role: "student",
    department: "Computer Science & Engg",
    year: "Final Year (Semester 7)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    verified: 1,
    trustScore: 98,
    rating: 4.95,
    successfulExchanges: 42,
    lateReturns: 0,
    disputes: 0,
    moneySaved: "₹38,900",
    walletBalance: 6800,
    room: "Hostel 1, Room 112",
    phone: "+91 98111 22334",
    isSuspended: 0
  },
  {
    id: "u3",
    email: "rohan.mehta@tsec.edu",
    password: "campus2026",
    name: "Rohan Mehta",
    role: "student",
    department: "Electronics & Telecom",
    year: "2nd Year (Semester 3)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    verified: 1,
    trustScore: 89,
    rating: 4.6,
    successfulExchanges: 9,
    lateReturns: 1,
    disputes: 1,
    moneySaved: "₹6,500",
    walletBalance: 1200,
    room: "Day Scholar (Andheri West)",
    phone: "+91 97654 32198",
    isSuspended: 0
  },
  {
    id: "admin1",
    email: "admin@tsec.edu",
    password: "admin2026",
    name: "Dr. V. Sharma (Moderator)",
    role: "admin",
    department: "Student Affairs & Innovation Cell",
    year: "Faculty In-Charge",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    verified: 1,
    trustScore: 100,
    rating: 5.0,
    successfulExchanges: 1540,
    lateReturns: 0,
    disputes: 0,
    moneySaved: "₹3,48,500",
    walletBalance: 50000,
    room: "Admin Block, Room 102",
    phone: "+91 90000 00000",
    isSuspended: 0
  }
];

const INITIAL_ITEMS = [
  {
    id: "item-1",
    title: "Sony Alpha A7 III 4K Mirrorless Camera",
    category: "Cameras & Audio",
    ownerId: "u2",
    hourlyRate: 150,
    dailyRate: 650,
    deposit: 3000,
    condition: "Like New",
    status: "Available",
    isApproved: 1,
    location: "Block A - Media & Coding Lab",
    distance: "120m away",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    description: "Professional full-frame mirrorless camera for 4K video recording, reels, short films, and campus event coverage. Includes 28-70mm lens, 2x batteries, and 64GB high-speed SD card.",
    includedAccessories: JSON.stringify(["28-70mm f/3.5-5.6 Lens", "2x 2280mAh Batteries", "Dual Slot USB Charger", "64GB Sandisk Extreme Pro SD", "Padded Carry Bag"]),
    borrowingRules: "Handle with neck strap at all times. Do not touch sensor glass. Return with 100% charged battery.",
    checklistItems: JSON.stringify([
      { name: "Camera body free of drops or deep scratches", defaultChecked: true },
      { name: "Lens glass clean & free of fungus/scratches", defaultChecked: true },
      { name: "Sensor clean & functional shutter", defaultChecked: true }
    ]),
    usageCount: 28,
    rating: 4.9,
    reviews: 19
  },
  {
    id: "item-2",
    title: "Heavy Duty Fluid Head Aluminum Video Tripod",
    category: "Cameras & Audio",
    ownerId: "u2",
    hourlyRate: 40,
    dailyRate: 180,
    deposit: 800,
    condition: "Excellent",
    status: "Available",
    isApproved: 1,
    location: "Block A - Media & Coding Lab",
    distance: "120m away",
    image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=80",
    description: "Stable fluid-head video tripod with smooth 360-degree pan & tilt. Quick release plate included. Extends up to 180cm height.",
    includedAccessories: JSON.stringify(["Quick Release Plate", "Carrying Bag with Strap", "Hex Key Tool"]),
    borrowingRules: "Tighten locks before mounting heavy gear. Do not force pan handle.",
    checklistItems: JSON.stringify([
      { name: "Fluid head smooth pan & tilt motion", defaultChecked: true },
      { name: "All 3 leg lock clips firmly grip", defaultChecked: true }
    ]),
    usageCount: 16,
    rating: 4.8,
    reviews: 12
  },
  {
    id: "item-5",
    title: "Casio FX-991CW Advanced Scientific Calculator",
    category: "Academic & Calculators",
    ownerId: "u1",
    hourlyRate: 15,
    dailyRate: 60,
    deposit: 500,
    condition: "Like New",
    status: "Available",
    isApproved: 1,
    location: "Block C - Mech Dept",
    distance: "50m away",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80",
    description: "Latest ClassWiz scientific calculator with 540+ functions, matrix operations, quadratic equation solver, and high-res natural textbook display. Allowed in university exams.",
    includedAccessories: JSON.stringify(["Hard Slide-on Case", "Quick Reference Card"]),
    borrowingRules: "Do not write with pen/markers on case. Return with battery working.",
    checklistItems: JSON.stringify([
      { name: "LCD screen display crisp without missing pixels", defaultChecked: true },
      { name: "All numeric & scientific keys respond freely", defaultChecked: true }
    ]),
    usageCount: 45,
    rating: 5.0,
    reviews: 32
  }
];

// Initialize SQLite Tables
function initDb() {
  db.serialize(() => {
    // Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE,
      password TEXT,
      name TEXT,
      role TEXT,
      department TEXT,
      year TEXT,
      avatar TEXT,
      verified INTEGER,
      trustScore INTEGER,
      rating REAL,
      successfulExchanges INTEGER,
      lateReturns INTEGER,
      disputes INTEGER,
      moneySaved TEXT,
      walletBalance REAL,
      room TEXT,
      phone TEXT,
      isSuspended INTEGER DEFAULT 0
    )`);

    // Items Table
    db.run(`CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      title TEXT,
      category TEXT,
      ownerId TEXT,
      hourlyRate REAL,
      dailyRate REAL,
      deposit REAL,
      condition TEXT,
      status TEXT,
      isApproved INTEGER,
      location TEXT,
      distance TEXT,
      image TEXT,
      description TEXT,
      includedAccessories TEXT,
      borrowingRules TEXT,
      checklistItems TEXT,
      usageCount INTEGER,
      rating REAL,
      reviews INTEGER
    )`);

    // Exchanges Table
    db.run(`CREATE TABLE IF NOT EXISTS exchanges (
      id TEXT PRIMARY KEY,
      itemId TEXT,
      itemTitle TEXT,
      itemImage TEXT,
      lenderId TEXT,
      lenderName TEXT,
      lenderAvatar TEXT,
      borrowerId TEXT,
      borrowerName TEXT,
      borrowerAvatar TEXT,
      status TEXT,
      stageIndex INTEGER,
      durationType TEXT,
      durationValue INTEGER,
      borrowingCharge REAL,
      platformFeeRate REAL,
      platformFee REAL,
      securityDeposit REAL,
      totalEscrowAmount REAL,
      startDate TEXT,
      returnDeadline TEXT,
      actualReturnDate TEXT,
      pickupLocation TEXT,
      purpose TEXT,
      preBorrowPhotos TEXT,
      postReturnPhotos TEXT,
      preChecklistVerified INTEGER,
      postChecklistVerified INTEGER,
      lateHours INTEGER,
      lateFee REAL,
      damageReported INTEGER,
      damageDescription TEXT,
      damageDeduction REAL,
      damagePhotos TEXT,
      disputeRaised INTEGER,
      disputeStatus TEXT,
      disputeResolutionNote TEXT,
      refundToBorrower REAL,
      payoutToLender REAL,
      settlementCompleted INTEGER,
      borrowerRating INTEGER,
      borrowerFeedback TEXT,
      lenderRating INTEGER,
      lenderFeedback TEXT,
      timeline TEXT
    )`);

    // Community Requests Table
    db.run(`CREATE TABLE IF NOT EXISTS community_requests (
      id TEXT PRIMARY KEY,
      title TEXT,
      category TEXT,
      requesterId TEXT,
      requesterName TEXT,
      requesterAvatar TEXT,
      department TEXT,
      neededDate TEXT,
      budget TEXT,
      description TEXT,
      responses INTEGER,
      fulfilled INTEGER
    )`);

    // Platform Config Table
    db.run(`CREATE TABLE IF NOT EXISTS platform_config (
      id INTEGER PRIMARY KEY,
      platformFeePercent REAL,
      minPlatformFee REAL,
      lateFeePerHour REAL,
      maxLateFeePerDay REAL,
      disputeGracePeriodHours INTEGER,
      allowPeerChat INTEGER,
      autoApproveVerifiedListings INTEGER
    )`);

    // Seed default users if empty
    db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
      if (row && row.count === 0) {
        console.log('Seeding initial SQLite database records...');
        const stmtUser = db.prepare(`INSERT INTO users VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
        INITIAL_USERS.forEach(u => {
          stmtUser.run(u.id, u.email, u.password, u.name, u.role, u.department, u.year, u.avatar, u.verified, u.trustScore, u.rating, u.successfulExchanges, u.lateReturns, u.disputes, u.moneySaved, u.walletBalance, u.room, u.phone, u.isSuspended);
        });
        stmtUser.finalize();

        const stmtItem = db.prepare(`INSERT INTO items VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
        INITIAL_ITEMS.forEach(i => {
          stmtItem.run(i.id, i.title, i.category, i.ownerId, i.hourlyRate, i.dailyRate, i.deposit, i.condition, i.status, i.isApproved, i.location, i.distance, i.image, i.description, i.includedAccessories, i.borrowingRules, i.checklistItems, i.usageCount, i.rating, i.reviews);
        });
        stmtItem.finalize();

        db.run(`INSERT OR IGNORE INTO platform_config VALUES (1, 5, 10, 25, 200, 24, 1, 0)`);
      }
    });

  });
}

initDb();

// REST API ENDPOINTS

// 1. AUTHENTICATION & REGISTER
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  db.get('SELECT * FROM users WHERE LOWER(email) = LOWER(?) AND role = ?', [email, role], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'User profile not found for this email/role' });
    
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.json({ message: 'Authentication successful', user });
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role, department, year } = req.body;
  const id = `usr-${Date.now()}`;
  const avatar = role === 'admin' 
    ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

  const stmt = db.prepare(`INSERT INTO users VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
  stmt.run(
    id, email, password, name, role, 
    department || (role === 'admin' ? 'Campus Administration' : 'General Department'), 
    year || (role === 'admin' ? 'Faculty Moderator' : '1st Year'), 
    avatar, 1, 100, 5.0, 0, 0, 0, "₹0", 2000, "Campus", "+91 99999 99999", 0,
    (err) => {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ error: 'An account with this email already exists.' });
        }
        return res.status(500).json({ error: err.message });
      }
      db.get('SELECT * FROM users WHERE id = ?', [id], (err2, newUser) => {
        res.json({ message: 'Profile created successfully', user: newUser });
      });
    }
  );
  stmt.finalize();
});

// 2. USERS MANAGEMENT
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(u => ({ ...u, verified: Boolean(u.verified), isSuspended: Boolean(u.isSuspended) })));
  });
});

app.put('/api/users/:id/suspend', (req, res) => {
  const { id } = req.params;
  db.get('SELECT isSuspended FROM users WHERE id = ?', [id], (err, row) => {
    if (!row) return res.status(404).json({ error: 'User not found' });
    const newStatus = row.isSuspended ? 0 : 1;
    db.run('UPDATE users SET isSuspended = ? WHERE id = ?', [newStatus, id], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ success: true, isSuspended: Boolean(newStatus) });
    });
  });
});

// 3. ITEMS CATALOG
app.get('/api/items', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const parsed = rows.map(item => ({
      ...item,
      isApproved: Boolean(item.isApproved),
      includedAccessories: JSON.parse(item.includedAccessories || '[]'),
      checklistItems: JSON.parse(item.checklistItems || '[]')
    }));
    res.json(parsed);
  });
});

app.post('/api/items', (req, res) => {
  const item = req.body;
  const id = `item-${Date.now()}`;
  const stmt = db.prepare(`INSERT INTO items VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
  stmt.run(
    id,
    item.title,
    item.category,
    item.ownerId,
    item.hourlyRate,
    item.dailyRate,
    item.deposit,
    item.condition,
    item.status || 'Available',
    1,
    item.location,
    item.distance || 'Within Campus',
    item.image,
    item.description,
    JSON.stringify(item.includedAccessories || []),
    item.borrowingRules,
    JSON.stringify(item.checklistItems || []),
    0,
    5.0,
    0,
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, ...item, isApproved: true });
    }
  );
  stmt.finalize();
});

// 4. EXCHANGES (10-Stage Lifecycle)
app.get('/api/exchanges', (req, res) => {
  db.all('SELECT * FROM exchanges', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const parsed = rows.map(ex => ({
      ...ex,
      preBorrowPhotos: JSON.parse(ex.preBorrowPhotos || '[]'),
      postReturnPhotos: JSON.parse(ex.postReturnPhotos || '[]'),
      damagePhotos: JSON.parse(ex.damagePhotos || '[]'),
      timeline: JSON.parse(ex.timeline || '[]'),
      preChecklistVerified: Boolean(ex.preChecklistVerified),
      postChecklistVerified: Boolean(ex.postChecklistVerified),
      damageReported: Boolean(ex.damageReported),
      disputeRaised: Boolean(ex.disputeRaised),
      settlementCompleted: Boolean(ex.settlementCompleted)
    }));
    res.json(parsed);
  });
});

app.post('/api/exchanges', (req, res) => {
  const ex = req.body;
  const stmt = db.prepare(`INSERT INTO exchanges VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
  stmt.run(
    ex.id, ex.itemId, ex.itemTitle, ex.itemImage, ex.lenderId, ex.lenderName, ex.lenderAvatar,
    ex.borrowerId, ex.borrowerName, ex.borrowerAvatar, ex.status, ex.stageIndex,
    ex.durationType, ex.durationValue, ex.borrowingCharge, ex.platformFeeRate,
    ex.platformFee, ex.securityDeposit, ex.totalEscrowAmount, ex.startDate,
    ex.returnDeadline, ex.actualReturnDate, ex.pickupLocation, ex.purpose,
    JSON.stringify(ex.preBorrowPhotos || []), JSON.stringify(ex.postReturnPhotos || []),
    ex.preChecklistVerified ? 1 : 0, ex.postChecklistVerified ? 1 : 0,
    ex.lateHours || 0, ex.lateFee || 0, ex.damageReported ? 1 : 0,
    ex.damageDescription || '', ex.damageDeduction || 0,
    JSON.stringify(ex.damagePhotos || []), ex.disputeRaised ? 1 : 0,
    ex.disputeStatus || 'None', ex.disputeResolutionNote || '',
    ex.refundToBorrower, ex.payoutToLender, ex.settlementCompleted ? 1 : 0,
    ex.borrowerRating || null, ex.borrowerFeedback || '',
    ex.lenderRating || null, ex.lenderFeedback || '',
    JSON.stringify(ex.timeline || []),
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(ex);
    }
  );
  stmt.finalize();
});

// 5. COMMUNITY REQUESTS
app.get('/api/community-requests', (req, res) => {
  db.all('SELECT * FROM community_requests', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(r => ({ ...r, fulfilled: Boolean(r.fulfilled) })));
  });
});

app.post('/api/community-requests', (req, res) => {
  const r = req.body;
  const id = `req-${Date.now()}`;
  db.run(`INSERT INTO community_requests VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [id, r.title, r.category, r.requesterId, r.requesterName, r.requesterAvatar, r.department, r.neededDate, r.budget, r.description, 0, 0],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, ...r, responses: 0, fulfilled: false });
    }
  );
});

// 6. PLATFORM CONFIG
app.get('/api/config', (req, res) => {
  db.get('SELECT * FROM platform_config WHERE id = 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || { platformFeePercent: 5, lateFeePerHour: 25 });
  });
});

// 7. RE-SEED DATABASE
app.post('/api/reseed-db', (req, res) => {
  db.serialize(() => {
    db.run('DELETE FROM items');
    db.run('DELETE FROM exchanges');
    db.run('DELETE FROM community_requests');
    db.run('DELETE FROM users');
    initDb();
    res.json({ message: 'Database re-seeded with initial campus data.' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Campus Circular Backend API Server listening on http://localhost:${PORT}`);
});
