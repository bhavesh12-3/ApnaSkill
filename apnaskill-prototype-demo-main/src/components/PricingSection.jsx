import React from 'react';
import { CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { PRICING_PLANS } from '../data/initialData';

export function PricingSection({ onStartAssessment, onExploreCourses, onChoosePlan }) {
  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-badge mx-auto mb-4">
            <Zap className="w-3.5 h-3.5" /> Transparent Pricing
          </div>
          <h2 className="text-4xl font-display font-black text-gray-900 mb-4">
            One Course. One Payment. <span className="text-gradient-violet">Your Choice.</span>
          </h2>
          <p className="text-gray-500 text-base">
            Each plan is a one-time purchase for a single selected crash course. No subscriptions, no surprises. Pay once, learn at your own pace.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onChoose={() => onChoosePlan ? onChoosePlan(plan) : onExploreCourses()}
            />
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          <p>💡 Each plan gives access to <strong>one selected course</strong>. Need multiple courses? Purchase each separately.</p>
          <p className="mt-1">
            Questions? <button onClick={onExploreCourses} className="text-violet-600 font-semibold hover:underline">Explore courses</button> or <button onClick={onStartAssessment} className="text-violet-600 font-semibold hover:underline">take the free assessment</button> first.
          </p>
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan, onChoose }) {
  const colorMap = {
    gray: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      badge: 'bg-gray-100 text-gray-600',
      btn: 'bg-gray-800 hover:bg-gray-900 text-white',
      price: 'text-gray-900',
    },
    violet: {
      bg: 'bg-violet-600',
      border: 'border-violet-600',
      badge: 'bg-white/20 text-white',
      btn: 'bg-white text-violet-700 hover:bg-violet-50 font-bold',
      price: 'text-white',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      badge: 'bg-purple-100 text-purple-700',
      btn: 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:opacity-90',
      price: 'text-purple-700',
    },
  };

  const c = colorMap[plan.color];
  const isViolet = plan.color === 'violet';

  return (
    <div className={`relative rounded-2xl border-2 ${c.border} ${c.bg} p-7 flex flex-col card-hover ${isViolet ? 'shadow-violet-lg scale-105' : 'shadow-card'}`}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-amber-900 text-xs font-black uppercase tracking-wide shadow-sm">
          ⭐ Most Popular
        </div>
      )}

      <div className="mb-6">
        <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide mb-3 ${c.badge}`}>
          {plan.name}
        </span>
        <div className={`text-4xl font-display font-black ${c.price}`}>
          ₹{plan.price}
          <span className={`text-sm font-normal ml-1 ${isViolet ? 'text-violet-200' : 'text-gray-400'}`}>one-time</span>
        </div>
        <p className={`text-sm mt-1 ${isViolet ? 'text-violet-200' : 'text-gray-500'}`}>{plan.tagline}</p>
      </div>

      <ul className="space-y-2.5 flex-1 mb-8">
        {plan.features.map((feat, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isViolet ? 'text-violet-200' : 'text-violet-500'}`} />
            <span className={isViolet ? 'text-violet-100' : 'text-gray-700'}>{feat}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onChoose}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${c.btn}`}
      >
        {plan.cta}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
