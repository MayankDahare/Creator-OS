import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { analyzeTrend } from "@/lib/mockAI";
import { TrendingUp, TrendingDown, Sparkles, ArrowUpRight } from "lucide-react";
import { trackActivity, addHistory } from "@/lib/creatorStore";

export default function TrendAnalyzer() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Awaited<ReturnType<typeof analyzeTrend>> | null>(null);

  const handleAnalyze = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResult(null);
    const data = await analyzeTrend(topic);
    setResult(data);
    setLoading(false);
    trackActivity("trend");
    addHistory("trend", topic, `Analyzed: ${topic} (${data.isTrending ? "Trending" : "Cooling"})`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-neon-green" />
          Trend Analyzer
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Discover if your topic is trending and get smarter angles.</p>
      </motion.div>

      <GlassCard delay={0.1} hover={false}>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            placeholder="Enter a topic to analyze..."
            className="glass-input flex-1"
          />
          <NeonButton onClick={handleAnalyze} loading={loading} disabled={!topic.trim()} className="px-6 py-3 whitespace-nowrap">
            <Sparkles className="w-4 h-4" /> Analyze
          </NeonButton>
        </div>
      </GlassCard>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <GlassCard delay={0.1} className={`gradient-border ${result.isTrending ? "" : ""}`}>
              <div className="flex items-center gap-3 mb-3">
                {result.isTrending ? (
                  <div className="w-12 h-12 rounded-xl bg-neon-green/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-neon-green" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-neon-pink/10 flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-neon-pink" />
                  </div>
                )}
                <div>
                  <p className="font-display font-bold text-lg">
                    {result.isTrending ? "🔥 Trending Now!" : "📉 Cooling Down"}
                  </p>
                  <p className="text-xs text-muted-foreground">Momentum: {result.momentum}%</p>
                </div>
              </div>
              <div className="score-bar">
                <motion.div className="score-bar-fill" initial={{ width: 0 }} animate={{ width: `${result.momentum}%` }} transition={{ duration: 1 }} />
              </div>
            </GlassCard>

            <GlassCard delay={0.2} hover={false}>
              <h3 className="font-display font-bold text-sm mb-2">📊 Analysis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.reason}</p>
            </GlassCard>

            <GlassCard delay={0.3} hover={false} className="gradient-border">
              <h3 className="font-display font-bold text-sm mb-2">🎯 Smarter Angle</h3>
              <p className="text-sm text-foreground/90">{result.betterAngle}</p>
            </GlassCard>

            <GlassCard delay={0.4} hover={false}>
              <h3 className="font-display font-bold text-sm mb-3">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {result.relatedTopics.map((t) => (
                  <span key={t} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted/50 text-xs text-foreground/80 border border-border hover:border-primary/30 transition cursor-pointer">
                    <ArrowUpRight className="w-3 h-3" /> {t}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
