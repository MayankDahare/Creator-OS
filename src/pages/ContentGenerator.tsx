import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { generateContent } from "@/lib/mockAI";
import { PenTool, Copy, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { trackActivity, addHistory } from "@/lib/creatorStore";

export default function ContentGenerator() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Awaited<ReturnType<typeof generateContent>> | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResult(null);
    const data = await generateContent(topic);
    setResult(data);
    setLoading(false);
    trackActivity("content");
    addHistory("content", topic, `Generated script: ${topic}`);
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopied(null), 2000);
  };

  const Section = ({ title, content, label }: { title: string; content: string; label: string }) => (
    <GlassCard delay={0.2} hover={false}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display font-bold text-sm">{title}</h3>
        <button onClick={() => copyText(content, label)} className="text-muted-foreground hover:text-primary transition p-1">
          {copied === label ? <Check className="w-4 h-4 text-neon-green" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <p className="text-sm text-foreground/90 whitespace-pre-line leading-relaxed">{content}</p>
    </GlassCard>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <PenTool className="w-6 h-6 text-neon-blue" />
          Content Generator
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Generate human-like hooks, scripts, titles & captions instantly.</p>
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
          <NeonButton onClick={handleGenerate} loading={loading} disabled={!topic.trim()} className="px-6 py-3 whitespace-nowrap">
            <Sparkles className="w-4 h-4" /> Generate
          </NeonButton>
        </div>
      </GlassCard>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <GlassCard delay={0.1} hover={false} className="gradient-border">
              <h3 className="font-display font-bold text-sm mb-1">🪝 Hook</h3>
              <p className="text-lg font-medium gradient-text">{result.hook}</p>
              <button onClick={() => copyText(result.hook, "Hook")} className="mt-2 text-xs text-muted-foreground hover:text-primary transition">
                {copied === "Hook" ? "Copied ✓" : "Copy hook"}
              </button>
            </GlassCard>
            <Section title="📝 Full Script" content={result.script} label="Script" />
            <Section title="🏷️ Title" content={result.title} label="Title" />
            <Section title="📱 Caption" content={result.caption} label="Caption" />
            <GlassCard delay={0.3} hover={false}>
              <h3 className="font-display font-bold text-sm mb-2"># Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {result.hashtags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs border border-primary/20">{tag}</span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
