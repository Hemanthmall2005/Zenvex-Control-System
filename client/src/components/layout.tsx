import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Shield, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Industries", path: "/industries" },
    { label: "Knowledge", path: "/knowledge" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center gap-2"><Phone size={14} /> +91 98765 43210</span>
            <span className="flex items-center gap-2"><Mail size={14} /> info@zenvex.com</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/attendance" className="hover:text-accent transition-colors">Employee Portal</Link>
            <span className="mx-2">|</span>
            <Link href="/login" className="hover:text-accent transition-colors">Login</Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-2xl font-display tracking-tight">
            <Shield className="h-8 w-8" />
            <span>Zenvex</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === item.path ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/book-service">
              <Button className="font-semibold shadow-lg hover:shadow-xl transition-all">
                Book Now
              </Button>
            </Link>
          </nav>

          {/* Mobile Nav */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-10">
                {navItems.map((item) => (
                  <Link 
                    key={item.path} 
                    href={item.path}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/book-service" onClick={() => setIsMobileOpen(false)}>
                  <Button className="w-full text-lg py-6">Book a Service</Button>
                </Link>
                <div className="pt-6 border-t mt-4 flex flex-col gap-4">
                  <Link href="/login" className="text-muted-foreground hover:text-primary">Admin Login</Link>
                  <Link href="/attendance" className="text-muted-foreground hover:text-primary">Staff Attendance</Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-2xl font-display mb-6">
                <Shield className="h-8 w-8 text-primary" />
                <span>Zenvex</span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Professional pest control services dedicated to keeping your environment safe, clean, and pest-free using eco-friendly solutions.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary transition-colors"><Facebook size={18} /></a>
                <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary transition-colors"><Twitter size={18} /></a>
                <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary transition-colors"><Instagram size={18} /></a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-slate-400 hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/services" className="text-slate-400 hover:text-primary transition-colors">Our Services</Link></li>
                <li><Link href="/industries" className="text-slate-400 hover:text-primary transition-colors">Industries Served</Link></li>
                <li><Link href="/knowledge" className="text-slate-400 hover:text-primary transition-colors">Pest Library</Link></li>
                <li><Link href="/contact" className="text-slate-400 hover:text-primary transition-colors">Contact Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Services</h3>
              <ul className="space-y-3">
                <li><Link href="/services" className="text-slate-400 hover:text-primary transition-colors">Termite Control</Link></li>
                <li><Link href="/services" className="text-slate-400 hover:text-primary transition-colors">Rodent Management</Link></li>
                <li><Link href="/services" className="text-slate-400 hover:text-primary transition-colors">Cockroach Treatment</Link></li>
                <li><Link href="/services" className="text-slate-400 hover:text-primary transition-colors">Bed Bug Removal</Link></li>
                <li><Link href="/services" className="text-slate-400 hover:text-primary transition-colors">Mosquito Fogging</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1" size={18} />
                  <span className="text-slate-400">123 Green Street, Eco Valley,<br />Mumbai, Maharashtra 400001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-primary" size={18} />
                  <span className="text-slate-400">+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-primary" size={18} />
                  <span className="text-slate-400">support@zenvex.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Zenvex Pesticontrol Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
