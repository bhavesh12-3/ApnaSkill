import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_COURSES,
  INITIAL_FACULTY,
  INITIAL_LIVE_SESSIONS,
  INITIAL_ENROLLMENT_LEADS
} from '../data/initialData';
import { useAuth } from './AuthContext';

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
  const { currentUser, updateProfile } = useAuth();

  // 1. Courses State
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('apnaskill_courses_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_COURSES;
  });

  // 2. Faculty State (Real Human Mentors)
  const [faculty, setFaculty] = useState(() => {
    const saved = localStorage.getItem('apnaskill_faculty_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_FACULTY;
  });

  // 3. Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    upiId: "apnaskill@upi",
    accountHolder: "ApnaSkill Learning Academy",
  });

  // 4. Student Enrollment Leads
  const [enrollmentLeads, setEnrollmentLeads] = useState(() => {
    const saved = localStorage.getItem('apnaskill_enrollment_leads');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ENROLLMENT_LEADS;
  });

  // 5. Bookmarks
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('apnaskill_bookmarks_v1');
    if (saved) { try { return JSON.parse(saved); } catch (e) { console.error(e); } }
    return [];
  });

  // 6. Quizzes, Assignments & Live Sessions
  const [assignments, setAssignments] = useState({});
  const [liveSessions, setLiveSessions] = useState(INITIAL_LIVE_SESSIONS);

  useEffect(() => {
    localStorage.setItem('apnaskill_courses_v2', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('apnaskill_faculty_v2', JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem('apnaskill_payment_settings', JSON.stringify(paymentSettings));
  }, [paymentSettings]);

  useEffect(() => {
    localStorage.setItem('apnaskill_enrollment_leads', JSON.stringify(enrollmentLeads));
  }, [enrollmentLeads]);

  useEffect(() => {
    localStorage.setItem('apnaskill_bookmarks_v1', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Dynamic Course Management (Admin)
  const addCourse = (newCourseData) => {
    const newCourse = {
      id: `course-${Date.now()}`,
      slug: (newCourseData.title || 'new-course').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      modules: [],
      status: 'published',
      isPopular: false,
      isNew: true,
      isFeatured: false,
      learningOutcomes: ["Practical mastery of core concepts"],
      prerequisites: "A computer/laptop and curiosity to learn.",
      tags: ["Crash Course"],
      whatsappLink: '',
      ...newCourseData
    };

    setCourses(prev => [newCourse, ...prev]);
    return newCourse;
  };

  const editCourse = (courseId, updates) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, ...updates } : c));
  };

  const publishCourse = (courseId) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'published' } : c));
  };

  const unpublishCourse = (courseId) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'unpublished' } : c));
  };

  const archiveCourse = (courseId) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'archived' } : c));
  };

  const deleteCourse = (courseId) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
  };

  // Faculty Management (Add / Edit / Remove Teacher)
  const addFaculty = (facultyData) => {
    const newFac = {
      id: `fac-${Date.now()}`,
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      courses: [],
      ...facultyData
    };
    setFaculty(prev => [...prev, newFac]);
    return newFac;
  };

  const editFaculty = (facId, updates) => {
    setFaculty(prev => prev.map(f => f.id === facId ? { ...f, ...updates } : f));
  };

  const deleteFaculty = (facId) => {
    setFaculty(prev => prev.filter(f => f.id !== facId));
  };

  // Student Enrollment Leads
  const registerStudentEnrollmentLead = (leadData) => {
    setEnrollmentLeads(prev => [leadData, ...prev]);
    
    // Also auto-enroll in student context if current user is active
    if (currentUser) {
      const isEnrolled = (currentUser.enrolledCourses || []).some(e => e.courseId === leadData.courseId);
      if (!isEnrolled) {
        const newEnroll = {
          courseId: leadData.courseId,
          enrolledAt: new Date().toISOString().split('T')[0],
          progress: 10,
          completedLessons: [],
          quizScores: {},
          isCompleted: false
        };
        updateProfile({
          enrolledCourses: [...(currentUser.enrolledCourses || []), newEnroll]
        });
      }
    }
  };

  const updateLeadStatus = (leadId, newStatus) => {
    setEnrollmentLeads(prev => prev.map(l => l.id === leadId ? { ...l, paymentStatus: newStatus } : l));
  };

  const deleteLead = (leadId) => {
    setEnrollmentLeads(prev => prev.filter(l => l.id !== leadId));
  };

  const clearAllLeads = () => {
    setEnrollmentLeads([]);
  };

  const toggleBookmark = (courseId) => {
    setBookmarks(prev =>
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  };

  const isBookmarked = (courseId) => bookmarks.includes(courseId);

  const updatePaymentSettings = (newSettings) => {
    setPaymentSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Live Session Scheduler
  const addLiveSession = (sessionData) => {
    const newSession = {
      id: `live-${Date.now()}`,
      isEnrolledOnly: true,
      platform: "Live on Zoom / Google Meet",
      ...sessionData
    };
    setLiveSessions(prev => [newSession, ...prev]);
  };

  const deleteLiveSession = (sessionId) => {
    setLiveSessions(prev => prev.filter(s => s.id !== sessionId));
  };

  // Modules & Lessons
  const addModuleToCourse = (courseId, moduleTitle) => {
    const newMod = {
      id: `mod-${Date.now()}`,
      title: moduleTitle || 'New Module',
      duration: 'Live Sessions',
      lessons: []
    };
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, modules: [...(c.modules || []), newMod] };
      }
      return c;
    }));
  };

  const addLessonToModule = (courseId, moduleId, lessonData) => {
    const newLesson = {
      id: `les-${Date.now()}`,
      title: lessonData.title || 'New Live Session',
      duration: lessonData.duration || '60 mins',
      type: lessonData.type || 'live_session',
      videoUrl: lessonData.videoUrl || '',
      summary: lessonData.summary || 'Live interactive class and hands-on walkthrough.',
      resources: lessonData.resources || [],
      completed: false,
      ...lessonData
    };

    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const updatedModules = (c.modules || []).map(m => {
          if (m.id === moduleId) {
            return { ...m, lessons: [...(m.lessons || []), newLesson] };
          }
          return m;
        });
        return { ...c, modules: updatedModules };
      }
      return c;
    }));
  };

  const enrollCourse = (courseId) => {
    if (!currentUser) return false;
    const isEnrolled = (currentUser.enrolledCourses || []).some(e => e.courseId === courseId);
    if (isEnrolled) return true;

    const newEnrollment = {
      courseId,
      enrolledAt: new Date().toISOString().split('T')[0],
      progress: 0,
      completedLessons: [],
      quizScores: {},
      isCompleted: false
    };

    updateProfile({
      enrolledCourses: [...(currentUser.enrolledCourses || []), newEnrollment]
    });
    return true;
  };

  const markLessonCompleted = (courseId, lessonId) => {
    if (!currentUser) return;
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    let totalLessonsCount = 0;
    (course.modules || []).forEach(m => {
      totalLessonsCount += (m.lessons || []).length;
    });

    const enrolledList = (currentUser.enrolledCourses || []).map(enroll => {
      if (enroll.courseId === courseId) {
        const completed = new Set(enroll.completedLessons || []);
        completed.add(lessonId);
        const completedArr = Array.from(completed);
        const calcProgress = totalLessonsCount > 0 
          ? Math.round((completedArr.length / totalLessonsCount) * 100)
          : 100;
        
        return {
          ...enroll,
          completedLessons: completedArr,
          progress: Math.min(100, calcProgress),
          isCompleted: calcProgress >= 100
        };
      }
      return enroll;
    });

    updateProfile({ enrolledCourses: enrolledList });
  };

  const submitQuizScore = (courseId, quizId, score) => {
    if (!currentUser) return;
    const enrolledList = (currentUser.enrolledCourses || []).map(enroll => {
      if (enroll.courseId === courseId) {
        return {
          ...enroll,
          quizScores: { ...(enroll.quizScores || {}), [quizId]: score }
        };
      }
      return enroll;
    });
    updateProfile({ enrolledCourses: enrolledList });
  };

  const submitAssignment = (assignmentId, submission) => {
    setAssignments(prev => ({
      ...prev,
      [assignmentId]: {
        ...(prev[assignmentId] || {}),
        status: 'submitted',
        submission: {
          ...submission,
          submittedAt: new Date().toLocaleDateString()
        }
      }
    }));
  };

  const claimCertificate = (courseId) => {
    if (!currentUser) return null;
    const course = courses.find(c => c.id === courseId);
    if (!course) return null;

    const certId = `AS-${new Date().getFullYear()}-${(course.slug || 'SKILL').toUpperCase().slice(0, 5)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCert = {
      id: certId,
      courseId,
      courseTitle: course.title,
      studentName: currentUser.name || 'Learner',
      issueDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      score: 94,
      instructor: course.instructor?.name || 'ApnaSkill Instructor',
      instructorRole: course.instructor?.role || 'Lead Instructor',
      skills: course.skills || [],
      category: course.category || 'General',
    };

    const existing = (currentUser.certificates || []).find(c => c.courseId === courseId);
    if (!existing) {
      updateProfile({
        certificates: [...(currentUser.certificates || []), newCert]
      });
    }
    return existing || newCert;
  };

  return (
    <CourseContext.Provider value={{
      courses,
      faculty,
      assignments,
      liveSessions,
      paymentSettings,
      enrollmentLeads,
      bookmarks,
      toggleBookmark,
      isBookmarked,
      addCourse,
      editCourse,
      publishCourse,
      unpublishCourse,
      archiveCourse,
      deleteCourse,
      addFaculty,
      editFaculty,
      deleteFaculty,
      registerStudentEnrollmentLead,
      updateLeadStatus,
      deleteLead,
      clearAllLeads,
      updatePaymentSettings,
      addLiveSession,
      deleteLiveSession,
      addModuleToCourse,
      addLessonToModule,
      enrollCourse,
      markLessonCompleted,
      submitQuizScore,
      submitAssignment,
      claimCertificate
    }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
}
