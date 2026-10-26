import React, { useState } from 'react';
import { X, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function AdminPasscodeModal({ isOpen, onClose, onSuccess }) {
  const { login } = useAuth();
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode === 'apnaadmin2026' || passcode === 'admin' || passcode === 'suyash123') {
      login('admin@apnaskill.com', 'admin', 'admin');
      setErrorMsg('');
      setPasscode('');
      onClose();
      onSuccess();
    } else {
      setErrorMsg('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-7 shadow-2xl space-y-6">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-3 pt-1">
          <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7 text-violet-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Admin Portal</h3>
          <p className="text-xs text-gray-500">
            Enter your admin password to access course management and student data.
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700">Admin Password</label>
            <input
              type="password"
              required
              autoFocus
              value={passcode}
              onChange={(e) => { setPasscode(e.target.value); setErrorMsg(''); }}
              placeholder="Enter password…"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 text-sm text-center tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
            />
          </div>

          {errorMsg && (
            <p className="text-red-500 text-xs font-semibold text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            <span>Unlock Admin Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-[11px] text-gray-400">
          Demo password: <code className="bg-gray-100 px-1 rounded">admin</code>
        </p>

      </div>
    </div>
  );
}
