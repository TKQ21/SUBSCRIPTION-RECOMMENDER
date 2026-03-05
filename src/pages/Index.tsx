import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, Loader2, Zap, IndianRupee, Wallet, Tv, ListChecks } from "lucide-react";
import StarField from "@/components/StarField";
import ResultCard from "@/components/ResultCard";
import { getRecommendations, Recommendation, CONTENT_OPTIONS, AVAILABLE_PLANS } from "@/lib/recommendation-engine";

const Index = () => {
  const [income, setIncome] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [currentSubs, setCurrentSubs] = useState<string[]>([]);
  const [results, setResults] = useState<Recommendation[] | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleContent = (item: string) => {
    setSelectedContent((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  const toggleSub = (item: string) => {
    setCurrentSubs((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  const handleRecommend = async () => {
    // Validation
    const incomeNum = parseFloat(income);
    const budgetNum = parseFloat(budget);

    if (!income || isNaN(incomeNum) || incomeNum <= 0) {
      toast.error("Please enter a valid monthly income");
      return;
    }
    if (!budget || isNaN(budgetNum) || budgetNum <= 0) {
      toast.error("Please enter a valid subscription budget");
      return;
    }
    if (budgetNum > incomeNum) {
      toast.error("Budget cannot exceed your income!");
      return;
    }
    if (selectedContent.length === 0) {
      toast.error("Please select at least one content preference");
      return;
    }

    setLoading(true);
    setResults(null);

    // Simulate API call delay
    await new Promise((r) => setTimeout(r, 1200));

    try {
      const recs = getRecommendations({
        income: incomeNum,
        budget: budgetNum,
        preferences: selectedContent,
        currentSubs,
      });

      if (recs.length === 0) {
        toast.warning("No plans match your preferences. Try adjusting your content choices.");
      } else {
        toast.success(`Found ${recs.length} recommendation${recs.length > 1 ? "s" : ""} for you!`);
      }

      setResults(recs);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient background */}
      <div className="fixed inset-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/15 via-neon-blue/10 to-neon-pink/15 animate-gradient" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-[120px]" />
      </div>

      <StarField />

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-neon-pink" />
            <h1 className="font-display text-4xl md:text-5xl font-bold neon-text text-foreground">
              SubSmart
            </h1>
            <Zap className="w-8 h-8 text-neon-cyan" />
          </div>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Smart subscription recommendations — pata lagao kaunsa plan future mein faydemand hai ya nuksan
          </p>
        </div>

        {/* Input Form */}
        <div className="glass-strong rounded-2xl p-8 mb-10 animate-pulse-glow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Income */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <IndianRupee className="w-4 h-4 text-neon-green" />
                Monthly Income (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 50000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Wallet className="w-4 h-4 text-neon-cyan" />
                Subscription Budget (₹/mo)
              </label>
              <input
                type="number"
                placeholder="e.g. 500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>
          </div>

          {/* Content preferences */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
              <Tv className="w-4 h-4 text-neon-purple" />
              Preferred Content
            </label>
            <div className="flex flex-wrap gap-2">
              {CONTENT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => toggleContent(opt)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                    selectedContent.includes(opt)
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_hsl(270_80%_60%/0.4)]"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Current subscriptions */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
              <ListChecks className="w-4 h-4 text-neon-pink" />
              Current Subscriptions (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_PLANS.map((plan) => (
                <button
                  key={plan.name}
                  onClick={() => toggleSub(plan.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                    currentSubs.includes(plan.name)
                      ? "bg-accent text-accent-foreground border-accent shadow-[0_0_15px_hsl(330_85%_60%/0.4)]"
                      : "bg-muted text-muted-foreground border-border hover:border-accent/50"
                  }`}
                >
                  {plan.name}
                </button>
              ))}
            </div>
          </div>

          {/* Recommend button */}
          <button
            onClick={handleRecommend}
            disabled={loading}
            className="w-full py-4 rounded-xl font-display font-bold text-lg bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink text-primary-foreground hover:brightness-110 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_30px_hsl(270_80%_60%/0.3)]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Get Recommendations
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {results && (
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center neon-text-pink">
              {results.length > 0 ? "🎯 Your Recommendations" : "😕 No Matching Plans"}
            </h2>
            {results.length === 0 ? (
              <div className="glass rounded-xl p-8 text-center">
                <p className="text-muted-foreground text-lg">
                  Koi bhi plan aapki preferences aur budget se match nahi karta. Apna budget ya preferences adjust karein.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((rec, i) => (
                  <ResultCard key={rec.plan.name} recommendation={rec} index={i} />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Inline keyframe for result cards */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Index;
