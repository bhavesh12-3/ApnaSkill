import React, { useState } from 'react';
import { BookOpen, Award, TrendingUp, Zap, ArrowRight, Clock, CheckCircle, Target, BarChart2, Bookmark } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';

export function LearningDashboardPage({ onCourseSelect, onStartLearning, onStartAssessment, onViewCertificate, onExploreCourses, onViewGrowth, onViewPassport }) {
  const { currentUser } = useAuth();
  const { courses, bookmarks, toggleBookmark } = useCourses();
  const [activeTab, setActiveTab] = useState('overview');

  const enrolledCourses = currentUser?.enrolledCourses || [];
  const certificates = currentUser?.certificates || [];

  const getCourseName = (courseId) => {
    const c = courses.find(x => x.id === courseId);
    return c?.title || courseId;
  };

  const getCourseData = (courseId) => courses.find(x => x.id === courseId);

  const isLoggedIn = currentUser?.email !== 'learner@example.com';

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl border border-gray-200 shadow-card p-12 max-w-md">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-2xl font-display font-black text-gray-900 mb-2">Sign In to Access Dashboard</h2>
          <p className="text-gray-500 text-sm mb-6">Create a free account to track your progress, access courses, and earn certificates.</p>
          <button onClick={onStartAssessment} className="btn-primary w-full justify-center">
            Take Free Assessment to Get Started
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-black text-gray-900">
              Welcome back, <span className="text-gradient-violet">{currentUser.name?.split(' ')[0] || 'Learner'}</span>! 👋
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">Here's your learning progress.</p>
          </div>
          <button onClick={onExploreCourses} className="btn-primary text-xs py-2">
            <BookOpen className="w-3.5 h-3.5" /> Explore Courses
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Enrolled Courses', value: enrolledCourses.length, icon: BookOpen, color: 'text-violet-600 bg-violet-50' },
            { label: 'Certificates Earned', value: certificates.length, icon: Award, color: 'text-amber-600 bg-amber-50' },
            { label: 'Lessons Completed', value: enrolledCourses.reduce((a, e) => a + (e.completedLessons?.length || 0), 0), icon: CheckCircle, color: 'text-green-600 bg-green-50' },
            { label: 'Avg Progress', value: `${enrolledCourses.length > 0 ? Math.round(enrolledCourses.reduce((a, e) => a + (e.progress || 0), 0) / enrolledCourses.length) : 0}%`, icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 shadow-card p-5">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-display font-black text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'courses', label: 'My Courses' },
            { id: 'certificates', label: 'Certificates' },
            { id: 'bookmarks', label: '🔖 Bookmarks' },
            { id: 'passport', label: '🎓 Skill Passport' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === tab.id ? 'bg-white text-violet-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Assessment Status */}
            <div className={`rounded-2xl border p-6 ${currentUser.hasCompletedAssessment ? 'bg-green-50 border-green-200' : 'bg-violet-50 border-violet-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-gray-900 mb-1">
                    {currentUser.hasCompletedAssessment ? '✅ Skill Assessment Completed' : '🧠 Take Your Skill Assessment'}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {currentUser.hasCompletedAssessment
                      ? `Score: ${currentUser.assessmentResult?.score || 0}% · Level: ${currentUser.assessmentResult?.levelLabel || 'N/A'}`
                      : 'Identify your skill gaps and get personalized course recommendations.'}
                  </p>
                </div>
                <button onClick={onStartAssessment} className={`text-xs font-bold px-4 py-2 rounded-xl ${currentUser.hasCompletedAssessment ? 'btn-secondary' : 'btn-primary'}`}>
                  {currentUser.hasCompletedAssessment ? 'Retake' : 'Start Free Assessment'}
                </button>
              </div>
            </div>

            {/* Recent Courses */}
            {enrolledCourses.length > 0 ? (
              <div>
                <h3 className="font-display font-bold text-gray-900 mb-4">Continue Learning</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {enrolledCourses.slice(0, 3).map(enroll => {
                    const course = getCourseData(enroll.courseId);
                    if (!course) return null;
                    return (
                      <div key={enroll.courseId} className="bg-white rounded-2xl border border-gray-200 shadow-card p-5">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-28 object-cover rounded-xl mb-3" />
                        <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-1">{course.title}</h4>
                        <div className="progress-bar mb-1">
                          <div className="progress-bar-fill" style={{ width: `${enroll.progress || 0}%` }} />
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span>{enroll.progress || 0}% complete</span>
                          <span>{enroll.completedLessons?.length || 0} lessons done</span>
                        </div>
                        <button onClick={() => onStartLearning(enroll.courseId)} className="w-full btn-primary text-xs py-2 justify-center">
                          Continue Learning <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-10 text-center">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="font-bold text-gray-900 mb-1">No courses enrolled yet</h3>
                <p className="text-xs text-gray-500 mb-4">Explore our crash courses and start learning today.</p>
                <button onClick={onExploreCourses} className="btn-primary text-sm">Explore Courses</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-4">
            {enrolledCourses.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
                <p className="text-gray-500 text-sm mb-4">You haven't enrolled in any courses yet.</p>
                <button onClick={onExploreCourses} className="btn-primary text-sm">Explore Courses</button>
              </div>
            ) : (
              enrolledCourses.map(enroll => {
                const course = getCourseData(enroll.courseId);
                if (!course) return null;
                return (
                  <div key={enroll.courseId} className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 flex items-center gap-5">
                    <img src={course.thumbnail} alt={course.title} className="w-20 h-14 object-cover rounded-xl shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{course.title}</h4>
                      <div className="progress-bar mb-1">
                        <div className="progress-bar-fill" style={{ width: `${enroll.progress || 0}%` }} />
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{enroll.progress || 0}% complete</span>
                        <span>Enrolled: {enroll.enrolledAt || 'Recently'}</span>
                      </div>
                    </div>
                    <button onClick={() => onStartLearning(enroll.courseId)} className="btn-primary text-xs py-2 shrink-0">
                      {enroll.isCompleted ? 'Review' : 'Continue'}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="space-y-4">
            {certificates.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
                <div className="text-4xl mb-3">🏆</div>
                <p className="text-gray-500 text-sm mb-4">Complete a course to earn your first certificate.</p>
                <button onClick={onExploreCourses} className="btn-primary text-sm">Start Learning</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {certificates.map(cert => (
                  <div key={cert.id} className="bg-white rounded-2xl border border-amber-200 shadow-card p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">🏆</div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{cert.courseTitle}</div>
                        <div className="text-xs text-gray-500">{cert.issueDate}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">Certificate ID: <span className="font-mono text-violet-600">{cert.id}</span></div>
                    <button onClick={() => onViewCertificate(cert)} className="w-full btn-secondary text-xs py-2 justify-center">
                      View Certificate
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div className="space-y-4">
            {bookmarks.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
                <div className="text-4xl mb-3">🔖</div>
                <h3 className="font-bold text-gray-900 mb-1">No bookmarked courses yet</h3>
                <p className="text-xs text-gray-500 mb-4">Browse courses and click the bookmark icon to save them here.</p>
                <button onClick={onExploreCourses} className="btn-primary text-sm">Explore Courses</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookmarks.map(courseId => {
                  const course = courses.find(c => c.id === courseId);
                  if (!course) return null;
                  return (
                    <div key={courseId} className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
                      <img src={course.thumbnail} alt={course.title}
                        className="w-full h-28 object-cover"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'; }}
                      />
                      <div className="p-4">
                        <div className="text-[10px] font-semibold text-violet-600 mb-1">{course.category}</div>
                        <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">{course.title}</h4>
                        <div className="flex gap-2">
                          <button onClick={() => onCourseSelect(course.id)} className="flex-1 btn-primary text-xs py-1.5 justify-center">
                            View Course <ArrowRight className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => toggleBookmark(courseId)}
                            className="px-2.5 py-1.5 rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                            title="Remove bookmark"
                          >
                            <Bookmark className="w-3.5 h-3.5" fill="currentColor" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'passport' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-10 text-center">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="font-display font-bold text-gray-900 text-lg mb-2">Your Skill Passport</h3>
            <p className="text-gray-500 text-sm mb-6">View your verified skills, certificates, and course achievements in one shareable document.</p>
            <button onClick={onViewPassport} className="btn-primary text-sm">
              Open Skill Passport
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
