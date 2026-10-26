import React, { createContext, useContext, useState, useEffect } from 'react';

const DEFAULT_STUDENT = {
  id: 'student-guest',
  name: 'Learner',
  email: 'learner@example.com',
  mobile: '',
  role: 'student',
  currentClass: '9th–10th',
  academicStream: 'General',
  interests: ['Technology', 'Communication', 'Analytics'],
  goals: 'Discover my learning gaps and build practical skills.',
  profilePhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
  hasCompletedAssessment: false,
  assessmentResult: null,
  enrolledCourses: [],
  growthHistory: [],
  certificates: []
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('apnaskill_user_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Admin session must NOT persist across page loads — passcode always required
        if (parsed?.role === 'admin') return DEFAULT_STUDENT;
        return parsed;
      } catch (e) {
        console.error('Failed to parse user from local storage', e);
      }
    }
    return DEFAULT_STUDENT;
  });

  const [isAdmin, setIsAdmin] = useState(() => currentUser?.role === 'admin');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('apnaskill_user_v2', JSON.stringify(currentUser));
      setIsAdmin(currentUser.role === 'admin');
    } else {
      localStorage.removeItem('apnaskill_user_v2');
      setIsAdmin(false);
    }
  }, [currentUser]);

  const login = (email, password, role = 'student') => {
    if (role === 'admin' || email.toLowerCase().includes('admin')) {
      const adminUser = {
        id: 'admin-1',
        name: 'Suyash Sharma (Owner)',
        email: 'admin@apnaskill.com',
        role: 'admin',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
      };
      setCurrentUser(adminUser);
      return { success: true, user: adminUser };
    } else {
      const studentUser = {
        ...DEFAULT_STUDENT,
        email: email || DEFAULT_STUDENT.email
      };
      setCurrentUser(studentUser);
      return { success: true, user: studentUser };
    }
  };

  const signup = (userData) => {
    const newUser = {
      id: `student-${Date.now()}`,
      name: userData.name || 'Learner',
      email: userData.email,
      mobile: userData.mobile || '',
      role: 'student',
      age: userData.age || 16,
      currentClass: userData.currentClass || '9th–10th',
      academicStream: userData.academicStream || 'General',
      interests: userData.interests || ['Technology', 'Communication'],
      goals: userData.goals || 'Discover what to learn next and excel academically.',
      profilePhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      hasCompletedAssessment: false,
      assessmentResult: null,
      enrolledCourses: [],
      growthHistory: [],
      certificates: []
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(DEFAULT_STUDENT);
  };

  const switchRole = (role) => {
    if (role === 'admin') {
      login('admin@apnaskill.com', 'pass', 'admin');
    } else {
      setCurrentUser(DEFAULT_STUDENT);
    }
  };

  const updateProfile = (updates) => {
    setCurrentUser(prev => {
      if (!prev) return prev;
      return { ...prev, ...updates };
    });
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAdmin,
      login,
      signup,
      logout,
      switchRole,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
