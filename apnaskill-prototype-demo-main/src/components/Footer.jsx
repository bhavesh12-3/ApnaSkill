import React from 'react';
import { BookOpen, Mail, Phone, MapPin, ArrowRight, GraduationCap } from 'lucide-react';

export function Footer({ setActiveView, onStartAssessment }) {
  const navigate = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-violet-500">
                <img src="/logo.jpg" alt="ApnaSkill" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-display font-black text-white text-lg">ApnaSkill</div>
                <div className="text-[9px] text-violet-400 uppercase tracking-widest">Learn Fast · Grow Real</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Learn Faster. Build Skills. Prove Your Potential. AI-powered crash courses for students at every level.
            </p>
            <button onClick={onStartAssessment}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition-colors">
              Free Skill Assessment <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-wide">Courses</h3>
            <ul className="space-y-2 text-sm">
              {[
                'Python Programming in 7 Days',
                'SQL Fundamentals in 7 Days',
                'Power BI Dashboard in 5 Days',
                'Excel for Data Analysis',
                'Web Development in 14 Days',
                'AI Tools for Students',
              ].map(name => (
                <li key={name}>
                  <button onClick={() => navigate('courses')}
                    className="text-gray-400 hover:text-violet-400 transition-colors text-left">{name}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-wide">Platform</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Home', view: 'home' },
                { label: 'Explore Courses', view: 'courses' },
                { label: 'Skill Assessment', view: 'assessment' },
                { label: 'Pricing', view: 'pricing' },
                { label: 'My Dashboard', view: 'dashboard' },
                { label: 'Skill Passport', view: 'skill-passport' },
                { label: 'Mentors', view: 'faculty' },
              ].map(item => (
                <li key={item.view}>
                  <button onClick={() => navigate(item.view)}
                    className="text-gray-400 hover:text-violet-400 transition-colors">{item.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-wide">Legal & Support</h3>
            <ul className="space-y-2 text-sm mb-5">
              {[
                { label: 'Contact Us', view: 'contact' },
                { label: 'FAQ', view: 'faq' },
                { label: 'Terms of Service', view: 'terms' },
                { label: 'Privacy Policy', view: 'privacy' },
                { label: 'Refund Policy', view: 'refund' },
              ].map(item => (
                <li key={item.view}>
                  <button onClick={() => navigate(item.view)}
                    className="text-gray-400 hover:text-violet-400 transition-colors">{item.label}</button>
                </li>
              ))}
            </ul>
            <div className="space-y-1.5 text-xs text-gray-500">
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-violet-500" /> apnaskill@gmail.com</div>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-violet-500" /> India</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ApnaSkill. All rights reserved.</p>
          <p className="text-center">
            Built for students, by educators who care. 
            <span className="ml-2 text-violet-400 font-semibold">Learn Faster. Build Skills. Prove Your Potential.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
