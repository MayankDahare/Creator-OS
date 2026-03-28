import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { validateIdea } from "@/lib/mockAI";
import { Brain, Lightbulb, BarChart3, Shield, Sparkles } from "lucide-react";
import { trackActivity, addHistory } from "@/lib/creatorStore";

export default function IdeaValidator() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Awaited<ReturnType<typeof validateIdea>> | null>(null);

  const handleValidate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResult(null);
    const data = await validateIdea(topic);
    setResult(data);
    setLoading(false);
    trackActivity("idea");
    addHistory("idea", topic, `Validated: ${topic} (Score: ${data.trendScore}/10)`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <Brain className="w-6 h-6 text-neon-purple" />
          Idea Validation Engine
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Enter your content idea and let AI analyze its potential.</p>
      </motion.div>

      <GlassCard delay={0.1} hover={false}>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleValidate()}
            placeholder="e.g. tech reels, fitness shorts, cooking hacks..."
            className="glass-input flex-1"
          />
          <NeonButton onClick={handleValidate} loading={loading} disabled={!topic.trim()} className="px-6 py-3 whitespace-nowrap">
            <Sparkles className="w-4 h-4" /> Validate
          </NeonButton>
        </div>
      </GlassCard>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Scores */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <GlassCard delay={0.1}>
                <BarChart3 className="w-5 h-5 text-neon-blue mb-2" />
                <p className="text-xs text-muted-foreground">Trend Score</p>
                <p className="text-2xl font-display font-bold gradient-text">{result.trendScore}/10</p>
                <div className="score-bar mt-2">
                  <motion.div className="score-bar-fill" initial={{ width: 0 }} animate={{ width: `${result.trendScore * 10}%` }} transition={{ duration: 0.8 }} />
                </div>
              </GlassCard>
              <GlassCard delay={0.2}>
                <Shield className="w-5 h-5 text-neon-pink mb-2" />
                <p className="text-xs text-muted-foreground">Competition</p>
                <p className="text-2xl font-display font-bold">{result.competition}</p>
              </GlassCard>
              <GlassCard delay={0.3} className="gradient-border">
                <Lightbulb className="w-5 h-5 text-neon-green mb-2" />
                <p className="text-xs text-muted-foreground">Verdict</p>
                <p className="text-lg font-display font-bold">{result.recommendation}</p>
              </GlassCard>
            </div>

            {/* Reasoning */}
            <GlassCard delay={0.4} hover={false}>
              <p className="text-sm text-muted-foreground">{result.reasoning}</p>
            </GlassCard>

            {/* Angles */}
            <GlassCard delay={0.5} hover={false}>
              <h3 className="font-display font-bold mb-3 text-sm">💡 Better Angles to Try</h3>
              <div className="space-y-2">
                {result.angles.map((angle, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition text-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold">{i + 1}</span>
                    {angle}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
