import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Calendar, Plus, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";

interface CalendarItem {
  id: string;
  day: string;
  task: string;
  platform: string;
  time: string;
}

const STORAGE_KEY = "creatoros_calendar";
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const platforms = ["Instagram", "YouTube", "TikTok", "Twitter/X", "LinkedIn"];

function loadCalendar(): CalendarItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveCalendar(items: CalendarItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function ContentCalendar() {
  const [items, setItems] = useState<CalendarItem[]>(loadCalendar);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ day: "Monday", task: "", platform: "Instagram", time: "10:00" });

  const addItem = () => {
    if (!form.task.trim()) return;
    const newItem: CalendarItem = { id: crypto.randomUUID(), ...form };
    const updated = [...items, newItem];
    setItems(updated);
    saveCalendar(updated);
    setForm({ day: "Monday", task: "", platform: "Instagram", time: "10:00" });
    setShowForm(false);
    toast.success("Added to calendar!");
  };

  const removeItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    saveCalendar(updated);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6 text-neon-green" />
            Content Calendar
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Plan your content week and stay consistent.</p>
        </div>
        <NeonButton onClick={() => setShowForm(!showForm)} className="text-sm px-4 py-2">
          <Plus className="w-4 h-4" /> Add
        </NeonButton>
      </motion.div>

      {showForm && (
        <GlassCard delay={0} hover={false} className="gradient-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}
              className="glass-input">
              {days.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}
              className="glass-input">
              {platforms.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <input value={form.task} onChange={(e) => setForm({ ...form, task: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder="What will you post?"
              className="glass-input sm:col-span-2" />
            <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="glass-input" />
            <NeonButton onClick={addItem} disabled={!form.task.trim()} className="text-sm px-4 py-2">
              Save
            </NeonButton>
          </div>
        </GlassCard>
      )}

      {days.map((day, di) => {
        const dayItems = items.filter((i) => i.day === day);
        if (dayItems.length === 0) return null;
        return (
          <GlassCard key={day} delay={di * 0.05} hover={false}>
            <h3 className="font-display font-bold text-sm mb-3 text-primary">{day}</h3>
            <div className="space-y-2">
              {dayItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 group">
                  <div className="flex items-center gap-3 min-w-0">
                    <Clock className="w-3 h-3 text-muted-foreground shrink-0" />
                    <span className="text-xs text-muted-foreground w-12">{item.time}</span>
                    <span className="text-sm truncate">{item.task}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary shrink-0">{item.platform}</span>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition p-1">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>
        );
      })}

      {items.length === 0 && !showForm && (
        <GlassCard delay={0.1} hover={false}>
          <div className="text-center py-8">
            <Calendar className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No content planned yet. Click "Add" to start planning!</p>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
