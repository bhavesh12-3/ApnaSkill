import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Play, BookOpen, HelpCircle, FileText, ChevronLeft, ChevronRight, Award, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';

export function CourseLMSPage({ courseId, onBack, onViewCertificate }) {
  const { currentUser } = useAuth();
  const { courses, markLessonCompleted, enrollCourse, claimCertificate, submitQuizScore } = useCourses();

  const course = courses.find(c => c.id === courseId);
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [projectText, setProjectText] = useState('');
  const [projectSubmitted, setProjectSubmitted] = useState(false);

  const enrollment = (currentUser?.enrolledCourses || []).find(e => e.courseId === courseId);
  const completedLessons = enrollment?.completedLessons || [];

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Course not found.</p>
          <button onClick={onBack} className="mt-4 btn-secondary">Go Back</button>
        </div>
      </div>
    );
  }

  // Auto-enroll if not enrolled
  if (!enrollment) {
    enrollCourse(courseId);
  }

  const modules = course.modules || [];
  const currentMod = modules[activeModule];
  const lessons = currentMod?.lessons || [];
  const currentLes = lessons[activeLesson];

  const allLessons = modules.flatMap(m => m.lessons || []);
  const totalLessons = allLessons.length;
  const completedCount = completedLessons.length;
  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const isCompleted = (lessonId) => completedLessons.includes(lessonId);

  const handleMarkComplete = () => {
    if (currentLes) {
      markLessonCompleted(courseId, currentLes.id);
    }
  };

  const handleQuizSubmit = () => {
    if (!course.quiz) return;
    const questions = course.quiz.questions || [];
    let correct = 0;
    questions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) correct++;
    });
    const score = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
    setQuizScore(score);
    setQuizSubmitted(true);
    submitQuizScore(courseId, course.quiz.id, score);
  };

  const handleClaimCertificate = () => {
    const cert = claimCertificate(courseId);
    if (cert) onViewCertificate(cert);
  };

  const typeIcon = (type) => {
    if (type === 'quiz') return <HelpCircle className="w-3.5 h-3.5 text-amber-500" />;
    if (type === 'project') return <FileText className="w-3.5 h-3.5 text-violet-500" />;
    if (type === 'reading') return <BookOpen className="w-3.5 h-3.5 text-blue-500" />;
    return <Play className="w-3.5 h-3.5 text-green-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* LMS Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-500">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-display font-bold text-gray-900 text-sm leading-tight line-clamp-1">{course.title}</h1>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{completedCount}/{totalLessons} lessons</span>
              <span>•</span>
              <span>{progress}% complete</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-violet-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
          {progress >= 80 && (
            <button onClick={handleClaimCertificate}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-xl hover:bg-amber-600">
              <Award className="w-3.5 h-3.5" /> Claim Certificate
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto hidden lg:block">
          <div className="p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Course Curriculum</p>
            {modules.map((mod, mi) => (
              <div key={mod.id} className="mb-3">
                <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold text-gray-700 mb-1">
                  <span className="w-5 h-5 bg-violet-100 text-violet-700 rounded-lg flex items-center justify-center text-[10px] font-bold">{mi + 1}</span>
                  <span className="line-clamp-1">{mod.title}</span>
                </div>
                {(mod.lessons || []).map((les, li) => (
                  <button
                    key={les.id}
                    onClick={() => { setActiveModule(mi); setActiveLesson(li); setShowQuiz(false); setQuizSubmitted(false); setQuizAnswers({}); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-left mb-0.5 transition-all ${
                      activeModule === mi && activeLesson === li
                        ? 'bg-violet-50 text-violet-700 border border-violet-200 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {isCompleted(les.id)
                      ? <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      : typeIcon(les.type)
                    }
                    <span className="line-clamp-1">{les.title}</span>
                  </button>
                ))}
              </div>
            ))}

            {/* Course Quiz */}
            {course.quiz && (
              <div className="mt-4 border-t border-gray-100 pt-4">
                <button
                  onClick={() => { setShowQuiz(true); setActiveLesson(-1); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-left ${showQuiz ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="font-semibold">{course.quiz.title}</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {showQuiz ? (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-8">
                <h2 className="font-display font-bold text-gray-900 text-xl mb-6">{course.quiz?.title}</h2>
                {!quizSubmitted ? (
                  <div className="space-y-6">
                    {(course.quiz?.questions || []).map((q, qi) => (
                      <div key={q.id}>
                        <p className="font-semibold text-gray-900 text-sm mb-3">{qi + 1}. {q.text}</p>
                        <div className="space-y-2">
                          {q.options.map((opt, oi) => (
                            <button key={oi} onClick={() => setQuizAnswers(a => ({ ...a, [q.id]: oi }))}
                              className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${quizAnswers[q.id] === oi ? 'border-violet-500 bg-violet-50 text-violet-800' : 'border-gray-200 hover:border-violet-300 text-gray-700'}`}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button onClick={handleQuizSubmit}
                      disabled={Object.keys(quizAnswers).length < (course.quiz?.questions?.length || 0)}
                      className="btn-primary w-full justify-center py-3 disabled:opacity-40 disabled:cursor-not-allowed">
                      Submit Quiz
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">{quizScore >= 70 ? '🎉' : '📚'}</div>
                    <h3 className="text-2xl font-display font-black text-gray-900 mb-2">Score: {quizScore}%</h3>
                    <p className="text-gray-500 text-sm mb-6">
                      {quizScore >= 70 ? 'Great job! You passed the quiz.' : 'Review the lessons and try again.'}
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); setQuizScore(null); }} className="btn-secondary text-sm">
                        Retake Quiz
                      </button>
                      {progress >= 80 && <button onClick={handleClaimCertificate} className="btn-primary text-sm">
                        <Award className="w-4 h-4" /> Claim Certificate
                      </button>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : currentLes ? (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Lesson Header */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  {typeIcon(currentLes.type)}
                  <span className="text-xs font-semibold text-violet-600 capitalize">{currentLes.type}</span>
                  <span className="text-xs text-gray-400">• {currentLes.duration}</span>
                </div>
                <h2 className="text-xl font-display font-bold text-gray-900 mb-3">{currentLes.title}</h2>
                {currentLes.summary && <p className="text-sm text-gray-600 leading-relaxed">{currentLes.summary}</p>}
              </div>

              {/* Video or Content */}
              {currentLes.type === 'video' && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
                  {currentLes.videoUrl ? (
                    <div className="relative pb-[56.25%]">
                      <iframe src={currentLes.videoUrl} title={currentLes.title}
                        className="absolute inset-0 w-full h-full" allowFullScreen />
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <Play className="w-8 h-8 text-violet-600" />
                        </div>
                        <p className="text-gray-500 text-sm font-medium">Video content will be available when the course goes live.</p>
                        <p className="text-xs text-gray-400 mt-1">⚠️ Demo Course</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentLes.type === 'project' && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6">
                  <h3 className="font-display font-bold text-gray-900 mb-2">Project Submission</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.project || 'Complete and submit your project to earn your certificate.'}</p>
                  {!projectSubmitted ? (
                    <div className="space-y-3">
                      <textarea
                        value={projectText}
                        onChange={e => setProjectText(e.target.value)}
                        placeholder="Describe your project or paste your submission link here…"
                        className="w-full h-32 px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                      />
                      <button
                        onClick={() => { setProjectSubmitted(true); handleMarkComplete(); }}
                        disabled={!projectText.trim()}
                        className="btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Submit Project
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                      <CheckCircle className="w-5 h-5" /> Project submitted successfully!
                    </div>
                  )}
                </div>
              )}

              {/* Mark Complete & Navigation */}
              <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-200 shadow-card p-5">
                <button
                  onClick={() => {
                    if (activeLesson > 0) setActiveLesson(l => l - 1);
                    else if (activeModule > 0) { setActiveModule(m => m - 1); setActiveLesson((modules[activeModule - 1]?.lessons?.length || 1) - 1); }
                  }}
                  disabled={activeModule === 0 && activeLesson === 0}
                  className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                {!isCompleted(currentLes.id) ? (
                  <button onClick={handleMarkComplete} className="btn-primary text-sm py-2">
                    <CheckCircle className="w-4 h-4" /> Mark as Complete
                  </button>
                ) : (
                  <span className="flex items-center gap-1.5 text-green-600 text-sm font-semibold">
                    <CheckCircle className="w-4 h-4 fill-green-100" /> Completed
                  </span>
                )}

                <button
                  onClick={() => {
                    if (activeLesson < lessons.length - 1) setActiveLesson(l => l + 1);
                    else if (activeModule < modules.length - 1) { setActiveModule(m => m + 1); setActiveLesson(0); }
                  }}
                  disabled={activeModule === modules.length - 1 && activeLesson === lessons.length - 1}
                  className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500">Select a lesson from the sidebar to begin.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
