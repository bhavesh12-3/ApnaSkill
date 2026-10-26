import React, { useState } from 'react';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Users, Award, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { useCourses } from '../context/CourseContext';
import { PRICING_PLANS } from '../data/initialData';

export function CourseDetailPage({ courseId, onBack, onStartLearning, onStartAssessment, onOpenPaymentModal }) {
  const { courses, enrollCourse } = useCourses();
  const [openModule, setOpenModule] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('moderate');

  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <button onClick={onBack} className="btn-secondary mt-4">← Go Back</button>
        </div>
      </div>
    );
  }

  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-amber-100 text-amber-700',
    Advanced: 'bg-red-100 text-red-700',
  };

  const totalLessons = course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600">
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'; }}
                />
                {course.demoLabel && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-gray-700 text-xs font-semibold rounded-full border border-gray-200">
                    ⚠️ {course.demoLabel}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-lg">{course.category}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-lg ${difficultyColor[course.difficulty] || 'bg-gray-100 text-gray-600'}`}>
                    {course.difficulty}
                  </span>
                  {course.isPopular && <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg">🔥 Popular</span>}
                </div>
                <h1 className="text-3xl font-display font-black text-gray-900 mb-3">{course.title}</h1>
                <p className="text-gray-600 leading-relaxed">{course.fullDesc}</p>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-violet-500" />{course.duration}</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-violet-500" />{totalLessons} lessons</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-violet-500" />{course.totalModules || course.modules?.length || 0} modules</span>
                </div>
              </div>
            </div>

            {/* Learning Outcomes */}
            {course.learningOutcomes?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6">
                <h2 className="font-display font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-violet-600" /> What You'll Learn
                </h2>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {course.learningOutcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Covered */}
            {course.skills?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6">
                <h2 className="font-display font-bold text-gray-900 text-lg mb-4">Skills You'll Gain</h2>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-violet-50 border border-violet-200 text-violet-700 rounded-xl text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum */}
            {course.modules?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6">
                <h2 className="font-display font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-violet-600" /> Course Curriculum
                </h2>
                <div className="space-y-2">
                  {course.modules.map((mod, i) => (
                    <div key={mod.id} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenModule(openModule === i ? -1 : i)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-violet-50 transition-colors text-left"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                          <span className="font-semibold text-gray-900 text-sm">{mod.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>{mod.lessons?.length || 0} lessons</span>
                          {openModule === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>
                      {openModule === i && mod.lessons?.length > 0 && (
                        <div className="divide-y divide-gray-100">
                          {mod.lessons.map(lesson => (
                            <div key={lesson.id} className="flex items-center justify-between px-4 py-2.5">
                              <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                                  {lesson.type === 'video' && <span className="text-[10px]">▶</span>}
                                  {lesson.type === 'quiz' && <span className="text-[10px]">❓</span>}
                                  {lesson.type === 'reading' && <span className="text-[10px]">📄</span>}
                                  {lesson.type === 'project' && <span className="text-[10px]">🔨</span>}
                                </div>
                                <span className="text-sm text-gray-700">{lesson.title}</span>
                              </div>
                              <span className="text-xs text-gray-400">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructor */}
            {course.instructor && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6">
                <h2 className="font-display font-bold text-gray-900 text-lg mb-4">About the Instructor</h2>
                <div className="flex items-start gap-4">
                  <img src={course.instructor.photo} alt={course.instructor.name}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900">{course.instructor.name}</div>
                    <div className="text-sm text-violet-600 font-medium">{course.instructor.role}</div>
                    <p className="text-sm text-gray-600 mt-2">{course.instructor.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Project */}
            {course.project && (
              <div className="bg-violet-50 rounded-2xl border border-violet-200 p-6">
                <h2 className="font-display font-bold text-gray-900 text-lg mb-2 flex items-center gap-2">
                  🔨 Capstone Project
                </h2>
                <p className="text-gray-700 text-sm">{course.project}</p>
              </div>
            )}
          </div>

          {/* Sidebar: Enrollment */}
          <div className="space-y-5">
            {/* Price Card */}
            <div className="bg-white rounded-2xl border border-violet-200 shadow-card p-6 sticky top-24">
              <div className="text-3xl font-display font-black text-violet-600 mb-1">₹{course.price}</div>
              <p className="text-xs text-gray-500 mb-5">One-time payment · Lifetime access</p>

              {/* Plan Selector */}
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Choose Your Plan:</p>
              <div className="space-y-2 mb-5">
                {PRICING_PLANS.map(plan => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      selectedPlan === plan.id
                        ? 'border-violet-500 bg-violet-50 text-violet-800'
                        : 'border-gray-200 text-gray-600 hover:border-violet-300'
                    }`}
                  >
                    <span>{plan.name}</span>
                    <span className={`font-black ${selectedPlan === plan.id ? 'text-violet-700' : 'text-gray-700'}`}>₹{plan.price}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => onOpenPaymentModal({ ...course, selectedPlan })}
                className="w-full btn-primary justify-center py-3 text-sm mb-3"
              >
                Enroll Now — ₹{PRICING_PLANS.find(p => p.id === selectedPlan)?.price || course.price}
              </button>
              <button
                onClick={() => onStartLearning(courseId)}
                className="w-full btn-secondary justify-center py-2.5 text-sm"
              >
                Preview Course
              </button>

              <div className="mt-5 space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Lifetime course access</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Completion certificate</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Downloadable resources</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> 7-day refund policy</div>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Prerequisites</h3>
              <p className="text-xs text-gray-600">{course.prerequisites || 'None required.'}</p>
            </div>

            {/* Tags */}
            {course.tags?.length > 0 && (
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-2">Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {course.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-white border border-gray-200 text-gray-600 text-xs rounded-lg">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
