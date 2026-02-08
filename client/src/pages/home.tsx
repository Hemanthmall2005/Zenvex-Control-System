import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldCheck, Clock, Award, ArrowRight, Bug, Rat, Droplets } from "lucide-react";
import heroImage from "@/assets/images/hero-pest-control.png";
import serviceTermite from "@/assets/images/service-termite.jpg";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative bg-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 hidden lg:block -skew-x-12 translate-x-20"></div>
        
        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left-10 duration-700 fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <ShieldCheck size={16} />
                <span>Licensed & Certified Experts</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold font-display leading-[1.1] text-slate-900">
                Protect Your Home <br/>
                <span className="text-primary">From Pests.</span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                Zenvex provides hospital-grade, eco-friendly pest control solutions for homes and businesses. We guarantee a pest-free environment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book-service">
                  <Button size="lg" className="h-14 px-8 text-lg font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                    Get Free Inspection
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg bg-white/50 backdrop-blur border-slate-300 hover:bg-white hover:text-primary">
                    View Services
                  </Button>
                </Link>
              </div>
              
              <div className="pt-8 flex items-center gap-8 text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-primary" size={20} />
                  <span>Eco-Friendly</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-primary" size={20} />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-primary" size={20} />
                  <span>Guaranteed Results</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-in slide-in-from-right-10 duration-1000 fade-in delay-200">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={heroImage} 
                  alt="Professional Pest Control Team" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs animate-in zoom-in duration-500 delay-500">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                    <Award size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg">#1 Rated</div>
                    <div className="text-slate-500 text-sm">Pest Control Agency</div>
                  </div>
                </div>
                <div className="flex gap-1 text-yellow-400">
                  {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Our Expertise</h2>
            <h3 className="text-4xl font-bold font-display text-slate-900 mb-6">Comprehensive Pest Solutions</h3>
            <p className="text-slate-600 text-lg">We don't just spray chemicals. We understand pest biology and behavior to eliminate the root cause of infestations.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Bug className="w-10 h-10 text-white" />}
              title="Termite Control"
              desc="Advanced detection and elimination systems to protect your property's structural integrity."
              color="bg-orange-500"
              img={serviceTermite}
            />
            <ServiceCard 
              icon={<Rat className="w-10 h-10 text-white" />}
              title="Rodent Management"
              desc="Strategic trapping and exclusion services to keep rats and mice out of your premises permanently."
              color="bg-slate-700"
              img={heroImage}
            />
            <ServiceCard 
              icon={<Droplets className="w-10 h-10 text-white" />}
              title="General Disinfection"
              desc="Hospital-grade sterilization services to eliminate viruses, bacteria, and allergens."
              color="bg-blue-500"
              img={heroImage}
            />
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="outline" size="lg" className="group">
                View All Services <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold font-display mb-8">Why Zenvex is the Right Choice?</h3>
              <div className="space-y-8">
                <FeatureRow 
                  icon={<ShieldCheck className="text-primary" size={28} />}
                  title="Certified & Licensed"
                  desc="Our technicians are fully licensed and undergo rigorous training in the latest pest control technologies."
                />
                <FeatureRow 
                  icon={<CheckCircle className="text-primary" size={28} />}
                  title="Eco-Friendly Products"
                  desc="We use WHO-approved, odorless, and eco-friendly chemicals that are safe for kids and pets."
                />
                <FeatureRow 
                  icon={<Clock className="text-primary" size={28} />}
                  title="On-Time Service"
                  desc="We value your time. Our technicians arrive within the scheduled window, every time."
                />
              </div>
            </div>
            
            <div className="bg-primary rounded-3xl p-8 lg:p-12 text-center transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <h4 className="text-2xl font-bold mb-6">Need Immediate Assistance?</h4>
              <p className="text-primary-foreground/90 mb-8 text-lg">Our experts are available 24/7 to handle emergency infestations.</p>
              <div className="text-5xl font-bold mb-8">98765 43210</div>
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="w-full text-lg h-14 font-bold text-primary hover:text-primary/90">
                  Contact Us Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, desc, color, img }: { icon: any, title: string, desc: string, color: string, img: string }) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-white shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="h-48 overflow-hidden relative">
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity ${color}`}></div>
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className={`absolute bottom-4 left-4 p-3 rounded-xl ${color} shadow-lg`}>
          {icon}
        </div>
      </div>
      <div className="p-8 pt-10">
        <h4 className="text-xl font-bold mb-3 font-display">{title}</h4>
        <p className="text-slate-500 mb-6">{desc}</p>
        <Link href="/services" className="text-primary font-semibold flex items-center hover:underline">
          Learn more <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
}

function FeatureRow({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex gap-5">
      <div className="shrink-0 w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
        {icon}
      </div>
      <div>
        <h5 className="text-xl font-bold mb-2">{title}</h5>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
