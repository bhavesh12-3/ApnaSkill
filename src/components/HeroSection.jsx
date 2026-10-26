import React, { useState } from 'react';
import { ArrowRight, Zap, Search, GraduationCap, Star, Users, BookOpen, CheckCircle } from 'lucide-react';
import { EDUCATION_LEVELS } from '../data/initialData';

export function HeroSection({ onStartAssessment, onExploreCourses, onCourseSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const stats = [
    { label: 'Students Enrolled', value: '2,400+' },
    { label: 'Crash Courses', value: '8+' },
    { label: 'Skill Categories', value: '9' },
    { label: 'Completion Rate', value: '94%' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onExploreCourses();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex flex-col justify-center pt-20">
      {/* Decorative background orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-violet-200/40 to-purple-100/20 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-violet-100/30 to-indigo-100/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Main content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-sm font-semibold">
              <Zap className="w-4 h-4 fill-violet-500" />
              <span>AI-Powered Crash Course Platform</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl font-display font-black text-gray-900 leading-[1.05] tracking-tight">
                Learn Faster.
                <span className="block text-gradient-violet">Build Skills.</span>
                <span className="block text-gray-900">Prove Your Potential.</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                ApnaSkill helps you identify skill gaps, master practical skills in days — not months — complete real projects, and earn a verified <strong className="text-violet-700">Skill Passport</strong>.
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2 max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search crash courses… Python, SQL, Power BI…"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm"
                />
              </div>
              <button type="submit" className="btn-primary whitespace-nowrap">
                Search
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Education Level Quick Select */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Choose your level:</p>
              <div className="flex flex-wrap gap-2">
                {EDUCATION_LEVELS.map(level => (
                  <button
                    key={level.id}
                    onClick={() => { setSelectedLevel(level.id); onStartAssessment(); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 ${
                      selectedLevel === level.id
                        ? 'bg-violet-600 text-white border-violet-600 shadow-violet'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-violet-300 hover:text-violet-700'
                    }`}
                  >
                    <span>{level.icon}</span>
                    <span>{level.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button onClick={onStartAssessment} className="btn-primary text-sm px-6 py-3">
                <Zap className="w-4 h-4" />
                Take Free Skill Assessment
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={onExploreCourses} className="btn-secondary text-sm px-6 py-3">
                <BookOpen className="w-4 h-4" />
                Explore All Courses
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                <span>Free skill assessment</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                <span>No subscription needed</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                <span>One-time payment per course</span>
              </div>
            </div>
          </div>

          {/* Right: Stats & Visual */}
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl border border-violet-100 p-5 shadow-card card-hover">
                  <div className="text-3xl font-display font-black text-gradient-violet">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Featured Course Preview Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="section-badge">🔥 Most Popular</span>
                <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded-lg">₹499</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-gray-900 text-base">Python Programming in 7 Days</h3>
                <p className="text-xs text-gray-500 mt-1">Go from zero to writing real Python scripts in just 7 days.</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-violet-500" /> 21 Lessons</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-violet-500" /> 1,200+ enrolled</span>
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" /> 4.8</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => onCourseSelect('course-1')}
                  className="flex-1 btn-primary text-xs py-2">
                  View Course
                </button>
                <button onClick={onExploreCourses}
                  className="flex-1 btn-secondary text-xs py-2">
                  Browse All
                </button>
              </div>
            </div>

            {/* How It Works Mini Steps */}
            <div className="bg-gradient-to-r from-violet-600 to-violet-800 rounded-2xl p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-violet-200">Your Journey</p>
              <div className="grid grid-cols-5 gap-2">
                {['Assess', 'Learn', 'Practice', 'Build', 'Verify'].map((step, i) => (
                  <div key={step} className="text-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold mx-auto mb-1">{i + 1}</div>
                    <div className="text-[10px] font-medium text-violet-100">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
