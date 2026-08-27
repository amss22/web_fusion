import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_USERS, 
  INITIAL_ITEMS, 
  INITIAL_EXCHANGES, 
  INITIAL_COMMUNITY_REQUESTS, 
  INITIAL_PLATFORM_CONFIG 
} from '../data/initialData';

const CampusContext = createContext();

const API_BASE = 'http://localhost:5000/api';

export const LIFECYCLE_STAGES = [
  { key: "Available", label: "Available", desc: "Listed on platform & ready to borrow", role: "Public" },
  { key: "Requested", label: "Requested", desc: "Borrower submitted request with escrow", role: "Borrower" },
  { key: "Accepted", label: "Accepted", desc: "Lender approved request & meetup set", role: "Lender" },
  { key: "Handover", label: "Handover", desc: "Pre-inspection photos & checklist verified", role: "Both" },
  { key: "Borrowed", label: "Borrowed", desc: "Resource actively in borrower's custody", role: "Borrower" },
  { key: "Return Due", label: "Return Due", desc: "Deadline approaching or overdue timer running", role: "System" },
  { key: "Returned", label: "Returned", desc: "Item physically handed back to lender", role: "Both" },
  { key: "Inspection", label: "Inspection", desc: "Post-use condition compared with baseline", role: "Lender" },
  { key: "Settlement", label: "Settlement", desc: "Late fees/damages deducted, deposit refunded", role: "System/Admin" },
  { key: "Rated", label: "Rated", desc: "Mutual trust ratings updated & exchange closed", role: "Both" }
];

export function CampusProvider({ children }) {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentUserId, setCurrentUserId] = useState('u1');
  const [items, setItems] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [communityRequests, setCommunityRequests] = useState([]);
  const [platformConfig, setPlatformConfig] = useState(INITIAL_PLATFORM_CONFIG);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync with SQLite backend database
  useEffect(() => {
    async function loadBackendData() {
      try {
        const resUsers = await fetch(`${API_BASE}/users`);
        if (resUsers.ok) setUsers(await resUsers.json());

        const resItems = await fetch(`${API_BASE}/items`);
        if (resItems.ok) setItems(await resItems.json());

        const resExchanges = await fetch(`${API_BASE}/exchanges`);
        if (resExchanges.ok) setExchanges(await resExchanges.json());

        const resReqs = await fetch(`${API_BASE}/community-requests`);
        if (resReqs.ok) setCommunityRequests(await resReqs.json());

        const resConfig = await fetch(`${API_BASE}/config`);
        if (resConfig.ok) setPlatformConfig(await resConfig.json());
      } catch (err) {
        console.warn('SQLite backend server offline. Using local state.', err);
      }
    }

    loadBackendData();
  }, []);

  const currentUser = users.find(u => u.id === currentUserId) || users[0] || INITIAL_USERS[0];

  const showToast = (message, type = "success") => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const switchUser = (userId) => {
    setCurrentUserId(userId);
    const u = users.find(x => x.id === userId);
    showToast(`Switched profile to ${u?.name || 'User'}`, 'info');
  };

  // Register New Custom Profile
  const registerUser = async ({ name, email, password, role, department, year }) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, department, year })
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(prev => [...prev, data.user]);
        setCurrentUserId(data.user.id);
        showToast(`Profile "${name}" registered successfully!`, 'success');
        return data.user;
      } else {
        const err = await res.json();
        showToast(err.error || 'Failed to create profile', 'warning');
        return null;
      }
    } catch (e) {
      console.error(e);
      // Local fallback
      const newUser = {
        id: `u-${Date.now()}`,
        name,
        email,
        password,
        role,
        department: department || 'General',
        year: year || '1st Year',
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        verified: true,
        trustScore: 100,
        rating: 5.0,
        successfulExchanges: 0,
        lateReturns: 0,
        disputes: 0,
        moneySaved: "₹0",
        walletBalance: 2000
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUserId(newUser.id);
      showToast(`Profile "${name}" created locally!`, 'success');
      return newUser;
    }
  };

  // Add Resource Item
  const addResource = async (itemData) => {
    const newItem = {
      title: itemData.title,
      category: itemData.category,
      ownerId: currentUser.id,
      hourlyRate: itemData.hourlyRate,
      dailyRate: itemData.dailyRate,
      deposit: itemData.deposit,
      condition: itemData.condition,
      status: "Available",
      isApproved: true,
      location: itemData.location,
      distance: "Within Campus (100m)",
      image: itemData.image,
      description: itemData.description,
      includedAccessories: itemData.includedAccessories,
      borrowingRules: itemData.borrowingRules,
      checklistItems: itemData.checklistItems
    };

    try {
      const res = await fetch(`${API_BASE}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      if (res.ok) {
        const created = await res.json();
        setItems(prev => [created, ...prev]);
        showToast(`"${created.title}" saved to SQLite database!`);
        return created;
      }
    } catch (e) {
      console.error('Error posting item to SQLite:', e);
    }

    const fallback = { ...newItem, id: `item-${Date.now()}`, usageCount: 0, rating: 5.0, reviews: 0 };
    setItems(prev => [fallback, ...prev]);
    showToast(`"${fallback.title}" listed successfully!`);
    return fallback;
  };

  // Create Exchange Request
  const createExchangeRequest = async ({ item, durationType, durationValue, pickupLocation, purpose }) => {
    const rate = durationType === 'Hourly' ? item.hourlyRate : item.dailyRate;
    const borrowingCharge = rate * durationValue;
    const platformFee = Math.round(borrowingCharge * (platformConfig.platformFeePercent / 100));
    const securityDeposit = item.deposit;
    const totalEscrowAmount = borrowingCharge + platformFee + securityDeposit;

    const lender = users.find(u => u.id === item.ownerId) || { name: "Campus Peer", avatar: item.image };

    const newExchange = {
      id: `EX-${Math.floor(1000 + Math.random() * 9000)}`,
      itemId: item.id,
      itemTitle: item.title,
      itemImage: item.image,
      lenderId: item.ownerId,
      lenderName: lender.name,
      lenderAvatar: lender.avatar,
      borrowerId: currentUser.id,
      borrowerName: currentUser.name,
      borrowerAvatar: currentUser.avatar,
      
      status: "Requested",
      stageIndex: 1,
      
      durationType,
      durationValue,
      borrowingCharge,
      platformFeeRate: platformConfig.platformFeePercent / 100,
      platformFee,
      securityDeposit,
      totalEscrowAmount,
      
      startDate: new Date().toISOString(),
      returnDeadline: new Date(Date.now() + (durationType === 'Hourly' ? durationValue * 3600000 : durationValue * 86400000)).toISOString(),
      actualReturnDate: null,
      
      pickupLocation: pickupLocation || item.location,
      purpose: purpose || "Campus project & study need",
      
      preBorrowPhotos: [item.image],
      postReturnPhotos: [],
      preChecklistVerified: false,
      postChecklistVerified: false,
      
      lateHours: 0,
      lateFee: 0,
      damageReported: false,
      damageDescription: "",
      damageDeduction: 0,
      damagePhotos: [],
      disputeRaised: false,
      disputeStatus: "None",
      disputeResolutionNote: "",
      
      refundToBorrower: securityDeposit,
      payoutToLender: borrowingCharge,
      settlementCompleted: false,
      
      timeline: [
        {
          stage: "Requested",
          time: "Just now",
          note: `${currentUser.name} initiated request with ₹${totalEscrowAmount} escrow lock.`
        }
      ]
    };

    try {
      await fetch(`${API_BASE}/exchanges`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExchange)
      });
    } catch (e) {
      console.error(e);
    }

    setExchanges(prev => [newExchange, ...prev]);
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: "In Request" } : i));

    showToast(`Borrow request submitted for ${item.title}! Escrow ₹${totalEscrowAmount} locked.`, 'success');
    return newExchange;
  };

  // Transition Lifecycle Stage
  const advanceExchangeStage = (exchangeId, updates = {}) => {
    setExchanges(prev => prev.map(ex => {
      if (ex.id !== exchangeId) return ex;

      const nextStageIndex = Math.min(ex.stageIndex + 1, LIFECYCLE_STAGES.length - 1);
      const nextStage = LIFECYCLE_STAGES[nextStageIndex].key;
      
      const newTimelineEntry = {
        stage: nextStage,
        time: "Just now",
        note: updates.timelineNote || `Status changed to ${nextStage}`
      };

      const updated = {
        ...ex,
        ...updates,
        stageIndex: nextStageIndex,
        status: nextStage,
        timeline: [...ex.timeline, newTimelineEntry]
      };

      if (nextStage === "Settlement") {
        const calculatedLateFee = updated.lateFee || 0;
        const calculatedDamage = updated.damageDeduction || 0;
        const totalDeductions = calculatedLateFee + calculatedDamage;
        
        updated.refundToBorrower = Math.max(0, updated.securityDeposit - totalDeductions);
        updated.payoutToLender = updated.borrowingCharge + calculatedDamage + calculatedLateFee;
        updated.settlementCompleted = true;
      }

      if (nextStage === "Rated") {
        setUsers(uList => uList.map(u => {
          if (u.id === ex.borrowerId || u.id === ex.lenderId) {
            return {
              ...u,
              successfulExchanges: u.successfulExchanges + 1,
              trustScore: Math.min(100, u.trustScore + 1)
            };
          }
          return u;
        }));
        setItems(iList => iList.map(i => i.id === ex.itemId ? { ...i, status: "Available", usageCount: i.usageCount + 1 } : i));
      }

      return updated;
    }));

    showToast(`Exchange stage updated!`, 'info');
  };

  // Raise Dispute
  const raiseDispute = (exchangeId, reason, damageAmount = 0) => {
    setExchanges(prev => prev.map(ex => {
      if (ex.id !== exchangeId) return ex;
      return {
        ...ex,
        damageReported: true,
        damageDescription: reason,
        damageDeduction: damageAmount,
        disputeRaised: true,
        disputeStatus: "Under Review",
        timeline: [
          ...ex.timeline,
          { stage: "Dispute Raised", time: "Just now", note: `Dispute raised: ${reason}. Escalated to Admin.` }
        ]
      };
    }));
    showToast("Dispute logged and escalated to Admin.", "warning");
  };

  // Admin Resolve Dispute
  const resolveDispute = (exchangeId, approvedDamageDeduction, adminNote) => {
    setExchanges(prev => prev.map(ex => {
      if (ex.id !== exchangeId) return ex;
      const late = ex.lateFee || 0;
      const finalDamage = Number(approvedDamageDeduction) || 0;
      const totalDeduction = late + finalDamage;
      
      const nextStageIndex = ex.stageIndex === 7 ? 8 : ex.stageIndex;
      const nextStage = LIFECYCLE_STAGES[nextStageIndex].key;
      
      return {
        ...ex,
        stageIndex: nextStageIndex,
        status: nextStage,
        damageDeduction: finalDamage,
        disputeStatus: "Resolved",
        disputeResolutionNote: adminNote,
        refundToBorrower: Math.max(0, ex.securityDeposit - totalDeduction),
        payoutToLender: ex.borrowingCharge + finalDamage + late,
        settlementCompleted: true,
        timeline: [
          ...ex.timeline,
          { stage: "Dispute Resolved", time: "Just now", note: `Admin Verdict: ₹${finalDamage} damage deduction approved. Note: ${adminNote || "Dispute claim resolved."}` }
        ]
      };
    }));
    showToast("Dispute resolved & damage claim processed!", "success");
  };

  // Rate Exchange
  const submitRating = (exchangeId, { borrowerRating, borrowerFeedback, lenderRating, lenderFeedback }) => {
    advanceExchangeStage(exchangeId, {
      borrowerRating,
      borrowerFeedback,
      lenderRating,
      lenderFeedback,
      timelineNote: "Mutual peer feedback and trust ratings submitted."
    });
    showToast("Thank you! Trust scores updated.", "success");
  };

  // Community Requests
  const addCommunityRequest = async (reqData) => {
    const newReq = {
      title: reqData.title,
      category: reqData.category,
      requesterId: currentUser.id,
      requesterName: currentUser.name,
      requesterAvatar: currentUser.avatar,
      department: `${currentUser.department}, ${currentUser.year}`,
      neededDate: reqData.neededDate,
      budget: reqData.budget,
      description: reqData.description
    };

    try {
      const res = await fetch(`${API_BASE}/community-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReq)
      });
      if (res.ok) {
        const created = await res.json();
        setCommunityRequests(prev => [created, ...prev]);
        showToast("Community request posted!");
        return created;
      }
    } catch (e) {
      console.error(e);
    }

    const fallback = { id: `req-${Date.now()}`, ...newReq, responses: 0, fulfilled: false };
    setCommunityRequests(prev => [fallback, ...prev]);
    showToast("Community request posted!");
    return fallback;
  };

  const fulfillRequest = (requestId) => {
    setCommunityRequests(prev => prev.map(r => r.id === requestId ? { ...r, fulfilled: true, responses: r.responses + 1 } : r));
    showToast("Offered to fulfill student request!", "success");
  };

  const updatePlatformConfig = (newConfig) => {
    setPlatformConfig(prev => ({ ...prev, ...newConfig }));
    showToast("Platform configurations saved.");
  };

  const setItemApproval = (itemId, isApproved) => {
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, isApproved, status: isApproved ? "Available" : "Rejected" } : i));
    showToast(isApproved ? "Resource approved." : "Resource listing rejected.");
  };

  const toggleUserSuspension = async (userId) => {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/suspend`, { method: 'PUT' });
      if (res.ok) {
        const data = await res.json();
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, isSuspended: data.isSuspended } : u));
        showToast("User status updated.");
        return;
      }
    } catch (e) {
      console.error(e);
    }
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, isSuspended: !u.isSuspended } : u));
  };

  // Clear Database Endpoint
  const purgeAllData = async () => {
    try {
      const res = await fetch(`${API_BASE}/purge-data`, { method: 'POST' });
      if (res.ok) {
        setItems([]);
        setExchanges([]);
        setCommunityRequests([]);
        showToast("All items purged. You can now add your own resources!", "warning");
      }
    } catch (e) {
      console.error(e);
      setItems([]);
      setExchanges([]);
      setCommunityRequests([]);
      showToast("Data purged locally.", "warning");
    }
  };

  const totalMoneySavedValue = exchanges.reduce((acc, ex) => acc + (ex.borrowingCharge * 4), 0);
  const totalResourcesReused = items.reduce((acc, it) => acc + (it.usageCount || 0), 0) + exchanges.length;

  return (
    <CampusContext.Provider value={{
      users,
      currentUser,
      currentUserId,
      switchUser,
      registerUser,
      items,
      addResource,
      setItemApproval,
      exchanges,
      createExchangeRequest,
      advanceExchangeStage,
      raiseDispute,
      resolveDispute,
      submitRating,
      communityRequests,
      addCommunityRequest,
      fulfillRequest,
      platformConfig,
      updatePlatformConfig,
      toggleUserSuspension,
      purgeAllData,
      toastMessage,
      showToast,
      impactStats: {
        totalMoneySaved: `₹${totalMoneySavedValue.toLocaleString()}`,
        totalResourcesShared: items.length,
        totalResourcesReused,
        onTimeRate: "100%",
        activeMembers: users.length,
        co2SavedKg: Math.round(totalResourcesReused * 4.2)
      }
    }}>
      {children}
    </CampusContext.Provider>
  );
}

export function useCampus() {
  const context = useContext(CampusContext);
  if (!context) throw new Error("useCampus must be used within a CampusProvider");
  return context;
}
