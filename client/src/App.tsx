import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import ServicesPage from "@/pages/services";
import IndustriesPage from "@/pages/industries";
import KnowledgePage from "@/pages/knowledge";
import ContactPage from "@/pages/contact";
import BookingPage from "@/pages/booking";
import LoginPage from "@/pages/login";
import AttendancePage from "@/pages/attendance";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/industries" component={IndustriesPage} />
        <Route path="/knowledge" component={KnowledgePage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/book-service" component={BookingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/attendance" component={AttendancePage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
