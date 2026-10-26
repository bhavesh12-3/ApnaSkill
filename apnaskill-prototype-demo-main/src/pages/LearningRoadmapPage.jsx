import React, { useState } from 'react';
import {
  Map, CheckCircle, Circle, Lock, ArrowRight, Clock, Target,
  TrendingUp, Zap, BookOpen, ChevronDown, ChevronUp
} from 'lucide-react';
import { CAREER_GOALS } from '../data/initialData';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';

// SVG-based skill gap radar/bar chart
function SkillGapChart({ requiredSkills, currentSkillScores }) {
  const barWidth = 260;

  return (
    <div className="space-y-3">
      {requiredSkills.map((req) => {
        const current = currentSkillScores[req.name] ?? 0;
        const gap = Math.max(0, req.target - current);
        const currentPct = Math.round((current / 100) * barWidth);
        const targetPct = Math.round((req.target / 100) * barWidth);

        return (
          <div key={req.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-gray-700">{req.name}</span>
              <span className="text-gray-500">
                <span className={current >= req.target ? 'text-green-600 font-bold' : 'text-amber-600 font-bold'}>
                  {current}%
                </span>
                {' '}/{' '}{req.target}% required
              </span>
            </div>
            <div className="relative h-5 bg-gray-100 rounded-full overflow-hidden">
              {/* Target marker */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-gray-400 z-10"
                style={{ left: `${(req.target / 100) * 100}%` }}
              />
              {/* Current fill */}
              <div
                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-700 ${
                  current >= req.target
                    ? 'bg-gradient-to-r from-green-400 to-green-500'
                    : 'bg-gradient-to-r from-violet-500 to-violet-400'
                }`}
                style={{ width: `${Math.min(100, current)}%` }}
              />
            </div>
            {gap > 0 && (
              <div className="text-[10px] text-amber-600 mt-0.5">
                Gap: {gap} points — targeted courses below will close this gap.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function RoadmapStep({ step, totalSteps, completedCourseIds, onCourseSelect }) {
  const isCompleted = step.courseId && completedCourseIds.includes(step.courseId);
  const isLocked = step.step > 1 && !completedCourseIds.length && step.step > 2;

  return (
    <div className={`relative flex gap-4 pb-8 ${step.step === totalSteps ? '' : ''}`}>
      {/* Connector line */}
      {step.step < totalSteps && (
        <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gradient-to-b from-violet-300 to-gray-200 z-0" />
      )}

      {/* Step circle */}
      <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all ${
        isCompleted
          ? 'bg-green-500 border-green-500 text-white'
          : 'bg-white border-violet-300 text-violet-600'
      }`}>
        {isCompleted ? <CheckCircle className="w-5 h-5" /> : step.step}
      </div>

      {/* Content */}
      <div className={`flex-1 bg-white rounded-2xl border shadow-sm p-5 transition-all hover:border-violet-200 ${
        isCompleted ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
      }`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-display font-bold text-gray-900 text-sm">{step.title}</span>
              {isCompleted && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-green-100 text-green-700 rounded-full border border-green-200">
                  ✅ Completed
                </span>
              )}
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-violet-50 text-violet-600 rounded-full border border-violet-100">
                {step.skill}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{step.duration}</span>
              <span className="flex items-center gap-1"><Target className="w-3 h-3" />Milestone: {step.milestone}</span>
            </div>
          </div>

          {step.courseId && !isCompleted && (
            <button
              onClick={() => onCourseSelect(step.courseId)}
              className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors"
            >
              Start <ArrowRight className="w-3 h-3" />
            </button>
          )}
          {!step.courseId && (
            <span className="shrink-0 text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">Coming Soon</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function LearningRoadmapPage({ onCourseSelect, onStartAssessment, onExploreCourses }) {
  const { currentUser } = useAuth();
  const { courses } = useCourses();

  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [showGapChart, setShowGapChart] = useState(true);

  const assessment = currentUser?.assessmentResult;
  const enrolledCourses = currentUser?.enrolledCourses || [];
  const completedCourseIds = enrolledCourses
    .filter(e => e.isCompleted || (e.progress || 0) >= 90)
    .map(e => e.courseId);

  const selectedGoal = CAREER_GOALS.find(g => g.id === selectedGoalId) || null;

  // Derive current skill scores from assessment skillScores
  const currentSkillScores = {};
  if (assessment?.skillScores) {
    Object.entries(assessment.skillScores).forEach(([skill, scores]) => {
      currentSkillScores[skill] = Math.round((scores.correct / scores.total) * 100);
    });
  }

  // Calculate goal completion percentage
  const getGoalProgress = (goal) => {
    const totalSteps = goal.roadmap.length;
    const completed = goal.roadmap.filter(step => step.courseId && completedCourseIds.includes(step.courseId)).length;
    return totalSteps > 0 ? Math.round((completed / totalSteps) * 100) : 0;
  };

  // Calculate skill gap score for a goal (0 = perfect match, higher = more gaps)
  const getGoalGapScore = (goal) => {
    const gaps = goal.requiredSkills.map(req => {
      const current = currentSkillScores[req.name] ?? 0;
      return Math.max(0, req.target - current);
    });
    return gaps.reduce((a, b) => a + b, 0);
  };

  // Recommended goal = lowest gap score (if assessment taken)
  const recommendedGoalId = assessment
    ? [...CAREER_GOALS].sort((a, b) => getGoalGapScore(a) - getGoalGapScore(b))[0]?.id
    : null;

  const totalRoadmapDays = selectedGoal
    ? selectedGoal.roadmap.reduce((sum, step) => {
        const days = parseInt(step.duration) || 5;
        return sum + days;
      }, 0)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="section-badge mb-3">🗺️ Learning Roadmap</div>
          <h1 className="text-3xl font-display font-black text-gray-900 mb-2">
            Your Personalized <span className="text-gradient-violet">Career Roadmap</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-2xl">
            Choose your career goal to see a step-by-step learning path. Each step maps to a skill, a recommended course, and a milestone you'll achieve.
          </p>
          {!assessment && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              Take the free assessment to personalize skill gap analysis for each goal.
              <button onClick={onStartAssessment} className="underline hover:no-underline ml-1">Start Now →</button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Goal Selection Grid */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-violet-600" /> Choose Your Career Goal
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAREER_GOALS.map(goal => {
              const progress = getGoalProgress(goal);
              const isRecommended = goal.id === recommendedGoalId;
              const isSelected = goal.id === selectedGoalId;
              const gapScore = getGoalGapScore(goal);
              const matchPct = Math.max(40, Math.round(100 - (gapScore / (goal.requiredSkills.length * 100)) * 100));

              return (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoalId(isSelected ? null : goal.id)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-violet-500 bg-violet-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{goal.icon}</span>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      {isRecommended && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-violet-600 text-white rounded-full">
                          ⭐ AI Pick
                        </span>
                      )}
                      {progress > 0 && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-green-100 text-green-700 rounded-full border border-green-200">
                          {progress}% done
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-gray-900 mb-1">{goal.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">{goal.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{goal.roadmap.length} steps</span>
                    {assessment && (
                      <span className={`font-semibold ${matchPct >= 70 ? 'text-green-600' : 'text-amber-600'}`}>
                        {matchPct}% skill match
                      </span>
                    )}
                  </div>
                  {progress > 0 && (
                    <div className="mt-2 progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Goal Detail */}
        {selectedGoal && (
          <div className="space-y-6">

            {/* Goal Summary Banner */}
            <div className="bg-gradient-to-r from-violet-700 to-violet-900 rounded-2xl p-6 text-white flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-violet-200 text-xs uppercase tracking-wide mb-1">Selected Goal</div>
                <h2 className="text-2xl font-display font-black">
                  {selectedGoal.icon} {selectedGoal.title}
                </h2>
                <p className="text-violet-200 text-sm mt-1">{selectedGoal.description}</p>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <div className="text-2xl font-black">{totalRoadmapDays}</div>
                  <div className="text-xs text-violet-300">Days Est.</div>
                </div>
                <div>
                  <div className="text-2xl font-black">{selectedGoal.roadmap.length}</div>
                  <div className="text-xs text-violet-300">Steps</div>
                </div>
                <div>
                  <div className="text-2xl font-black">{getGoalProgress(selectedGoal)}%</div>
                  <div className="text-xs text-violet-300">Complete</div>
                </div>
              </div>
            </div>

            {/* Skill Gap Chart */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <button
                onClick={() => setShowGapChart(v => !v)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-display font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-violet-600" />
                  Skill Gap Analysis
                  {!assessment && <span className="text-xs text-gray-400 font-normal ml-2">(Take assessment for personalized scores)</span>}
                </h3>
                {showGapChart ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {showGapChart && (
                <div className="px-6 pb-6">
                  <SkillGapChart
                    requiredSkills={selectedGoal.requiredSkills}
                    currentSkillScores={currentSkillScores}
                  />
                  <p className="text-[10px] text-gray-400 mt-4">
                    ▪ Bar shows your current skill level. ▪ Vertical line shows required target. ▪ Complete courses in the roadmap below to raise each bar.
                    {!assessment && ' Current scores shown as 0% — take the assessment to get real data.'}
                  </p>
                </div>
              )}
            </div>

            {/* Step-by-step Roadmap */}
            <div>
              <h3 className="font-display font-bold text-gray-900 text-lg mb-5 flex items-center gap-2">
                <Map className="w-5 h-5 text-violet-600" /> Step-by-Step Learning Path
              </h3>
              <div>
                {selectedGoal.roadmap.map(step => (
                  <RoadmapStep
                    key={step.step}
                    step={step}
                    totalSteps={selectedGoal.roadmap.length}
                    completedCourseIds={completedCourseIds}
                    onCourseSelect={onCourseSelect}
                  />
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <button onClick={onExploreCourses} className="btn-secondary text-sm">
                <BookOpen className="w-4 h-4" /> Browse All Courses
              </button>
              {!assessment && (
                <button onClick={onStartAssessment} className="btn-primary text-sm">
                  <Zap className="w-4 h-4" /> Take Assessment First
                </button>
              )}
            </div>
          </div>
        )}

        {!selectedGoal && (
          <div className="text-center py-12 text-gray-400">
            <Map className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Select a career goal above to view your personalized roadmap.</p>
          </div>
        )}
      </div>
    </div>
  );
}
