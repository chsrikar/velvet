import { useState, useEffect } from 'react'
import { useTheme } from '../App.jsx'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

const defaultHabits = [
  { id: 1, name: 'Morning Meditation', icon: '🧘', streak: 12, done: false },
  { id: 2, name: 'Read 30 mins', icon: '📖', streak: 8, done: false },
  { id: 3, name: 'Exercise', icon: '💪', streak: 5, done: false },
  { id: 4, name: 'Drink 8 glasses water', icon: '💧', streak: 15, done: false },
  { id: 5, name: 'Sleep by 11 PM', icon: '😴', streak: 3, done: false },
]

export default function HabitCard() {
  const { darkMode } = useTheme()
  const [habits, setHabits] = useState(() => loadFromStorage('habits', defaultHabits))
  const [adding, setAdding] = useState(false)
  const [newHabit, setNewHabit] = useState('')

  useEffect(() => { saveToStorage('habits', habits) }, [habits])

  const toggleHabit = (id) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, done: !h.done } : h))
  }

  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id))
  }

  const addHabit = () => {
    if (!newHabit.trim()) return
    setHabits(prev => [...prev, { id: Date.now(), name: newHabit.trim(), icon: '✨', streak: 0, done: false }])
    setNewHabit('')
    setAdding(false)
  }

  return (
    <div className={`rounded-3xl p-6 transition-all duration-300 card-hover ${
      darkMode
        ? 'bg-gradient-to-br from-mint/8 to-lavender/8 border border-white/5'
        : 'bg-gradient-to-br from-mint/20 to-lavender/15 border border-white/40'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold flex items-center gap-2">
          🌿 Habit Tracker
        </h3>
        <button
          onClick={() => setAdding(!adding)}
          className={`text-xs px-3 py-1 rounded-full border-none cursor-pointer transition-all duration-300 ${
            darkMode
              ? 'clay-btn-dark text-white/60'
              : 'clay-btn text-dark1/60'
          }`}
        >
          {adding ? 'Cancel' : '+ Add'}
        </button>
      </div>

      {adding && (
        <div className="flex gap-2 mb-3 animate-fade-in">
          <input
            type="text"
            placeholder="New habit..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addHabit()}
            className={`flex-1 text-sm ${darkMode ? 'input-field-dark' : 'input-field'}`}
            autoFocus
          />
          <button onClick={addHabit} className="btn-primary text-sm !px-4 !py-2">Add</button>
        </div>
      )}

      <div className="space-y-2">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer transition-all duration-300 group ${
              habit.done
                ? darkMode
                  ? 'bg-mint/10'
                  : 'bg-mint/20'
                : darkMode
                  ? 'hover:bg-white/5'
                  : 'hover:bg-white/30'
            }`}
          >
            <span className="text-lg" onClick={() => toggleHabit(habit.id)}>{habit.icon}</span>
            <span
              className={`flex-1 text-sm font-body ${habit.done ? 'line-through opacity-50' : ''}`}
              onClick={() => toggleHabit(habit.id)}
            >
              {habit.name}
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                darkMode ? 'clay-btn-dark text-white/40' : 'clay-btn text-dark1/40'
              }`}>
                🔥 {habit.streak}
              </span>
              <div
                onClick={() => toggleHabit(habit.id)}
                className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                  habit.done
                    ? 'bg-gradient-to-br from-mint to-lavender border-transparent'
                    : darkMode
                      ? 'border-white/20'
                      : 'border-blush/30'
                }`}
              >
                {habit.done && <span className="text-white text-xs">✓</span>}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); deleteHabit(habit.id) }}
                className="opacity-0 group-hover:opacity-60 text-xs cursor-pointer border-none bg-transparent hover:opacity-100 transition-all"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
