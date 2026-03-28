import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Hash, Copy, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { trackActivity, addHistory } from "@/lib/creatorStore";

const hashtagSets: Record<string, string[]> = {
  default: ["#viral", "#trending", "#fyp", "#explore", "#reels", "#creator", "#contentcreator", "#growthhack", "#motivation", "#tips", "#hack", "#lifestyle", "#shorts", "#instagood", "#followme"],
};

function generateHashtags(topic: string): { primary: string[]; secondary: string[]; niche: string[] } {
  const t = topic.toLowerCase().trim();
  const words = t.split(/\s+/);
  
  const primary = [
    `#${words.join("")}`,
    `#${words[0]}tips`,
    `#${words[0]}`,
    `#${words.join("")}2025`,
    `#learn${words[0]}`,
  ];
  
  const secondary = [
    "#contentcreator", "#creatorlife", "#viral", "#trending", "#fyp",
    "#reels", "#shorts", "#explore", "#growthhack", "#digitalnomad",
  ].sort(() => Math.random() - 0.5).slice(0, 6);

  const niche = [
    `#${words[0]}community`,
    `#${words[0]}life`,
    `#${words[0]}goals`,
    `#${words[0]}motivation`,
    `#daily${words[0]}`,
  ];

  return { primary, secondary, niche };
}

export default function HashtagGenerator() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<ReturnType<typeof generateHashtags> | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const data = generateHashtags(topic);
    setResult(data);
    trackActivity("content");
    addHistory("content", topic, `Generated hashtags: ${topic}`);
  };

  const copyAll = () => {
    if (!result) return;
    const all = [...result.primary, ...result.secondary, ...result.niche].join(" ");
    navigator.clipboard.writeText(all);
    setCopied(true);
    toast.success("All hashtags copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <Hash className="w-6 h-6 text-neon-pink" />
          Hashtag Generator
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Get optimized hashtags to maximize your reach.</p>
      </motion.div>

      <GlassCard delay={0.1} hover={false}>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="What's your content about?"
            className="glass-input flex-1"
          />
          <NeonButton onClick={handleGenerate} disabled={!topic.trim()} className="px-6 py-3 whitespace-nowrap">
            <Sparkles className="w-4 h-4" /> Generate
          </NeonButton>
        </div>
      </GlassCard>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex justify-end">
              <button onClick={copyAll} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition px-3 py-2 rounded-lg border border-border hover:border-primary/30">
                {copied ? <Check className="w-3 h-3 text-neon-green" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied!" : "Copy All"}
              </button>
            </div>
            {[
              { title: "🎯 Primary Hashtags", tags: result.primary },
              { title: "🔥 Trending & Growth", tags: result.secondary },
              { title: "🏷️ Niche Specific", tags: result.niche },
            ].map((section, i) => (
              <GlassCard key={section.title} delay={0.1 + i * 0.1} hover={false}>
                <h3 className="font-display font-bold text-sm mb-3">{section.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {section.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs border border-primary/20 hover:bg-primary/20 transition cursor-pointer"
                      onClick={() => { navigator.clipboard.writeText(tag); toast.success(`${tag} copied!`); }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
