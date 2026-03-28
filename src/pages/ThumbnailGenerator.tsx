import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { getThumbnailIdeas } from "@/lib/mockAI";
import { Image, Palette, Layout, Sparkles } from "lucide-react";
import { trackActivity, addHistory } from "@/lib/creatorStore";

export default function ThumbnailGenerator() {
  const [topic, setTopic] = useState("");
  const [ideas, setIdeas] = useState<ReturnType<typeof getThumbnailIdeas> | null>(null);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setIdeas(getThumbnailIdeas(topic));
    trackActivity("thumbnail");
    addHistory("thumbnail", topic, `Thumbnail ideas: ${topic}`);
  };

  const previewGradients = [
    "from-yellow-500 to-orange-600",
    "from-red-500 to-green-500",
    "from-neon-purple to-neon-blue",
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <Image className="w-6 h-6 text-neon-pink" />
          Smart Thumbnails
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Get thumbnail layout ideas with style suggestions.</p>
      </motion.div>

      <GlassCard delay={0.1} hover={false}>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="What's the video about?"
            className="glass-input flex-1"
          />
          <NeonButton onClick={handleGenerate} disabled={!topic.trim()} className="px-6 py-3 whitespace-nowrap">
            <Sparkles className="w-4 h-4" /> Generate Ideas
          </NeonButton>
        </div>
      </GlassCard>

      {ideas && (
        <div className="grid gap-4">
          {ideas.map((idea, i) => (
            <GlassCard key={i} delay={0.1 + i * 0.15}>
              <div className="flex flex-col md:flex-row gap-4">
                {/* Preview */}
                <div className={`w-full md:w-48 h-28 rounded-lg bg-gradient-to-br ${previewGradients[i]} flex items-center justify-center shrink-0`}>
                  <div className="text-center px-3">
                    <p className="font-display font-bold text-sm text-foreground drop-shadow-lg uppercase">{topic}</p>
                    <p className="text-[10px] text-foreground/80 mt-1">{idea.style}</p>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold flex items-center gap-2">
                    <Layout className="w-4 h-4 text-primary" /> {idea.style}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{idea.layout}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Palette className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Colors: {idea.colors}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
