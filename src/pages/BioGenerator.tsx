import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { MessageSquare, Copy, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { trackActivity, addHistory } from "@/lib/creatorStore";

const bioTemplates = [
  (niche: string, vibe: string) => `${vibe === "professional" ? "📊" : "✨"} ${niche} creator | Sharing what I learn daily\n🎯 Helping you level up\n📩 DM for collabs`,
  (niche: string, vibe: string) => `🚀 Making ${niche} simple & fun\n${vibe === "professional" ? "💼 " : "🔥 "}Content that actually helps\n⬇️ Latest tips below`,
  (niche: string, vibe: string) => `${vibe === "funny" ? "🤪" : "💡"} ${niche} enthusiast\n${vibe === "funny" ? "Probably posting instead of sleeping" : "Building in public"}\n🔗 Free resources ⬇️`,
  (niche: string, vibe: string) => `Hey! I talk about ${niche} 🎯\n${vibe === "motivational" ? "Your potential is unlimited 💪" : "Real tips, no fluff"}\n📱 New content daily`,
];

const vibes = [
  { value: "professional", label: "Professional 💼" },
  { value: "casual", label: "Casual 😎" },
  { value: "funny", label: "Funny 🤪" },
  { value: "motivational", label: "Motivational 💪" },
];

export default function BioGenerator() {
  const [niche, setNiche] = useState("");
  const [vibe, setVibe] = useState("casual");
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const handleGenerate = () => {
    if (!niche.trim()) return;
    const bios = bioTemplates.map((fn) => fn(niche, vibe));
    setResults(bios);
    trackActivity("content");
    addHistory("content", niche, `Generated bio: ${niche}`);
  };

  const copyBio = (bio: string, idx: number) => {
    navigator.clipboard.writeText(bio);
    setCopied(idx);
    toast.success("Bio copied!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-neon-purple" />
          Bio Generator
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Craft the perfect creator bio in seconds.</p>
      </motion.div>

      <GlassCard delay={0.1} hover={false}>
        <div className="space-y-3">
          <input
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="Your niche (e.g., fitness, tech, cooking)"
            className="glass-input w-full"
          />
          <div className="flex flex-wrap gap-2">
            {vibes.map((v) => (
              <button key={v.value} onClick={() => setVibe(v.value)}
                className={`px-3 py-1.5 rounded-full text-xs border transition ${vibe === v.value ? "bg-primary/20 border-primary/40 text-primary" : "bg-muted/30 border-border text-muted-foreground hover:border-primary/20"}`}>
                {v.label}
              </button>
            ))}
          </div>
          <NeonButton onClick={handleGenerate} disabled={!niche.trim()} className="px-6 py-3 w-full sm:w-auto">
            <Sparkles className="w-4 h-4" /> Generate Bios
          </NeonButton>
        </div>
      </GlassCard>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {results.map((bio, i) => (
              <GlassCard key={i} delay={0.1 + i * 0.1}>
                <div className="flex justify-between items-start gap-3">
                  <p className="text-sm whitespace-pre-line leading-relaxed flex-1">{bio}</p>
                  <button onClick={() => copyBio(bio, i)} className="text-muted-foreground hover:text-primary transition p-1 shrink-0">
                    {copied === i ? <Check className="w-4 h-4 text-neon-green" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
