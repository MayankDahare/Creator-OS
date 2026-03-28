import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Sparkles } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center justify-between border-b border-glass-border/40 px-6 backdrop-blur-2xl bg-background/40 sticky top-0 z-30 shadow-[0_4px_30px_rgba(0,0,0,0.3)] saturate-150">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
            </div>
            <div className="flex items-center gap-3">
              <div className="pulse-dot" />
              <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">AI Online</span>
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center ml-2 shadow-[0_0_15px_-3px_hsl(var(--neon-green)/0.3)]">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
