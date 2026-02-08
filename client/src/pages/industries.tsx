import { useEffect, useState } from "react";
import { api, Industry } from "@/lib/mock-api";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getIndustries().then((data) => {
      setIndustries(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-900 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Industries We Serve</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">Specialized pest control protocols for every business sector.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading industries...</div>
        ) : (
          <div className="space-y-20">
            {industries.map((industry, index) => (
              <div key={industry.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
                <div className="lg:w-1/2">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <img src={industry.image} alt={industry.title} className="w-full h-[400px] object-cover" />
                  </div>
                </div>
                <div className="lg:w-1/2 space-y-6">
                  <div className="inline-block px-4 py-1 bg-slate-100 rounded-full text-slate-600 font-medium text-sm">
                    Sector Focus
                  </div>
                  <h2 className="text-4xl font-bold font-display text-slate-900">{industry.title}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">{industry.description}</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      Customized treatment plans
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      Compliance documentation
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      After-hours service available
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Link href="/contact">
                      <Button size="lg" className="px-8">Get Corporate Quote</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
