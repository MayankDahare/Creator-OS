import { Brain, Sparkles, PenTool, TrendingUp, Image, Camera, LayoutDashboard, History, Hash, Calendar, MessageSquare, BrainCircuit } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Idea Validator", url: "/idea-validator", icon: Brain },
  { title: "Content Generator", url: "/content-generator", icon: PenTool },
  { title: "Trend Analyzer", url: "/trend-analyzer", icon: TrendingUp },
  { title: "Smart Pipeline", url: "/tool-pipeline", icon: BrainCircuit },
];

const toolItems = [
  { title: "Hashtag Generator", url: "/hashtag-generator", icon: Hash },
  { title: "Bio Generator", url: "/bio-generator", icon: MessageSquare },
  { title: "Content Calendar", url: "/content-calendar", icon: Calendar },
  { title: "Thumbnails", url: "/thumbnails", icon: Image },
  { title: "Camera Guide", url: "/camera-guide", icon: Camera },
  { title: "History", url: "/history", icon: History },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center neon-glow bg-primary/20">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-display font-bold text-foreground text-sm">CreatorOS</h1>
              <p className="text-[10px] text-muted-foreground">AI Co-Pilot</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/60 text-[10px] uppercase tracking-widest">
            {!collapsed && "Main"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="transition-all duration-300 hover:bg-white/5 rounded-md mx-2 px-3 py-2 text-muted-foreground hover:text-foreground"
                      activeClassName="bg-primary/10 text-primary shadow-[inset_2px_0_0_0_hsl(var(--neon-green))] rounded-md font-medium"
                    >
                      <item.icon className="w-4 h-4 mr-2 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/60 text-[10px] uppercase tracking-widest">
            {!collapsed && "Tools"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="transition-all duration-300 hover:bg-white/5 rounded-md mx-2 px-3 py-2 text-muted-foreground hover:text-foreground"
                      activeClassName="bg-primary/10 text-primary shadow-[inset_2px_0_0_0_hsl(var(--neon-green))] rounded-md font-medium"
                    >
                      <item.icon className="w-4 h-4 mr-2 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
