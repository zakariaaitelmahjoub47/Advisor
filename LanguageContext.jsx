import { createContext, useContext, useEffect, useState, useMemo } from 'react'

const LanguageContext = createContext(null)

export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'ar', label: 'العربية', flag: '🇲🇦', dir: 'rtl' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
]

// Central translation dictionary for the public landing page.
const translations = {
  en: {
    nav: {
      features: 'Features',
      pricing: 'Pricing',
      login: 'Log in',
      cta: 'Start Free Trial',
    },
    hero: {
      badge: '✨ AI-Powered P&L Intelligence',
      headline: 'Stop Financial Leaks in Your Business Instantly',
      subhead:
        'Universal Profit Advisor scans your ledgers in real time, flags every leak, and hands your accountant a clean export in one click.',
      ctaPrimary: 'Start Free Trial',
      ctaSecondary: 'Watch Demo',
    },
    features: {
      eyebrow: 'What you get',
      title: 'Built for merchants who hate surprises',
      items: [
        {
          title: 'AI Ledger Scanning',
          desc: 'Point a camera at any receipt or ledger page and let the model reconcile it against your books automatically.',
        },
        {
          title: 'Real-time Leak Alerts',
          desc: 'Get pinged the moment a margin slips, a refund spikes, or a supplier price quietly creeps up.',
        },
        {
          title: 'One-Click Accountant Export',
          desc: 'Package a clean, audit-ready statement for your accountant without touching a spreadsheet.',
        },
      ],
    },
    pricing: {
      eyebrow: 'Plans',
      title: 'Pricing that scales with your ledger',
      popular: 'MOST POPULAR',
      perMonth: '/mo',
      upgrade: 'Upgrade',
      start: 'Get Started',
      plans: [
        {
          id: 'starter',
          name: 'Starter',
          price: 19,
          desc: 'Basic manual data tracking for solo operators.',
          features: ['Manual ledger entry', 'Monthly summary', 'Email support'],
        },
        {
          id: 'pro',
          name: 'Pro',
          price: 39,
          desc: 'AI vision scanning plus your dynamic financial accountant.',
          features: [
            'Everything in Starter',
            'AI vision ledger scanning',
            'Dynamic AI accountant',
            'Real-time leak alerts',
          ],
        },
        {
          id: 'scale',
          name: 'Scale',
          price: 79,
          desc: 'High-tier analytics with automated leak triggers.',
          features: [
            'Everything in Pro',
            'Advanced business analytics',
            'Automated WhatsApp Business alerts',
            'Priority support',
          ],
        },
      ],
    },
  },
  fr: {
    nav: {
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      login: 'Connexion',
      cta: 'Essai Gratuit',
    },
    hero: {
      badge: '✨ Intelligence P&L Alimentée par IA',
      headline: 'Arrêtez les Fuites Financières de Votre Entreprise Instantanément',
      subhead:
        'Universal Profit Advisor analyse vos registres en temps réel, signale chaque fuite et prépare un export prêt pour votre comptable en un clic.',
      ctaPrimary: 'Essai Gratuit',
      ctaSecondary: 'Voir la Démo',
    },
    features: {
      eyebrow: 'Ce que vous obtenez',
      title: "Conçu pour les commerçants qui détestent les surprises",
      items: [
        {
          title: 'Scan de Registre par IA',
          desc: "Photographiez un reçu ou une page de registre et laissez le modèle le rapprocher automatiquement de vos comptes.",
        },
        {
          title: 'Alertes de Fuite en Temps Réel',
          desc: 'Soyez averti dès qu’une marge glisse, qu’un remboursement grimpe ou qu’un prix fournisseur augmente discrètement.',
        },
        {
          title: 'Export Comptable en Un Clic',
          desc: 'Générez un relevé propre et prêt pour l’audit pour votre comptable, sans toucher à un tableur.',
        },
      ],
    },
    pricing: {
      eyebrow: 'Formules',
      title: 'Des tarifs qui évoluent avec votre registre',
      popular: 'LE PLUS POPULAIRE',
      perMonth: '/mois',
      upgrade: 'Mettre à niveau',
      start: 'Commencer',
      plans: [
        {
          id: 'starter',
          name: 'Starter',
          price: 19,
          desc: 'Suivi manuel de base pour les opérateurs indépendants.',
          features: ['Saisie manuelle du registre', 'Résumé mensuel', 'Support par e-mail'],
        },
        {
          id: 'pro',
          name: 'Pro',
          price: 39,
          desc: 'Scan par vision IA et votre comptable financier dynamique.',
          features: [
            'Tout Starter inclus',
            'Scan de registre par vision IA',
            'Comptable IA dynamique',
            'Alertes de fuite en temps réel',
          ],
        },
        {
          id: 'scale',
          name: 'Scale',
          price: 79,
          desc: 'Analyses avancées avec déclencheurs de fuite automatisés.',
          features: [
            'Tout Pro inclus',
            'Analyses commerciales avancées',
            'Alertes WhatsApp Business automatisées',
            'Support prioritaire',
          ],
        },
      ],
    },
  },
  ar: {
    nav: {
      features: 'المزايا',
      pricing: 'الأسعار',
      login: 'تسجيل الدخول',
      cta: 'ابدأ تجربة مجانية',
    },
    hero: {
      badge: '✨ ذكاء اصطناعي لتحليل الأرباح والخسائر',
      headline: 'أوقف تسريبات أموال عملك فورًا',
      subhead:
        'يقوم Universal Profit Advisor بمسح دفاترك في الوقت الفعلي، ويكشف كل تسريب، ويجهّز تقريرًا جاهزًا لمحاسبك بضغطة واحدة.',
      ctaPrimary: 'ابدأ تجربة مجانية',
      ctaSecondary: 'شاهد العرض التوضيحي',
    },
    features: {
      eyebrow: 'ما الذي تحصل عليه',
      title: 'مصمّم للتجار الذين لا يحبون المفاجآت',
      items: [
        {
          title: 'مسح الدفاتر بالذكاء الاصطناعي',
          desc: 'وجّه الكاميرا نحو أي فاتورة أو صفحة دفتر ودع النموذج يطابقها تلقائيًا مع حساباتك.',
        },
        {
          title: 'تنبيهات التسريب الفورية',
          desc: 'يصلك إشعار فور انخفاض هامش الربح أو ارتفاع المرتجعات أو ارتفاع سعر أحد الموردين بهدوء.',
        },
        {
          title: 'تصدير جاهز للمحاسب بنقرة واحدة',
          desc: 'جهّز كشفًا نظيفًا وجاهزًا للتدقيق لمحاسبك دون فتح أي جدول بيانات.',
        },
      ],
    },
    pricing: {
      eyebrow: 'الباقات',
      title: 'أسعار تتوسع مع نمو دفاترك',
      popular: 'الأكثر شيوعًا',
      perMonth: '/شهريًا',
      upgrade: 'ترقية',
      start: 'ابدأ الآن',
      plans: [
        {
          id: 'starter',
          name: 'المبتدئ',
          price: 19,
          desc: 'تتبع يدوي أساسي للأعمال الفردية.',
          features: ['إدخال يدوي للدفاتر', 'ملخص شهري', 'دعم عبر البريد الإلكتروني'],
        },
        {
          id: 'pro',
          name: 'الاحترافي',
          price: 39,
          desc: 'مسح بالرؤية الاصطناعية ومحاسبك المالي الديناميكي.',
          features: [
            'كل ما في باقة المبتدئ',
            'مسح الدفاتر بالرؤية الاصطناعية',
            'محاسب ذكاء اصطناعي ديناميكي',
            'تنبيهات التسريب الفورية',
          ],
        },
        {
          id: 'scale',
          name: 'التوسّع',
          price: 79,
          desc: 'تحليلات أعمال متقدمة مع محفزات تسريب آلية.',
          features: [
            'كل ما في باقة الاحترافي',
            'تحليلات أعمال متقدمة',
            'تنبيهات واتساب بزنس آلية',
            'دعم ذو أولوية',
          ],
        },
      ],
    },
  },
}

const MAD_MULTIPLIER = 10

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const activeDir = LANGUAGES.find((l) => l.code === lang)?.dir || 'ltr'
    document.documentElement.dir = activeDir
    document.documentElement.lang = lang
  }, [lang])

  const t = translations[lang]

  const formatPrice = useMemo(
    () => (usd) => {
      if (lang === 'ar') {
        return `${usd * MAD_MULTIPLIER} MAD`
      }
      return `$${usd}`
    },
    [lang],
  )

  const value = {
    lang,
    setLang,
    dir: LANGUAGES.find((l) => l.code === lang)?.dir || 'ltr',
    languages: LANGUAGES,
    t,
    formatPrice,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
