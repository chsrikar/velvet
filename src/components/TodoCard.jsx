import { useState, useEffect } from 'react'
import { useTheme } from '../App.jsx'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

const defaultTasks = [
  { id: 1, text: 'Study Java Generics', done: false },
  { id: 2, text: 'Revise DBMS queries', done: false },
  { id: 3, text: 'Read AI search algorithms', done: false },
  { id: 4, text: 'Plan startup features', done: false },
]

export default function TodoCard() {
  const { darkMode } = useTheme()
  const [tasks, setTasks] = useState(() => loadFromStorage('todo_tasks', defaultTasks))
  const [newTask, setNewTask] = useState('')

  useEffect(() => { saveToStorage('todo_tasks', tasks) }, [tasks])

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks(prev => [...prev, { id: Date.now(), text: newTask.trim(), done: false }])
    setNewTask('')
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const doneCount = tasks.filter(t => t.done).length
  const progress = tasks.length > 0 ? (doneCount / tasks.length) * 100 : 0

  return (
    <div className={`rounded-3xl p-6 transition-all duration-300 card-hover ${
      darkMode
        ? 'bg-gradient-to-br from-mint/8 to-lavender/8 border border-white/5'
        : 'bg-gradient-to-br from-mint/30 to-cream border border-white/40'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold flex items-center gap-2">
          📋 Daily To-Do
        </h3>
        <span className={`text-xs px-3 py-1 rounded-full font-body ${
          darkMode ? 'bg-mint/10 text-mint' : 'bg-mint/30 text-dark1'
        }`}>
          {doneCount}/{tasks.length} done
        </span>
      </div>

      {/* Progress bar */}
      <div className={`w-full h-2 rounded-full mb-4 overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-white/50'}`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-mint to-lavender transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Tasks list */}
      <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-300 group ${
              darkMode ? 'hover:bg-white/5' : 'hover:bg-white/40'
            }`}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-all duration-300 ${
                task.done
                  ? 'bg-gradient-to-br from-mint to-lavender border-transparent'
                  : darkMode
                    ? 'border-white/20 bg-transparent hover:border-mint/50'
                    : 'border-blush/40 bg-transparent hover:border-mint/50'
              }`}
            >
              {task.done && <span className="text-white text-xs">✓</span>}
            </button>
            <span className={`flex-1 text-sm font-body transition-all duration-300 ${
              task.done ? 'line-through opacity-40' : ''
            }`}>
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-60 text-xs cursor-pointer border-none bg-transparent hover:opacity-100 transition-all"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Add new task */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          className={`flex-1 text-sm ${darkMode ? 'input-field-dark' : 'input-field'}`}
        />
        <button
          onClick={addTask}
          className="btn-primary text-sm !px-4 !py-2"
        >
          Add
        </button>
      </div>
    </div>
  )
}
