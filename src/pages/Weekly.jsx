import { useState, useEffect } from 'react'
import { useTheme } from '../App.jsx'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const dayEmojis = ['🌷', '🌸', '🌺', '🌻', '🌼', '🍃', '☀️']

const defaultWeeklyTasks = {
  Monday: [
    { id: 1, text: 'Study Java Generics', done: false },
    { id: 2, text: 'Work on ArchConnect MVP', done: false },
  ],
  Tuesday: [
    { id: 3, text: 'DBMS practice - SQL Joins', done: false },
    { id: 4, text: 'Design Eterna catalog', done: false },
  ],
  Wednesday: [
    { id: 5, text: 'AI search algorithms', done: false },
    { id: 6, text: 'Weboraa portfolio site', done: false },
  ],
  Thursday: [
    { id: 7, text: 'Data Structures revision', done: false },
    { id: 8, text: 'Read startup books', done: false },
  ],
  Friday: [
    { id: 9, text: 'Web dev project', done: false },
    { id: 10, text: 'Weekly review & planning', done: false },
  ],
  Saturday: [
    { id: 11, text: 'Creative exploration', done: false },
    { id: 12, text: 'Vision board update', done: false },
  ],
  Sunday: [
    { id: 13, text: 'Self care & rest', done: false },
    { id: 14, text: 'Plan next week', done: false },
  ],
}

export default function Weekly() {
  const { darkMode } = useTheme()
  const [weeklyTasks, setWeeklyTasks] = useState(() => loadFromStorage('weekly_tasks', defaultWeeklyTasks))
  const [newTasks, setNewTasks] = useState({})

  useEffect(() => { saveToStorage('weekly_tasks', weeklyTasks) }, [weeklyTasks])

  const today = daysOfWeek[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]

  const toggleTask = (day, id) => {
    setWeeklyTasks(prev => ({
      ...prev,
      [day]: prev[day].map(t => t.id === id ? { ...t, done: !t.done } : t)
    }))
  }

  const addTask = (day) => {
    const text = newTasks[day]?.trim()
    if (!text) return
    setWeeklyTasks(prev => ({
      ...prev,
      [day]: [...prev[day], { id: Date.now(), text, done: false }]
    }))
    setNewTasks(prev => ({ ...prev, [day]: '' }))
  }

  const deleteTask = (day, id) => {
    setWeeklyTasks(prev => ({
      ...prev,
      [day]: prev[day].filter(t => t.id !== id)
    }))
  }

  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">📅 Weekly Planner</h1>
        <p className={`font-body ${darkMode ? 'text-white/50' : 'text-dark1/50'}`}>
          Plan your perfect week, one day at a time 🌸
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {daysOfWeek.map((day, idx) => {
          const isToday = day === today
          const tasks = weeklyTasks[day]
          const doneCount = tasks.filter(t => t.done).length

          return (
            <div
              key={day}
              className={`rounded-3xl p-5 transition-all duration-300 card-hover ${
                isToday
                  ? darkMode
                    ? 'bg-gradient-to-br from-lavender/15 to-blush/15 border-2 border-lavender/30 shadow-lg shadow-lavender/10'
                    : 'bg-gradient-to-br from-blush/40 to-lavender/30 border-2 border-blush/40 shadow-lg shadow-blush/20'
                  : darkMode
                    ? 'bg-white/5 border border-white/5'
                    : 'bg-white/40 border border-white/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{dayEmojis[idx]}</span>
                  <h3 className="font-display text-base font-semibold">{day}</h3>
                </div>
                {isToday && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-body ${
                    darkMode ? 'bg-lavender/20 text-lavender' : 'bg-blush/30 text-dark1'
                  }`}>
                    Today
                  </span>
                )}
              </div>

              <div className={`text-xs mb-3 ${darkMode ? 'text-white/30' : 'text-dark1/30'}`}>
                {doneCount}/{tasks.length} tasks done
              </div>

              <div className="space-y-1.5 mb-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-xl cursor-pointer transition-all duration-300 group ${
                      darkMode ? 'hover:bg-white/5' : 'hover:bg-white/40'
                    }`}
                  >
                    <div
                      onClick={() => toggleTask(day, task.id)}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        task.done
                          ? 'bg-gradient-to-br from-mint to-lavender border-transparent'
                          : darkMode ? 'border-white/20' : 'border-blush/30'
                      }`}
                    >
                      {task.done && <span className="text-white text-[10px]">✓</span>}
                    </div>
                    <span
                      onClick={() => toggleTask(day, task.id)}
                      className={`flex-1 text-xs font-body ${task.done ? 'line-through opacity-40' : ''}`}
                    >
                      {task.text}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteTask(day, task.id) }}
                      className="opacity-0 group-hover:opacity-60 text-[10px] cursor-pointer border-none bg-transparent hover:opacity-100 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Add task..."
                  value={newTasks[day] || ''}
                  onChange={(e) => setNewTasks(prev => ({ ...prev, [day]: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && addTask(day)}
                  className={`flex-1 text-xs px-3 py-2 rounded-xl border outline-none transition-all ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white focus:border-lavender/40'
                      : 'bg-white/40 border-blush/20 focus:border-lavender'
                  }`}
                />
                <button
                  onClick={() => addTask(day)}
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
    </div>
  )
}
