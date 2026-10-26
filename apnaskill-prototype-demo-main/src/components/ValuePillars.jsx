import React from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  Users, 
  TrendingUp, 
  Target, 
  CheckCircle2 
} from 'lucide-react';

export function ValuePillars() {
  const pillars = [
    {
      num: '01',
      title: 'Personalized Learning',
      desc: 'Recommendations based on your performance, aptitude, interests, and future career goals.',
      icon: Target,
      gradient: 'from-teal-500/20 to-teal-500/5',
      border: 'hover:border-teal-500/50',
      iconColor: 'text-teal-400'
    },
    {
      num: '02',
      title: 'AI-Powered Insights',
      desc: 'Understand your unique strengths and identify exact academic and practical skill areas that need improvement.',
      icon: BrainCircuit,
      gradient: 'from-indigo-500/20 to-indigo-500/5',
      border: 'hover:border-indigo-500/50',
      iconColor: 'text-indigo-400'
    },
    {
      num: '03',
      title: 'Human + AI Learning',
      desc: 'Combine intelligent 24/7 AI learning assistance with real, experienced human instructor interactions.',
      icon: Users,
      gradient: 'from-cyan-500/20 to-cyan-500/5',
      border: 'hover:border-cyan-500/50',
      iconColor: 'text-cyan-400'
    },
    {
      num: '04',
      title: 'Measurable Progress',
      desc: 'See how your skills actually improve through continuous assessments, before/after analytics, and verified milestones.',
      icon: TrendingUp,
      gradient: 'from-emerald-500/20 to-emerald-500/5',
      border: 'hover:border-emerald-500/50',
      iconColor: 'text-emerald-400'
    }
  ];

  return (
    <section className="py-20 bg-slate-950/60 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The ApnaSkill Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            More Than Courses. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
              A Learning Journey.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Traditional online marketplaces sell thousands of generic videos. ApnaSkill diagnoses your needs first and designs your tailored growth roadmap.
          </p>
        </div>

        {/* 4 Value Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className={`relative rounded-2xl bg-slate-900/80 p-6 border border-slate-800/90 ${pillar.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 group`}
              >
                {/* Background Gradient Blob */}
                <div className={`absolute inset-0 bg-gradient-to-b ${pillar.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>

                {/* Number Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-black tracking-widest text-slate-500 group-hover:text-teal-400 transition-colors">
                    {pillar.num}
                  </span>
                  <div className={`w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center ${pillar.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-200 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
