# Subscription Recommender

**Subscription Recommender** is a web application that helps users select the best OTT/streaming subscription plan based on their income, monthly budget, and content preferences. The app covers popular platforms like Netflix, Hotstar, Disney+, Prime Video, YouTube Premium, and ESPN+. It features a sleek **neon-themed UI** with animated stars for a modern, engaging user experience.

project: https://subscription-recommend.lovable.app
---

## Features

- **User Inputs:**
  - Monthly Income (₹)
  - Subscription Budget (₹/mo)
  - Preferred Content (Movies, Series, Sports, News, Kids)
  - Current Subscriptions (optional)
  
- **Real-Time Recommendations:**
  - Suggests OTT platforms that fit user’s budget and content preference
  - Skips already subscribed plans
  - Provides “Future Advice” for each recommended plan
  
- **Frontend:**
  - React + Tailwind CSS
  - Neon theme with animated stars
  - Responsive design

- **Backend:**
  - FastAPI
  - Rule-based recommendation engine
  - Input validation and error handling

---


Usage

Fill in the Monthly Income and Subscription Budget.

Select Preferred Content checkboxes (Movies, Series, Sports, etc.).

Optionally, select Current Subscriptions to skip already owned plans.

Click Recommend.

View the recommended OTT plans along with “Future Advice”.

Sample Output
Recommended Plan(s): Hotstar, Disney+, Prime Video

Hotstar
₹10/mo
Covers Sports, Movies
✅ Bilkul faydemand! Yeh plan aapki 2 preferences cover karta hai aur budget mein fit bhi hai.

Disney+
₹12/mo
Covers Movies
✅ Yeh plan lena theek hai, lekin sirf 1 preference match karti hai.

Prime Video
₹13/mo
Covers Movies
✅ Yeh plan lena theek hai, lekin sirf 1 preference match karti hai.
