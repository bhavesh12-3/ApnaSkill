import React from 'react';
import { Award, CheckCircle, Share2, Download, User, BookOpen, Zap, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';

export function SkillPassportPage({ onViewCertificate, onExploreCourses, onGoToDashboard }) {
  const { currentUser } = useAuth();
  const { courses } = useCourses();

  const certificates = currentUser?.certificates || [];
  const enrolledCourses = currentUser?.enrolledCourses || [];
  const assessment = currentUser?.assessmentResult;
  const isLoggedIn = currentUser?.email !== 'learner@example.com';

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-hero pt-20 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl border border-gray-200 shadow-card p-12 max-w-md">
          <div className="text-5xl mb-4">🎓</div>
          <h2 className="text-2xl font-display font-black text-gray-900 mb-2">Sign In to View Your Skill Passport</h2>
          <p className="text-gray-500 text-sm mb-6">Create a free account to start earning and sharing your skills.</p>
          <button onClick={onGoToDashboard} className="btn-primary w-full justify-center">Go to Dashboard →</button>
        </div>
      </div>
    );
  }

  const completedCourses = enrolledCourses.filter(e => e.isCompleted || (e.progress || 0) >= 90);

  return (
    <div className="min-h-screen bg-gradient-hero pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="section-badge mx-auto mb-4">🎓 Skill Passport</div>
          <h1 className="text-4xl font-display font-black text-gray-900 mb-2">
            {currentUser.name}'s Skill Passport
          </h1>
          <p className="text-gray-500 text-sm">A verified record of your skills, achievements, and courses on ApnaSkill.</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button className="btn-secondary text-xs py-2">
              <Share2 className="w-3.5 h-3.5" /> Share Passport
            </button>
            <button className="btn-primary text-xs py-2">
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
          </div>
        </div>

        {/* Passport Card */}
        <div className="bg-white rounded-3xl border-2 border-violet-200 shadow-violet-lg overflow-hidden mb-8">
          {/* Header Strip */}
          <div className="bg-gradient-to-r from-violet-700 to-violet-900 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
                🎓
              </div>
              <div>
                <div className="text-white font-display font-black text-xl">{currentUser.name}</div>
                <div className="text-violet-200 text-sm">{currentUser.email}</div>
                <div className="text-violet-300 text-xs mt-1">
                  Level: {assessment?.levelLabel || currentUser.currentClass || 'Student'} · ApnaSkill Member
                </div>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-xs text-violet-300 uppercase tracking-wide">Passport ID</div>
              <div className="font-mono text-white font-bold text-sm">AS-{currentUser.id?.slice(-8).toUpperCase() || '00000001'}</div>
            </div>
          </div>

          <div className="p-8 grid sm:grid-cols-3 gap-6">
            {/* Stats */}
            {[
              { label: 'Courses Enrolled', value: enrolledCourses.length, icon: BookOpen },
              { label: 'Certificates Earned', value: certificates.length, icon: Award },
              { label: 'Skills Identified', value: assessment?.strengths?.length || 0, icon: Zap },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="text-center">
                  <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-6 h-6 text-violet-600" />
                  </div>
                  <div className="text-2xl font-display font-black text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assessment Results */}
        {assessment && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 mb-6">
            <h2 className="font-display font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              🧠 Skill Assessment Results
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-display font-black text-violet-600 mb-1">{assessment.score}%</div>
                <div className="text-sm text-gray-500">Assessment Score — Level: {assessment.levelLabel}</div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Strengths</p>
                <div className="flex flex-wrap gap-1.5">
                  {(assessment.strengths || []).map(s => (
                    <span key={s} className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">✅ {s}</span>
                  ))}
                  {(!assessment.strengths || assessment.strengths.length === 0) && <span className="text-xs text-gray-400">Take assessment to identify strengths</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 mb-6">
            <h2 className="font-display font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              🏆 Earned Certificates
            </h2>
            <div className="space-y-3">
              {certificates.map(cert => (
                <div key={cert.id} className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border border-amber-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-xl">🏆</div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{cert.courseTitle}</div>
                      <div className="text-xs text-gray-500">ID: <span className="font-mono text-violet-600">{cert.id}</span> · {cert.issueDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    {onViewCertificate && (
                      <button
                        onClick={() => onViewCertificate(cert)}
                        className="text-xs font-semibold text-violet-600 hover:text-violet-800 px-2 py-1 rounded-lg hover:bg-violet-50 transition-colors"
                      >
                        View
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {completedCourses.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 mb-6">
            <h2 className="font-display font-bold text-gray-900 text-lg mb-4">💡 Skills Demonstrated</h2>
            <div className="flex flex-wrap gap-2">
              {completedCourses.flatMap(e => {
                const c = courses.find(x => x.id === e.courseId);
                return c?.skills || [];
              }).filter((s, i, arr) => arr.indexOf(s) === i).map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-violet-50 border border-violet-200 text-violet-700 rounded-xl text-xs font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {enrolledCourses.length === 0 && (
          <div className="text-center bg-white rounded-2xl border border-gray-200 shadow-card p-8">
            <p className="text-gray-500 text-sm mb-4">Complete courses to build your Skill Passport.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={onGoToDashboard} className="btn-primary text-sm">Go to Dashboard</button>
              <button onClick={onExploreCourses} className="btn-secondary text-sm">Explore Courses</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
