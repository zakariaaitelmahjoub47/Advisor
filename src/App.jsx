import { useState } from 'react'
import { useLanguage } from './context/LanguageContext.jsx'
import LandingPage from './components/LandingPage.jsx'
import OnboardingModal from './components/OnboardingModal.jsx'
import CheckoutModal from './components/CheckoutModal.jsx'
import DashboardShell from './components/DashboardShell.jsx'

export default function App() {
  const { formatPrice } = useLanguage()
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [checkoutPlan, setCheckoutPlan] = useState(null)
  const [profile, setProfile] = useState(null)

  if (profile) {
    return <DashboardShell profile={profile} onLogout={() => setProfile(null)} />
  }

  return (
    <>
      <LandingPage
        onStartTrial={() => setShowOnboarding(true)}
        onUpgrade={(plan) => setCheckoutPlan(plan)}
      />

      {showOnboarding && (
        <OnboardingModal
          onClose={() => setShowOnboarding(false)}
          onComplete={(data) => {
            setProfile(data)
            setShowOnboarding(false)
          }}
        />
      )}

      {checkoutPlan && (
        <CheckoutModal
          plan={checkoutPlan}
          formatPrice={formatPrice}
          onClose={() => setCheckoutPlan(null)}
        />
      )}
    </>
  )
}
