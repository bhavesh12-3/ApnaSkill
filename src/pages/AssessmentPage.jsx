import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, Clock, BookOpen, User } from 'lucide-react';
import { EDUCATION_LEVELS, LEVEL_BASED_ASSESSMENT_QUESTIONS } from '../data/initialData';
import { useAuth } from '../context/AuthContext';

export function AssessmentPage({ onAssessmentComplete, onBack }) {
  const { currentUser, updateProfile } = useAuth();
  const [step, setStep] = useState('level'); // 'level' | 'info' | 'questions' | 'submitting'
  const [selectedLevel, setSelectedLevel] = useState('');
  const [studentInfo, setStudentInfo] = useState({
    name: currentUser?.name || '',
    interests: [],
    goal: '',
    availableTime: '1-2 hours/day',
  });
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

  const questions = selectedLevel ? (LEVEL_BASED_ASSESSMENT_QUESTIONS[selectedLevel] || []) : [];

  const interestOptions = ['Programming', 'Data Analytics', 'Web Development', 'AI & Machine Learning', 'Business Intelligence', 'Communication', 'Career Preparation', 'Digital Marketing'];
  const goalOptions = [
    'Get my first internship or job',
    'Improve my academic performance',
    'Learn practical skills for career growth',
    'Build a personal project',
    'Prepare for competitive exams',
    'Explore what I should learn next',
  ];
  const timeOptions = ['30 mins/day', '1-2 hours/day', '3-4 hours/day', '5+ hours/day'];

  const toggleInterest = (interest) => {
    setStudentInfo(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSelectOption = (idx) => {
    setSelectedOption(idx);
    const qId = questions[currentQ]?.id;
    if (qId) {
      setAnswers(prev => ({ ...prev, [qId]: idx }));
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelectedOption(answers[questions[currentQ + 1]?.id] ?? null);
    } else {
      // Calculate results
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setStep('submitting');
    setTimeout(() => {
      const levelQuestions = questions;
      let correct = 0;
      const skillScores = {};
      
      levelQuestions.forEach(q => {
        const userAnswer = answers[q.id];
        if (userAnswer === q.correct) correct++;
        const skill = q.skill;
        if (!skillScores[skill]) skillScores[skill] = { correct: 0, total: 0 };
        skillScores[skill].total++;
        if (userAnswer === q.correct) skillScores[skill].correct++;
      });

      const totalQ = levelQuestions.length;
      const percentScore = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0;

      const skillGaps = Object.entries(skillScores)
        .filter(([, s]) => s.correct / s.total < 0.6)
        .map(([skill]) => skill);

      const strengths = Object.entries(skillScores)
        .filter(([, s]) => s.correct / s.total >= 0.8)
        .map(([skill]) => skill);

      const result = {
        level: selectedLevel,
        levelLabel: EDUCATION_LEVELS.find(l => l.id === selectedLevel)?.label || selectedLevel,
        score: percentScore,
        correct,
        total: totalQ,
        skillGaps,
        strengths,
        skillScores,
        interests: studentInfo.interests,
        goal: studentInfo.goal,
        completedAt: new Date().toISOString(),
      };

      if (updateProfile) {
        updateProfile({
          hasCompletedAssessment: true,
          assessmentResult: result,
          currentClass: selectedLevel,
          interests: studentInfo.interests,
          goals: studentInfo.goal,
        });
      }

      onAssessmentComplete(result);
    }, 1500);
  };

  // STEP: Level Selection
  if (step === 'level') {
    return (
      <div className="min-h-screen bg-gradient-hero pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="text-center mb-10">
            <div className="section-badge mx-auto mb-4">🧠 Free Skill Assessment</div>
            <h1 className="text-4xl font-display font-black text-gray-900 mb-3">
              Let's Find Your <span className="text-gradient-violet">Skill Gaps</span>
            </h1>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Answer questions tailored to your education level. We'll identify your strengths, find gaps, and recommend the perfect crash course.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-8">
            <h2 className="font-display font-bold text-gray-900 text-lg mb-6 text-center">
              What is your current education level?
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {EDUCATION_LEVELS.map(level => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                    selectedLevel === level.id
                      ? 'border-violet-500 bg-violet-50 shadow-violet'
                      : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50/50'
                  }`}
                >
                  <span className="text-3xl">{level.icon}</span>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{level.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{level.description}</div>
                  </div>
                  {selectedLevel === level.id && <CheckCircle className="w-5 h-5 text-violet-500 ml-auto shrink-0" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep('info')}
              disabled={!selectedLevel}
              className="mt-6 w-full btn-primary py-3 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP: Student Info
  if (step === 'info') {
    return (
      <div className="min-h-screen bg-gradient-hero pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
          <button onClick={() => setStep('level')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-8">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-center mb-8">
            <div className="section-badge mx-auto mb-4">👤 About You</div>
            <h2 className="text-3xl font-display font-black text-gray-900">Tell us a bit about yourself</h2>
            <p className="text-gray-500 mt-2 text-sm">This helps us personalize your recommendations.</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-8 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                value={studentInfo.name}
                onChange={e => setStudentInfo(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Arjun Patel"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">What are you interested in learning? (Select all that apply)</label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      studentInfo.interests.includes(interest)
                        ? 'bg-violet-600 text-white border-violet-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">What is your primary goal?</label>
              <div className="space-y-2">
                {goalOptions.map(goal => (
                  <button
                    key={goal}
                    onClick={() => setStudentInfo(p => ({ ...p, goal }))}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-left border transition-all ${
                      studentInfo.goal === goal
                        ? 'bg-violet-50 border-violet-400 text-violet-800'
                        : 'border-gray-200 hover:border-violet-300 text-gray-700'
                    }`}
                  >
                    {studentInfo.goal === goal ? <CheckCircle className="w-4 h-4 text-violet-500 shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />}
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">How much time can you dedicate daily?</label>
              <div className="flex flex-wrap gap-2">
                {timeOptions.map(t => (
                  <button
                    key={t}
                    onClick={() => setStudentInfo(p => ({ ...p, availableTime: t }))}
                    className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                      studentInfo.availableTime === t
                        ? 'bg-violet-600 text-white border-violet-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep('questions')}
              className="w-full btn-primary py-3 justify-center"
            >
              Start Assessment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP: Submitting
  if (step === 'submitting') {
    return (
      <div className="min-h-screen bg-gradient-hero pt-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-8 h-8 text-violet-600" />
          </div>
          <h2 className="text-2xl font-display font-black text-gray-900">Analyzing Your Responses…</h2>
          <p className="text-gray-500 text-sm">Our AI is identifying your skill gaps and preparing recommendations.</p>
        </div>
      </div>
    );
  }

  // STEP: Questions
  const q = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;

  if (!q) {
    return (
      <div className="min-h-screen bg-gradient-hero pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">No questions available for this level. Please go back and try again.</p>
          <button onClick={() => setStep('level')} className="mt-4 btn-secondary">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="font-semibold text-gray-700">Question {currentQ + 1} of {questions.length}</span>
            <span className="text-violet-600 font-semibold">{Math.round(progress)}% Complete</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-400">{EDUCATION_LEVELS.find(l => l.id === selectedLevel)?.label}</span>
            <span className="text-xs px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full font-medium">{q.skill}</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-8">
          <h3 className="text-lg font-display font-bold text-gray-900 mb-6 leading-snug">{q.text}</h3>

          <div className="space-y-3">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all duration-200 ${
                  selectedOption === idx
                    ? 'border-violet-500 bg-violet-50 text-violet-800'
                    : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 text-gray-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  selectedOption === idx ? 'border-violet-500 bg-violet-500' : 'border-gray-300'
                }`}>
                  {selectedOption === idx && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                {option}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => { setCurrentQ(q => Math.max(0, q - 1)); setSelectedOption(answers[questions[Math.max(0, currentQ - 1)]?.id] ?? null); }}
              disabled={currentQ === 0}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {currentQ === questions.length - 1 ? 'Submit Assessment' : 'Next Question'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
