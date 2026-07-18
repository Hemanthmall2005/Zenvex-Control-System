import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
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
import BookingsPage from "@/pages/bookings";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import AttendanceAdmin from"@/pages/AttendanceAdmin";
import Signup from "@/pages/signup";
import Employees from "@/pages/Employees";

function AdminProtectedRoute({ component: Component }: { component: any }) {
  const [loading, setLoading] = useState(true);
const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setLoading(false);
      return;
    }

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }

    setLoading(false);
  });

  return () => unsubscribe();
}, []);

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}

  if (!isAdmin) {
    return <LoginPage />;
  }

  return <Component />;
}

function UserProtectedRoute({ component: Component }: { component: any }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
  if (!user) {
    return <LoginPage />;
  }

  return <Component />;
}

function EmployeeProtectedRoute({ component: Component }: { component: any }) {
  const [loading, setLoading] = useState(true);
  const [isEmployee, setIsEmployee] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().role === "employee") {
        setIsEmployee(true);
      } else {
        setIsEmployee(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!isEmployee) {
    return <LoginPage />;
  }

  return <Component />;
}

function Router() {
  return (
    <Layout>
      <Switch>

        <Route path="/">
          <UserProtectedRoute component={Home} />
        </Route>

        <Route path="/home">
          <UserProtectedRoute component={Home} />
        </Route>

        <Route path="/about">
          <UserProtectedRoute component={About} />
        </Route>

        <Route path="/services">
          <UserProtectedRoute component={ServicesPage} />
        </Route>

        <Route path="/industries">
          <UserProtectedRoute component={IndustriesPage} />
        </Route>

        <Route path="/knowledge">
          <UserProtectedRoute component={KnowledgePage} />
        </Route>

        <Route path="/contact">
          <UserProtectedRoute component={ContactPage} />
        </Route>

        <Route path="/book-service">
          <UserProtectedRoute component={BookingPage} />
        </Route>

        <Route path="/bookings">
          <AdminProtectedRoute component={BookingsPage} />
        </Route>

        <Route path="/attendance">
        <EmployeeProtectedRoute component={AttendancePage} />
        </Route>

        <Route path="/attendance-admin">
        <AdminProtectedRoute component={AttendanceAdmin} />
        </Route>

        <Route path="/signup">
        <Signup/>
        </Route>

        <Route path="/employees">
        <AdminProtectedRoute component={Employees} />
        </Route>
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
