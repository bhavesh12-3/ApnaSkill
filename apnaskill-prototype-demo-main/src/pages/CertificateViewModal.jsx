import React from 'react';
import { X, Award, Download, ShieldCheck, GraduationCap } from 'lucide-react';

export function CertificateViewModal({ certificate, onClose }) {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 border border-violet-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              ApnaSkill Verified Credential
            </span>
            <span className="text-xs text-gray-400 font-mono">{certificate.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-violet-600" />
              Print / Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate canvas */}
        <div className="p-8 sm:p-12">
          <div className="relative rounded-2xl border-4 border-double border-violet-300 bg-gradient-to-b from-violet-50 to-white text-center space-y-6 p-8 sm:p-12 overflow-hidden">

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <GraduationCap className="w-96 h-96 text-violet-500" />
            </div>

            {/* Header */}
            <div className="space-y-2 relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-purple-700 flex items-center justify-center mx-auto shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-wider text-gray-900">
                APNA<span className="text-violet-600">SKILL</span>
              </div>
              <div className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold">
                Center for Applied Skills &amp; Learning
              </div>
            </div>

            {/* Title */}
            <div className="space-y-1 relative">
              <h2 className="text-xl sm:text-2xl font-bold text-violet-700 uppercase tracking-wide">
                Certificate of Completion
              </h2>
              <p className="text-xs text-gray-400 italic">This is officially presented to</p>
            </div>

            {/* Name */}
            <div className="relative">
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 border-b-2 border-violet-200 pb-3 inline-block px-12">
                {certificate.studentName || 'Student Learner'}
              </div>
            </div>

            {/* Course details */}
            <div className="max-w-xl mx-auto space-y-2 text-sm text-gray-600 leading-relaxed relative">
              <p>for successfully completing all modules and assessments in</p>
              <div className="text-lg font-bold text-gray-900">
                {certificate.courseTitle}
              </div>
              <p className="text-xs text-gray-400">
                with an overall score of{' '}
                <strong className="text-green-600">{certificate.score}%</strong>
              </p>
            </div>

            {/* Signatures */}
            <div className="pt-8 grid grid-cols-3 gap-6 items-end border-t border-violet-200 max-w-2xl mx-auto text-xs relative">

              <div className="space-y-1 text-center">
                <div className="font-serif italic text-sm text-violet-600">Suyash Sharma</div>
                <div className="w-32 h-px bg-gray-300 mx-auto"></div>
                <div className="text-[11px] font-bold text-gray-800">{certificate.instructor || 'Suyash Sharma'}</div>
                <div className="text-[10px] text-gray-400">Lead Instructor</div>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
                  <div className="flex flex-col items-center text-[8px] font-extrabold text-amber-900 uppercase tracking-tighter">
                    <Award className="w-5 h-5 mb-0.5" />
                    <span>Verified</span>
                  </div>
                </div>
                <span className="text-[9px] text-gray-400 font-mono">ID: {certificate.id}</span>
              </div>

              <div className="space-y-1 text-center">
                <div className="font-serif italic text-sm text-purple-600">Dr. Rajesh Verma</div>
                <div className="w-32 h-px bg-gray-300 mx-auto"></div>
                <div className="text-[11px] font-bold text-gray-800">Dr. Rajesh Verma</div>
                <div className="text-[10px] text-gray-400">Academic Director</div>
              </div>

            </div>

            {/* Footer date */}
            <div className="text-[11px] text-gray-400 relative">
              Issued on: {certificate.issueDate} · Verifiable at apnaskill.com/verify/{certificate.id}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
