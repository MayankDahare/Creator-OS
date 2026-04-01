import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Palette, PlaySquare, Image as ImageIcon, Mic, Sparkles, ArrowRight, BrainCircuit, Rocket } from "lucide-react";

interface ToolLink {
  name: string;
  url: string;
}

interface PipelineStep {
  id: string;
  title: string;
  icon: any;
  whyItMatters: string;
  whyThisTool: string;
  badges: string[];
  tools: ToolLink[];
  keywords: string[];
  color: string;
}

const pipelineData: PipelineStep[] = [
  {
    id: "visual-identity",
    title: "1. Visual Identity (3D Logo)",
    icon: Palette,
    whyItMatters: "Strong branding makes your channel instantly recognizable. A premium logo builds immediate trust with your audience.",
    whyThisTool: "Vecteezy offers millions of high-quality vector resources, making it incredibly fast for beginners to create professional 3D-styled logos without starting from scratch.",
    badges: ["Best for Beginners", "Fast Results"],
    tools: [
      { name: "Vecteezy", url: "https://www.vecteezy.com/" }
    ],
    keywords: ["logo", "brand", "design", "identity", "art", "visual", "look"],
    color: "neon-purple"
  },
  {
    id: "animation-effects",
    title: "2. Animation & Effects",
    icon: PlaySquare,
    whyItMatters: "Dynamic animations are proven to hook viewers in the first 3 seconds, drastically improving viewer retention and engagement rates.",
    whyThisTool: "These browser-based tools offer pre-built cinematic effects that require zero prior VFX experience—perfect for rapid, high-quality rendering.",
    badges: ["High Engagement", "Fast Results"],
    tools: [
      { name: "Swishy", url: "https://swishy.com" },
      { name: "VideoEffect", url: "https://videoeffect.com" }
    ],
    keywords: ["animation", "video", "effects", "vfx", "edit", "hook", "retention"],
    color: "neon-blue"
  },
  {
    id: "thumbnail-creation",
    title: "3. Thumbnail Creation",
    icon: ImageIcon,
    whyItMatters: "Thumbnails single-handedly drive CTR (Click-Through Rate). If they don't click, they don't watch, no matter how good the video is.",
    whyThisTool: "Canva and Gemini streamline the process by combining rapid template modification with AI-generated background assets for eye-catching results in minutes.",
    badges: ["AI Powered", "Crucial for CTR"],
    tools: [
      { name: "Canva", url: "https://www.canva.com/" },
      { name: "Gemini", url: "https://gemini.google.com/" }
    ],
    keywords: ["thumbnail", "cover", "image", "click", "ctr", "picture", "photo"],
    color: "neon-pink"
  },
  {
    id: "audio-enhancement",
    title: "4. Audio Enhancement",
    icon: Mic,
    whyItMatters: "Viewers will tolerate bad lighting or shaky video, but they will instantly click away if the audio is noisy or muffled.",
    whyThisTool: "Adobe Podcast's AI automatically removes background noise and enhances frequencies, turning a cheap mic into a professional studio sound instantly.",
    badges: ["AI Powered", "Pro Quality"],
    tools: [
      { name: "Adobe Podcast", url: "https://podcast.adobe.com/enhance" }
    ],
    keywords: ["audio", "sound", "mic", "voice", "podcast", "noise", "listen"],
    color: "neon-green"
  }
];

export function SmartToolPipeline() {
  const [topic, setTopic] = useState("");

  // Simple topic matching logic
  const isRelevant = (step: PipelineStep) => {
    if (!topic.trim()) return true; // Show all normally if no topic
    const search = topic.toLowerCase();
    return step.keywords.some((kw) => search.includes(kw)) || step.title.toLowerCase().includes(search);
  };

  const hasSearch = topic.trim().length > 0;

  return (
    <div className="w-full mt-10 space-y-6 relative mb-12">
      {/* Header & Topic Input */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-neon-blue" />
            Smart Tool Recommendation Pipeline
          </h2>
          <p className="text-muted-foreground text-sm mt-1 max-w-lg">
            Guiding you step-by-step with the exact tools you need. Enter your content focus below to highlight the most crucial steps.
          </p>
        </div>
        
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="e.g. 'podcast', 'animation', 'vlog'..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all backdrop-blur-sm shadow-inner"
          />
          <Sparkles className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
          {hasSearch && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute right-3 top-3.5"
            >
              <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse shadow-[0_0_8px_var(--neon-blue)]" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Vertical Pipeline Layout */}
      <div className="relative border-l border-border/40 ml-4 md:ml-6 pl-6 md:pl-10 space-y-8 py-2">
        {pipelineData.map((step, idx) => {
          const relevant = isRelevant(step);
          // When a topic is searched, dim non-relevant cards
          const opacityStyle = hasSearch && !relevant ? 'opacity-40 grayscale-[50%]' : 'opacity-100';
          const scaleStyle = hasSearch && relevant ? 1.02 : 1;
          
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, scale: scaleStyle }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative transition-all duration-500 ease-out ${opacityStyle}`}
            >
              {/* Connector Node */}
              <div className={`absolute -left-[35px] md:-left-[51px] top-6 w-5 h-5 rounded-full border-2 border-background flex items-center justify-center bg-background z-10 
                ${hasSearch && relevant ? `shadow-[0_0_15px_var(--${step.color})] animate-pulse` : ''}`}
              >
                <div className={`w-2.5 h-2.5 rounded-full bg-${step.color.replace('text-', '')} ${hasSearch && relevant ? `bg-primary` : `bg-muted-foreground/40`}`} />
              </div>

              <GlassCard
                delay={0}
                className={`w-full group hover:-translate-y-1 transition-all duration-300 border border-border/40 hover:border-${step.color.replace('text-', '')}/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon Box */}
                  <div className={`w-12 h-12 rounded-xl bg-${step.color.replace('text-', '')}/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`w-6 h-6 text-${step.color.replace('text-', '')}`} />
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-display font-bold text-lg md:text-xl text-foreground">
                          {step.title}
                        </h3>
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {step.badges.map((badge, bIdx) => (
                            <span 
                              key={bIdx}
                              className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-${step.color.replace('text-', '')}/20 text-${step.color.replace('text-', '')} bg-${step.color.replace('text-', '')}/5 font-medium`}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row flex-wrap gap-2 mt-3 md:mt-0 w-full md:w-auto">
                        {step.tools.map((tool, tIdx) => (
                          <NeonButton
                            key={tIdx}
                            onClick={() => window.open(tool.url, "_blank")}
                            className="text-xs px-3 py-1.5 h-auto group/btn flex items-center justify-center gap-1.5 whitespace-nowrap w-full md:w-auto"
                          >
                            {tool.name}
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                          </NeonButton>
                        ))}
                      </div>
                    </div>

                    {/* Explanations */}
                    <div className="mt-4 space-y-3">
                      <div className="bg-background/40 rounded-lg p-3 border border-border/30">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <BrainCircuit className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Why it matters</span>
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {step.whyItMatters}
                        </p>
                      </div>

                      <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Rocket className="w-3.5 h-3.5 text-primary" />
                          <span className="text-xs font-bold text-primary uppercase tracking-wider">Why this tool</span>
                        </div>
                        <p className="text-sm text-foreground/90 leading-relaxed">
                          {step.whyThisTool}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
