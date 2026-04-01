import { motion } from "framer-motion";
import { SmartToolPipeline } from "@/components/SmartToolPipeline";

export default function ToolPipeline() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold">
          <span className="gradient-text">Creator Pipeline</span> ✨
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">Follow the guided steps to find the exact tools for your content.</p>
      </motion.div>
      <SmartToolPipeline />
    </div>
  );
}
