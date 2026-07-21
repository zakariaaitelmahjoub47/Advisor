# Universal Profit Advisor — Frontend

Vite + React + Tailwind CSS landing page and onboarding flow.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

## Structure

```
universal-profit-advisor/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── LanguageContext.jsx   # EN / AR / FR + RTL mirroring + MAD pricing
    └── components/
        ├── LandingPage.jsx       # Navbar, hero, features, pricing
        ├── OnboardingModal.jsx   # 2-step signup + business context
        ├── CheckoutModal.jsx     # Card / PayPal / Payoneer transfer tabs
        └── DashboardShell.jsx    # Minimal post-onboarding workspace
```
