import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  HelpCircle, 
  BookOpen, 
  Calendar, 
  CheckCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { askApnaSkillAI } from '../utils/aiEngine';

export function AiLearningAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: `👋 Hi! I'm **ApnaSkill AI**, your 24/7 personalized learning tutor.\n\nAsk me to explain any tricky concept (like Excel \`VLOOKUP\` or Python loops), generate practice questions, or suggest what you should study next!`,
      practiceQuestion: null
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [userQuizAnswers, setUserQuizAnswers] = useState({});
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isThinking]);

  const handleSend = (textToSend = inputVal) => {
    if (!textToSend.trim() || isThinking) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsThinking(true);

    setTimeout(() => {
      const response = askApnaSkillAI(userMsg.text);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.answer,
        practiceQuestion: response.practiceQuestion
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);
    }, 700);
  };

  const quickPrompts = [
    { label: "Explain Excel VLOOKUP", query: "Explain Excel VLOOKUP in simple language with an example" },
    { label: "Python For Loops", query: "Explain how Python for loops work with practical examples" },
    { label: "Overcome Stage Fear", query: "How to overcome nervousness and stage fear in public speaking?" },
    { label: "Create 7-Day Study Plan", query: "Create a 7-day study plan for me" }
  ];

  const handleQuizOption = (msgId, option) => {
    setUserQuizAnswers(prev => ({ ...prev, [msgId]: option }));
  };

  return (
    <>
      {/* Floating Widget Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-r from-teal-500 via-indigo-600 to-purple-600 text-white shadow-2xl shadow-teal-500/30 hover:scale-105 hover:shadow-teal-500/50 transition-all duration-300 flex items-center gap-3 group"
          title="Ask ApnaSkill AI"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-teal-200 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-[10px] font-semibold text-teal-200 uppercase tracking-wider">AI Learning Tutor</div>
            <div className="text-xs font-extrabold text-white">Ask ApnaSkill AI</div>
          </div>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] bg-[#0c1324] border border-slate-700/80 rounded-3xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden backdrop-blur-2xl transition-all duration-300 ${
            isMinimized ? 'h-16' : 'h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-500 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>ApnaSkill AI Assistant</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </div>
                <div className="text-[10px] text-slate-400">Instant explanations, practice & study plans</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                
                {/* Quick Prompts Pills */}
                <div className="space-y-1.5 pb-2">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-teal-400" />
                    <span>Try asking:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {quickPrompts.map((qp, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(qp.query)}
                        className="px-2.5 py-1 rounded-lg bg-slate-850 hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 border border-slate-750 text-[11px] transition-colors text-left"
                      >
                        {qp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conversation History */}
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.sender === 'ai' && (
                      <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-medium rounded-tr-sm'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm'
                      }`}
                    >
                      {/* Formatted Markdown-like Text Rendering */}
                      <div className="whitespace-pre-line space-y-2">
                        {m.text}
                      </div>

                      {/* Interactive Practice Question Widget if returned */}
                      {m.practiceQuestion && (
                        <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
                          <div className="text-[11px] font-bold text-teal-300 flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Quick Practice Checkpoint:</span>
                          </div>
                          <p className="text-xs text-slate-200 font-medium">{m.practiceQuestion.question}</p>
                          <div className="space-y-1.5">
                            {m.practiceQuestion.options.map((opt, oIdx) => {
                              const isSelected = userQuizAnswers[m.id] === opt;
                              const isCorrect = opt === m.practiceQuestion.correctAnswer;
                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => handleQuizOption(m.id, opt)}
                                  className={`w-full text-left p-2 rounded-xl text-xs border transition-all ${
                                    isSelected
                                      ? isCorrect
                                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                        : 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                                  }`}
                                >
                                  {opt} {isSelected && (isCorrect ? '✅ (Correct!)' : '❌ (Try again)')}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {m.sender === 'user' && (
                      <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}

                {isThinking && (
                  <div className="flex gap-2.5 items-center text-xs text-slate-400">
                    <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 animate-spin" />
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                      <span className="ml-1 text-[11px]">ApnaSkill AI is formulating response...</span>
                    </div>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-slate-900 border-t border-slate-800">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask about Excel, Python, speech, or study plans..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputVal.trim() || isThinking}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 text-white hover:opacity-90 disabled:opacity-40 transition-opacity"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
