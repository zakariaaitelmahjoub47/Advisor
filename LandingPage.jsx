import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

function LangDropdown() {
  const { lang, setLang, languages } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const active = languages.find((l) => l.code === lang)

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition hover:border-gold/40 hover:bg-white/10"
      >
        <span>{active.flag}</span>
        <span>{active.label}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" className={`transition ${open ? 'rotate-180' : ''}`}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>
      {open && (
        <div className="absolute end-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-charcoal2/95 shadow-glow-gold backdrop-blur-xl">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code)
                setOpen(false)
              }}
              className={`flex w-full items-center gap-2 px-4 py-2.5 text-start text-sm transition hover:bg-gold/10 ${
                l.code === lang ? 'text-gold' : 'text-slate-200'
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Navbar({ onStartTrial }) {
  const { t } = useLanguage()
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-charcoal/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald to-gold text-charcoal font-bold">
            U
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            Universal <span className="text-gold">Profit</span> Advisor
          </span>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          <a href="#features" className="transition hover:text-white">
            {t.nav.features}
          </a>
          <a href="#pricing" className="transition hover:text-white">
            {t.nav.pricing}
          </a>
          <a href="#" className="transition hover:text-white">
            {t.nav.login}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LangDropdown />
          <button
            onClick={onStartTrial}
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-charcoal shadow-glow-gold transition hover:brightness-110 md:px-5"
          >
            {t.nav.cta}
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero({ onStartTrial }) {
  const { t } = useLanguage()
  return (
    <section className="relative overflow-hidden bg-grid-fade px-6 pb-24 pt-20 text-center">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
          {t.hero.badge}
        </div>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          {t.hero.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">{t.hero.subhead}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={onStartTrial}
            className="w-full rounded-full bg-emerald px-8 py-4 text-base font-semibold text-charcoal shadow-glow-emerald transition hover:brightness-110 sm:w-auto"
          >
            {t.hero.ctaPrimary}
          </button>
          <button className="w-full rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-slate-100 backdrop-blur transition hover:bg-white/10 sm:w-auto">
            {t.hero.ctaSecondary}
          </button>
        </div>
      </div>
    </section>
  )
}

const FEATURE_ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M4 4h16v4H4V4zm0 6h10v4H4v-4zm0 6h16v4H4v-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path d="M4 12l6 6L20 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
]

function Features() {
  const { t } = useLanguage()
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald">{t.features.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{t.features.title}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {t.features.items.map((f, i) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-white/10 bg-charcoal2/60 p-7 transition hover:-translate-y-1 hover:border-emerald/40 hover:shadow-glow-emerald"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                {FEATURE_ICONS[i]}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCard({ plan, popularLabel, perMonth, ctaLabel, formatPrice, onUpgrade, highlighted }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 ${
        highlighted
          ? 'border-emerald bg-charcoal2 shadow-glow-emerald md:-translate-y-3'
          : 'border-white/10 bg-charcoal2/50'
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 start-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wide text-charcoal">
          {popularLabel}
        </span>
      )}
      <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
      <p className="mt-1 text-sm text-slate-400">{plan.desc}</p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-4xl font-bold text-white">{formatPrice(plan.price)}</span>
        <span className="text-slate-500">{perMonth}</span>
      </div>
      <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-300">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald" fill="none">
              <path d="M4 12l6 6L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={() => onUpgrade(plan)}
        className={`mt-8 w-full rounded-full py-3 text-sm font-semibold transition ${
          highlighted
            ? 'bg-emerald text-charcoal hover:brightness-110'
            : 'border border-white/15 bg-white/5 text-slate-100 hover:bg-white/10'
        }`}
      >
        {plan.id === 'starter' ? ctaLabel : ctaLabel}
      </button>
    </div>
  )
}

function Pricing({ onUpgrade }) {
  const { t, formatPrice } = useLanguage()
  return (
    <section id="pricing" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">{t.pricing.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{t.pricing.title}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {t.pricing.plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              highlighted={plan.id === 'pro'}
              popularLabel={t.pricing.popular}
              perMonth={t.pricing.perMonth}
              ctaLabel={plan.id === 'starter' ? t.pricing.start : t.pricing.upgrade}
              formatPrice={formatPrice}
              onUpgrade={onUpgrade}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function LandingPage({ onStartTrial, onUpgrade }) {
  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar onStartTrial={onStartTrial} />
      <Hero onStartTrial={onStartTrial} />
      <Features />
      <Pricing onUpgrade={onUpgrade} />
      <footer className="border-t border-white/5 px-6 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Universal Profit Advisor. All rights reserved.
      </footer>
    </div>
  )
}
