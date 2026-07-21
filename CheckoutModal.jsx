import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

const COPY = {
  en: {
    title: 'Upgrade your plan',
    subtitle: (name, price) => `You're upgrading to the ${name} plan — ${price}/mo`,
    tabs: { card: 'Card', paypal: 'PayPal', payoneer: 'Direct Transfer' },
    card: {
      number: 'Card number',
      name: 'Name on card',
      expiry: 'MM/YY',
      cvc: 'CVC',
      pay: 'Pay now',
    },
    paypal: {
      blurb: "You'll be redirected to PayPal to complete your subscription securely.",
      pay: 'Pay with PayPal',
    },
    payoneer: {
      bannerTitle: 'Get 2 Months Free via Direct Transfer',
      bannerSub: 'Skip the card fees — pay by bank transfer and we add two months on us.',
      step1: 'Transfer the plan amount to:',
      step2: 'Use your account email as the transfer reference.',
      step3: 'Upload your transaction receipt below for instant verification.',
      uploadLabel: 'Upload transaction receipt',
      uploadHint: 'PNG, JPG or PDF up to 10MB',
      confirm: 'Submit receipt',
    },
    processing: 'Processing your payment…',
    success: 'Payment Received Successfully!',
    successSub: 'Your plan is now active. A confirmation has been sent to your email.',
    close: 'Close',
    changed: 'File selected:',
  },
  fr: {
    title: 'Mettez à niveau votre formule',
    subtitle: (name, price) => `Vous passez à la formule ${name} — ${price}/mois`,
    tabs: { card: 'Carte', paypal: 'PayPal', payoneer: 'Virement Direct' },
    card: {
      number: 'Numéro de carte',
      name: 'Nom sur la carte',
      expiry: 'MM/AA',
      cvc: 'CVC',
      pay: 'Payer maintenant',
    },
    paypal: {
      blurb: 'Vous serez redirigé vers PayPal pour finaliser votre abonnement en toute sécurité.',
      pay: 'Payer avec PayPal',
    },
    payoneer: {
      bannerTitle: '2 Mois Offerts via Virement Direct',
      bannerSub: 'Évitez les frais de carte — payez par virement bancaire et recevez deux mois offerts.',
      step1: 'Virez le montant de la formule à :',
      step2: 'Utilisez l’e-mail de votre compte comme référence de virement.',
      step3: 'Téléversez votre reçu de transaction ci-dessous pour une vérification instantanée.',
      uploadLabel: 'Téléverser le reçu de transaction',
      uploadHint: 'PNG, JPG ou PDF jusqu’à 10 Mo',
      confirm: 'Soumettre le reçu',
    },
    processing: 'Traitement de votre paiement…',
    success: 'Paiement Reçu avec Succès !',
    successSub: 'Votre formule est maintenant active. Une confirmation a été envoyée à votre e-mail.',
    close: 'Fermer',
    changed: 'Fichier sélectionné :',
  },
  ar: {
    title: 'ترقية باقتك',
    subtitle: (name, price) => `أنت تقوم بالترقية إلى باقة ${name} — ${price}/شهريًا`,
    tabs: { card: 'بطاقة', paypal: 'باي بال', payoneer: 'تحويل مباشر' },
    card: {
      number: 'رقم البطاقة',
      name: 'الاسم على البطاقة',
      expiry: 'شهر/سنة',
      cvc: 'رمز التحقق',
      pay: 'ادفع الآن',
    },
    paypal: {
      blurb: 'سيتم تحويلك إلى باي بال لإتمام اشتراكك بأمان.',
      pay: 'ادفع عبر باي بال',
    },
    payoneer: {
      bannerTitle: 'احصل على شهرين مجانًا عبر التحويل المباشر',
      bannerSub: 'تجنب رسوم البطاقة — ادفع عبر تحويل بنكي ونضيف لك شهرين مجانًا.',
      step1: 'حوّل مبلغ الباقة إلى:',
      step2: 'استخدم بريدك الإلكتروني كمرجع للتحويل.',
      step3: 'ارفع إيصال العملية أدناه للتحقق الفوري.',
      uploadLabel: 'رفع إيصال العملية',
      uploadHint: 'PNG أو JPG أو PDF حتى 10 ميجابايت',
      confirm: 'إرسال الإيصال',
    },
    processing: 'جاري معالجة الدفع…',
    success: 'تم استلام الدفع بنجاح!',
    successSub: 'باقتك مفعّلة الآن. تم إرسال تأكيد إلى بريدك الإلكتروني.',
    close: 'إغلاق',
    changed: 'الملف المحدد:',
  },
}

const TRANSFER_EMAIL = 'billing@universaladvisor.com'

function CardBrandIcons() {
  return (
    <div className="flex items-center gap-2 opacity-90">
      <svg width="32" height="20" viewBox="0 0 32 20" className="rounded-sm bg-white p-0.5">
        <text x="16" y="14" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1A1F71">
          VISA
        </text>
      </svg>
      <svg width="32" height="20" viewBox="0 0 32 20">
        <circle cx="13" cy="10" r="7" fill="#EB001B" />
        <circle cx="19" cy="10" r="7" fill="#F79E1B" fillOpacity="0.9" />
      </svg>
      <svg width="32" height="20" viewBox="0 0 32 20" className="rounded-sm bg-white p-0.5">
        <text x="16" y="14" textAnchor="middle" fontSize="7" fontWeight="700" fill="#FF4400">
          Payoneer
        </text>
      </svg>
    </div>
  )
}

function CardTab({ copy, onPay }) {
  const [form, setForm] = useState({ number: '', name: '', expiry: '', cvc: '' })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onPay()
      }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium uppercase tracking-wide text-slate-400">{copy.number}</label>
        <CardBrandIcons />
      </div>
      <input
        required
        placeholder="4242 4242 4242 4242"
        value={form.number}
        onChange={(e) => setForm({ ...form, number: e.target.value })}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald focus:outline-none focus:ring-1 focus:ring-emerald"
      />
      <div>
        <label className="text-xs font-medium uppercase tracking-wide text-slate-400">{copy.name}</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald focus:outline-none focus:ring-1 focus:ring-emerald"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400">{copy.expiry}</label>
          <input
            required
            placeholder="MM/YY"
            value={form.expiry}
            onChange={(e) => setForm({ ...form, expiry: e.target.value })}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald focus:outline-none focus:ring-1 focus:ring-emerald"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400">{copy.cvc}</label>
          <input
            required
            placeholder="123"
            value={form.cvc}
            onChange={(e) => setForm({ ...form, cvc: e.target.value })}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald focus:outline-none focus:ring-1 focus:ring-emerald"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-emerald py-3 text-sm font-semibold text-charcoal shadow-glow-emerald transition hover:brightness-110"
      >
        {copy.pay}
      </button>
    </form>
  )
}

function PaypalTab({ copy, onPay }) {
  return (
    <div className="space-y-6 text-center">
      <p className="text-sm text-slate-400">{copy.blurb}</p>
      <button
        onClick={onPay}
        className="mx-auto flex w-full items-center justify-center gap-2 rounded-full bg-[#FFC439] py-3 text-sm font-bold text-[#003087] transition hover:brightness-105"
      >
        <span className="italic">Pay</span>
        <span className="font-black italic text-[#009cde]">Pal</span>
        <span className="sr-only">{copy.pay}</span>
      </button>
    </div>
  )
}

function PayoneerTab({ copy, onPay }) {
  const [fileName, setFileName] = useState(null)

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-gold/30 bg-gold/10 p-4">
        <p className="text-sm font-bold text-gold">{copy.bannerTitle}</p>
        <p className="mt-1 text-xs text-gold/80">{copy.bannerSub}</p>
      </div>

      <ol className="space-y-3 text-sm text-slate-300">
        <li className="flex gap-3">
          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs">
            1
          </span>
          <span>
            {copy.step1}{' '}
            <span className="font-mono font-semibold text-emerald">{TRANSFER_EMAIL}</span>
          </span>
        </li>
        <li className="flex gap-3">
          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs">
            2
          </span>
          <span>{copy.step2}</span>
        </li>
        <li className="flex gap-3">
          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs">
            3
          </span>
          <span>{copy.step3}</span>
        </li>
      </ol>

      <label className="block cursor-pointer rounded-xl border-2 border-dashed border-white/15 bg-white/5 px-4 py-8 text-center transition hover:border-emerald/50 hover:bg-white/10">
        <input
          type="file"
          accept="image/*,application/pdf"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
        />
        <svg viewBox="0 0 24 24" className="mx-auto mb-2 h-8 w-8 text-slate-400" fill="none">
          <path
            d="M12 16V4m0 0L7 9m5-5l5 5M5 20h14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-sm font-medium text-slate-200">{copy.uploadLabel}</p>
        <p className="mt-1 text-xs text-slate-500">{copy.uploadHint}</p>
        {fileName && (
          <p className="mt-3 text-xs text-emerald">
            {copy.changed} {fileName}
          </p>
        )}
      </label>

      <button
        onClick={onPay}
        disabled={!fileName}
        className="w-full rounded-full bg-emerald py-3 text-sm font-semibold text-charcoal shadow-glow-emerald transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {copy.confirm}
      </button>
    </div>
  )
}

export default function CheckoutModal({ plan, formatPrice, onClose }) {
  const { lang } = useLanguage()
  const copy = COPY[lang]
  const [tab, setTab] = useState('card')
  const [status, setStatus] = useState('idle') // idle | processing | success

  function startPayment() {
    setStatus('processing')
    setTimeout(() => setStatus('success'), 1800)
  }

  if (!plan) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="glass relative w-full max-w-md rounded-2xl p-7 shadow-2xl">
        {status !== 'success' && (
          <button
            onClick={onClose}
            className="absolute end-5 top-5 text-slate-400 transition hover:text-white"
            aria-label={copy.close}
          >
            ✕
          </button>
        )}

        {status === 'success' ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald/15 text-emerald shadow-glow-emerald">
              <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none">
                <path d="M4 12l6 6L20 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-emerald">{copy.success}</h3>
            <p className="mt-2 text-sm text-slate-400">{copy.successSub}</p>
            <button
              onClick={onClose}
              className="mt-8 w-full rounded-full bg-emerald py-3 text-sm font-semibold text-charcoal transition hover:brightness-110"
            >
              {copy.close}
            </button>
          </div>
        ) : status === 'processing' ? (
          <div className="flex flex-col items-center py-10 text-center">
            <div className="mb-5 h-10 w-10 animate-spin rounded-full border-2 border-emerald/30 border-t-emerald" />
            <p className="text-sm text-slate-300">{copy.processing}</p>
          </div>
        ) : (
          <>
            <h2 className="font-display text-xl font-bold text-white">{copy.title}</h2>
            <p className="mt-1 text-sm text-slate-400">{copy.subtitle(plan.name, formatPrice(plan.price))}</p>

            <div className="mt-6 flex gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-sm">
              {['card', 'paypal', 'payoneer'].map((key) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`flex-1 rounded-full py-2 font-medium transition ${
                    tab === key ? 'bg-emerald text-charcoal' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {copy.tabs[key]}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {tab === 'card' && <CardTab copy={copy.card} onPay={startPayment} />}
              {tab === 'paypal' && <PaypalTab copy={copy.paypal} onPay={startPayment} />}
              {tab === 'payoneer' && <PayoneerTab copy={copy.payoneer} onPay={startPayment} />}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
