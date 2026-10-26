import express from 'express';
import cors from 'cors';
import {
  INITIAL_COURSES,
  INITIAL_FACULTY,
  INITIAL_LIVE_SESSIONS,
  INITIAL_ENROLLMENT_LEADS
} from '../src/data/initialData.js';

const INITIAL_PAYMENT_SETTINGS = {
  upiId: 'apnaskill@upi',
  accountHolder: 'ApnaSkill Learning Academy',
  whatsappGroupLink: '',
};

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory state initialized from seed
let coursesDB = [...INITIAL_COURSES];
let facultyDB = [...INITIAL_FACULTY];
let leadsDB = [...INITIAL_ENROLLMENT_LEADS];
let paymentSettingsDB = { ...INITIAL_PAYMENT_SETTINGS };

// 1. Course Endpoints
app.get('/api/courses', (req, res) => {
  const { status, category, targetClass } = req.query;
  let filtered = [...coursesDB];

  if (status) {
    filtered = filtered.filter(c => c.status === status);
  }
  if (category && category !== 'All') {
    filtered = filtered.filter(c => c.category === category);
  }
  if (targetClass && targetClass !== 'All') {
    filtered = filtered.filter(c => c.targetClass === targetClass || c.targetClass === 'All');
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

app.get('/api/courses/:id', (req, res) => {
  const course = coursesDB.find(c => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }
  res.json({ success: true, data: course });
});

// Admin Create Course
app.post('/api/admin/courses', (req, res) => {
  const newCourse = {
    id: `course-${Date.now()}`,
    slug: (req.body.title || 'new-course').toLowerCase().replace(/\s+/g, '-'),
    modules: [],
    status: 'published',
    ...req.body
  };
  coursesDB.unshift(newCourse);
  res.status(201).json({ success: true, data: newCourse });
});

// Admin Update Course
app.put('/api/admin/courses/:id', (req, res) => {
  const index = coursesDB.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }
  coursesDB[index] = { ...coursesDB[index], ...req.body };
  res.json({ success: true, data: coursesDB[index] });
});

// Admin Toggle Publish/Unpublish
app.patch('/api/admin/courses/:id/status', (req, res) => {
  const { status } = req.body;
  const course = coursesDB.find(c => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }
  course.status = status;
  res.json({ success: true, data: course });
});

// 2. Student Enrollment Leads
app.get('/api/admin/leads', (req, res) => {
  res.json({ success: true, count: leadsDB.length, data: leadsDB });
});

app.post('/api/enroll', (req, res) => {
  const newLead = {
    id: `lead-${Date.now()}`,
    enrolledDate: new Date().toLocaleDateString(),
    paymentStatus: 'Submitted (Verification Pending)',
    ...req.body
  };
  leadsDB.unshift(newLead);
  res.status(201).json({ success: true, data: newLead, whatsappGroupLink: paymentSettingsDB.whatsappGroupLink });
});

// 3. Faculty Endpoints
app.get('/api/faculty', (req, res) => {
  res.json({ success: true, data: facultyDB });
});

// 4. Live Sessions
app.get('/api/live-sessions', (req, res) => {
  res.json({ success: true, data: INITIAL_LIVE_SESSIONS });
});

// 5. Payment Settings
app.get('/api/payment-settings', (req, res) => {
  res.json({ success: true, data: paymentSettingsDB });
});

app.post('/api/admin/payment-settings', (req, res) => {
  paymentSettingsDB = { ...paymentSettingsDB, ...req.body };
  res.json({ success: true, data: paymentSettingsDB });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', platform: 'ApnaSkill Platform API', time: new Date() });
});

app.listen(PORT, () => {
  console.log(`ApnaSkill API Server running on port ${PORT}`);
});
