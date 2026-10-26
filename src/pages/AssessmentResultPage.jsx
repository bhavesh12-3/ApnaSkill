import React from 'react';
import { CheckCircle, AlertCircle, ArrowRight, Zap, BookOpen, Target, TrendingUp, Map, Bookmark } from 'lucide-react';
import { EDUCATION_LEVELS } from '../data/initialData';
import { useCourses } from '../context/CourseContext';

// SVG-based Skill Gap Bar Chart
function SkillGapBarChart({ skillScores }) {
  if (!skillScores || Object.keys(skillScores).length === 0) return null;
  const entries = Object.entries(skillScores).map(([skill, scores]) => ({
    skill,
    pct: Math.round((scores.correct / scores.total) * 100),
  }));

  return (
    <svg viewBox={`0 0 340 ${entries.length * 36 + 20}`} className="w-full" style={{ maxHeight: 260 }}>
      {entries.map((entry, i) => {
        const y = i * 36 + 16;
        const barW = Math.round((entry.pct / 100) * 220);
        const color = entry.pct >= 80 ? '#22c55e' : entry.pct >= 60 ? '#f59e0b' : '#ef4444';
        return (
          <g key={entry.skill}>
            <text x="0" y={y} fontSize="10" fill="#374151" fontWeight="600" dominantBaseline="middle">
              {entry.skill.length > 18 ? entry.skill.slice(0, 17) + '…' : entry.skill}
            </text>
            <rect x="130" y={y - 7} width="220" height="14" rx="7" fill="#f3f4f6" />
            <rect x="130" y={y - 7} width={barW} height="14" rx="7" fill={color} />
            <text x="358" y={y} fontSize="10" fill={color} fontWeight="700" dominantBaseline="middle" textAnchor="end">
              {entry.pct}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function AssessmentResultPage({ result, onCourseSelect, onGoToDashboard, onRetakeAssessment }) {
  const { courses } = useCourses();
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-hero pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">No assessment data found.</p>
          <button onClick={onRetakeAssessment} className="mt-4 btn-primary">Take Assessment</button>
        </div>
      </div>
    );
  }

  // AI-based recommendation engine
  const getRecommendations = () => {
    const { level, interests = [], skillGaps = [], score } = result;
    const allCourses = courses.filter(c => c.status === 'published');

    // Priority: courses matching level AND interests or skill gaps
    const levelMatch = allCourses.filter(c => c.targetLevel?.includes(level));
    const interestMatch = levelMatch.filter(c =>
      interests.some(i => c.category?.toLowerCase().includes(i.toLowerCase()) || c.tags?.some(t => t.toLowerCase().includes(i.toLowerCase())))
    );
    const gapMatch = levelMatch.filter(c =>
      skillGaps.some(gap => c.skills?.some(s => s.toLowerCase().includes(gap.toLowerCase())) || c.category?.toLowerCase().includes(gap.toLowerCase()))
    );

    const combined = [...new Set([...gapMatch, ...interestMatch, ...levelMatch])];
    return combined.slice(0, 3);
  };

  const recommendations = getRecommendations();
  const levelLabel = EDUCATION_LEVELS.find(l => l.id === result.level)?.label || result.level;

  const scoreColor = result.score >= 80 ? 'text-green-600' : result.score >= 50 ? 'text-amber-600' : 'text-red-600';
  const scoreBg = result.score >= 80 ? 'bg-green-50 border-green-200' : result.score >= 50 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';

  return (
    <div className="min-h-screen bg-gradient-hero pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

        {/* Score Header */}
        <div className="text-center mb-10">
          <div className="section-badge mx-auto mb-4">✅ Assessment Complete</div>
          <h1 className="text-4xl font-display font-black text-gray-900 mb-2">Your Results Are Ready!</h1>
          <p className="text-gray-500 text-sm">Level: <strong className="text-violet-700">{levelLabel}</strong></p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className={`rounded-2xl border p-5 text-center ${scoreBg}`}>
            <div className={`text-4xl font-display font-black ${scoreColor}`}>{result.score}%</div>
            <div className="text-sm text-gray-600 mt-1">Overall Score</div>
            <div className="text-xs text-gray-500 mt-0.5">{result.correct} of {result.total} correct</div>
          </div>
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-center">
            <div className="text-4xl font-display font-black text-green-600">{result.strengths?.length || 0}</div>
            <div className="text-sm text-gray-600 mt-1">Strong Areas</div>
            <div className="text-xs text-gray-500 mt-0.5">{result.strengths?.join(', ') || 'Keep it up!'}</div>
          </div>
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
            <div className="text-4xl font-display font-black text-red-600">{result.skillGaps?.length || 0}</div>
            <div className="text-sm text-gray-600 mt-1">Skill Gaps Found</div>
            <div className="text-xs text-gray-500 mt-0.5">{result.skillGaps?.join(', ') || 'Great performance!'}</div>
          </div>
        </div>

        {/* Skill Breakdown — SVG Chart */}
        {result.skillScores && Object.keys(result.skillScores).length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 mb-8">
            <h2 className="font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-violet-600" /> Skill Gap Analysis
            </h2>
            <SkillGapBarChart skillScores={result.skillScores} />
            <div className="mt-3 flex gap-4 text-[10px] text-gray-400">
              <span><span className="inline-block w-3 h-2 rounded bg-green-500 mr-1" />≥ 80% Mastered</span>
              <span><span className="inline-block w-3 h-2 rounded bg-amber-400 mr-1" />60–79% Growth Area</span>
              <span><span className="inline-block w-3 h-2 rounded bg-red-400 mr-1" />&lt; 60% Gap to Close</span>
            </div>
          </div>
        )}

        {/* Skill Gaps */}
        {result.skillGaps?.length > 0 && (
          <div className="bg-white rounded-2xl border border-amber-200 shadow-card p-6 mb-8">
            <h2 className="font-display font-bold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" /> Identified Skill Gaps
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {result.skillGaps.map(gap => (
                <span key={gap} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold border border-amber-200">
                  ⚡ {gap}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              These are areas where targeted practice can significantly improve your performance. Our recommended courses below address these gaps directly.
            </p>
          </div>
        )}

        {/* Recommended Courses */}
        <div className="mb-8">
          <h2 className="font-display font-bold text-gray-900 text-xl mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-violet-600" /> AI-Recommended Courses for You
          </h2>
          {recommendations.length > 0 ? (
            <div className="grid sm:grid-cols-3 gap-4">
              {recommendations.map((course, i) => (
                <div key={course.id} className={`bg-white rounded-2xl border ${i === 0 ? 'border-violet-300 shadow-violet' : 'border-gray-200 shadow-card'} p-5 card-hover`}>
                  {i === 0 && (
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-violet-600 text-white rounded-full">⭐ Top Pick</span>
                    </div>
                  )}
                  <img src={course.thumbnail} alt={course.title} className="w-full h-28 object-cover rounded-xl mb-3" />
                  <div className="text-xs font-semibold text-violet-600 mb-1">{course.category}</div>
                  <h3 className="font-display font-bold text-gray-900 text-sm mb-1 line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{course.shortDesc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-violet-600 text-base">₹{course.price}</span>
                    <button onClick={() => onCourseSelect(course.id)} className="btn-primary text-xs py-1.5 px-3">
                      View <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500 text-sm">Explore our full course catalogue for courses matching your level.</p>
              <button onClick={() => onCourseSelect('course-1')} className="mt-4 btn-primary">Browse All Courses</button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={onGoToDashboard} className="btn-primary px-6">
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => typeof onViewRoadmap === 'function' && onViewRoadmap()}
            className="btn-secondary px-6"
          >
            <Map className="w-4 h-4" /> View My Roadmap
          </button>
          <button onClick={onRetakeAssessment} className="btn-secondary px-6">
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
