import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { getHistory, clearHistory, type HistoryItem } from "@/lib/creatorStore";
import { History, Brain, PenTool, TrendingUp, Image, Trash2 } from "lucide-react";
import { toast } from "sonner";

const iconMap = {
  idea: Brain,
  content: PenTool,
  trend: TrendingUp,
  thumbnail: Image,
};

const colorMap = {
  idea: "text-neon-purple",
  content: "text-neon-blue",
  trend: "text-neon-green",
  thumbnail: "text-neon-pink",
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
    toast.success("History cleared!");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <History className="w-6 h-6 text-muted-foreground" />
            History
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Your recent AI-generated content and analyses.</p>
        </div>
        {history.length > 0 && (
          <button onClick={handleClear} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition px-3 py-2 rounded-lg border border-border hover:border-destructive/30">
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        )}
      </motion.div>

      {history.length === 0 ? (
        <GlassCard delay={0.1} hover={false}>
          <div className="text-center py-8">
            <History className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No activity yet. Start validating ideas or generating content!</p>
          </div>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {history.map((item, i) => {
            const Icon = iconMap[item.type];
            return (
              <GlassCard key={item.id} delay={i * 0.05}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${colorMap[item.type]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{timeAgo(item.timestamp)}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground capitalize">{item.type}</span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
