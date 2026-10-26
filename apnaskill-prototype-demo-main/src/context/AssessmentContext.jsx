import React, { createContext, useContext, useState, useEffect } from 'react';
import { LEVEL_BASED_ASSESSMENT_QUESTIONS as LEVEL_BASED_DIAGNOSTIC_QUESTIONS } from '../data/initialData';
import { generateCourseRecommendations } from '../utils/aiEngine';
import { useAuth } from './AuthContext';
import { useCourses } from './CourseContext';

const AssessmentContext = createContext(null);

export function AssessmentProvider({ children }) {
  const { currentUser, updateProfile } = useAuth();
  const { courses } = useCourses();

  // 1. Level-Based Questions State with persistence
  const [levelQuestions, setLevelQuestions] = useState(() => {
    const saved = localStorage.getItem('apnaskill_level_questions_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse level questions', e);
      }
    }
    return LEVEL_BASED_DIAGNOSTIC_QUESTIONS;
  });

  // Current selected level for student taking the test
  const [selectedLevel, setSelectedLevel] = useState('9th–10th');
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latestResult, setLatestResult] = useState(() => currentUser?.assessmentResult || null);

  useEffect(() => {
    localStorage.setItem('apnaskill_level_questions_v2', JSON.stringify(levelQuestions));
  }, [levelQuestions]);

  // Admin Management Functions for Questions
  const addQuestionToLevel = (level, questionData) => {
    const newQ = {
      id: `q-${Date.now()}`,
      category: questionData.category || 'Mathematics & Logic',
      question: questionData.question,
      options: questionData.options,
      correctIndex: Number(questionData.correctIndex || 0),
      skillKey: questionData.skillKey || 'General',
      explanation: questionData.explanation || ''
    };

    setLevelQuestions(prev => ({
      ...prev,
      [level]: [...(prev[level] || []), newQ]
    }));
    return newQ;
  };

  const editQuestionInLevel = (level, questionId, updates) => {
    setLevelQuestions(prev => ({
      ...prev,
      [level]: (prev[level] || []).map(q => q.id === questionId ? { ...q, ...updates } : q)
    }));
  };

  const deleteQuestionFromLevel = (level, questionId) => {
    setLevelQuestions(prev => ({
      ...prev,
      [level]: (prev[level] || []).filter(q => q.id !== questionId)
    }));
  };

  const resetLevelToDefault = (level) => {
    if (LEVEL_BASED_DIAGNOSTIC_QUESTIONS[level]) {
      setLevelQuestions(prev => ({
        ...prev,
        [level]: LEVEL_BASED_DIAGNOSTIC_QUESTIONS[level]
      }));
    }
  };

  // Student Test Flow
  const answerQuestion = (questionId, optionIndex) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const resetAssessment = () => {
    setCurrentAnswers({});
  };

  // Diagnostic Analyzer specifically for level questions
  const analyzeLevelAssessment = (answers, questionsList, level) => {
    let totalQuestions = questionsList.length;
    let correctCount = 0;
    const categoryBreakdown = {};

    questionsList.forEach((q) => {
      const selectedOption = answers[q.id];
      const isCorrect = selectedOption === q.correctIndex;
      if (isCorrect) correctCount++;

      const cat = q.category || 'General';
      if (!categoryBreakdown[cat]) {
        categoryBreakdown[cat] = { total: 0, correct: 0 };
      }
      categoryBreakdown[cat].total++;
      if (isCorrect) categoryBreakdown[cat].correct++;
    });

    const overallScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 75;

    // Determine strengths & gaps
    const strengths = [];
    const academicGaps = [];

    Object.entries(categoryBreakdown).forEach(([catName, stats]) => {
      const percentage = Math.round((stats.correct / stats.total) * 100);
      if (percentage >= 70) {
        strengths.push({ name: catName, score: percentage, status: 'Mastered' });
      } else {
        academicGaps.push({ name: catName, score: percentage, status: 'Needs Guidance' });
      }
    });

    // Fallbacks if answers are uniform
    if (strengths.length === 0) {
      strengths.push({ name: `${level} Conceptual Aptitude`, score: 78, status: 'Strong Potential' });
    }
    if (academicGaps.length === 0) {
      academicGaps.push({ name: 'Practical Workplace & Digital Speed', score: 55, status: 'Recommended Bridge' });
    }

    return {
      level,
      overallScore,
      totalQuestions,
      correctCount,
      strengths,
      academicGaps,
      dateTaken: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
  };

  const submitAssessment = async (targetLevel = selectedLevel) => {
    setIsSubmitting(true);
    
    // Simulate AI diagnostic calculation
    await new Promise(resolve => setTimeout(resolve, 1000));

    const questionsForLevel = levelQuestions[targetLevel] || LEVEL_BASED_DIAGNOSTIC_QUESTIONS[targetLevel] || [];
    const analysis = analyzeLevelAssessment(currentAnswers, questionsForLevel, targetLevel);
    
    // Recommend only published courses matching level & diagnosed gaps
    const recommendations = generateCourseRecommendations(analysis, courses, targetLevel);

    const fullResult = {
      ...analysis,
      recommendedCourses: recommendations
    };

    setLatestResult(fullResult);
    setIsSubmitting(false);

    // Save into user profile
    if (currentUser) {
      updateProfile({
        hasCompletedAssessment: true,
        currentClass: targetLevel,
        assessmentResult: fullResult
      });
    }

    return fullResult;
  };

  return (
    <AssessmentContext.Provider value={{
      levelQuestions,
      selectedLevel,
      setSelectedLevel,
      questions: levelQuestions[selectedLevel] || [],
      currentAnswers,
      isSubmitting,
      latestResult,
      addQuestionToLevel,
      editQuestionInLevel,
      deleteQuestionFromLevel,
      resetLevelToDefault,
      answerQuestion,
      resetAssessment,
      submitAssessment
    }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
