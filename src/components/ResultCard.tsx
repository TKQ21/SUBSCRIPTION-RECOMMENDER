import { Recommendation } from "@/lib/recommendation-engine";
import { CheckCircle, AlertTriangle, Sparkles } from "lucide-react";

interface Props {
  recommendation: Recommendation;
  index: number;
}

const planColorMap: Record<string, string> = {
  purple: "shadow-[0_0_25px_hsl(270_80%_60%/0.3)] border-neon-purple/40",
  blue: "shadow-[0_0_25px_hsl(220_90%_60%/0.3)] border-neon-blue/40",
  pink: "shadow-[0_0_25px_hsl(330_85%_60%/0.3)] border-neon-pink/40",
  cyan: "shadow-[0_0_25px_hsl(185_90%_55%/0.3)] border-neon-cyan/40",
  green: "shadow-[0_0_25px_hsl(150_80%_50%/0.3)] border-neon-green/40",
};

const ResultCard = ({ recommendation, index }: Props) => {
  const { plan, verdict, reason, futureAdvice } = recommendation;
  const isRecommended = verdict === "recommended";

  return (
    <div
      className={`glass rounded-xl p-6 border transition-all duration-500 hover:scale-[1.03] hover:brightness-110 ${planColorMap[plan.color] || ""}`}
      style={{
        animationDelay: `${index * 150}ms`,
        animation: "fadeSlideUp 0.6s ease-out forwards",
        opacity: 0,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-neon-purple" />
          <h3 className="font-display text-lg font-bold text-foreground">{plan.name}</h3>
        </div>
        <span className="font-display text-xl font-bold text-neon-cyan">₹{plan.price}<span className="text-xs text-muted-foreground">/mo</span></span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {plan.content.map((tag) => (
          <span key={tag} className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border">
            {tag}
          </span>
        ))}
      </div>

      {/* Verdict */}
      <div className={`flex items-start gap-2 p-3 rounded-lg mb-3 ${isRecommended ? "bg-neon-green/10" : "bg-destructive/10"}`}>
        {isRecommended ? (
          <CheckCircle className="w-5 h-5 text-neon-green shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
        )}
        <p className="text-sm text-foreground">{reason}</p>
      </div>

      {/* Future advice */}
      <div className="p-3 rounded-lg bg-neon-purple/10 border border-neon-purple/20">
        <p className="text-sm font-medium text-foreground mb-1">📊 Future Advice</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{futureAdvice}</p>
      </div>
    </div>
  );
};

export default ResultCard;
