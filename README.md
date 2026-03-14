# 🌸 Velvet Vision — Personal Success Dashboard

> *Dream big. Start small. Act now.*

**Velvet Vision** is an ultra-aesthetic, luxury-inspired personal productivity web application designed exclusively for **Chandrika**. It combines the elegance of a Pinterest-style vision board with the power of a full productivity system — all wrapped in a stunning pastel-toned, glassmorphism UI.

No backend. No authentication. No complexity. Just a beautiful personal space to **plan, dream, and grow**.

---

## 📸 Screenshots

### Light Mode
The app features soft pastel gradients, glassmorphism cards, and elegant typography in light mode.

### Dark Mode
Deep purple gradients with subtly glowing cards create a calming nighttime aesthetic.

---

## ✨ Features at a Glance

| Feature | Description |
|---------|-------------|
| 🏠 **Dashboard** | Personalized greeting, motivational quotes, goals, to-do list, CGPA tracker, startup progress, and vision board preview |
| 📚 **Study Hub** | Track subjects with chapter progress, manage study tasks, view skill levels |
| 🚀 **Startups** | Monitor ArchConnect, Weboraa, and Eterna with addable/deletable milestones |
| 📅 **Weekly Planner** | 7-day task planner with today highlighting and per-day task management |
| 💪 **Health & Wellness** | Water intake, sleep tracker, exercise log, mood tracker, habit tracker — all synced to today's date |
| 🌱 **Personal Growth** | Manage reading lists, courses, certifications with fully editable areas and monthly goals |
| ✨ **Vision Board** | Coming Soon — Pinterest-style inspiration board |
| 🤖 **AI Chatbot** | Coming Soon — AI-powered study buddy |
| 🌙 **Dark Mode** | Toggle between pastel light mode and deep purple dark mode |
| 💾 **Local Storage** | All data persists across page refreshes — no backend required |

---

## 🎨 Design Language

Velvet Vision follows a **luxury aesthetic planner** design philosophy:

### Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Blush Pink | `#f8c8dc` | Primary accent, buttons, highlights |
| Lavender | `#d8c8ff` | Secondary accent, active states, gradients |
| Mint Green | `#c8f2e0` | Success states, progress bars, health indicators |
| Peach | `#ffd6c8` | Warm accents, startup cards |
| Cream White | `#fffaf7` | Light mode background base |
| Dark Purple 1 | `#1e1b2e` | Dark mode background |
| Dark Purple 2 | `#2a2445` | Dark mode secondary |
| Dark Purple 3 | `#3d356b` | Dark mode tertiary |

### Typography

| Font | Usage |
|------|-------|
| **Playfair Display** | Headings, display text, greeting messages |
| **Inter** | Body text, UI elements, labels |
| **Poppins** | Secondary body text, descriptions, tags |

### UI Principles

- **Glassmorphism** — Semi-transparent cards with backdrop blur and subtle borders
- **Soft Gradients** — Pastel gradient backgrounds on all cards
- **Rounded UI** — Generous border radius (2xl/3xl) on all elements
- **Micro-Animations** — Hover lifts, floating icons, fade-in transitions, staggered reveals
- **Calming Motion** — All animations are smooth and elegant, never jarring

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI component library |
| **Vite 8** | Build tool and dev server |
| **JSX** | Component templating |
| **UnoCSS** | Atomic CSS utility styling |
| **React Router DOM** | Client-side routing |
| **localStorage** | Data persistence (no backend) |

### What is NOT used (by design)

- ❌ TypeScript
- ❌ TailwindCSS
- ❌ Bootstrap
- ❌ Material UI
- ❌ Any backend or database
- ❌ Any authentication system

---

## 📁 Project Structure

```
velvet-vision/
│
├── index.html                  # Entry HTML file
├── vite.config.js              # Vite configuration with UnoCSS plugin
├── uno.config.js               # UnoCSS configuration (colors, fonts, shortcuts)
├── package.json                # Dependencies and scripts
│
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Root component with routing and theme context
    ├── index.css               # Global styles, animations, keyframes
    │
    ├── utils/
    │   └── storage.js          # localStorage helper functions
    │
    ├── pages/
    │   ├── Dashboard.jsx       # Main dashboard with all widgets
    │   ├── Academic.jsx        # Study hub with subjects and tasks
    │   ├── Startups.jsx        # Startup tracking with milestones
    │   ├── Weekly.jsx          # 7-day weekly planner
    │   ├── Health.jsx          # Health & wellness trackers
    │   ├── Growth.jsx          # Personal growth areas and goals
    │   ├── VisionBoard.jsx     # Coming soon page
    │   └── Chatbot.jsx         # Coming soon page
    │
    └── components/
        ├── Navbar.jsx          # Top navigation bar with greeting and controls
        ├── Sidebar.jsx         # Left sidebar navigation
        ├── FlowerMenu.jsx      # Floating flower icon menu
        ├── QuoteCard.jsx       # Daily motivational quote widget
        ├── TodoCard.jsx        # Daily to-do checklist
        ├── CGPACard.jsx        # CGPA progress widget
        ├── SkillCard.jsx       # Skills progress bars
        ├── StartupCard.jsx     # Startup progress overview
        ├── HabitCard.jsx       # Daily habit tracker
        └── MoodCard.jsx        # Daily mood selector
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or later) — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation

1. **Clone or download the project**

   ```bash
   git clone <your-repo-url>
   cd velvet-vision
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   Navigate to the URL shown in your terminal (usually `http://localhost:5173/`)

### Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 📖 How to Use — Page by Page Guide

### 🏠 Dashboard (Home Page)

The dashboard is the first thing you see when the app loads. It displays:

1. **Hero Greeting Section**
   - Shows "Hello Chandrika 💖" with "Welcome to Velvet Vision"
   - Displays quick stats: Tasks Today, CGPA, Streak, and Mood
   - Features floating decorative elements (🌸 ✨ 🌷)

2. **Mood Tracker** 🌈
   - Click any emoji (😊 Happy, 😌 Calm, 🤩 Excited, 😓 Stressed, 😴 Tired) to log your mood
   - Your mood is saved for today and resets each new day

3. **Motivational Quote Card** 💭
   - Displays a daily quote that changes automatically each day
   - Click **"New Quote ✨"** to get a random inspirational quote

4. **Personal Goals** 🎯
   - View your editable list of personal goals
   - **Add a goal**: Type in the input field and press Enter or click "Add"
   - **Delete a goal**: Hover over a goal and click the ✕ button

5. **Daily To-Do Planner** 📋
   - Check/uncheck tasks by clicking the checkbox
   - **Add a task**: Type in the input and press Enter or click "Add"
   - **Delete a task**: Hover over a task and click ✕
   - Progress bar shows completion percentage

6. **CGPA Progress** 📊
   - Displays current CGPA (8.2) vs previous (7.8) with improvement indicator
   - Visual progress bar and study suggestions

7. **Startup Progress** 🚀
   - Overview cards for ArchConnect, Weboraa, and Eterna
   - Shows progress percentages and tagged goals

8. **Vision Board Preview** ✨
   - Grid of inspiration images with hover effects
   - Click "View All →" to go to the Vision Board page

---

### 📚 Study Hub

Track your academic progress across subjects:

1. **Subjects Section**
   - Each subject shows a progress bar (completed chapters / total chapters)
   - **Add a subject**: Click "+ Add Subject" → Choose an icon, enter name and chapter count → Click "Add"
   - **Delete a subject**: Hover over a subject card and click ✕
   - **Track progress**: Click "+1 chapter" button to mark a chapter as complete

2. **Study Tasks**
   - Manage your study checklist with add/delete/toggle functionality
   - Each task shows its associated subject

3. **Skills Progress**
   - Visual progress bars for Java, Python, React, DBMS, and AI/ML

---

### 🚀 Startups

Track your entrepreneurial ventures:

1. **Startup Cards**
   - Each startup (ArchConnect, Weboraa, Eterna) has its own detailed card
   - Shows description, progress bar, and progress percentage

2. **Milestones**
   - Click **"Show Milestones"** to expand the milestone list
   - **Toggle milestone**: Click the checkbox to mark as done/undone
   - **Add milestone**: Type in the input field and click "Add"
   - **Delete milestone**: Hover and click ✕
   - Progress automatically recalculates when milestones change

---

### 📅 Weekly Planner

Plan your entire week:

1. **Day Cards**
   - 7 cards for Monday through Sunday
   - **Today's card** is highlighted with a special border and "Today" badge

2. **Managing Tasks**
   - **Toggle task**: Click the checkbox or task text
   - **Add task**: Type in the input at the bottom of each day card and press Enter or click "+"
   - **Delete task**: Hover over a task and click ✕
   - Shows completion count per day

---

### 💪 Health & Wellness

Comprehensive health tracking synced to today's date:

1. **Date Card**
   - Prominently displays today's full date (e.g., "📅 Friday, March 14, 2026")
   - Quick summary of today's water, sleep, and exercise stats

2. **Water Intake** 💧
   - Click the water drop buttons to log glasses of water (1-8)
   - Progress bar shows completion toward 8-glass goal
   - Resets each new day

3. **Sleep Tracker** 😴
   - Shows last night's sleep hours with gradient text
   - Use **+/−** buttons to adjust in 0.5-hour increments
   - Bar chart shows the last 7 days of sleep history
   - Today's bar is highlighted

4. **Exercise Tracker** 🏃
   - Log exercise minutes with quick-add buttons (+5m, +10m, +15m, +30m)
   - Progress bar targets 60 minutes daily
   - Resets each new day

5. **Mood Tracker** 🌈
   - Same as dashboard — log your daily mood

6. **Habit Tracker** 🌿
   - Track daily habits with streak counters
   - **Add habit**: Click "+ Add" → Type name → Click "Add"
   - **Delete habit**: Hover and click ✕
   - **Toggle habit**: Click anywhere on the habit row

7. **Wellness Tips** 🌿
   - Mindfulness, nutrition, and movement tips

---

### 🌱 Personal Growth

Fully editable personal development tracker:

1. **Growth Areas**
   - Cards for Books, Courses, Certifications (or any custom area)
   - **Add new area**: Click "+ Add Area" → Choose icon → Enter title → Click "Add"
   - **Delete area**: Hover over the card and click ✕
   - **Add item to area**: Type in the input at the bottom and click "+"
   - **Delete item**: Hover and click ✕
   - **Toggle item**: Click checkbox

2. **Monthly Goals**
   - Progress bars with adjustable completion
   - **Add goal**: Click "+ Add Goal" → Type and click "Add"
   - **Adjust progress**: Hover to reveal +/− buttons (±10% per click)
   - **Delete goal**: Hover and click ✕

---

### ✨ Vision Board & 🤖 AI Chatbot

Both pages display beautiful **"Coming Soon"** placeholders with:
- Floating decorative emojis
- Feature preview tags
- Elegant gradient backgrounds

---

## 🌙 Dark Mode

Toggle dark mode using the **sun/moon toggle** in the top-right corner of the navbar:

- **Light Mode**: Soft pastel gradients with cream/pink/lavender tones
- **Dark Mode**: Deep purple gradients (`#1e1b2e` → `#2a2445` → `#3d356b`) with subtly glowing cards

Your preference is saved in localStorage and persists across sessions.

---

## 🌷 Flower Menu

Click the **🌷 flower icon** in the top-right corner to open a glassmorphism floating panel with:

- 👤 Profile
- ⚙️ Settings
- 🔔 Notifications
- ⏰ Reminders
- 🎨 Themes
- 💖 About Velvet Vision

---

## 💾 Data Persistence

All data is stored in **localStorage** with the `velvet_` prefix. This means:

- ✅ Data survives page refreshes
- ✅ Data survives browser restarts
- ✅ No internet connection required after initial load
- ✅ No backend or database needed
- ⚠️ Data is browser-specific (won't sync across devices)
- ⚠️ Clearing browser data will reset everything

### Data stored includes:

| Key | Data |
|-----|------|
| `velvet_dark_mode` | Dark mode preference |
| `velvet_goals` | Personal goals list |
| `velvet_todo_tasks` | Daily to-do items |
| `velvet_habits` | Habit tracker items |
| `velvet_weekly_tasks` | Weekly planner tasks |
| `velvet_study_tasks` | Study task checklist |
| `velvet_subjects` | Academic subjects |
| `velvet_startups` | Startup data with milestones |
| `velvet_growth_areas` | Growth area checklists |
| `velvet_monthly_goals` | Monthly goals with progress |
| `velvet_mood_YYYY-MM-DD` | Daily mood (per date) |
| `velvet_water_YYYY-MM-DD` | Daily water intake (per date) |
| `velvet_sleep_YYYY-MM-DD` | Daily sleep hours (per date) |
| `velvet_exercise_YYYY-MM-DD` | Daily exercise minutes (per date) |

### Resetting Data

To reset all data back to defaults, open your browser's Developer Tools (F12) → Console, and run:

```javascript
Object.keys(localStorage).filter(k => k.startsWith('velvet_')).forEach(k => localStorage.removeItem(k))
location.reload()
```

---

## 📱 Responsive Design

The UI adapts to all screen sizes:

| Screen | Layout |
|--------|--------|
| **Desktop** (1024px+) | Sidebar visible, 2-3 column grids, full widgets |
| **Tablet** (768-1023px) | Sidebar as overlay, 2-column grids |
| **Mobile** (<768px) | Sidebar hidden (hamburger menu), single column, stacked cards |

---

## 🧪 Mock Data

The app comes pre-loaded with example data:

**Study Tasks:**
- Study Java Generics
- Revise SQL joins and subqueries
- Practice AI search algorithms
- Build a React component
- Implement Binary Search Tree

**Startup Goals:**
- ArchConnect: Market Research → Find First Users
- Weboraa: Brand Identity → Scale Operations
- Eterna: Product Catalog → First 100 Customers

**Habits:**
- Morning Meditation (🔥12 streak)
- Read 30 mins (🔥8 streak)
- Exercise (🔥5 streak)
- Drink 8 glasses water (🔥15 streak)
- Sleep by 11 PM (🔥3 streak)

---

## 🔧 Configuration

### UnoCSS Config (`uno.config.js`)

The UnoCSS configuration includes:
- **Custom colors**: blush, lavender, mint, peach, cream, dark1/2/3
- **Google Fonts**: Inter, Playfair Display, Poppins
- **Icons preset**: For emoji-style icons
- **Shortcuts**: `glass`, `glass-dark`, `card-hover`, `btn-primary`, `btn-outline`, `input-field`, `input-field-dark`

### Vite Config (`vite.config.js`)

Simple configuration with:
- UnoCSS plugin
- React plugin

---

## 📄 License

This project is a personal productivity tool built for Chandrika. Feel free to customize and make it your own! 💖

---

## 💖 Credits

- **Design Inspiration**: Pinterest, Notion, aesthetic planner communities
- **Fonts**: Google Fonts (Inter, Playfair Display, Poppins)
- **Icons**: Emoji-based (no external icon library needed)
- **Images**: Unsplash (for vision board preview)

---

<div align="center">

**Made with 💖 for Chandrika**

*Velvet Vision — Your personal space to plan, dream, and grow.* 🌸

</div>
