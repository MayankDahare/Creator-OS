// Per-device localStorage-based store for tracking all user activity

export interface HistoryItem {
  id: string;
  type: "idea" | "content" | "trend" | "thumbnail";
  label: string;
  topic: string;
  timestamp: number;
}

export interface UserStats {
  ideasValidated: number;
  contentGenerated: number;
  trendsAnalyzed: number;
  thumbnailsCreated: number;
  missionsCompleted: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  createdAt: string; // ISO
  totalSessions: number;
}

const STATS_KEY = "creatoros_stats";

function getUserId(): string {
  let userId = localStorage.getItem("creatoros_user_id");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("creatoros_user_id", userId);
  }
  return userId;
}

function getHistoryKey(): string {
  return `history_${getUserId()}`;
}

function today(): string {
  return new Date().toISOString().split("T")[0];
}

function getDefaultStats(): UserStats {
  return {
    ideasValidated: 0,
    contentGenerated: 0,
    trendsAnalyzed: 0,
    thumbnailsCreated: 0,
    missionsCompleted: 0,
    streak: 0,
    lastActiveDate: "",
    createdAt: new Date().toISOString(),
    totalSessions: 0,
  };
}

export function getStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return getDefaultStats();
    return { ...getDefaultStats(), ...JSON.parse(raw) };
  } catch {
    return getDefaultStats();
  }
}

export function saveStats(stats: UserStats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function trackActivity(type: "idea" | "content" | "trend" | "thumbnail") {
  const stats = getStats();
  const d = today();

  // Update streak
  if (stats.lastActiveDate === "") {
    stats.streak = 1;
  } else {
    const last = new Date(stats.lastActiveDate);
    const now = new Date(d);
    const diff = Math.floor((now.getTime() - last.getTime()) / 86400000);
    if (diff === 1) stats.streak += 1;
    else if (diff > 1) stats.streak = 1;
    // same day = no change
  }
  stats.lastActiveDate = d;

  switch (type) {
    case "idea": stats.ideasValidated += 1; break;
    case "content": stats.contentGenerated += 1; break;
    case "trend": stats.trendsAnalyzed += 1; break;
    case "thumbnail": stats.thumbnailsCreated += 1; break;
  }

  saveStats(stats);
  return stats;
}

export function completeMission() {
  const stats = getStats();
  stats.missionsCompleted += 1;
  saveStats(stats);
  return stats;
}

export function trackSession() {
  const stats = getStats();
  const d = today();
  if (stats.lastActiveDate === "") {
    stats.streak = 1;
  } else {
    const last = new Date(stats.lastActiveDate);
    const now = new Date(d);
    const diff = Math.floor((now.getTime() - last.getTime()) / 86400000);
    if (diff === 1) stats.streak += 1;
    else if (diff > 1) stats.streak = 1;
  }
  stats.lastActiveDate = d;
  stats.totalSessions += 1;
  saveStats(stats);
  return stats;
}

// History
export function getHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(getHistoryKey());
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addHistory(type: HistoryItem["type"], topic: string, label: string) {
  const history = getHistory();
  history.unshift({
    id: crypto.randomUUID(),
    type,
    label,
    topic,
    timestamp: Date.now(),
  });
  // Keep last 50
  if (history.length > 50) history.length = 50;
  localStorage.setItem(getHistoryKey(), JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(getHistoryKey());
}

export function getCreatorLevel(stats: UserStats): string {
  const total = stats.ideasValidated + stats.contentGenerated + stats.trendsAnalyzed + stats.thumbnailsCreated;
  if (total === 0) return "Newbie 🌱";
  if (total < 5) return "Beginner 🔰";
  if (total < 15) return "Rising Star ⭐";
  if (total < 30) return "Pro Creator 🚀";
  if (total < 50) return "Expert 💎";
  return "Legend 👑";
}

export function getContentScore(stats: UserStats): string {
  const total = stats.ideasValidated + stats.contentGenerated + stats.trendsAnalyzed;
  if (total === 0) return "0.0";
  const score = Math.min(10, (total * 0.8) + (stats.streak * 0.3));
  return score.toFixed(1);
}
