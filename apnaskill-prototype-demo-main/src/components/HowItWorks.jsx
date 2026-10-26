import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  BrainCircuit, 
  Sparkles, 
  GraduationCap, 
  TrendingUp, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export function HowItWorks({ onStartAssessment }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'ASSESS',
      tagline: 'Multi-Domain Diagnostic',
      desc: 'Understand your current academic level, aptitude, logical reasoning, interests, and practical digital skills.',
      icon: ClipboardCheck,
      details: [
        'Adaptive 10-minute diagnostic quiz',
        'Evaluates math, logic, communication & computer familiarity',
        'Identifies real-world baseline without exam stress'
      ],
      color: 'from-teal-500 to-cyan-400'
    },
    {
      num: '02',
      title: 'ANALYZE',
      tagline: 'AI Strengths & Gap Mapping',
      desc: 'AI analyzes your answers, maps your profile against benchmarks, and uncovers hidden strengths and critical gaps.',
      icon: BrainCircuit,
      details: [
        'Instant multi-dimensional radar skill chart',
        'Pinpoints high-yield improvement areas (e.g. Excel +42 pt potential)',
        'Class & age-appropriate competency calibration'
      ],
      color: 'from-indigo-500 to-purple-400'
    },
    {
      num: '03',
      title: 'RECOMMEND',
      tagline: 'Tailored Learning Trajectory',
      desc: 'Get curated courses with transparent match percentages and clear explanations on why each skill matters for you.',
      icon: Sparkles,
      details: [
        'Filtered strictly from active, verified courses',
        'Clear reasoning tags ("Why ApnaSkill recommends this")',
        'Prerequisites and realistic timeline breakdown'
      ],
      color: 'from-cyan-500 to-teal-400'
    },
    {
      num: '04',
      title: 'LEARN',
      tagline: 'Recorded + Live Human Mastery',
      desc: 'Learn through bite-sized video lessons, interactive quizzes, practical projects, and live weekend mentor clinics.',
      icon: GraduationCap,
      details: [
        '24/7 ApnaSkill AI Assistant for instant formula/code help',
        'Weekly live 1-on-1 human expert doubt clinics',
        'Hands-on portfolio assignments with reviewer feedback'
      ],
      color: 'from-amber-500 to-orange-400'
    },
    {
      num: '05',
      title: 'GROW',
      tagline: 'Before vs After Calibration',
      desc: 'Measure your tangible improvement with post-assessments, unlock verified credentials, and discover what to learn next.',
      icon: TrendingUp,
      details: [
        'Interactive Before vs After analytics (+46 pts growth)',
        'Industry-recognized ApnaSkill Verified Certificate',
        'Continuous AI re-calibration for your next milestone'
      ],
      color: 'from-emerald-500 to-teal-400'
    }
  ];

  return (
    <section className="py-24 bg-[#080d1a] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>The 5-Step Continuous Growth Loop</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            How ApnaSkill Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A continuous loop from diagnosis to mastery: Assessment → Analysis → Recommendation → Learning → Growth.
          </p>
        </div>

        {/* Step Selector Horizontal Bar (Desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 relative ${
                  isSelected 
                    ? 'bg-slate-900 border-teal-500 shadow-lg shadow-teal-500/10' 
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-black tracking-widest ${isSelected ? 'text-teal-400' : 'text-slate-500'}`}>
                    {s.num}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-teal-400' : 'text-slate-500'}`} />
                </div>
                <div className={`text-sm font-bold tracking-wide ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {s.title}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {s.tagline}
                </div>

                {isSelected && (
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-teal-400 to-indigo-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold">
                <span>STEP {steps[activeStep].num}</span>
                <span>•</span>
                <span>{steps[activeStep].tagline}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {steps[activeStep].title}: {steps[activeStep].tagline}
              </h3>

              <p className="text-base text-slate-300 leading-relaxed">
                "{steps[activeStep].desc}"
              </p>

              <div className="space-y-2.5 pt-2">
                {steps[activeStep].details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 text-xs">
                      ✓
                    </div>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={onStartAssessment}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-teal-500/20 flex items-center gap-2"
                >
                  <span>Experience This Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm p-6 rounded-2xl bg-[#090d16] border border-slate-800 shadow-xl space-y-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Journey Preview</span>
                  <span className="text-teal-400">Step {activeStep + 1} of 5</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400 font-medium">Outcome of Step {steps[activeStep].num}:</div>
                  <div className="text-sm font-bold text-teal-300">
                    {steps[activeStep].tagline}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {steps[activeStep].desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                    disabled={activeStep === 0}
                    className="text-xs text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    ← Previous
                  </button>
                  <div className="flex gap-1.5">
                    {steps.map((_, i) => (
                      <span 
                        key={i} 
                        className={`w-2 h-2 rounded-full ${i === activeStep ? 'bg-teal-400' : 'bg-slate-700'}`}
                      ></span>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                    disabled={activeStep === steps.length - 1}
                    className="text-xs text-teal-400 hover:text-teal-300 font-semibold disabled:opacity-30"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
