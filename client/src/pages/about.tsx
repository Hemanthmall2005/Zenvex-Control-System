import { Shield, Target, Users, Award } from "lucide-react";
import heroImage from "@/assets/images/hero-pest-control.png";

export default function About() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">About Zenvex</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Leading the way in eco-friendly pest management solutions since 2010.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-6">Who We Are</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Zenvex Pesticontrol Pvt Ltd is a premier pest management company dedicated to creating healthy, pest-free environments for homes and businesses. With over a decade of experience, we have established ourselves as industry leaders through our commitment to quality, safety, and innovation.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Unlike traditional exterminators who rely heavily on harmful chemicals, we employ Integrated Pest Management (IPM) techniques that focus on long-term prevention and minimal environmental impact.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-3xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-slate-500 font-medium">Years Experience</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-3xl font-bold text-primary mb-1">50k+</div>
                <div className="text-sm text-slate-500 font-medium">Happy Customers</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 transform rotate-3 rounded-3xl"></div>
            <img 
              src={heroImage} 
              alt="Zenvex Team" 
              className="relative rounded-3xl shadow-2xl w-full object-cover h-[500px]"
            />
          </div>
        </div>

        {/* Vision/Mission */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card 
            icon={<Target className="w-8 h-8 text-primary" />}
            title="Our Mission"
            desc="To provide the safest and most effective pest control solutions while protecting the environment and public health."
          />
          <Card 
            icon={<Shield className="w-8 h-8 text-primary" />}
            title="Our Vision"
            desc="To be the most trusted and innovative pest management partner in the country, setting benchmarks for quality service."
          />
          <Card 
            icon={<Users className="w-8 h-8 text-primary" />}
            title="Our Values"
            desc="Integrity, Safety, Innovation, and Customer Satisfaction are at the core of everything we do."
          />
        </div>
      </div>
    </div>
  );
}

function Card({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-display text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}
