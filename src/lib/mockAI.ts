// Simulated AI responses for all features

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

const hooks = [
  "Stop scrolling — this changes everything.",
  "Nobody talks about this, and it's costing you views.",
  "I tested this for 30 days. Here's what happened.",
  "This one trick got me 10K followers overnight.",
  "POV: You finally figured out the algorithm.",
  "Wait for it… this blew my mind.",
];

const angles = [
  "Personal story + transformation angle",
  "Myth-busting common misconceptions",
  "Day-in-the-life documentary style",
  "Tutorial with unexpected twist ending",
  "Hot take / controversial opinion format",
  "Before vs After comparison",
  "Behind the scenes breakdown",
  "Beginner mistakes to avoid",
];

const hashtags = ["#viral", "#trending", "#creator", "#contentcreator", "#growthhack", "#reels", "#shorts", "#fyp", "#explore", "#tips"];

export async function validateIdea(topic: string) {
  await delay(1500);
  const trendScore = Math.floor(Math.random() * 4) + 6;
  const levels = ["Low", "Medium", "High"] as const;
  const competition = levels[Math.floor(Math.random() * 3)];
  const shouldMake = trendScore >= 7;
  const suggestedAngles = [...angles].sort(() => Math.random() - 0.5).slice(0, 5);

  return {
    topic,
    trendScore,
    competition,
    recommendation: shouldMake ? "Make this! 🔥" : "Consider a different angle",
    angles: suggestedAngles,
    reasoning: shouldMake
      ? `"${topic}" is showing strong engagement signals. The audience demand is high and there's room for fresh perspectives.`
      : `"${topic}" has potential but the market is saturated. Try one of the suggested angles to stand out.`,
  };
}

export async function generateContent(topic: string) {
  await delay(2000);
  const hook = hooks[Math.floor(Math.random() * hooks.length)];
  const selectedHashtags = [...hashtags].sort(() => Math.random() - 0.5).slice(0, 6);

  return {
    hook,
    script: `[HOOK] ${hook}\n\n[BODY] Here's the thing about ${topic} that nobody tells you...\n\nMost people get this completely wrong. They think it's about [common misconception], but the real secret is [insight].\n\nI've spent weeks researching this, and here are the 3 key takeaways:\n\n1. Start with [specific action]\n2. Focus on [key element]\n3. Never forget [crucial detail]\n\n[CTA] Follow for more ${topic} tips that actually work. Drop a 🔥 if this helped!`,
    title: `The ${topic.charAt(0).toUpperCase() + topic.slice(1)} Secret Nobody Tells You | Creator Guide 2025`,
    caption: `This changed how I think about ${topic} forever 🚀\n\nSave this for later — you'll need it.\n\n${selectedHashtags.join(" ")}`,
    hashtags: selectedHashtags,
  };
}

export async function analyzeTrend(topic: string) {
  await delay(1800);
  const isTrending = Math.random() > 0.3;
  const momentum = isTrending ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40) + 20;

  return {
    topic,
    isTrending,
    momentum,
    reason: isTrending
      ? `"${topic}" is riding a strong wave right now. Multiple major creators have posted about it this week, and search volume is up 140% month-over-month.`
      : `"${topic}" is cooling down. It peaked 2 weeks ago and engagement is declining. Consider pivoting to a related sub-niche.`,
    betterAngle: isTrending
      ? `Double down on "${topic}" but add a unique personal spin — share your own results or data.`
      : `Try "${topic} for beginners" or "${topic} mistakes" — these sub-angles still have strong demand.`,
    relatedTopics: [
      `${topic} tips`, `${topic} for beginners`, `${topic} mistakes`,
      `${topic} 2025`, `advanced ${topic}`,
    ],
  };
}

export function getDailyMission() {
  const missions = [
    { task: "Post a short-form video", platform: "Instagram Reels", time: "2:00 PM", type: "Educational" },
    { task: "Engage with 10 creators", platform: "Twitter/X", time: "10:00 AM", type: "Networking" },
    { task: "Write a thread about your niche", platform: "Twitter/X", time: "11:00 AM", type: "Authority" },
    { task: "Share a behind-the-scenes story", platform: "Instagram Stories", time: "6:00 PM", type: "Authenticity" },
  ];
  return missions[Math.floor(Math.random() * missions.length)];
}

export function getThumbnailIdeas(topic: string) {
  return [
    { style: "Bold Text + Face", layout: "Large emoji/face on left, bold text on right with contrasting background", colors: "Yellow + Black" },
    { style: "Before/After Split", layout: "Split screen with transformation, arrow in center", colors: "Red + Green gradient" },
    { style: "Minimalist Clean", layout: "Single word centered, subtle gradient background, small icon", colors: "Dark Purple + Neon Blue" },
  ];
}

export function getCameraAngles(contentType: string) {
  const allAngles = [
    { name: "Talking Head", desc: "Eye-level, slightly above. Best for tutorials & vlogs.", tip: "Position camera at forehead height. Use ring light for even lighting.", icon: "🎥" },
    { name: "Top-Down / Overhead", desc: "Camera pointing straight down. Great for demos & cooking.", tip: "Use a tripod arm or mount camera on shelf above workspace.", icon: "📸" },
    { name: "Side Angle (45°)", desc: "Cinematic feel. Works for aesthetic content.", tip: "Place camera at 45° to your left/right. Add depth with background blur.", icon: "🎬" },
    { name: "Wide / Establishing", desc: "Shows full setup or environment. Good for intros.", tip: "Step back or use wide lens. Include interesting background elements.", icon: "🌐" },
    { name: "Close-Up Detail", desc: "Tight shot on hands, product, or face. Adds intimacy.", tip: "Get within 1-2 feet. Use manual focus for precision.", icon: "🔍" },
    { name: "POV / First Person", desc: "Camera shows what you see. Immersive and trending.", tip: "Mount on chest or hold at eye level. Keep movements smooth.", icon: "👁️" },
  ];
  return allAngles;
}
