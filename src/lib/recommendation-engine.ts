/** Recommendation engine — runs entirely client-side */

export interface UserInput {
  income: number;
  budget: number;
  preferences: string[]; // e.g. ["Movies", "Sports"]
  currentSubs: string[];
}

export interface Plan {
  name: string;
  price: number;
  content: string[];
  description: string;
  color: "purple" | "blue" | "pink" | "cyan" | "green";
}

export interface Recommendation {
  plan: Plan;
  verdict: "recommended" | "warning";
  reason: string;
  /** Is it worth it for the future? */
  futureAdvice: string;
}

export const AVAILABLE_PLANS: Plan[] = [
  { name: "Netflix", price: 15, content: ["Movies", "Series"], description: "Unlimited movies & series streaming", color: "pink" },
  { name: "Hotstar", price: 10, content: ["Sports", "Movies"], description: "Live sports & Bollywood content", color: "blue" },
  { name: "Disney+", price: 12, content: ["Kids", "Movies"], description: "Family-friendly & Marvel content", color: "cyan" },
  { name: "Prime Video", price: 13, content: ["Movies", "News", "Series"], description: "Movies, series & free delivery perks", color: "purple" },
  { name: "YouTube Premium", price: 12, content: ["Movies", "News", "Kids"], description: "Ad-free videos & music", color: "green" },
  { name: "ESPN+", price: 11, content: ["Sports", "News"], description: "Exclusive live sports coverage", color: "blue" },
];

export const CONTENT_OPTIONS = ["Movies", "Series", "Sports", "News", "Kids"];

export function getRecommendations(input: UserInput): Recommendation[] {
  const { budget, income, preferences, currentSubs } = input;

  // Filter plans matching at least one preference and within budget
  const matched = AVAILABLE_PLANS.filter((plan) => {
    const matchesContent = preferences.some((pref) => plan.content.includes(pref));
    const notAlreadySubscribed = !currentSubs.includes(plan.name);
    return matchesContent && notAlreadySubscribed;
  });

  const budgetRatio = budget / income;

  return matched.map((plan): Recommendation => {
    const fits = plan.price <= budget;
    const contentOverlap = preferences.filter((p) => plan.content.includes(p)).length;

    let futureAdvice: string;
    if (!fits) {
      futureAdvice = `❌ Yeh plan aapke budget se bahar hai. Isko lena aapke liye nuksan ho sakta hai — pehle income badhayein.`;
    } else if (budgetRatio > 0.3) {
      futureAdvice = `⚠️ Aap apni income ka ${(budgetRatio * 100).toFixed(0)}% subscriptions pe kharch kar rahe hain. Yeh plan le sakte hain, lekin savings pe dhyan dein.`;
    } else if (contentOverlap >= 2) {
      futureAdvice = `✅ Bilkul faydemand! Yeh plan aapki ${contentOverlap} preferences cover karta hai aur budget mein fit bhi hai. Future ke liye smart choice.`;
    } else {
      futureAdvice = `✅ Yeh plan lena theek hai, lekin sirf ${contentOverlap} preference match karti hai. Agar aapko full value chahiye toh options compare karein.`;
    }

    return {
      plan,
      verdict: fits ? "recommended" : "warning",
      reason: fits
        ? `Fits your ₹${budget} budget — covers ${plan.content.filter((c) => preferences.includes(c)).join(", ")}`
        : `₹${plan.price}/mo exceeds your ₹${budget} budget`,
      futureAdvice,
    };
  });
}
