import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Mail,
  GraduationCap,
  Save,
  CheckCircle2,
  Award,
  TrendingUp,
  Edit3,
} from 'lucide-react';

export function ProfilePage({ onStartAssessment, onViewGrowth }) {
  const { currentUser, updateProfile } = useAuth();

  const [name, setName] = useState(currentUser?.name || 'Learner');
  const [mobile, setMobile] = useState(currentUser?.mobile || '');
  const [currentClass, setCurrentClass] = useState(currentUser?.currentClass || 'Undergraduate');
  const [stream, setStream] = useState(currentUser?.academicStream || '');
  const [goals, setGoals] = useState(currentUser?.goals || '');
  const [interests, setInterests] = useState(
    (currentUser?.interests || ['Technology', 'Data']).join(', ')
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      mobile,
      currentClass,
      academicStream: stream,
      goals,
      interests: interests.split(',').map((i) => i.trim()).filter(Boolean),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Profile card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-violet-100 flex items-center justify-center shrink-0">
            <User className="w-10 h-10 text-violet-600" />
          </div>
          <div className="space-y-1 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold text-gray-900">{currentUser?.name || 'Learner'}</h1>
              {currentUser?.currentClass && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 border border-violet-200">
                  {currentUser.currentClass}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{currentUser?.email}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-500 pt-1">
              <span>
                Assessment Score:{' '}
                <strong className="text-violet-600">
                  {currentUser?.assessmentResult?.overallScore ?? '—'}%
                </strong>
              </span>
              <span>·</span>
              <span>
                Enrolled:{' '}
                <strong className="text-gray-800">
                  {(currentUser?.enrolledCourses || []).length} Courses
                </strong>
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onViewGrowth}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-300 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              Growth
            </button>
            <button
              onClick={onStartAssessment}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors shadow-sm"
            >
              <Award className="w-4 h-4" />
              Retake Assessment
            </button>
          </div>
        </div>

        {/* Edit form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-violet-600" />
              Learning Preferences
            </h2>
            {savedSuccess && (
              <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Saved!
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Education Level</label>
                <select
                  value={currentClass}
                  onChange={(e) => setCurrentClass(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition bg-white"
                >
                  <option value="5th–8th">Classes 5–8</option>
                  <option value="9th–10th">Classes 9–10</option>
                  <option value="11th–12th">Classes 11–12</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Undergraduate">Undergraduate / Degree</option>
                  <option value="Postgraduate">Postgraduate / Master's</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Stream / Board</label>
                <input
                  type="text"
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  placeholder="e.g. Science / CBSE"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-700">Interests (comma separated)</label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  placeholder="e.g. Python, Data Science, Web Dev"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-700">Career Goals</label>
                <textarea
                  rows={3}
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition resize-none"
                  placeholder="e.g. Become a data analyst, crack placements…"
                />
              </div>

            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm shadow-sm transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
