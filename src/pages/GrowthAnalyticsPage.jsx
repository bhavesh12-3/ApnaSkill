import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  ArrowRight,
} from 'lucide-react';

export function GrowthAnalyticsPage({ onStartAssessment, onExploreCourses }) {
  const { currentUser } = useAuth();

  const growthHistory = currentUser?.growthHistory || [
    {
      skill: 'Python Programming',
      beforeScore: 28,
      afterScore: 82,
      delta: 54,
      courseTitle: 'Python Programming in 7 Days',
      completedDate: 'January 2026',
    },
    {
      skill: 'Data Analytics',
      beforeScore: 35,
      afterScore: 76,
      delta: 41,
      courseTitle: 'Excel for Data Analysis',
      completedDate: 'February 2026',
    },
  ];

  const avgGain =
    growthHistory.length > 0
      ? Math.round(
          growthHistory.reduce((sum, item) => sum + item.delta, 0) /
            growthHistory.length
        )
      : 0;

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-700 text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            Measurable Learning Analytics
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Your Skill Growth:{' '}
            <span className="text-violet-600">Before vs. After</span>
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Track your exact skill progression across every completed ApnaSkill course.
          </p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Average Point Gain</div>
            <div className="text-3xl font-extrabold text-green-600 flex items-center gap-1.5">
              <ArrowUpRight className="w-6 h-6" />
              +{avgGain} Pts
            </div>
            <p className="text-xs text-gray-400">Across {growthHistory.length} completed courses.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Current Skill Index</div>
            <div className="text-3xl font-extrabold text-violet-600">
              {currentUser?.assessmentResult?.overallScore ?? 74}{' '}
              <span className="text-sm text-gray-400">/ 100</span>
            </div>
            <p className="text-xs text-gray-400">Based on latest assessment.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Next Recommendation</div>
            <div className="text-base font-bold text-gray-900">SQL Fundamentals in 7 Days</div>
            <p className="text-xs text-gray-400">AI Match: 88% · Strengthens data skills.</p>
          </div>
        </div>

        {/* Progression records */}
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-violet-600" />
            Calibrated Skill Progression
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {growthHistory.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5 hover:border-violet-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-violet-100 text-violet-700">
                    {item.skill}
                  </span>
                  <span className="text-xs text-gray-400">{item.completedDate}</span>
                </div>

                <h3 className="text-sm font-bold text-gray-900">{item.courseTitle}</h3>

                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">

                  {/* Before */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Before:</span>
                      <span className="font-semibold text-red-500">{item.beforeScore} / 100</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-400 rounded-full"
                        style={{ width: `${item.beforeScore}%` }}
                      />
                    </div>
                  </div>

                  {/* After */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-green-600 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        After ApnaSkill:
                      </span>
                      <span className="font-bold text-green-600">{item.afterScore} / 100</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-green-500 rounded-full"
                        style={{ width: `${item.afterScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Delta */}
                  <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-xs">
                    <span className="text-gray-500">Net Improvement:</span>
                    <span className="px-3 py-0.5 rounded-lg bg-green-100 text-green-700 font-bold border border-green-200">
                      +{item.delta} Points
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 max-w-xl text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">Ready for your next skill milestone?</h3>
            <p className="text-sm text-violet-100">
              Explore courses recommended by ApnaSkill AI based on your progression.
            </p>
          </div>
          <button
            onClick={onExploreCourses}
            className="px-6 py-3 rounded-xl bg-white text-violet-700 font-bold text-sm shadow-md flex items-center gap-2 hover:bg-violet-50 transition-colors shrink-0"
          >
            Explore Courses
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
