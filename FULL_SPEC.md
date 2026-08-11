# APPLYZE - FULL APPLICATION SPECIFICATION

## PROJECT OVERVIEW
**Name:** Applyze (formerly MentorioHub)
**Purpose:** AI-powered college admission profile assessment platform for CIS students applying to top US universities
**Target Market:** High school students (grades 8-12) from CIS countries (Kazakhstan, Russia, etc.)
**Tech Stack:** Next.js 16.2.9, Supabase (auth + database), OpenRouter (AI), Stripe (payments), Vercel (hosting)
**Current Status:** In active development, deployed at https://applyze-five.vercel.app

---

## CORE BUSINESS MODEL

### Value Proposition
"Know your chances before you apply"
- AI scores student profiles (0-100) like admission officers
- Generates personalized roadmap for profile improvement
- Provides college list (reach/target/safety schools)
- Compares against historical applicants

### Pricing Strategy
- **Free Tier:** 1 profile assessment/month, basic college list (10 schools), 3-month roadmap
- **Pro Tier ($9/month):** Unlimited assessments, advanced college list (30+ schools), full roadmap, essay topic generator, priority support

---

## CURRENT ARCHITECTURE

### Tech Stack Details
```
Frontend: Next.js 16.2.9 (App Router, React 19.2.4, Turbopack)
UI: Tailwind CSS 4, shadcn/ui components, Radix UI primitives
Backend: Next.js API routes
Database: Supabase (PostgreSQL)
Auth: Supabase Auth (email/password, Google OAuth planned)
AI: OpenRouter API (Claude 3.5 Sonnet)
Payments: Stripe integration (configured but not active)
Hosting: Vercel
Fonts: Space Grotesk (headings), DM Sans (body)
```

### Color Scheme (Dark Theme)
```css
Background: #0A0E1A (deep blue-black)
Surface: #141B2E (cards)
Primary: #3B82F6 (bright blue)
Secondary: #60A5FA (lighter blue for hover)
Accent: #10B981 (green for success/improvement)
Text: #FFFFFF (pure white)
Text Muted: #94A3B8 (gray-blue)
Border: #1E293B (subtle borders)
```

---

## DATABASE SCHEMA

### Current Tables (Supabase)

#### users
```sql
id UUID PRIMARY KEY
name TEXT
email TEXT UNIQUE
password_hash TEXT
role TEXT ('student', 'mentor', 'admin')
grade TEXT
interests TEXT[]
coins INTEGER DEFAULT 100
rank INTEGER DEFAULT 0
mbti TEXT
mbti_analysis TEXT
created_at TIMESTAMP
updated_at TIMESTAMP
```

#### profiles (NEW - for profile scoring)
```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES users(id) UNIQUE

-- Academic
gpa DECIMAL(3,2)
sat_score INTEGER
act_score INTEGER
ap_courses JSONB DEFAULT '[]'
coursework_rigor TEXT
class_rank INTEGER
class_size INTEGER

-- Extracurriculars
activities JSONB DEFAULT '[]'
awards JSONB DEFAULT '[]'
leadership_positions JSONB DEFAULT '[]'

-- Personal
intended_major TEXT
first_generation BOOLEAN
urm_status TEXT
location TEXT
financial_aid_needed BOOLEAN

-- Essay & recommendations
essay_topics JSONB DEFAULT '[]'
recommenders_count INTEGER DEFAULT 0

-- AI-generated scores (0-100)
overall_score INTEGER
academic_score INTEGER
extracurricular_score INTEGER
essay_score INTEGER
recommendation_score INTEGER

-- AI analysis
strengths TEXT[]
weaknesses TEXT[]
improvement_suggestions JSONB DEFAULT '[]'

-- College list
reach_schools JSONB DEFAULT '[]'
target_schools JSONB DEFAULT '[]'
safety_schools JSONB DEFAULT '[]'

-- Meta
completed_onboarding BOOLEAN DEFAULT FALSE
last_assessed_at TIMESTAMP
assessment_count INTEGER DEFAULT 0
created_at TIMESTAMP
updated_at TIMESTAMP
```

#### roadmap_tasks
```sql
id UUID PRIMARY KEY
profile_id UUID REFERENCES profiles(id)
title TEXT
description TEXT
category TEXT ('academic', 'extracurricular', 'testing', 'essay', 'recommendation')
priority TEXT ('critical', 'high', 'medium', 'low')
deadline DATE
estimated_impact INTEGER
completed BOOLEAN DEFAULT FALSE
completed_at TIMESTAMP
created_at TIMESTAMP
updated_at TIMESTAMP
```

#### assessment_history
```sql
id UUID PRIMARY KEY
profile_id UUID REFERENCES profiles(id)
overall_score INTEGER
academic_score INTEGER
extracurricular_score INTEGER
snapshot JSONB
created_at TIMESTAMP
```

#### courses, opportunities, messages, user_progress (LEGACY - to be removed)
These tables were from MentorioHub era and are no longer used in Applyze flow.

---

## APPLICATION ROUTES

### PUBLIC PAGES (No Auth Required)
- `/` - Landing page (minimal hero + CTA)
- `/start` - Onboarding flow (3-step profile assessment form)
- `/about` - About page (legacy, needs update)
- `/about-us` - About us page (legacy, needs update)
- `/faq` - FAQ page (legacy, needs update)
- `/features` - Features page (legacy, needs update)

### AUTHENTICATED PAGES (Auth Required)
- `/dashboard` - User dashboard (profile score, college list, roadmap overview)
- `/roadmap` - Detailed roadmap with tasks
- `/profile` - User profile settings
- `/profile/setup` - Profile setup wizard (legacy, replaced by /start)

### ADMIN/MENTOR PAGES (Role-Based Access)
- `/admin` - Admin panel (user management, analytics)
- `/mentor` - Mentor dashboard (legacy, to be removed)
- `/mentor/messages` - Mentor messaging (legacy, to be removed)
- `/mentor/student/[id]` - Student detail view (legacy, to be removed)

### LEGACY PAGES (To Be Removed)
- `/courses` - Course catalog (not relevant for Applyze)
- `/courses/[id]` - Course detail (not relevant)
- `/opportunities` - Opportunities list (scholarships, competitions)
- `/opportunities/[id]` - Opportunity detail
- `/messages` - Messaging system (not needed)
- `/game` - Gamification feature (not relevant)
- `/shop` - Virtual shop (not relevant)
- `/leaderboard` - Leaderboard (not relevant)
- `/profile/mbti` - MBTI personality test (not relevant)
- `/profile/telegram` - Telegram bot integration (legacy)
- `/login` - Login page (replaced by auth modal)
- `/register` - Register page (replaced by auth modal)

### API ROUTES
- `/api/users` - User CRUD operations
- `/api/chat` - AI chat (essay feedback, profile analysis)
- `/api/roadmap` - Roadmap generation
- `/api/quiz` - MBTI quiz (legacy)
- `/api/mbti-analysis` - MBTI analysis (legacy)
- `/api/courses` - Course CRUD (legacy)
- `/api/opportunities` - Opportunities CRUD (legacy)
- `/api/telegram` - Telegram bot webhook (legacy)

---

## USER FLOW

### New User Journey (Current)
1. **Landing (/):** User sees hero with "Get your free AI profile evaluation" CTA
2. **Click CTA:** Routes to `/start`
3. **Onboarding (/start):** 3-step form:
   - Step 1: Academic (GPA, SAT/ACT, AP courses)
   - Step 2: Extracurriculars (Activities, Awards)
   - Step 3: Personal (Intended major, Location)
4. **Submit:** If not logged in, auth modal appears → register/login
5. **Redirect to /dashboard:** Shows profile score, college list, roadmap preview
6. **Explore:**
   - View detailed roadmap (/roadmap)
   - Update profile (/profile)
   - Re-assess profile (unlimited for Pro, 1/month for Free)

### Authentication Flow
- **Modal-based:** Global auth modal (not separate pages)
- **Register:** Email + password, name, grade, interests (simplified, no role selection)
- **Login:** Email + password
- **After auth:** Redirects to intended page or /dashboard
- **Session:** Managed by Supabase Auth

---

## COMPONENTS BREAKDOWN

### Layout Components
- `src/app/layout.tsx` - Root layout (dark theme forced, fonts, auth provider)
- `src/components/navbar.tsx` - Top navigation (logo, Dashboard/Roadmap links for logged-in users, auth buttons)
- `src/components/logo.tsx` - Applyze logo component

### Auth Components
- `src/components/auth-modal.tsx` - Modal with login/register tabs
- `src/components/global-auth-modal.tsx` - Global wrapper for auth modal
- `src/contexts/auth-context.tsx` - Auth state management (user, login, register, logout)

### UI Components (shadcn/ui)
- `src/components/ui/button.tsx` - Button component
- `src/components/ui/input.tsx` - Input component
- `src/components/ui/textarea.tsx` - Textarea component
- `src/components/ui/progress-bar.tsx` - Progress bar

### Legacy Components (To Be Removed)
- `src/components/calendar-widget.tsx` - Calendar widget (removed from layout)
- `src/components/navi-mentor.tsx` - Floating mentor character (removed from layout)
- `src/components/admin-navbar.tsx` - Admin navigation
- `src/components/mentor-navbar.tsx` - Mentor navigation
- `src/components/language-switcher.tsx` - Language switcher (not in use)
- `src/components/theme-toggle.tsx` - Theme toggle (dark theme forced)
- `src/components/streak-widget.tsx` - Streak widget (gamification, not used)
- `src/components/require-role.tsx` - Role-based route protection
- `src/components/route-guard.tsx` - Route guard HOC

---

## CONTEXT PROVIDERS

### AuthContext (`src/contexts/auth-context.tsx`)
```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, grade: string, interests: string[], role: string) => Promise<boolean>;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authRedirectTo: string | null;
  setAuthRedirectTo: (path: string | null) => void;
}
```

### LocaleContext (`src/contexts/locale-context.tsx`)
- Multi-language support (Russian/English)
- Currently not actively used (all content in Russian/English mix)

---

## LIBRARY FILES

### Database (`src/lib/database.ts`)
- Fake database operations (should be replaced with Supabase queries)
- Contains mock data for opportunities, courses

### Supabase (`src/lib/supabase.ts`)
```typescript
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### Gemini AI (`src/lib/gemini.ts`)
- Google Gemini integration (essay analysis, MBTI analysis)
- Should be replaced with OpenRouter (Claude API)

### Store (`src/lib/store.ts`)
- Simple state management (likely not used with context providers)

### Utils (`src/lib/utils.ts`, `src/lib/utils-colors.ts`)
- Utility functions (cn for className merging, color utilities)

---

## CURRENT BUGS & ISSUES

### Critical Bugs
1. **Onboarding redirect bug:** After completing `/start`, should save to `profiles` table and redirect to `/dashboard`, but currently breaks or redirects to wrong page
2. **Auth modal role selection:** Still shows "student" role only, but form data expects role field
3. **Profile setup vs /start confusion:** Two onboarding flows exist (`/profile/setup` and `/start`) - need to consolidate

### Missing Features
1. **Profile scoring logic:** AI scoring not implemented (needs OpenRouter integration)
2. **College list generation:** No logic to generate reach/target/safety schools
3. **Roadmap generation:** No logic to create personalized tasks
4. **Database writes:** `/start` form doesn't save to `profiles` table
5. **Assessment history:** No tracking of score changes over time

### Legacy Code Cleanup Needed
1. Remove unused pages: courses, opportunities, game, shop, messages, leaderboard, mbti
2. Remove unused API routes
3. Remove unused components (calendar, navi-mentor, etc.)
4. Remove Gemini AI, replace with OpenRouter
5. Remove fake database, use only Supabase

---

## ENVIRONMENT VARIABLES REQUIRED

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# OpenRouter (for AI)
OPENROUTER_API_KEY=xxx

# Stripe (for payments)
STRIPE_SECRET_KEY=xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=xxx

# (Legacy - to be removed)
GEMINI_API_KEY=xxx
TELEGRAM_BOT_TOKEN=xxx
```

---

## DEPLOYMENT

### Current Setup
- **Hosting:** Vercel
- **Domain:** applyze-five.vercel.app (temporary)
- **Target Domain:** applyze.gg (not purchased yet)
- **Git Repo:** https://github.com/ulacoder/mentoria-hub
- **Vercel Team:** ulagats-projects

### Deployment Commands
```bash
vercel deploy --prod --scope ulagats-projects
```

### Build Configuration
- Framework: Next.js 16.2.9
- Build Command: `next build`
- Output Directory: `.next`
- Node Version: 22.22.3

---

## NEXT STEPS (Priority Order)

### Immediate (This Week)
1. **Fix /start onboarding:**
   - Integrate with `profiles` table
   - Save form data to Supabase
   - Redirect to `/dashboard` after completion
   - Add auth check (prompt login if not authenticated)

2. **Implement AI profile scoring:**
   - Create API route `/api/profile-score`
   - Integrate OpenRouter (Claude API)
   - Calculate scores: overall, academic, extracurricular, essay, recommendation
   - Generate strengths/weaknesses/suggestions

3. **Build dashboard:**
   - Display profile score (0-100 with breakdown)
   - Show college list (reach/target/safety)
   - Show roadmap preview (top 3 tasks)
   - Add "Re-assess Profile" button

### Short-term (Next 2 Weeks)
4. **Generate college list:**
   - API route `/api/college-list`
   - Logic to match schools based on score + major + location
   - Categorize into reach/target/safety

5. **Generate roadmap:**
   - API route `/api/roadmap`
   - AI-generated tasks based on weaknesses
   - Prioritize by impact + timeline
   - Save to `roadmap_tasks` table

6. **Implement Pro tier:**
   - Stripe payment integration
   - Usage limits (1 assessment/month for Free)
   - Upgrade prompts

### Medium-term (Month 1-2)
7. **Remove legacy features:**
   - Delete unused pages
   - Delete unused API routes
   - Delete unused components
   - Clean database schema

8. **Add essay tools:**
   - Essay topic generator
   - Essay feedback (AI review)

9. **Add comparison feature:**
   - Compare profile against historical applicants
   - Show percentile ranking

### Long-term (Month 2-3)
10. **Mobile optimization**
11. **Analytics dashboard (admin)**
12. **Referral program**
13. **Scholarship fit score**

---

## KEY DESIGN PRINCIPLES (from 1609plus inspiration)

1. **Minimalism:** Clean, focused UI - no clutter
2. **Dark theme:** Professional, modern aesthetic
3. **Single CTA:** One clear action per page
4. **No fake stats:** No "2,847 students" BS until real
5. **Instant value:** Show score/value immediately, no long forms
6. **Progress tracking:** Visual progress indicators
7. **AI transparency:** Show what AI evaluated, not black box

---

## TECHNICAL DEBT

### High Priority
- Replace Gemini with OpenRouter throughout codebase
- Consolidate auth flows (remove /login, /register pages)
- Remove fake database, use only Supabase
- Implement proper error handling in API routes

### Medium Priority
- Add loading states to all async operations
- Add error boundaries
- Implement proper TypeScript types (avoid `any`)
- Add unit tests for critical flows

### Low Priority
- Optimize bundle size (remove unused dependencies)
- Implement code splitting
- Add performance monitoring
- Optimize images

---

## BACKUP & VERSION CONTROL

### Backup Location
`C:\Users\Ulagat\applyze-backup-20260811-165213`

### Git Workflow
```bash
git add -A
git commit -m "message"
git push origin master
```

### Branch Strategy
- `master` - production branch (auto-deploys to Vercel)
- No feature branches currently (small team)

---

## CONTACT & SUPPORT

- **Developer Email:** support@applyze.gg (planned)
- **User Support:** Not yet implemented
- **Bug Reports:** GitHub Issues (not public yet)

---

END OF SPECIFICATION
