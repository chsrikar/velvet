import { useState, useEffect } from 'react'
import { useTheme } from '../App.jsx'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

const colorOptions = [
  'from-blush to-lavender',
  'from-mint to-lavender',
  'from-peach to-blush',
  'from-lavender to-mint',
  'from-mint to-peach',
]

const iconOptions = ['📖', '🎓', '🏆', '💡', '🎯', '🧩', '🌍', '🎨', '🔧', '📝']

const defaultGrowthAreas = [
  {
    id: 1, icon: '📖', title: 'Books to Read', color: 'from-blush to-lavender',
    items: [
      { id: 101, text: 'Atomic Habits', done: true },
      { id: 102, text: 'Zero to One', done: false },
      { id: 103, text: 'The Lean Startup', done: false },
      { id: 104, text: 'Deep Work', done: false },
    ],
  },
  {
    id: 2, icon: '🎓', title: 'Courses', color: 'from-mint to-lavender',
    items: [
      { id: 201, text: 'Advanced React', done: true },
      { id: 202, text: 'Machine Learning Basics', done: false },
      { id: 203, text: 'System Design', done: false },
      { id: 204, text: 'UI/UX Fundamentals', done: false },
    ],
  },
  {
    id: 3, icon: '🏆', title: 'Certifications', color: 'from-peach to-blush',
    items: [
      { id: 301, text: 'AWS Cloud Practitioner', done: false },
      { id: 302, text: 'Google Analytics', done: false },
      { id: 303, text: 'Meta Front-End Dev', done: false },
    ],
  },
]

const defaultMonthlyGoals = [
  { id: 1, text: 'Complete 2 online courses', progress: 50 },
  { id: 2, text: 'Read 3 chapters of current book', progress: 65 },
  { id: 3, text: 'Contribute to open source', progress: 20 },
  { id: 4, text: 'Network with 5 professionals', progress: 40 },
]

export default function Growth() {
  const { darkMode } = useTheme()
  const [areas, setAreas] = useState(() => loadFromStorage('growth_areas', defaultGrowthAreas))
  const [monthlyGoals, setMonthlyGoals] = useState(() => loadFromStorage('monthly_goals', defaultMonthlyGoals))
  const [newItems, setNewItems] = useState({})
  const [showAddArea, setShowAddArea] = useState(false)
  const [newArea, setNewArea] = useState({ title: '', icon: '📖' })
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoal, setNewGoal] = useState('')

  useEffect(() => { saveToStorage('growth_areas', areas) }, [areas])
  useEffect(() => { saveToStorage('monthly_goals', monthlyGoals) }, [monthlyGoals])

  const toggleItem = (areaId, itemId) => {
    setAreas(prev => prev.map(area =>
      area.id === areaId
        ? { ...area, items: area.items.map(item => item.id === itemId ? { ...item, done: !item.done } : item) }
        : area
    ))
  }

  const deleteItem = (areaId, itemId) => {
    setAreas(prev => prev.map(area =>
      area.id === areaId
        ? { ...area, items: area.items.filter(item => item.id !== itemId) }
        : area
    ))
  }

  const addItem = (areaId) => {
    const text = newItems[areaId]?.trim()
    if (!text) return
    setAreas(prev => prev.map(area =>
      area.id === areaId
        ? { ...area, items: [...area.items, { id: Date.now(), text, done: false }] }
        : area
    ))
    setNewItems(prev => ({ ...prev, [areaId]: '' }))
  }

  const addArea = () => {
    if (!newArea.title.trim()) return
    setAreas(prev => [...prev, {
      id: Date.now(),
      icon: newArea.icon,
      title: newArea.title.trim(),
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
      items: [],
    }])
    setNewArea({ title: '', icon: '📖' })
    setShowAddArea(false)
  }

  const deleteArea = (areaId) => {
    setAreas(prev => prev.filter(a => a.id !== areaId))
  }

  const addMonthlyGoal = () => {
    if (!newGoal.trim()) return
    setMonthlyGoals(prev => [...prev, { id: Date.now(), text: newGoal.trim(), progress: 0 }])
    setNewGoal('')
    setShowAddGoal(false)
  }

  const deleteMonthlyGoal = (id) => {
    setMonthlyGoals(prev => prev.filter(g => g.id !== id))
  }

  const updateGoalProgress = (id, delta) => {
    setMonthlyGoals(prev => prev.map(g =>
      g.id === id ? { ...g, progress: Math.max(0, Math.min(100, g.progress + delta)) } : g
    ))
  }

  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">🌱 Personal Growth</h1>
        <p className={`font-body ${darkMode ? 'text-white/50' : 'text-dark1/50'}`}>
          Every day is a chance to grow stronger and wiser 🌸
        </p>
      </div>

      {/* Add Area Button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold">🎯 Growth Areas</h3>
        <button
          onClick={() => setShowAddArea(!showAddArea)}
          className={`text-xs px-3 py-1.5 rounded-full border-none cursor-pointer transition-all duration-300 ${
            darkMode
              ? 'bg-white/10 text-white/60 hover:bg-white/20'
              : 'bg-white/50 text-dark1/60 hover:bg-white/80'
          }`}
        >
          {showAddArea ? 'Cancel' : '+ Add Area'}
        </button>
      </div>

      {/* Add Area Form */}
      {showAddArea && (
        <div className={`rounded-3xl p-5 mb-4 animate-fade-in ${
          darkMode ? 'bg-white/5 border border-white/5' : 'bg-white/40 border border-white/30'
        }`}>
          <div className="flex gap-3 items-end">
            <select
              value={newArea.icon}
              onChange={(e) => setNewArea(prev => ({ ...prev, icon: e.target.value }))}
              className={`text-lg px-2 py-2 rounded-xl border outline-none cursor-pointer ${
                darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white/60 border-blush/20'
              }`}
            >
              {iconOptions.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Area title (e.g., Skills to Learn)..."
              value={newArea.title}
              onChange={(e) => setNewArea(prev => ({ ...prev, title: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && addArea()}
              className={`flex-1 text-sm ${darkMode ? 'input-field-dark' : 'input-field'}`}
            />
            <button onClick={addArea} className="btn-primary text-sm">Add</button>
          </div>
        </div>
      )}

      {/* Growth Areas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {areas.map((area) => {
          const doneCount = area.items.filter(i => i.done).length
          return (
            <div
              key={area.id}
              className={`rounded-3xl p-6 card-hover group relative ${
                darkMode
                  ? 'bg-white/5 border border-white/5'
                  : 'bg-white/40 border border-white/30'
              }`}
            >
              {/* Delete area button */}
              <button
                onClick={() => deleteArea(area.id)}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-60 text-xs cursor-pointer border-none bg-transparent hover:opacity-100 transition-all"
              >
                ✕
              </button>

              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center text-2xl mb-4`}>
                {area.icon}
              </div>
              <h3 className="font-display text-base font-semibold mb-1">{area.title}</h3>
              <p className={`text-xs font-body mb-3 ${darkMode ? 'text-white/30' : 'text-dark1/30'}`}>
                {doneCount}/{area.items.length} completed
              </p>

              <div className="space-y-2 mb-3">
                {area.items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 group/item ${
                      darkMode ? 'hover:bg-white/5' : 'hover:bg-white/40'
                    }`}
                  >
                    <div
                      onClick={() => toggleItem(area.id, item.id)}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        item.done
                          ? `bg-gradient-to-br ${area.color} border-transparent`
                          : darkMode ? 'border-white/20' : 'border-blush/30'
                      }`}
                    >
                      {item.done && <span className="text-white text-[10px]">✓</span>}
                    </div>
                    <span
                      onClick={() => toggleItem(area.id, item.id)}
                      className={`flex-1 text-sm font-body ${item.done ? 'line-through opacity-40' : ''}`}
                    >
                      {item.text}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteItem(area.id, item.id) }}
                      className="opacity-0 group-hover/item:opacity-60 text-xs cursor-pointer border-none bg-transparent hover:opacity-100 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Add item */}
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Add item..."
                  value={newItems[area.id] || ''}
                  onChange={(e) => setNewItems(prev => ({ ...prev, [area.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && addItem(area.id)}
                  className={`flex-1 text-xs px-3 py-2 rounded-xl border outline-none transition-all ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white focus:border-lavender/40'
                      : 'bg-white/40 border-blush/20 focus:border-lavender'
                  }`}
                />
                <button
                  onClick={() => addItem(area.id)}
                  className={`px-2.5 py-2 rounded-xl text-xs cursor-pointer border-none transition-all ${
                    darkMode ? 'bg-lavender/20 text-white hover:bg-lavender/30' : 'bg-blush/30 text-dark1 hover:bg-blush/40'
                  }`}
                >
                  +
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Monthly Goals */}
      <div className={`rounded-3xl p-6 ${
        darkMode
          ? 'bg-gradient-to-br from-lavender/8 to-blush/8 border border-white/5'
          : 'bg-gradient-to-br from-lavender/20 to-blush/15 border border-white/40'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold">📊 Monthly Goals</h3>
          <button
            onClick={() => setShowAddGoal(!showAddGoal)}
            className={`text-xs px-3 py-1.5 rounded-full border-none cursor-pointer transition-all duration-300 ${
              darkMode
                ? 'bg-white/10 text-white/60 hover:bg-white/20'
                : 'bg-white/50 text-dark1/60 hover:bg-white/80'
            }`}
          >
            {showAddGoal ? 'Cancel' : '+ Add Goal'}
          </button>
        </div>

        {showAddGoal && (
          <div className="flex gap-2 mb-4 animate-fade-in">
            <input
              type="text"
              placeholder="New monthly goal..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addMonthlyGoal()}
              className={`flex-1 text-sm ${darkMode ? 'input-field-dark' : 'input-field'}`}
            />
            <button onClick={addMonthlyGoal} className="btn-primary text-sm !px-4 !py-2">Add</button>
          </div>
        )}

        <div className="space-y-4">
          {monthlyGoals.map((goal) => (
            <div key={goal.id} className="group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-body">{goal.text}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-body ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>{goal.progress}%</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => updateGoalProgress(goal.id, -10)}
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] border-none cursor-pointer transition-all ${
                        darkMode ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-blush/20 text-dark1/60 hover:bg-blush/30'
                      }`}
                    >
                      −
                    </button>
                    <button
                      onClick={() => updateGoalProgress(goal.id, 10)}
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] border-none cursor-pointer transition-all ${
                        darkMode ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-blush/20 text-dark1/60 hover:bg-blush/30'
                      }`}
                    >
                      +
                    </button>
                    <button
                      onClick={() => deleteMonthlyGoal(goal.id)}
                      className="text-xs cursor-pointer border-none bg-transparent opacity-60 hover:opacity-100 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-white/40'}`}>
                <div
                  className="h-full rounded-full bg-gradient-to-r from-lavender to-blush transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inspirational quote */}
      <div className={`mt-6 rounded-3xl p-8 text-center ${
        darkMode
          ? 'bg-gradient-to-r from-lavender/10 to-blush/10'
          : 'bg-gradient-to-r from-blush/20 to-lavender/20'
      }`}>
        <p className="font-display text-xl md:text-2xl italic opacity-80">
          "The only way to do great work is to love what you do." ✨
        </p>
        <p className={`text-sm font-body mt-2 ${darkMode ? 'text-white/30' : 'text-dark1/30'}`}>
          — Steve Jobs
        </p>
      </div>
    </div>
  )
}
