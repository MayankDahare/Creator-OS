import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { getCameraAngles } from "@/lib/mockAI";
import { Camera, Lightbulb } from "lucide-react";

const angles = getCameraAngles("general");

const tips = [
  "Always shoot in natural light when possible — face a window for the most flattering look.",
  "Use the rule of thirds: place your subject off-center for more dynamic compositions.",
  "Keep your phone at eye level or slightly above for the most flattering angle.",
  "Clean your lens! A smudgy lens ruins even the best setup.",
];

export default function CameraGuide() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <Camera className="w-6 h-6 text-neon-blue" />
          Camera Angle Guide
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Beginner-friendly visual guidance for shooting better content.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {angles.map((angle, i) => (
          <GlassCard key={angle.name} delay={i * 0.1}>
            <div className="text-3xl mb-3">{angle.icon}</div>
            <h3 className="font-display font-bold text-base">{angle.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{angle.desc}</p>
            <div className="mt-3 p-3 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-xs text-foreground/80 flex items-start gap-2">
                <Lightbulb className="w-3 h-3 text-neon-green mt-0.5 shrink-0" />
                {angle.tip}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard delay={0.6} hover={false} className="gradient-border">
        <h3 className="font-display font-bold mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-neon-green" /> Pro Tips
        </h3>
        <div className="space-y-2">
          {tips.map((tip, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="text-sm text-muted-foreground flex items-start gap-2"
            >
              <span className="text-neon-purple">→</span> {tip}
            </motion.p>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
