import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { PricingSection } from '../components/PricingSection';
import { useCourses } from '../context/CourseContext';
import {
  ArrowRight, Star, Clock, BookOpen, Zap, Users, TrendingUp,
  CheckCircle, ChevronDown, ChevronUp, Code, Database, BarChart2,
  Brain, Globe, Briefcase, MessageSquare, GraduationCap, Award
} from 'lucide-react';
import { COURSE_CATEGORIES, INITIAL_TESTIMONIALS, FAQS, EDUCATION_LEVELS } from '../data/initialData';

export function HomePage({ setActiveView, setSelectedCourseId, onOpenPaymentModal, onOpenAuth }) {
  const { courses } = useCourses();
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState(null);

  const publishedCourses = courses.filter(c => c.status === 'published');
  const featuredCourses = publishedCourses.filter(c => c.isFeatured || c.isPopular).slice(0, 6);
  const filteredCourses = activeCategory === 'All'
    ? publishedCourses
    : publishedCourses.filter(c => c.category === activeCategory);

  const handleCourseClick = (id) => {
    setSelectedCourseId(id);
    setActiveView('course-detail');
  };

  const categories = [
    { label: 'Programming', icon: Code, color: 'text-blue-600 bg-blue-50' },
    { label: 'Data Science', icon: Brain, color: 'text-violet-600 bg-violet-50' },
    { label: 'Data Analytics', icon: BarChart2, color: 'text-purple-600 bg-purple-50' },
    { label: 'AI & Machine Learning', icon: Zap, color: 'text-pink-600 bg-pink-50' },
    { label: 'Web Development', icon: Globe, color: 'text-green-600 bg-green-50' },
    { label: 'Business Intelligence', icon: TrendingUp, color: 'text-orange-600 bg-orange-50' },
    { label: 'Digital Marketing', icon: MessageSquare, color: 'text-red-600 bg-red-50' },
    { label: 'Communication', icon: Users, color: 'text-teal-600 bg-teal-50' },
    { label: 'Career Preparation', icon: Briefcase, color: 'text-amber-600 bg-amber-50' },
  ];

  const howItWorks = [
    { step: 1, title: 'Assess', desc: 'Take a free 10-minute skill assessment tailored to your education level.', icon: '🧠' },
    { step: 2, title: 'Learn', desc: 'Get AI-powered course recommendations and enroll in your crash course.', icon: '📚' },
    { step: 3, title: 'Practice', desc: 'Complete quizzes, exercises, and hands-on challenges at each lesson.', icon: '✏️' },
    { step: 4, title: 'Build', desc: 'Create a real project that demonstrates your new skills.', icon: '🔨' },
    { step: 5, title: 'Verify', desc: 'Earn a verified certificate and add it to your Skill Passport.', icon: '🏆' },
  ];

  return (
    <div>
      {/* 1. Hero */}
      <HeroSection
        onStartAssessment={() => setActiveView('assessment')}
        onExploreCourses={() => setActiveView('courses')}
        onCourseSelect={handleCourseClick}
      />

      {/* 2. Education Level Selection */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="section-badge mx-auto mb-3">🎓 Personalized for You</div>
            <h2 className="text-3xl font-display font-black text-gray-900">What's your education level?</h2>
            <p className="text-gray-500 mt-2 text-sm">We tailor course recommendations and assessments to your learning stage.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {EDUCATION_LEVELS.map(level => (
              <button
                key={level.id}
                onClick={() => setActiveView('assessment')}
                className="group flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-gray-100 bg-white hover:border-violet-300 hover:bg-violet-50 transition-all duration-200 card-hover"
              >
                <span className="text-3xl">{level.icon}</span>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-violet-700 text-center leading-tight">{level.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Course Categories */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="section-badge mx-auto mb-3">📂 Browse by Topic</div>
            <h2 className="text-3xl font-display font-black text-gray-900">All Skill Categories</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.label}
                  onClick={() => { setActiveCategory(cat.label); setActiveView('courses'); }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-200 bg-white hover:border-violet-300 hover:shadow-card-hover transition-all"
                >
                  <div className={`w-9 h-9 rounded-xl ${cat.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Featured Courses */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-badge mb-3">⚡ Crash Courses</div>
              <h2 className="text-3xl font-display font-black text-gray-900">Featured Courses</h2>
              <p className="text-gray-500 mt-1 text-sm">Hands-on, project-based courses with certificates</p>
            </div>
            <button onClick={() => setActiveView('courses')}
              className="flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-800">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => handleCourseClick(course.id)}
                onEnroll={() => onOpenPaymentModal(course)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="py-20 bg-violet-50 border-t border-violet-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto mb-3">🔄 How It Works</div>
            <h2 className="text-3xl font-display font-black text-gray-900">Your Path from Student to Skilled</h2>
            <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">Five clear steps from assessment to verified achievement — no confusion, no guesswork.</p>
          </div>
          <div className="grid sm:grid-cols-5 gap-6">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative text-center">
                {i < 4 && (
                  <div className="hidden sm:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-violet-200 to-violet-300 z-0" />
                )}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-violet-200 flex items-center justify-center text-2xl shadow-card">
                    {step.icon}
                  </div>
                  <div className="text-xs font-black uppercase tracking-wide text-violet-600">Step {step.step}</div>
                  <div className="font-display font-bold text-gray-900">{step.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button onClick={() => setActiveView('assessment')} className="btn-primary px-8 py-3 text-sm">
              <Zap className="w-4 h-4" /> Start Free Assessment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Pricing */}
      <PricingSection
        onStartAssessment={() => setActiveView('assessment')}
        onExploreCourses={() => setActiveView('courses')}
        onChoosePlan={(plan) => setActiveView('courses')}
      />

      {/* 7. Project Showcase */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto mb-3">🔨 Student Projects</div>
            <h2 className="text-3xl font-display font-black text-gray-900">Real Projects, Real Skills</h2>
            <p className="text-gray-500 mt-2 text-sm">Every course ends with a project you can put in your portfolio.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Grade Calculator App', course: 'Python in 7 Days', skill: 'Python', emoji: '🐍', color: 'bg-blue-50 border-blue-200' },
              { title: 'Sales Report Dashboard', course: 'Excel for Data Analysis', skill: 'Excel', emoji: '📊', color: 'bg-green-50 border-green-200' },
              { title: 'Portfolio Website', course: 'Web Dev in 14 Days', skill: 'HTML/CSS/JS', emoji: '🌐', color: 'bg-violet-50 border-violet-200' },
              { title: 'Power BI Sales Report', course: 'Power BI in 5 Days', skill: 'Power BI', emoji: '📈', color: 'bg-orange-50 border-orange-200' },
            ].map((p, i) => (
              <div key={i} className={`rounded-2xl border-2 ${p.color} p-5 card-hover`}>
                <div className="text-3xl mb-3">{p.emoji}</div>
                <h3 className="font-bold text-gray-900 text-sm">{p.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{p.course}</p>
                <span className="inline-block mt-3 px-2 py-0.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 font-medium">{p.skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto mb-3">💬 Student Stories</div>
            <h2 className="text-3xl font-display font-black text-gray-900">What Students Are Saying</h2>
            <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
              ⚠️ Sample testimonials — not from verified purchasers. Genuine reviews will appear after real enrollments.
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {INITIAL_TESTIMONIALS.map(t => (
              <div key={t.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 card-hover">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.level} • {t.course}</div>
                  </div>
                </div>
                <div className="mt-3 text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-20 bg-violet-50 border-t border-violet-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto mb-3">❓ FAQ</div>
            <h2 className="text-3xl font-display font-black text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-violet-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function CourseCard({ course, onClick, onEnroll }) {
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-amber-100 text-amber-700',
    Advanced: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden card-hover shadow-card group cursor-pointer" onClick={onClick}>
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'; }}
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {course.isNew && <span className="px-2 py-0.5 text-[10px] font-bold bg-green-500 text-white rounded-full">NEW</span>}
          {course.isPopular && <span className="px-2 py-0.5 text-[10px] font-bold bg-violet-600 text-white rounded-full">🔥 Popular</span>}
          {course.demoLabel && <span className="px-2 py-0.5 text-[10px] font-medium bg-white/90 text-gray-600 rounded-full border border-gray-200">{course.demoLabel}</span>}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-lg">{course.category}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-lg ${difficultyColor[course.difficulty] || 'bg-gray-100 text-gray-600'}`}>
            {course.difficulty}
          </span>
        </div>
        <h3 className="font-display font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-violet-700 transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{course.shortDesc}</p>
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
          <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.totalLessons || '?'} lessons</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-lg font-display font-black text-violet-600">₹{course.price}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onEnroll(); }}
            className="px-3 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition-colors"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
