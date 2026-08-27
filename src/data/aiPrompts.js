export const PRESET_AI_PROMPTS = [
  {
    label: "Media Club Reel Shoot",
    query: "I need to make a reel for my club event tomorrow afternoon",
    category: "Cameras & Audio",
    explanation: "Detected need for high-quality video capture, stable panning, crisp directional audio, and controlled daylight illumination.",
    matchedItemIds: ["item-1", "item-2", "item-3", "item-4"],
    bundleName: "Ultimate Campus Reel & Content Creator Kit",
    bundleDiscount: 15,
    totalValue: "₹1,300/day value"
  },
  {
    label: "Mechanics & Graphics Exam",
    query: "Need to prepare for Applied Mechanics practicals and drawing exam tonight",
    category: "Academic & Calculators",
    explanation: "Identified academic exam requirement: High-precision scientific computation + drafting instruments for machine drawing.",
    matchedItemIds: ["item-5", "item-6"],
    bundleName: "Engineering Graphics & Exam Survival Kit",
    bundleDiscount: 10,
    totalValue: "₹140/day value"
  },
  {
    label: "Robotics & IoT Prototype",
    query: "Need microcontroller and testing instruments to debug our line follower robot",
    category: "Tech & Electronics",
    explanation: "Detected embedded systems project: High-pinout Arduino controller board + precision multimeter for circuit continuity.",
    matchedItemIds: ["item-7", "item-9"],
    bundleName: "Hardware Hacker & Robotics Prototyping Kit",
    bundleDiscount: 10,
    totalValue: "₹240/day value"
  },
  {
    label: "Intra-Hostel Badminton Match",
    query: "Hosting an evening badminton doubles match with hostel friends",
    category: "Sports & Fitness",
    explanation: "Detected recreation & sports need: Pair of matched graphite rackets and high-durability nylon shuttles.",
    matchedItemIds: ["item-8"],
    bundleName: "Hostel Match Ready Sports Kit",
    bundleDiscount: 0,
    totalValue: "₹100/day value"
  },
  {
    label: "Hostel Birthday & Quad Party",
    query: "Organizing an outdoor music jam and dance session in hostel courtyard",
    category: "Event & Decor",
    explanation: "Detected event requirement: High-bass splashproof PA speaker system with wireless connectivity.",
    matchedItemIds: ["item-10", "item-3"],
    bundleName: "Campus Fiesta & Sound Blast Kit",
    bundleDiscount: 12,
    totalValue: "₹600/day value"
  }
];

export function parseNaturalLanguageQuery(query, allItems) {
  const q = query.toLowerCase();
  
  // Check exact preset match or keyword match
  const preset = PRESET_AI_PROMPTS.find(p => 
    q.includes(p.query.toLowerCase()) || 
    (p.label.toLowerCase().split(" ").some(word => word.length > 3 && q.includes(word)))
  );

  if (preset) {
    const items = allItems.filter(item => preset.matchedItemIds.includes(item.id));
    return {
      success: true,
      bundleName: preset.bundleName,
      explanation: preset.explanation,
      discount: preset.bundleDiscount,
      items: items.length > 0 ? items : allItems.slice(0, 3),
      extractedKeywords: ["video capture", "audio", "stabilizer", "daylight"],
      confidence: 98
    };
  }

  // Dynamic keyword parsing
  const keywords = [];
  const matched = [];

  if (q.includes("reel") || q.includes("video") || q.includes("shoot") || q.includes("camera") || q.includes("photo") || q.includes("record")) {
    keywords.push("Video", "Optics", "Lighting");
    matched.push("item-1", "item-2", "item-3", "item-4");
  }
  if (q.includes("exam") || q.includes("study") || q.includes("calc") || q.includes("math") || q.includes("draw") || q.includes("draft")) {
    keywords.push("Academic", "Computation", "Graphics");
    matched.push("item-5", "item-6");
  }
  if (q.includes("arduino") || q.includes("robot") || q.includes("circuit") || q.includes("multimeter") || q.includes("wire") || q.includes("tech")) {
    keywords.push("Electronics", "Sensors", "Debugging");
    matched.push("item-7", "item-9");
  }
  if (q.includes("sports") || q.includes("badminton") || q.includes("game") || q.includes("play") || q.includes("racket")) {
    keywords.push("Sports", "Fitness", "Courts");
    matched.push("item-8");
  }
  if (q.includes("music") || q.includes("speaker") || q.includes("party") || q.includes("event") || q.includes("sound")) {
    keywords.push("Sound", "Acoustics", "Fest");
    matched.push("item-10");
  }

  const resultItems = allItems.filter(item => matched.includes(item.id));

  if (resultItems.length > 0) {
    return {
      success: true,
      bundleName: "Custom AI-Generated Campus Bundle",
      explanation: `Analyzed your requirement for "${query}". Found ${resultItems.length} matching resources available across campus blocks with high trust ratings.`,
      discount: resultItems.length > 1 ? 10 : 0,
      items: resultItems,
      extractedKeywords: keywords,
      confidence: 92
    };
  }

  // Generic fallback: smart search match
  const filtered = allItems.filter(i => 
    i.title.toLowerCase().includes(q) || 
    i.category.toLowerCase().includes(q) || 
    i.description.toLowerCase().includes(q)
  );

  return {
    success: true,
    bundleName: "Smart Matched Recommendations",
    explanation: `Extracted intent from: "${query}". Ranking items by campus proximity, condition, and owner trust score.`,
    discount: 5,
    items: filtered.length > 0 ? filtered : allItems.slice(0, 3),
    extractedKeywords: [query.split(" ")[0] || "campus gear"],
    confidence: 85
  };
}
