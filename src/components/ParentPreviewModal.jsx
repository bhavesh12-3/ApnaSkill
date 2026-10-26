import React from 'react';
import { 
  X, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Award, 
  MessageSquare, 
  Calendar,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function ParentPreviewModal({ isOpen, onClose }) {
  const { currentUser } = useAuth();
  if (!isOpen) return null;

  const studentName = currentUser?.name || 'Student';
  const studentClass = currentUser?.currentClass || '9th–10th';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0d1424] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">Parent Oversight Portal</h2>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 rounded-full border border-teal-500/30">
                Future-Ready Module
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time visibility into your child's live class attendance, verified homework, and skill gains.
            </p>
          </div>
        </div>

        {/* Student Quick Summary Card */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img 
              src={currentUser?.profilePhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'} 
              alt={studentName} 
              className="w-12 h-12 rounded-full border border-teal-500/40 object-cover"
            />
            <div>
              <div className="text-sm font-bold text-white">{studentName}</div>
              <div className="text-xs text-slate-400">Class {studentClass} • Live Batch Learner</div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-emerald-400 font-bold">● Active in Live Cohorts</span>
          </div>
        </div>

        {/* Key Parent Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-850">
            <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-400" /> Attendance
            </div>
            <div className="text-xl font-extrabold text-white mt-1">100%</div>
            <div className="text-[10px] text-teal-400">Live Zoom Classes</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-850">
            <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Homework
            </div>
            <div className="text-xl font-extrabold text-white mt-1">Verified</div>
            <div className="text-[10px] text-emerald-400">Instructor Checked</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-850">
            <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
              <Award className="w-3.5 h-3.5 text-indigo-400" /> Milestone
            </div>
            <div className="text-xl font-extrabold text-white mt-1">On Track</div>
            <div className="text-[10px] text-indigo-400">Certification Ready</div>
          </div>
        </div>

        {/* Instructor Remarks */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-teal-400" />
              <span>Lead Mentor Remarks</span>
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950/60 p-3 rounded-xl border border-slate-850">
            "{studentName} shows high engagement during live class screen-share exercises, completes assignments proactively, and asks insightful questions."
          </p>
          <div className="text-[11px] text-slate-400 text-right">
            — Suyash Sharma, Founder & Lead Faculty
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
        >
          Close Preview
        </button>

      </div>
    </div>
  );
}
