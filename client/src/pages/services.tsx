import { useEffect, useState } from "react";
import { api, Service } from "@/lib/mock-api";
import { Bug, Rat, Cloud, Shield, SprayCan, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "bug": return <Bug className="w-8 h-8" />;
      case "rat": return <Rat className="w-8 h-8" />;
      case "cloud": return <Cloud className="w-8 h-8" />;
      case "shield": return <Shield className="w-8 h-8" />;
      case "spray": return <SprayCan className="w-8 h-8" />;
      case "bed": return <Bed className="w-8 h-8" />;
      default: return <Shield className="w-8 h-8" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Our Services</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">Comprehensive pest management solutions tailored to your specific needs.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading services...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 min-h-[80px]">{service.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="text-lg font-bold text-slate-900">From ${service.price}</div>
                  <Link href="/book-service">
                    <Button variant="outline" className="hover:bg-primary hover:text-white transition-colors">Book Now</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
