export default function DashboardShell({ profile, onLogout }) {
  return (
    <div className="min-h-screen bg-charcoal px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Welcome back,</p>
            <h1 className="font-display text-2xl font-bold text-white">
              {profile.businessName || 'Your Business'}
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            Log out
          </button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-charcoal2/60 p-6">
            <p className="text-xs uppercase tracking-wide text-slate-500">Net Profit (30d)</p>
            <p className="mt-2 font-display text-2xl font-bold text-emerald">+$0.00</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-charcoal2/60 p-6">
            <p className="text-xs uppercase tracking-wide text-slate-500">Leaks Detected</p>
            <p className="mt-2 font-display text-2xl font-bold text-crimson">0</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-charcoal2/60 p-6">
            <p className="text-xs uppercase tracking-wide text-slate-500">Business Type</p>
            <p className="mt-2 font-display text-2xl font-bold text-gold capitalize">{profile.businessType}</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-white/15 p-12 text-center text-slate-500">
          Connect your ledger to start seeing AI-powered insights here.
        </div>
      </div>
    </div>
  )
}