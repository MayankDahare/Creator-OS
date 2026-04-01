import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { SmartToolPipeline } from "@/components/SmartToolPipeline";
import { getDailyMission } from "@/lib/mockAI";
import { getStats, trackSession, completeMission, getCreatorLevel, getContentScore } from "@/lib/creatorStore";
import { Zap, Target, Clock, TrendingUp, Award, Flame, ArrowRight, Brain, PenTool, Hash, BookOpen, Calendar, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const quickActions = [
  { label: "Validate an Idea", path: "/idea-validator", icon: Target, desc: "Check if your topic will work" },
  { label: "Generate Content", path: "/content-generator", icon: Zap, desc: "Get hooks, scripts & captions" },
  { label: "Check Trends", path: "/trend-analyzer", icon: TrendingUp, desc: "See what's hot right now" },
  { label: "Hashtag Generator", path: "/hashtag-generator", icon: Hash, desc: "Get perfect hashtags" },
  { label: "Content Calendar", path: "/content-calendar", icon: Calendar, desc: "Plan your week" },
  { label: "Bio Generator", path: "/bio-generator", icon: MessageSquare, desc: "Craft your perfect bio" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [mission, setMission] = useState(getDailyMission());
  const [greeting, setGreeting] = useState("");
  const [stats, setStats] = useState(getStats());

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    setStats(trackSession());
  }, []);

  const totalActions = stats.ideasValidated + stats.contentGenerated + stats.trendsAnalyzed + stats.thumbnailsCreated;

  const statCards = [
    { label: "Creator Level", value: getCreatorLevel(stats), icon: Award, color: "text-neon-purple" },
    { label: "Streak", value: stats.streak > 0 ? `${stats.streak} day${stats.streak > 1 ? "s" : ""} 🔥` : "Start today!", icon: Flame, color: "text-neon-pink" },
    { label: "Total Actions", value: String(totalActions), icon: Zap, color: "text-neon-blue" },
    { label: "Content Score", value: `${getContentScore(stats)}/10`, icon: TrendingUp, color: "text-neon-green" },
  ];

  const handleCompleteMission = () => {
    const updated = completeMission();
    setStats(updated);
    setMission(getDailyMission());
    toast.success("Mission completed! 🎉 New mission assigned.");
  };

  const progressItems = [
    { label: "Ideas Validated", current: stats.ideasValidated, target: 10 },
    { label: "Content Generated", current: stats.contentGenerated, target: 10 },
    { label: "Trends Analyzed", current: stats.trendsAnalyzed, target: 10 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold">
          {greeting}, <span className="gradient-text">Creator</span> ✨
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">Your AI co-pilot is ready. Let's make something amazing today.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statCards.map((s, i) => (
          <GlassCard key={s.label} delay={i * 0.1} className="text-center">
            <s.icon className={`w-5 h-5 mx-auto mb-2 ${s.color}`} />
            <p className="text-lg font-bold font-display">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Today's Mission */}
      <GlassCard delay={0.3} hover={false} className="gradient-border">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-neon-purple" />
              <h2 className="font-display font-bold text-lg">Today's Mission</h2>
              {stats.missionsCompleted > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-green/15 text-neon-green">
                  {stats.missionsCompleted} completed
                </span>
              )}
            </div>
            <p className="text-foreground font-medium">{mission.task}</p>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Best time: {mission.time}</span>
              <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[11px]">{mission.platform}</span>
              <span className="px-2 py-0.5 rounded-full bg-neon-blue/15 text-neon-blue text-[11px]">{mission.type}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <NeonButton onClick={handleCompleteMission} className="text-sm px-4 py-2">
              ✅ Done
            </NeonButton>
            <button onClick={() => setMission(getDailyMission())} className="text-sm px-3 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition">
              Skip
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Progress */}
      <GlassCard delay={0.4} hover={false}>
        <h2 className="font-display font-bold mb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-neon-purple" /> Growth Path
        </h2>
        <div className="space-y-3">
          {progressItems.map((item, i) => {
            const pct = Math.min(100, Math.round((item.current / item.target) * 100));
            return (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-foreground font-medium">{item.current}/{item.target}</span>
                </div>
                <div className="score-bar">
                  <motion.div
                    className="score-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display font-bold mb-3 text-sm text-muted-foreground uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((a, i) => (
            <GlassCard key={a.label} delay={0.5 + i * 0.08}>
              <button onClick={() => navigate(a.path)} className="w-full flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <a.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-sm block">{a.label}</span>
                    <span className="text-[11px] text-muted-foreground">{a.desc}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </button>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Smart Tool Recommendation Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="pt-6"
      >
        <SmartToolPipeline />
      </motion.div>
    </div>
  );
}
