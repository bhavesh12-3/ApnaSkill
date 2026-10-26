import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import { AssessmentProvider } from './context/AssessmentContext';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PaymentEnrollModal } from './components/PaymentEnrollModal';
import { AdminPasscodeModal } from './components/AdminPasscodeModal';
import { CertificateViewModal } from './pages/CertificateViewModal';
import { AuthModal } from './pages/AuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { CourseCataloguePage } from './pages/CourseCataloguePage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { AssessmentResultPage } from './pages/AssessmentResultPage';
import { LearningDashboardPage } from './pages/LearningDashboardPage';
import { CourseLMSPage } from './pages/CourseLMSPage';
import { SkillPassportPage } from './pages/SkillPassportPage';
import { ProfilePage } from './pages/ProfilePage';
import { GrowthAnalyticsPage } from './pages/GrowthAnalyticsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PricingSection } from './components/PricingSection';
import { FacultySection } from './components/FacultySection';
import {
  ContactPage,
  FAQPage,
  TermsPage,
  PrivacyPage,
  RefundPage,
} from './pages/StaticPages';
import { LearningRoadmapPage } from './pages/LearningRoadmapPage';

function AppContent() {
  const [activeView, setActiveView] = useState('home');
  const [selectedCourseId, setSelectedCourseId] = useState('course-1');
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [assessmentResultData, setAssessmentResultData] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentModalCourse, setPaymentModalCourse] = useState(null);
  const [isAdminPasscodeOpen, setIsAdminPasscodeOpen] = useState(false);

  const navigateTo = (view, courseId = null) => {
    if (courseId) setSelectedCourseId(courseId);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPaymentModal = (course) => {
    setPaymentModalCourse(course);
    setIsPaymentModalOpen(true);
  };

  const handleAssessmentComplete = (result) => {
    setAssessmentResultData(result);
    navigateTo('assessment-result');
  };

  // Pages that should suppress the footer
  const noFooterViews = ['lms'];

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-violet-500 selection:text-white">

      <Navbar
        activeView={activeView}
        setActiveView={navigateTo}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdminLogin={() => setIsAdminPasscodeOpen(true)}
      />

      <main className="flex-1">

        {activeView === 'home' && (
          <HomePage
            setActiveView={navigateTo}
            setSelectedCourseId={setSelectedCourseId}
            onOpenPaymentModal={handleOpenPaymentModal}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activeView === 'courses' && (
          <CourseCataloguePage
            onCourseSelect={(cId) => navigateTo('course-detail', cId)}
            onStartAssessment={() => navigateTo('assessment')}
            onOpenPaymentModal={handleOpenPaymentModal}
          />
        )}

        {activeView === 'course-detail' && (
          <CourseDetailPage
            courseId={selectedCourseId}
            onBack={() => navigateTo('courses')}
            onStartLearning={(cId) => navigateTo('lms', cId)}
            onStartAssessment={() => navigateTo('assessment')}
            onOpenPaymentModal={handleOpenPaymentModal}
          />
        )}

        {activeView === 'assessment' && (
          <AssessmentPage
            onAssessmentComplete={handleAssessmentComplete}
            onBack={() => navigateTo('home')}
          />
        )}

        {activeView === 'assessment-result' && (
          <AssessmentResultPage
            result={assessmentResultData}
            onCourseSelect={(cId) => navigateTo('course-detail', cId)}
            onGoToDashboard={() => navigateTo('dashboard')}
            onRetakeAssessment={() => navigateTo('assessment')}
            onViewRoadmap={() => navigateTo('roadmap')}
          />
        )}

        {activeView === 'dashboard' && (
          <LearningDashboardPage
            onCourseSelect={(cId) => navigateTo('course-detail', cId)}
            onStartLearning={(cId) => navigateTo('lms', cId)}
            onStartAssessment={() => navigateTo('assessment')}
            onViewCertificate={(cert) => setActiveCertificate(cert)}
            onExploreCourses={() => navigateTo('courses')}
            onViewGrowth={() => navigateTo('growth')}
            onViewPassport={() => navigateTo('skill-passport')}
          />
        )}

        {activeView === 'lms' && (
          <CourseLMSPage
            courseId={selectedCourseId}
            onBack={() => navigateTo('dashboard')}
            onViewCertificate={(cert) => setActiveCertificate(cert)}
          />
        )}

        {activeView === 'skill-passport' && (
          <SkillPassportPage
            onViewCertificate={(cert) => setActiveCertificate(cert)}
            onExploreCourses={() => navigateTo('courses')}
            onGoToDashboard={() => navigateTo('dashboard')}
          />
        )}

        {activeView === 'growth' && (
          <GrowthAnalyticsPage
            onStartAssessment={() => navigateTo('assessment')}
            onExploreCourses={() => navigateTo('courses')}
          />
        )}

        {activeView === 'roadmap' && (
          <LearningRoadmapPage
            onCourseSelect={(cId) => navigateTo('course-detail', cId)}
            onStartAssessment={() => navigateTo('assessment')}
            onExploreCourses={() => navigateTo('courses')}
          />
        )}

        {activeView === 'profile' && (
          <ProfilePage
            onStartAssessment={() => navigateTo('assessment')}
            onViewGrowth={() => navigateTo('growth')}
          />
        )}

        {activeView === 'faculty' && (
          <div className="pt-24 pb-20 min-h-screen">
            <FacultySection onExploreCourses={() => navigateTo('courses')} />
          </div>
        )}

        {activeView === 'pricing' && (
          <div className="pt-24 pb-20 min-h-screen">
            <PricingSection
              onStartAssessment={() => navigateTo('assessment')}
              onExploreCourses={() => navigateTo('courses')}
            />
          </div>
        )}

        {activeView === 'admin' && (
          <AdminDashboardPage
            onPreviewCourse={(cId) => navigateTo('course-detail', cId)}
            onExit={() => navigateTo('home')}
          />
        )}

        {activeView === 'contact' && (
          <ContactPage onBack={() => navigateTo('home')} />
        )}

        {activeView === 'faq' && (
          <FAQPage onBack={() => navigateTo('home')} />
        )}

        {activeView === 'terms' && (
          <TermsPage onBack={() => navigateTo('home')} />
        )}

        {activeView === 'privacy' && (
          <PrivacyPage onBack={() => navigateTo('home')} />
        )}

        {activeView === 'refund' && (
          <RefundPage onBack={() => navigateTo('home')} />
        )}

      </main>

      {!noFooterViews.includes(activeView) && (
        <Footer
          setActiveView={navigateTo}
          onStartAssessment={() => navigateTo('assessment')}
          onOpenAdminLogin={() => setIsAdminPasscodeOpen(true)}
        />
      )}

      {/* Modals */}
      <PaymentEnrollModal
        isOpen={isPaymentModalOpen}
        course={paymentModalCourse}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccessEnroll={(courseId) => {
          setIsPaymentModalOpen(false);
          setSelectedCourseId(courseId);
        }}
      />

      <AdminPasscodeModal
        isOpen={isAdminPasscodeOpen}
        onClose={() => setIsAdminPasscodeOpen(false)}
        onSuccess={() => navigateTo('admin')}
      />

      <CertificateViewModal
        certificate={activeCertificate}
        onClose={() => setActiveCertificate(null)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <AssessmentProvider>
          <AppContent />
        </AssessmentProvider>
      </CourseProvider>
    </AuthProvider>
  );
}
