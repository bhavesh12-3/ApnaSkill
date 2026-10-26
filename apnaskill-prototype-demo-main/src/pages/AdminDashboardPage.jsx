import React, { useState } from 'react';
import { 
  Shield, Users, BookOpen, BarChart2, Plus, Edit, Trash2, 
  CheckCircle, X, ArrowLeft, Settings, DollarSign, Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';

export function AdminDashboardPage({ onPreviewCourse, onExit }) {
  const { currentUser, isAdmin } = useAuth();
  const { courses, addCourse, editCourse, deleteCourse, publishCourse, archiveCourse, faculty, enrollmentLeads } = useCourses();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', category: 'Programming', price: 499, difficulty: 'Beginner', shortDesc: '', duration: '7 Days', whatsappLink: '' });

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl border border-gray-200 shadow-card p-12 max-w-md">
          <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Admin Access Required</h2>
          <p className="text-gray-500 text-sm mb-4">You must be logged in as an administrator to access this page.</p>
          <button onClick={onExit} className="btn-secondary text-sm">← Go Home</button>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Courses', value: courses.length, icon: BookOpen, color: 'text-violet-600 bg-violet-50' },
    { label: 'Published', value: courses.filter(c => c.status === 'published').length, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
    { label: 'Enrollments', value: enrollmentLeads.length, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Faculty', value: faculty.length, icon: Award, color: 'text-amber-600 bg-amber-50' },
  ];

  const handleAddCourse = () => {
    if (!newCourse.title.trim()) return;
    addCourse({ ...newCourse, thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80' });
    setNewCourse({ title: '', category: 'Programming', price: 499, difficulty: 'Beginner', shortDesc: '', duration: '7 Days', whatsappLink: '' });
    setShowAddCourse(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h1 className="font-display font-black text-gray-900">Admin Dashboard</h1>
              <p className="text-xs text-gray-500">Logged in as {currentUser?.name}</p>
            </div>
          </div>
          <button onClick={onExit} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Exit Admin
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-200 shadow-card p-5">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-display font-black text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit overflow-x-auto">
          {['overview', 'courses', 'enrollments', 'faculty'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all capitalize whitespace-nowrap ${activeTab === tab ? 'bg-white text-violet-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-violet-600" /> Course Status
              </h2>
              <div className="space-y-2">
                {['published', 'unpublished', 'archived'].map(status => {
                  const count = courses.filter(c => c.status === status).length;
                  return (
                    <div key={status} className="flex items-center justify-between text-sm">
                      <span className="capitalize text-gray-600">{status}</span>
                      <span className="font-bold text-gray-900">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" /> Revenue Overview
              </h2>
              <div className="text-3xl font-display font-black text-green-600 mb-1">
                ₹{enrollmentLeads.reduce((a, l) => a + (l.amountPaid || 0), 0).toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-gray-500">Total from {enrollmentLeads.length} enrollments</div>
              <div className="mt-3 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                ⚠️ Test mode — no real payments processed
              </div>
            </div>
          </div>
        )}

        {/* Courses */}
        {activeTab === 'courses' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">All Courses ({courses.length})</h2>
              <button onClick={() => setShowAddCourse(!showAddCourse)} className="btn-primary text-xs py-2">
                <Plus className="w-3.5 h-3.5" /> Add Course
              </button>
            </div>

            {showAddCourse && (
              <div className="bg-white rounded-2xl border border-violet-200 shadow-card p-6 mb-5 space-y-4">
                <h3 className="font-bold text-gray-900">New Course</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input value={newCourse.title} onChange={e => setNewCourse(p => ({ ...p, title: e.target.value }))}
                    placeholder="Course Title" className="px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  <input value={newCourse.shortDesc} onChange={e => setNewCourse(p => ({ ...p, shortDesc: e.target.value }))}
                    placeholder="Short description" className="px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  <input type="number" value={newCourse.price} onChange={e => setNewCourse(p => ({ ...p, price: Number(e.target.value) }))}
                    placeholder="Price (₹)" className="px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  <input value={newCourse.duration} onChange={e => setNewCourse(p => ({ ...p, duration: e.target.value }))}
                    placeholder="Duration (e.g. 7 Days)" className="px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  <input value={newCourse.whatsappLink} onChange={e => setNewCourse(p => ({ ...p, whatsappLink: e.target.value }))}
                    placeholder="WhatsApp Group Link (https://chat.whatsapp.com/...)" className="sm:col-span-2 px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAddCourse} className="btn-primary text-xs py-2">Save Course</button>
                  <button onClick={() => setShowAddCourse(false)} className="btn-secondary text-xs py-2">Cancel</button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {courses.map(c => (
                <div key={c.id} className="bg-white rounded-2xl border border-gray-200 shadow-card p-4 flex items-center gap-4">
                  <img src={c.thumbnail} alt={c.title} className="w-16 h-12 object-cover rounded-xl shrink-0" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200'; }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{c.title}</h3>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${c.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {c.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">₹{c.price} · {c.category} · {c.difficulty}</div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button onClick={() => onPreviewCourse(c.id)}
                      className="px-2 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 text-xs hover:bg-violet-50 hover:border-violet-300 hover:text-violet-700">
                      Preview
                    </button>
                    {c.status === 'published' ? (
                      <button onClick={() => archiveCourse(c.id)}
                        className="px-2 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 text-xs hover:bg-red-50 hover:border-red-300 hover:text-red-600">
                        Archive
                      </button>
                    ) : (
                      <button onClick={() => publishCourse(c.id)}
                        className="px-2 py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs hover:bg-green-100">
                        Publish
                      </button>
                    )}
                    <button onClick={() => deleteCourse(c.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enrollments */}
        {activeTab === 'enrollments' && (
          <div>
            <h2 className="font-bold text-gray-900 mb-5">Enrollment Leads ({enrollmentLeads.length})</h2>
            {enrollmentLeads.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
                <p className="text-gray-500 text-sm">No enrollments yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {enrollmentLeads.map(lead => (
                  <div key={lead.id} className="bg-white rounded-2xl border border-gray-200 shadow-card p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{lead.studentName || 'Anonymous'}</div>
                        <div className="text-xs text-gray-500">{lead.courseTitle} · ₹{lead.amountPaid}</div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${lead.paymentStatus?.includes('Verified') ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {lead.paymentStatus || 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Faculty */}
        {activeTab === 'faculty' && (
          <div>
            <h2 className="font-bold text-gray-900 mb-5">Faculty Members ({faculty.length})</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {faculty.map(f => (
                <div key={f.id} className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 flex items-start gap-4">
                  <img src={f.photo} alt={f.name} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900">{f.name}</div>
                    <div className="text-xs text-violet-600 font-medium">{f.role}</div>
                    <div className="text-xs text-gray-500 mt-1">{f.experience} experience · {f.students} students</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
