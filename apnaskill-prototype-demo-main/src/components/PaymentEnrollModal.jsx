import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, CreditCard, Smartphone, Building2, MessageCircle } from 'lucide-react';
import { useCourses } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';
import { PRICING_PLANS } from '../data/initialData';

export function PaymentEnrollModal({ isOpen, course, onClose, onSuccessEnroll }) {
  const { enrollCourse } = useCourses();
  const { currentUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('moderate');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [step, setStep] = useState('plan'); // 'plan' | 'payment' | 'success'
  const [upiId, setUpiId] = useState('');

  if (!isOpen || !course) return null;

  const plan = PRICING_PLANS.find(p => p.id === selectedPlan) || PRICING_PLANS[1];

  const handleProceed = () => {
    setStep('payment');
  };

  const handleConfirmPayment = () => {
    // TEST MODE: no real payment processed
    enrollCourse(course.id);
    if (onSuccessEnroll) onSuccessEnroll(course.id);
    setStep('success');
  };

  const handleClose = () => {
    setStep('plan');
    setUpiId('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-display font-bold text-gray-900 text-lg">
            {step === 'success' ? 'Enrollment Confirmed! 🎉' : `Enroll in Course`}
          </h2>
          <button onClick={handleClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {step === 'success' ? (
            <div className="text-center py-4 space-y-4">
              {/* Success icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-display font-black text-gray-900">You're Enrolled! 🎉</h3>
              <p className="text-gray-500 text-sm">
                You now have access to <strong>{course.title}</strong>.
              </p>

              {/* WhatsApp Community Card */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-left space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Join the WhatsApp Community</div>
                    <div className="text-xs text-gray-500">Exclusive group for <strong>{course.title}</strong> students</div>
                  </div>
                </div>
                <ul className="text-xs text-gray-600 space-y-1 pl-1">
                  <li>✅ Get announcements, live session links & resources</li>
                  <li>✅ Ask doubts directly to your mentor</li>
                  <li>✅ Connect with fellow learners in your batch</li>
                </ul>
                <a
                  href={course.whatsappLink || 'https://chat.whatsapp.com/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Join WhatsApp Group
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <p className="text-[10px] text-gray-400 text-center">
                  Link is course-specific. Keep it private — do not share publicly.
                </p>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-medium">
                ⚠️ TEST MODE: No real payment was processed. This is a demo enrollment.
              </div>

              <button onClick={handleClose} className="btn-primary w-full justify-center py-3">
                Start Learning Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : step === 'plan' ? (
            <div className="space-y-5">
              {/* Course Info */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <img src={course.thumbnail} alt={course.title}
                  className="w-16 h-12 object-cover rounded-xl shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">{course.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{course.duration} · {course.difficulty}</p>
                </div>
              </div>

              {/* Plan Selection */}
              <div>
                <p className="text-sm font-bold text-gray-700 mb-3">Choose Your Plan:</p>
                <div className="space-y-2.5">
                  {PRICING_PLANS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlan(p.id)}
                      className={`w-full flex items-start gap-3 px-4 py-3 rounded-2xl border-2 text-left transition-all ${
                        selectedPlan === p.id ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-violet-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${selectedPlan === p.id ? 'border-violet-500 bg-violet-500' : 'border-gray-300'}`}>
                        {selectedPlan === p.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-bold ${selectedPlan === p.id ? 'text-violet-800' : 'text-gray-900'}`}>{p.name}</span>
                          <span className={`text-sm font-black ${selectedPlan === p.id ? 'text-violet-700' : 'text-gray-700'}`}>₹{p.price}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">{p.tagline}</div>
                        {p.popular && <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full mt-1 inline-block">⭐ Popular</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleProceed} className="w-full btn-primary py-3 justify-center">
                Continue to Payment — ₹{plan.price}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Order Summary */}
              <div className="p-4 bg-violet-50 rounded-2xl border border-violet-200">
                <div className="flex items-center justify-between text-sm font-bold text-gray-900">
                  <span>{course.title}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>Plan: {plan.name}</span>
                  <span className="font-black text-violet-700 text-base">₹{plan.price}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <p className="text-sm font-bold text-gray-700 mb-3">Payment Method:</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'upi', label: 'UPI', icon: Smartphone },
                    { id: 'card', label: 'Card', icon: CreditCard },
                    { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                  ].map(m => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 text-xs font-semibold transition-all ${
                          paymentMethod === m.id ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-gray-200 text-gray-600 hover:border-violet-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {paymentMethod === 'upi' && (
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Enter UPI ID:</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              )}

              {(paymentMethod === 'card' || paymentMethod === 'netbanking') && (
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-500 text-center">
                  🔒 Secure payment via Razorpay will open after clicking Pay Now.
                </div>
              )}

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-medium">
                ⚠️ TEST MODE ACTIVE — Clicking "Pay Now (Test)" will simulate a successful payment without charging any amount.
              </div>

              <button onClick={handleConfirmPayment}
                className="w-full btn-primary py-3 justify-center text-sm">
                Pay Now (Test) — ₹{plan.price}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => setStep('plan')} className="w-full text-xs text-gray-500 hover:text-gray-700 text-center">
                ← Back to Plan Selection
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
