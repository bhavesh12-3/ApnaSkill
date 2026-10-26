# ApnaSkill — AI-Powered Personalized Learning Platform

> **Learn Faster. Build Skills. Prove Your Potential.**

ApnaSkill is a full-stack EdTech MVP that helps students identify skill gaps, get personalized course recommendations, follow a career-goal roadmap, and track learning progress.

---

## Project Overview

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| State / Context | React Context API (no Redux) |
| Backend API | Node.js + Express (optional, runs on port 5000) |
| Persistence | localStorage (client-side, no DB required for demo) |
| AI Engine | Rule-based recommendation engine (`src/utils/aiEngine.js`) |
| Charts | Inline SVG (no external charting library required) |

---

## Quick Start (Frontend Only — Recommended for Demo)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# App runs at http://localhost:3000
```

The app runs fully in the browser using localStorage. No database or API key is needed for the demo.

---

## Running the Backend API (Optional)

The Express server provides REST endpoints for courses, enrollments, and faculty. It uses the same seed data as the frontend.

```bash
# In a second terminal:
npm run server
# API runs at http://localhost:5000
```

### Available API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/courses` | List courses (filter: `?status=published&category=...`) |
| GET | `/api/courses/:id` | Get single course |
| POST | `/api/admin/courses` | Create course (admin) |
| PUT | `/api/admin/courses/:id` | Update course (admin) |
| PATCH | `/api/admin/courses/:id/status` | Toggle publish/unpublish |
| GET | `/api/admin/leads` | List enrollment leads |
| POST | `/api/enroll` | Submit enrollment lead |
| GET | `/api/faculty` | List faculty |
| GET | `/api/live-sessions` | List live sessions |
| GET | `/api/payment-settings` | Payment config |

---

## Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```env
# Port for the Express API server (default: 5000)
PORT=5000

# Vite dev server port (default: 3000)
VITE_PORT=3000

# Future: add Razorpay, email, or database credentials here
# RAZORPAY_KEY_ID=rzp_test_...
# DB_HOST=localhost
# DB_USER=root
# DB_PASS=secret
# DB_NAME=apnaskill
```

> ⚠️ Never commit real API keys. Use environment variables and add `.env` to `.gitignore`.

---

## Project Structure

```
apnaskill-prototype-demo-main/
├── index.html                  # Vite entry point
├── vite.config.js
├── tailwind.config.js
├── server/
│   └── index.js                # Express REST API
└── src/
    ├── main.jsx                # React entry
    ├── App.jsx                 # Root router (view-based SPA)
    ├── index.css               # Tailwind + custom utilities
    ├── assets/
    │   └── logo.jpg
    ├── context/
    │   ├── AuthContext.jsx     # User auth + profile state
    │   ├── CourseContext.jsx   # Courses, bookmarks, enrollment
    │   └── AssessmentContext.jsx # Assessment + submission
    ├── data/
    │   └── initialData.js      # Seed data: courses, questions, career goals
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── CourseCataloguePage.jsx   # Search + filter + bookmarks
    │   ├── CourseDetailPage.jsx
    │   ├── CourseLMSPage.jsx         # Lesson player + quiz
    │   ├── AssessmentPage.jsx        # Multi-step skill test
    │   ├── AssessmentResultPage.jsx  # SVG skill gap chart + recommendations
    │   ├── LearningDashboardPage.jsx # Progress, certs, bookmarks
    │   ├── LearningRoadmapPage.jsx   # Career-goal roadmap + gap analysis
    │   ├── GrowthAnalyticsPage.jsx   # Before/after skill progression
    │   ├── SkillPassportPage.jsx     # Verified skills + certificates
    │   ├── ProfilePage.jsx
    │   ├── AdminDashboardPage.jsx    # Course/faculty/lead management
    │   ├── AuthModal.jsx
    │   ├── CertificateViewModal.jsx
    │   └── StaticPages.jsx           # Contact, FAQ, Terms, Privacy, Refund
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── HeroSection.jsx
    │   ├── PricingSection.jsx
    │   ├── FacultySection.jsx
    │   ├── AiLearningAssistant.jsx
    │   ├── PaymentEnrollModal.jsx
    │   └── AdminPasscodeModal.jsx
    └── utils/
        └── aiEngine.js         # Recommendation + assessment logic
```

---

## Key User Journeys

### 1. Student Assessment → Recommendations
1. Click **Start Free Assessment** on the homepage or navbar.
2. Select education level → fill in interests + goal → answer questions.
3. View SVG skill-gap chart, strengths/weaknesses, and top-matched courses.
4. Click **View My Roadmap** to open the career roadmap.

### 2. Learning Roadmap
1. Navigate to **Roadmap** in the navbar.
2. Select a career goal (Data Analyst, Web Developer, ML Engineer, etc.).
3. View the skill gap analysis for that goal based on assessment results.
4. Follow the step-by-step path; click **Start** on any step to open the course.

### 3. Course Discovery & Bookmarks
1. Go to **Courses**.
2. Filter by category, education level, difficulty, and price.
3. Click the bookmark icon (top-right of any card) to save a course.
4. View saved courses in **Dashboard → Bookmarks**.

### 4. Course Learning (LMS)
1. Enroll in a course via the payment modal.
2. Open the LMS from the dashboard.
3. Mark lessons complete; take quizzes; submit the project.
4. Claim your certificate at 100% progress.

### 5. Admin Panel
1. Click the lock icon in the navbar footer (or use the footer link).
2. Enter passcode: `apnaskill2024`.
3. Add/edit/publish/archive courses and manage enrollment leads.

---

## AI Recommendation Engine

The engine in [`src/utils/aiEngine.js`](src/utils/aiEngine.js) is **rule-based** (transparent, testable):

1. Collects the student's assessment skill scores per category.
2. Compares against required skill targets for the selected career goal.
3. Calculates the skill gap (target − current) for each skill.
4. Ranks courses by how well they address the highest-priority gaps.
5. Explains each recommendation with a human-readable reason string.

> **Note:** This is not a trained ML model. The architecture is designed so that a scikit-learn or embeddings-based model can be swapped in for `generateCourseRecommendations()` in a future iteration without changing the UI.

---

## Database Design (Future Integration)

The current app uses localStorage. To migrate to MySQL, create these tables:

```sql
users, student_profiles, skills, career_goals,
assessments, assessment_results, courses, course_skills,
recommendations, learning_paths, learning_progress, bookmarks
```

See the project requirements document for full schema with PKs, FKs, and constraints.

---

## Deploying to GitHub Pages or Render

The production build is a static site. Build and publish the generated `dist/` directory; do not publish the source directory. Vite uses relative asset paths so the same build works at a GitHub Pages repository URL and at a Render site URL.

### GitHub Pages

Set the repository's Pages source to **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds the app and publishes it whenever changes are pushed to `main`.

### Render

Create a **Static Site** with these settings:

| Setting | Value |
|---|---|
| Build command | `npm ci && npm run build` |
| Publish directory | `dist` |

The optional Express API (`npm run server`) is not needed for the static frontend; the demo uses browser localStorage.

## Build for Production

```bash
npm run build
# Output: dist/ — publish this directory
```

Serve `dist/` with any static host (Vercel, Netlify, GitHub Pages, NGINX).

---

## Testing

```bash
# Start dev server and open in browser:
npm run dev

# Test key flows manually:
# 1. Complete the assessment end-to-end
# 2. View roadmap and click a course step
# 3. Bookmark a course and check Dashboard → Bookmarks
# 4. Enter admin passcode and add a course
# 5. Enroll in a course and complete lessons
```

---

## Sample Data Notice

All course prices, testimonials, faculty names, and enrollment data are **sample / demo data**. They are clearly labelled in the UI. Replace with verified data before going live.

---

## License

ISC — see `package.json`.
