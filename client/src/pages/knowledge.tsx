import { useEffect, useState } from "react";
import { api, Article } from "@/lib/mock-api";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function KnowledgePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getArticles().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-slate-900 mb-4">Pest Library</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Expert advice, tips, and guides on keeping your environment pest-free.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading articles...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors"></div>
                  {/* Placeholder for article image */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-500/20"></div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
                    <span className="flex items-center gap-1"><User size={14} /> {article.author}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-slate-900 mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-3">{article.excerpt}</p>
                  <Button variant="link" className="p-0 h-auto font-semibold text-primary hover:no-underline group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
