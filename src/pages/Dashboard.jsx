import { useState, useEffect } from 'react'
import { useTheme } from '../App.jsx'
import QuoteCard from '../components/QuoteCard.jsx'
import TodoCard from '../components/TodoCard.jsx'
import CGPACard from '../components/CGPACard.jsx'
import StartupCard from '../components/StartupCard.jsx'
import MoodCard from '../components/MoodCard.jsx'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

const defaultGoals = [
  { id: 1, text: 'Launch startup' },
  { id: 2, text: 'Improve CGPA' },
  { id: 3, text: 'Build strong habits' },
]

const visionImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', caption: 'Team Collaboration' },
  { id: 2, url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop', caption: 'Tech Innovation' },
  { id: 3, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', caption: 'Dream Big' },
  { id: 4, url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop', caption: 'Future Office' },
]

export default function Dashboard() {
  const { darkMode } = useTheme()
  const [goals, setGoals] = useState(() => loadFromStorage('goals', defaultGoals))
  const [newGoal, setNewGoal] = useState('')

  useEffect(() => { saveToStorage('goals', goals) }, [goals])

  const addGoal = () => {
    if (!newGoal.trim()) return
    setGoals(prev => [...prev, { id: Date.now(), text: newGoal.trim() }])
    setNewGoal('')
  }

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id))
  }

  return (
    <div className="page-enter">
      {/* Hero Greeting */}
      <div className={`rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden ${
        darkMode
          ? 'bg-gradient-to-br from-lavender/10 via-blush/10 to-dark2'
          : 'bg-gradient-to-br from-blush/40 via-lavender/30 to-peach/30'
      }`}>
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-6xl opacity-20 animate-float">🌸</div>
        <div className="absolute bottom-4 right-20 text-4xl opacity-15 animate-float" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute top-12 right-32 text-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🌷</div>

        <h1 className="font-display text-3xl md:text-5xl font-bold mb-2 animate-fade-in-up">
          Hello Chandrika 💖
        </h1>
        <h2 className="font-display text-xl md:text-2xl font-medium mb-3 animate-fade-in-up stagger-1" style={{ color: darkMode ? '#d8c8ff' : '#c084b8' }}>
          Welcome to Velvet Vision
        </h2>
        <p className={`font-body text-sm md:text-base animate-fade-in-up stagger-2 ${
          darkMode ? 'text-white/50' : 'text-dark1/50'
        }`}>
          Your personal space to plan, dream, and grow. 🌸
        </p>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-3 mt-6 animate-fade-in-up stagger-3">
          {[
            { label: 'Tasks Today', value: '4', icon: '📋' },
            { label: 'CGPA', value: '8.2', icon: '📊' },
            { label: 'Streak', value: '12 days', icon: '🔥' },
            { label: 'Mood', value: 'Happy', icon: '😊' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 ${
                darkMode ? 'bg-white/5 border border-white/5' : 'bg-white/40 border border-white/40'
              }`}
            >
              <span>{stat.icon}</span>
              <div>
                <p className="text-sm font-semibold">{stat.value}</p>
                <p className={`text-xs ${darkMode ? 'text-white/30' : 'text-dark1/30'}`}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Card */}
      <div className="mb-6 animate-fade-in-up stagger-3">
        <MoodCard />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Quote Card */}
        <div className="animate-fade-in-up stagger-3">
          <QuoteCard />
        </div>

        {/* Goals Card */}
        <div className={`rounded-3xl p-6 transition-all duration-300 card-hover animate-fade-in-up stagger-4 ${
          darkMode
            ? 'bg-gradient-to-br from-lavender/10 to-mint/8 border border-white/5'
            : 'bg-gradient-to-br from-lavender/25 to-mint/20 border border-white/40'
        }`}>
          <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            🎯 Personal Goals
          </h3>
          <div className="space-y-2 mb-4">
            {goals.map((goal, idx) => (
              <div
                key={goal.id}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl group transition-all duration-300 ${
                  darkMode ? 'bg-white/5 hover:bg-white/8' : 'bg-white/40 hover:bg-white/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${
                    idx % 3 === 0 ? 'from-blush to-lavender' : idx % 3 === 1 ? 'from-mint to-lavender' : 'from-peach to-blush'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-sm font-body">{goal.text}</span>
                </div>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="opacity-0 group-hover:opacity-60 cursor-pointer border-none bg-transparent hover:opacity-100 transition-all text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a new goal..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addGoal()}
              className={`flex-1 text-sm ${darkMode ? 'input-field-dark' : 'input-field'}`}
            />
            <button onClick={addGoal} className="btn-primary text-sm !px-4 !py-2">
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="animate-fade-in-up stagger-4">
          <TodoCard />
        </div>
        <div className="animate-fade-in-up stagger-5">
          <CGPACard />
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div className="animate-fade-in-up stagger-5">
          <StartupCard />
        </div>
      </div>

      {/* Vision Board Preview */}
      <div className={`rounded-3xl p-6 mb-6 animate-fade-in-up stagger-6 ${
        darkMode
          ? 'bg-gradient-to-br from-mint/8 to-peach/8 border border-white/5'
          : 'bg-gradient-to-br from-mint/15 to-peach/15 border border-white/40'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            ✨ Vision Board Preview
          </h3>
          <a href="/vision-board" className={`text-xs font-body px-3 py-1 rounded-full no-underline transition-all ${
            darkMode ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-white/50 text-dark1/60 hover:bg-white/70'
          }`}>
            View All →
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {visionImages.map((img) => (
            <div
              key={img.id}
              className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[4/3]"
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <p className="text-white text-xs font-body">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
