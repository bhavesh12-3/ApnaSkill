import React, { useState, useEffect } from 'react';
import {
  Sparkles, Compass, BookOpen, Users, Layers, Tag, Lock,
  Menu, X, GraduationCap, ChevronRight, Shield, User, LogOut,
  Zap, BarChart2, Map
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Navbar({ activeView, setActiveView, onOpenAdminLogin, onOpenAuth }) {
  const { currentUser, isAdmin, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'assessment', label: 'Skill Test', icon: Sparkles, badge: 'Free' },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'pricing', label: 'Pricing', icon: Tag },
    { id: 'faculty', label: 'Mentors', icon: Users },
  ];

  const handleNavClick = (id) => {
    setActiveView(id);
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLoggedIn = currentUser && currentUser.email !== 'learner@example.com';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-violet-100 shadow-sm py-2' : 'bg-white/80 backdrop-blur-md py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-md group-hover:shadow-violet ring-2 ring-violet-200 group-hover:ring-violet-400 transition-all duration-300">
              <img src="/logo.jpg" alt="ApnaSkill" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-display font-extrabold tracking-wide text-gray-900">
                Apna<span className="text-gradient-violet">Skill</span>
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-widest text-violet-500">
                Learn Fast · Grow Real
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5 bg-gray-50 rounded-2xl p-1 border border-gray-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-violet-700 shadow-sm border border-violet-200'
                      : 'text-gray-500 hover:text-violet-700 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-violet-600' : ''}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-px text-[9px] font-bold bg-violet-600 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="hidden sm:flex items-center gap-2">
            {isAdmin ? (
              <button onClick={() => handleNavClick('admin')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold hover:bg-violet-100 transition-colors">
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </button>
            ) : (
              <button onClick={onOpenAdminLogin} className="p-1.5 text-gray-300 hover:text-gray-500 transition-colors" title="Admin Portal">
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}

            {!isAdmin && (
              isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:border-violet-300 text-gray-700 text-xs font-semibold transition-all"
                  >
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-white text-[10px] font-bold">
                      {currentUser.name?.charAt(0)?.toUpperCase() || 'S'}
                    </div>
                    <span>{currentUser.name?.split(' ')[0] || 'My Account'}</span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-fadeIn">
                      <button onClick={() => handleNavClick('dashboard')}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700">
                        <BarChart2 className="w-4 h-4" /> My Dashboard
                      </button>
                      <button onClick={() => handleNavClick('profile')}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700">
                        <User className="w-4 h-4" /> Profile
                      </button>
                      <button onClick={() => handleNavClick('roadmap')}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700">
                        <Map className="w-4 h-4" /> My Roadmap
                      </button>
                      <button onClick={() => handleNavClick('skill-passport')}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700">
                        <GraduationCap className="w-4 h-4" /> Skill Passport
                      </button>
                      <div className="border-t border-gray-100">
                        <button onClick={logout}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:border-violet-300 hover:text-violet-700 transition-all">
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )
            )}

            <button
              onClick={() => handleNavClick('assessment')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 text-white text-xs font-bold shadow-violet hover:shadow-violet-lg hover:-translate-y-px transition-all duration-200"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Start Learning</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => handleNavClick('assessment')}
              className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-bold">
              Free Test
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-gray-200 text-gray-500"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-5 space-y-1 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                  activeView === item.id ? 'bg-violet-50 text-violet-700 border border-violet-200' : 'text-gray-600 hover:bg-gray-50'
                }`}>
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-violet-500" />
                  <span>{item.label}</span>
                </div>
                {item.badge && <span className="px-2 py-0.5 text-[9px] font-bold bg-violet-600 text-white rounded-full">{item.badge}</span>}
              </button>
            );
          })}
          <div className="pt-2 border-t border-gray-100 space-y-1.5">
            {isLoggedIn ? (
              <>
                <button onClick={() => handleNavClick('dashboard')}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-violet-700 bg-violet-50">
                  <BarChart2 className="w-4 h-4" /> My Dashboard
                </button>
                <button onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 bg-red-50">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <button onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="w-full py-2.5 text-sm font-bold text-center bg-violet-600 text-white rounded-xl">
                Sign Up / Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
