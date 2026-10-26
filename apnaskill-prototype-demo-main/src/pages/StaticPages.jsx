import React from 'react';
import { ArrowLeft } from 'lucide-react';

export function StaticPages({ page, onBack }) {
  const pages = {
    contact: {
      title: 'Contact Us',
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">We'd love to hear from you. Reach out through any of the channels below.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Email', value: 'apnaskill@gmail.com', icon: '📧' },
              { label: 'WhatsApp', value: '+91 98765 43210', icon: '💬' },
              { label: 'Support Hours', value: 'Mon–Sat, 9 AM to 7 PM IST', icon: '🕐' },
              { label: 'Location', value: 'India', icon: '📍' },
            ].map(item => (
              <div key={item.label} className="bg-gray-50 rounded-2xl border border-gray-200 p-4">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-bold text-gray-900 text-sm">{item.label}</div>
                <div className="text-gray-600 text-sm mt-0.5">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="bg-violet-50 rounded-2xl border border-violet-200 p-5">
            <p className="text-violet-800 text-sm font-semibold">📌 For enrollment and payment queries, please WhatsApp us with your name, course name, and transaction reference.</p>
          </div>
        </div>
      ),
    },
    faq: {
      title: 'Frequently Asked Questions',
      content: (
        <div className="space-y-4">
          {[
            { q: 'What is ApnaSkill?', a: 'ApnaSkill is an AI-powered crash-course platform that helps students identify skill gaps and master practical skills in days, not months.' },
            { q: 'Who are the courses for?', a: 'Our courses are designed for students from Classes 5–8 all the way through postgraduate level. We have assessment-driven personalization for each level.' },
            { q: 'Is the skill assessment really free?', a: 'Yes. The skill assessment is completely free and takes about 10 minutes. It is tailored to your education level.' },
            { q: 'What payment methods do you accept?', a: 'We accept UPI, debit/credit cards, and net banking via Razorpay. In test mode, no real charges are made.' },
            { q: 'How are certificates verified?', a: 'Each certificate has a unique ID (e.g. AS-2025-PYTH-1234). Recipients can share this ID for verification.' },
            { q: 'Do I get lifetime access?', a: 'Yes. Once you purchase a course, you have lifetime access to all lessons, notes, and updates.' },
          ].map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl p-4">
              <div className="font-bold text-gray-900 text-sm mb-1.5">{item.q}</div>
              <div className="text-gray-600 text-sm">{item.a}</div>
            </div>
          ))}
        </div>
      ),
    },
    terms: {
      title: 'Terms of Service',
      content: (
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>By using ApnaSkill, you agree to these Terms of Service. Please read them carefully.</p>
          <h3 className="font-bold text-gray-900 text-base">1. Use of Platform</h3>
          <p>ApnaSkill is an educational platform. You must use it for lawful educational purposes only. You may not share your account or course access with others.</p>
          <h3 className="font-bold text-gray-900 text-base">2. Payments</h3>
          <p>All course purchases are one-time payments. Prices are in Indian Rupees. Payment is processed securely via Razorpay. In the current demo, no real charges are made.</p>
          <h3 className="font-bold text-gray-900 text-base">3. Intellectual Property</h3>
          <p>All course content, videos, notes, and materials are the property of ApnaSkill. You may not reproduce or redistribute them without written permission.</p>
          <h3 className="font-bold text-gray-900 text-base">4. Certificates</h3>
          <p>Certificates are issued upon meeting completion criteria. Misrepresenting ApnaSkill certificates is prohibited.</p>
          <h3 className="font-bold text-gray-900 text-base">5. Changes</h3>
          <p>We reserve the right to modify these terms. Continued use of the platform after changes constitutes acceptance.</p>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy',
      content: (
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>ApnaSkill is committed to protecting your privacy. This policy explains what data we collect and how we use it.</p>
          <h3 className="font-bold text-gray-900 text-base">Information We Collect</h3>
          <p>We collect your name, email, education level, and learning preferences when you register. We also collect assessment answers and course progress to personalize your experience.</p>
          <h3 className="font-bold text-gray-900 text-base">How We Use Your Data</h3>
          <p>We use your data to provide personalized course recommendations, track your learning progress, issue certificates, and communicate important updates.</p>
          <h3 className="font-bold text-gray-900 text-base">Data Storage</h3>
          <p>In the current demo, all data is stored locally in your browser (localStorage). No data is sent to external servers in demo mode.</p>
          <h3 className="font-bold text-gray-900 text-base">Your Rights</h3>
          <p>You may request deletion of your data by contacting us at apnaskill@gmail.com. We will process requests within 14 business days.</p>
        </div>
      ),
    },
    refund: {
      title: 'Refund Policy',
      content: (
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div className="bg-violet-50 rounded-2xl border border-violet-200 p-4">
            <p className="text-violet-800 text-sm font-semibold">⚠️ Currently in test/demo mode. No real payments are processed.</p>
          </div>
          <h3 className="font-bold text-gray-900 text-base">7-Day Refund Window</h3>
          <p>If you are not satisfied with your course, you may request a full refund within 7 days of enrollment, provided you have completed less than 20% of the course content.</p>
          <h3 className="font-bold text-gray-900 text-base">Non-Refundable Cases</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>You have completed more than 20% of the course.</li>
            <li>A certificate has already been issued.</li>
            <li>More than 7 days have passed since enrollment.</li>
          </ul>
          <h3 className="font-bold text-gray-900 text-base">How to Request a Refund</h3>
          <p>Email us at apnaskill@gmail.com with your order details, certificate ID (if any), and reason for the refund. We will process it within 5-7 business days.</p>
        </div>
      ),
    },
  };

  const current = pages[page];
  if (!current) return null;

  return (
    <div className="min-h-screen bg-gradient-hero pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-4xl font-display font-black text-gray-900 mb-8">{current.title}</h1>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-8">
          {current.content}
        </div>
      </div>
    </div>
  );
}

// Named convenience wrappers used by App.jsx
export function ContactPage({ onBack }) { return <StaticPages page="contact" onBack={onBack} />; }
export function FAQPage({ onBack }) { return <StaticPages page="faq" onBack={onBack} />; }
export function TermsPage({ onBack }) { return <StaticPages page="terms" onBack={onBack} />; }
export function PrivacyPage({ onBack }) { return <StaticPages page="privacy" onBack={onBack} />; }
export function RefundPage({ onBack }) { return <StaticPages page="refund" onBack={onBack} />; }
