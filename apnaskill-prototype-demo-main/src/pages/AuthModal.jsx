import React, { useState } from 'react';
import { X, User, Mail, Lock, GraduationCap, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { EDUCATION_LEVELS } from '../data/initialData';

// Social provider mock — shows "coming soon" toast since real OAuth needs a backend
function SocialButton({ icon, label, color, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all hover:shadow-md active:scale-95 ${color}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

export function AuthModal({ isOpen, onClose }) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialToast, setSocialToast] = useState('');

  if (!isOpen) return null;

  const showSocialToast = (provider) => {
    setSocialToast(`${provider} sign-in coming soon — use email for now.`);
    setTimeout(() => setSocialToast(''), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const result = login(email, password);
        if (result.success) { onClose(); }
        else { setError('Login failed. Please try again.'); }
      } else {
        if (!name.trim()) { setError('Please enter your name.'); setLoading(false); return; }
        if (!email.trim()) { setError('Please enter your email.'); setLoading(false); return; }
        const result = signup({ name, email, password, currentClass: level });
        if (result.success) { onClose(); }
        else { setError('Sign up failed. Please try again.'); }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-md animate-fadeIn overflow-hidden">

        {/* Top gradient strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500" />

        {/* Header */}
        <div className="px-7 pt-6 pb-5 text-center relative">
          <button onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🎓</span>
          </div>
          <h2 className="font-display font-black text-gray-900 text-2xl">
            {mode === 'login' ? 'Welcome Back!' : 'Join ApnaSkill'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {mode === 'login'
              ? 'Sign in to access your dashboard and courses.'
              : 'Create a free account and start learning today.'}
          </p>
        </div>

        <div className="px-7 pb-7 space-y-4">

          {/* Social Buttons */}
          <div className="flex gap-2">
            <SocialButton
              icon={<GoogleIcon />}
              label="Google"
              color="border-gray-200 text-gray-700 hover:bg-gray-50"
              onClick={() => showSocialToast('Google')}
            />
            <SocialButton
              icon={<FacebookIcon />}
              label="Facebook"
              color="border-blue-100 text-blue-700 hover:bg-blue-50"
              onClick={() => showSocialToast('Facebook')}
            />
            <SocialButton
              icon={<GithubIcon />}
              label="GitHub"
              color="border-gray-200 text-gray-800 hover:bg-gray-50"
              onClick={() => showSocialToast('GitHub')}
            />
          </div>

          {/* Social toast */}
          {socialToast && (
            <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-medium animate-fadeIn">
              <span>ℹ️</span> {socialToast}
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or continue with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required
                    placeholder="Arjun Patel"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-gray-700">Password</label>
                {mode === 'login' && (
                  <button type="button" className="text-xs text-violet-600 font-semibold hover:underline">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => setRemember(!remember)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                    remember ? 'bg-violet-600 border-violet-600' : 'border-gray-300'
                  }`}
                >
                  {remember && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className="text-xs text-gray-600">Remember me</span>
              </label>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Education Level</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select value={level} onChange={e => setLevel(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white appearance-none transition">
                    <option value="">Select your level</option>
                    {EDUCATION_LEVELS.map(l => (
                      <option key={l.id} value={l.id}>{l.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                ⚠️ {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full btn-primary py-3 justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed mt-1">
              {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch mode */}
          <p className="text-center text-xs text-gray-500 pt-1">
            {mode === 'login' ? (
              <>Don't have an account?{' '}
                <button type="button" onClick={() => { setMode('signup'); setError(''); }}
                  className="text-violet-600 font-bold hover:underline">
                  Sign up free
                </button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button type="button" onClick={() => { setMode('login'); setError(''); }}
                  className="text-violet-600 font-bold hover:underline">
                  Sign in
                </button>
              </>
            )}
          </p>

        </div>
      </div>
    </div>
  );
}
