import { useState } from 'react'

const BUSINESS_TYPES = [
  { id: 'ecommerce', icon: '🛒', title: 'E-commerce & COD', desc: 'Online stores, cash on delivery' },
  { id: 'services', icon: '🧑\u200d💼', title: 'Services & Freelancing', desc: 'Consulting, agencies, freelance work' },
  { id: 'retail', icon: '🏬', title: 'Local Retail & Shops', desc: 'Pharmacies, cafes, neighborhood stores' },
]

export default function OnboardingModal({ onClose, onComplete }) {
  const [step, setStep] = useState(1)
  const [account, setAccount] = useState({ name: '', email: '', password: '' })
  const [businessType, setBusinessType] = useState(null)
  const [businessName, setBusinessName] = useState('')

  function handleStep1Submit(e) {
    e.preventDefault()
    setStep(2)
  }

  function handleStep2Submit(e) {
    e.preventDefault()
    if (!businessType || !businessName.trim()) return
    onComplete({ account, businessType, businessName })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="glass relative w-full max-w-lg rounded-2xl p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute end-5 top-5 text-slate-400 transition hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="mb-6 flex items-center gap-2">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-emerald' : 'bg-white/10'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-emerald' : 'bg-white/10'}`} />
        </div>

        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4 transition-opacity duration-300">
            <h2 className="font-display text-xl font-bold text-white">Create your account</h2>
            <p className="text-sm text-slate-400">Start scanning your ledger in under two minutes.</p>

            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-slate-400">Full Name</label>
              <input
                required
                value={account.name}
                onChange={(e) => setAccount({ ...account, name: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald focus:outline-none focus:ring-1 focus:ring-emerald"
                placeholder="Yasmine El Amrani"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-slate-400">Email</label>
              <input
                required
                type="email"
                value={account.email}
                onChange={(e) => setAccount({ ...account, email: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald focus:outline-none focus:ring-1 focus:ring-emerald"
                placeholder="you@business.com"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-slate-400">Password</label>
              <input
                required
                type="password"
                minLength={8}
                value={account.password}
                onChange={(e) => setAccount({ ...account, password: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald focus:outline-none focus:ring-1 focus:ring-emerald"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-emerald py-3 text-sm font-semibold text-charcoal shadow-glow-emerald transition hover:brightness-110"
            >
              Continue
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-5 transition-opacity duration-300">
            <h2 className="font-display text-xl font-bold text-white">Tell us about your business</h2>
            <p className="text-sm text-slate-400">This tunes the AI accountant to your industry.</p>

            <div className="grid gap-3">
              {BUSINESS_TYPES.map((b) => (
                <button
                  type="button"
                  key={b.id}
                  onClick={() => setBusinessType(b.id)}
                  className={`flex items-center gap-4 rounded-xl border p-4 text-start transition ${
                    businessType === b.id
                      ? 'border-emerald bg-emerald/10 shadow-glow-emerald'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <span className="text-2xl">{b.icon}</span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{b.title}</span>
                    <span className="block text-xs text-slate-400">{b.desc}</span>
                  </span>
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Store or Business Name
              </label>
              <input
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald focus:outline-none focus:ring-1 focus:ring-emerald"
                placeholder="Atlas Grocers"
              />
            </div>

            <button
              type="submit"
              disabled={!businessType || !businessName.trim()}
              className="w-full rounded-full bg-emerald py-3 text-sm font-semibold text-charcoal shadow-glow-emerald transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Enter Dashboard
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
