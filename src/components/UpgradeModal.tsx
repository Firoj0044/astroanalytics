import React, { useState } from 'react';
import {
  X,
  Check,
  Rocket,
  Shield,
  Zap,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [upgraded, setUpgraded] = useState(false);

  if (!isOpen) return null;

  const handleSelectPlan = (planName: string) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setUpgraded(true);
    setTimeout(() => {
      setUpgraded(false);
      onClose();
    }, 2200);
  };

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'annual' ? '$39' : '$49',
      period: '/ month',
      description: 'Ideal for independent developers and early projects.',
      features: [
        'Up to 10k monthly active users',
        '7-day data retention',
        'Standard REST API access',
        'Community support',
        'Single workspace seat'
      ],
      highlight: false,
      buttonText: 'Current Baseline'
    },
    {
      name: 'Pro',
      price: billingCycle === 'annual' ? '$159' : '$199',
      period: '/ month',
      description: 'For growing scale-ups demanding advanced funnels.',
      features: [
        'Up to 250k monthly active users',
        '90-day data retention',
        'Real-time streaming webhooks',
        'Cohort retention analytics',
        'Priority email & Slack support',
        'Up to 10 team seats'
      ],
      highlight: false,
      buttonText: 'Switch to Pro'
    },
    {
      name: 'Enterprise Tier',
      price: billingCycle === 'annual' ? '$3,990' : '$4,990',
      period: '/ month',
      badge: 'CURRENT ACTIVE TIER',
      description: 'Mission-critical telemetry cluster with custom SLAs.',
      features: [
        'Unlimited monthly active users',
        '365+ days multi-region retention',
        'Dedicated isolated clusters',
        'Custom SSO & SAML enforcement',
        '24/7 dedicated solutions engineer',
        '99.99% uptime SLA guarantee',
        'Custom BI connectors & data export'
      ],
      highlight: true,
      buttonText: 'Manage Enterprise Contract'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-dropdown w-full max-w-5xl p-6 sm:p-8 relative my-8">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-2 text-[#5A5654] hover:text-[#1A1A1A] hover:bg-[#F4F2EE] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {upgraded ? (
          <div className="py-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-[#EBF4EF] border border-[#2D5A47]/30 text-[#2D5A47] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-[32px] font-serif font-semibold text-[#1A1A1A] mb-2">Subscription Updated!</h3>
            <p className="text-[14px] text-[#5A5654]">
              Your enterprise telemetry workspace tier has been configured.
            </p>
          </div>
        ) : (
          <>
            {/* Modal Header */}
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F2EE] border border-[#1A1A1A]/15 text-[#1A1A1A] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                <Rocket className="w-3.5 h-3.5" />
                <span>Subscription Registry</span>
              </div>
              <h2 className="text-[30px] sm:text-[36px] font-serif font-normal text-[#1A1A1A] tracking-tight leading-tight">
                Unlock High-Velocity Enterprise Intelligence
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#5A5654] mt-2">
                Scale your analytical infrastructure with guaranteed throughput and zero dropoff.
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-1 bg-[#F4F2EE] p-1 border border-[#1A1A1A]/20 mt-6">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.15em] font-sans font-bold transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-[#1A1A1A] text-[#FDFCFB]'
                      : 'text-[#5A5654] hover:text-[#1A1A1A]'
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.15em] font-sans font-bold transition-all flex items-center gap-1.5 ${
                    billingCycle === 'annual'
                      ? 'bg-[#1A1A1A] text-[#FDFCFB]'
                      : 'text-[#5A5654] hover:text-[#1A1A1A]'
                  }`}
                >
                  <span>Annual Billing</span>
                  <span className="text-[9px] font-bold bg-[#EBF4EF] text-[#2D5A47] border border-[#2D5A47]/30 px-1 py-0.2">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`p-6 flex flex-col justify-between transition-all duration-200 relative ${
                    plan.highlight
                      ? 'bg-[#F4F2EE] border-2 border-[#1A1A1A] shadow-lg'
                      : 'bg-[#FDFCFB] border border-[#1A1A1A]/15 hover:border-[#1A1A1A]/30'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-[#FDFCFB] text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1 border border-[#1A1A1A]">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <h3 className="text-[22px] font-serif font-semibold text-[#1A1A1A] mb-1">{plan.name}</h3>
                    <p className="text-[13px] text-[#5A5654] mb-4 min-h-[38px]">{plan.description}</p>

                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-[36px] font-serif font-bold text-[#1A1A1A] tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-[12px] text-[#5A5654]">{plan.period}</span>
                    </div>

                    <div className="h-px bg-[#1A1A1A]/10 mb-6" />

                    <div className="flex flex-col gap-2.5 mb-6">
                      {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-[13px] text-[#1A1A1A]">
                          <Check className="w-3.5 h-3.5 text-[#2D5A47] shrink-0 mt-1" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full py-3 text-[11px] uppercase tracking-[0.15em] font-sans font-bold transition-all duration-200 ${
                      plan.highlight
                        ? 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] shadow-sm'
                        : 'bg-[#F4F2EE] hover:bg-[#EAE7E1] text-[#1A1A1A] border border-[#1A1A1A]/20'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
