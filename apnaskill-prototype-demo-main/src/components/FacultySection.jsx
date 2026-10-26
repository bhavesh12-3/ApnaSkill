import React from 'react';
import { BookOpen, ArrowRight, Video } from 'lucide-react';
import { useCourses } from '../context/CourseContext';

export function FacultySection({ onExploreCourses }) {
  const { faculty } = useCourses();

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-xs font-semibold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5" />
            Live Human-to-Human Instruction
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Learn Directly From Real Experts
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Every ApnaSkill course is delivered by experienced human instructors in small interactive batches.
          </p>
        </div>

        {/* Faculty grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {faculty.map((f) => (
            <div
              key={f.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-violet-300 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="space-y-5">

                {/* Photo & Role */}
                <div className="flex items-start gap-4">
                  <img
                    src={f.photo}
                    alt={f.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-violet-200 shadow group-hover:scale-105 transition-transform duration-300 shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-lg bg-violet-100 text-violet-700 text-[11px] font-semibold border border-violet-200">
                      {f.experience}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-violet-700 transition-colors">
                      {f.name}
                    </h3>
                    <p className="text-xs text-purple-600 font-medium">{f.role}</p>
                  </div>
                </div>

                {/* Teaching mode */}
                <div className="p-3.5 rounded-xl bg-violet-50 border border-violet-200 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-violet-700 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" />
                    Teaching Format:
                  </div>
                  <div className="text-xs text-gray-700 font-medium">
                    {f.teachingMode || 'Live 1-on-1 & Small Interactive Batches via Zoom / Google Meet'}
                  </div>
                </div>

                {/* Specialization */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Core Specializations:
                  </div>
                  <div className="text-xs text-gray-700 font-medium">{f.expertise}</div>
                </div>

                {/* Bio */}
                <p className="text-xs text-gray-500 leading-relaxed">{f.bio}</p>

                {/* Courses */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-semibold text-gray-600 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-violet-600" />
                    Teaches:
                  </div>
                  <ul className="space-y-1">
                    {(f.courses || []).map((cName, cIdx) => (
                      <li key={cIdx} className="text-xs text-gray-600 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                        <span className="line-clamp-1">{cName}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action */}
              <div className="pt-6 border-t border-gray-100 mt-6">
                <button
                  onClick={onExploreCourses}
                  className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-violet-600 hover:text-white text-gray-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  Join a Batch with {f.name.split(' ')[0]}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
