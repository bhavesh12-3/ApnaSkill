import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Award,
  Zap,
  BarChart2
} from 'lucide-react';

export function GrowthShowcase({ onStartAssessment }) {
  const [activeCase, setActiveCase] = useState(0);

  const growthCases = [
    {
      skill: 'Excel & Data Analytics',
      track: 'Productivity & Workplace Track',
      target: 'Class 9th to College & Job Aspirants',
      before: 32,
      after: 78,
      delta: 46,
      duration: '30 Days Live Batch',
      beforeSummary: 'Hesitant with formulas, unfamiliar with VLOOKUP or Pivot Tables, relied on slow manual data entry.',
      afterSummary: 'Build dynamic multi-branch revenue dashboards, master XLOOKUP and automate conditional models with 94% quiz score.',
      milestones: [
        'Master nested logical formulas (=IF, =SUMIFS)',
        'Build 3 real-world portfolio sales workbooks',
        'Earn ApnaSkill Verified Excel Specialist Credential'
      ]
    },
    {
      skill: 'Public Speaking & Verbal Charisma',
      track: 'Communication & Confidence Track',
      target: 'Class 5th to Higher Secondary & Graduates',
      before: 48,
      after: 74,
      delta: 26,
      duration: '25 Days Live Batch',
      beforeSummary: 'Hesitation during presentations, excessive filler words ("like", "umm"), stage reluctance.',
      afterSummary: 'Delivered impromptu 3-minute TEDx-style pitch in live mentor clinic with calm diaphragmatic pacing and clear vocal variety.',
      milestones: [
        'Eradicate filler words with deliberate 2-second pauses',
        'Structure persuasive Hook-Story-Offer speeches',
        'Live speech workshop distinction grade'
      ]
    },
    {
      skill: 'Aptitude & Competitive Math Logic',
      track: 'Logical Reasoning & Olympiad Track',
      target: 'Class 8th to 12th & Degree Aspirants',
      before: 42,
      after: 86,
      delta: 44,
      duration: '30 Days Live Sprint',
      beforeSummary: 'Struggled with timing in competitive math, took 4+ minutes per permutation/syllogism question.',
      afterSummary: 'Solves geometric series and 3-digit mental multiplications in under 15 seconds with high accuracy.',
      milestones: [
        'Master 50+ Vedic and algebraic shortcuts',
        'Improve problem-solving speed by +42%',
        'Achieve distinction in ApnaSkill Diagnostic Benchmarks'
      ]
    }
  ];

  const current = growthCases[activeCase];

  return (
    <section className="py-24 bg-[#090d16] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Measurable Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            See Your Growth. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Before vs. After Analytics
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Real skill development isn't just about watching videos. It's about measurable point increases in your diagnostic score.
          </p>
        </div>

        {/* Case Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {growthCases.map((c, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCase(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeCase === idx
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {c.skill}
            </button>
          ))}
        </div>

        {/* Main Growth Showcase Card */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Gauges */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider">{current.track}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{current.skill}</h3>
                  <span className="text-[11px] text-slate-400">{current.target}</span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                  {current.duration}
                </span>
              </div>

              {/* Before vs After Comparison Bars */}
              <div className="space-y-5 bg-[#0a0f1d] p-6 rounded-2xl border border-slate-800">
                
                {/* BEFORE Score */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-400 uppercase tracking-wider">Before Diagnostic Score</span>
                    <span className="text-rose-400 font-bold text-sm">{current.before} / 100</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-1000"
                      style={{ width: `${current.before}%` }}
                    ></div>
                  </div>
                </div>

                {/* AFTER Score */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      After ApnaSkill Calibration
                    </span>
                    <span className="text-emerald-300 font-bold text-base">{current.after} / 100</span>
                  </div>
                  <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-[1px]">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-300 rounded-full shadow-lg shadow-emerald-500/30 transition-all duration-1000"
                      style={{ width: `${current.after}%` }}
                    ></div>
                  </div>
                </div>

                {/* Improvement Delta Badge */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
                  <span className="text-slate-400 font-medium">Tangible Point Improvement:</span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-extrabold text-sm border border-emerald-500/40 flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    +{current.delta} Points Gain
                  </span>
                </div>

              </div>
            </div>

            {/* Qualitative Journey Breakdown */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Before Card */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  Baseline Assessment Reality:
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {current.beforeSummary}
                </p>
              </div>

              {/* After Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/30 space-y-1.5">
                <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Calibrated Post-Learning Result:
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {current.afterSummary}
                </p>
              </div>

              {/* Milestones */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Milestones Achieved:</div>
                {current.milestones.map((m, mIdx) => (
                  <div key={mIdx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={onStartAssessment}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Check Your Baseline & See Where You Can Grow</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
