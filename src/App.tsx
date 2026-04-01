import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import IdeaValidator from "@/pages/IdeaValidator";
import ContentGenerator from "@/pages/ContentGenerator";
import TrendAnalyzer from "@/pages/TrendAnalyzer";
import ThumbnailGenerator from "@/pages/ThumbnailGenerator";
import CameraGuide from "@/pages/CameraGuide";
import HistoryPage from "@/pages/HistoryPage";
import HashtagGenerator from "@/pages/HashtagGenerator";
import ContentCalendar from "@/pages/ContentCalendar";
import BioGenerator from "@/pages/BioGenerator";
import NotFound from "@/pages/NotFound";
import ToolPipeline from "@/pages/ToolPipeline";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/idea-validator" element={<IdeaValidator />} />
            <Route path="/content-generator" element={<ContentGenerator />} />
            <Route path="/trend-analyzer" element={<TrendAnalyzer />} />
            <Route path="/thumbnails" element={<ThumbnailGenerator />} />
            <Route path="/camera-guide" element={<CameraGuide />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/hashtag-generator" element={<HashtagGenerator />} />
            <Route path="/content-calendar" element={<ContentCalendar />} />
            <Route path="/bio-generator" element={<BioGenerator />} />
            <Route path="/tool-pipeline" element={<ToolPipeline />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
