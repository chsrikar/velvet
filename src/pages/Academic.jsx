import { useState, useEffect } from 'react'
import { useTheme } from '../App.jsx'
import SkillCard from '../components/SkillCard.jsx'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

const colorOptions = [
  'from-peach to-blush',
  'from-lavender to-blush',
  'from-mint to-lavender',
  'from-blush to-peach',
  'from-mint to-peach',
  'from-lavender to-mint',
]

const iconOptions = ['☕', '🗄️', '🧠', '🌐', '📚', '🔬', '📐', '🎨', '📊', '💻']

const defaultSubjects = [
  { id: 1, name: 'Java Programming', icon: '☕', chapters: 12, completed: 7, color: 'from-peach to-blush' },
  { id: 2, name: 'DBMS', icon: '🗄️', chapters: 10, completed: 4, color: 'from-lavender to-blush' },
  { id: 3, name: 'AI & Search Algorithms', icon: '🧠', chapters: 8, completed: 3, color: 'from-mint to-lavender' },
  { id: 4, name: 'Web Development', icon: '🌐', chapters: 15, completed: 10, color: 'from-blush to-peach' },
  { id: 5, name: 'Data Structures', icon: '📚', chapters: 14, completed: 9, color: 'from-mint to-peach' },
]

const defaultStudyTasks = [
  { id: 1, text: 'Study Java Generics', done: false, subject: 'Java' },
  { id: 2, text: 'Revise SQL joins and subqueries', done: false, subject: 'DBMS' },
  { id: 3, text: 'Practice AI search algorithms', done: false, subject: 'AI' },
  { id: 4, text: 'Build a React component', done: true, subject: 'Web Dev' },
  { id: 5, text: 'Implement Binary Search Tree', done: false, subject: 'DSA' },
]

export default function Academic() {
  const { darkMode } = useTheme()
  const [subjects, setSubjects] = useState(() => loadFromStorage('subjects', defaultSubjects))
  const [tasks, setTasks] = useState(() => loadFromStorage('study_tasks', defaultStudyTasks))
  const [newTask, setNewTask] = useState('')
  const [showAddSubject, setShowAddSubject] = useState(false)
  const [newSubject, setNewSubject] = useState({ name: '', chapters: '', icon: '📚' })

  useEffect(() => { saveToStorage('study_tasks', tasks) }, [tasks])
  useEffect(() => { saveToStorage('subjects', subjects) }, [subjects])

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks(prev => [...prev, { id: Date.now(), text: newTask.trim(), done: false, subject: 'General' }])
    setNewTask('')
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const addSubject = () => {
    if (!newSubject.name.trim() || !newSubject.chapters) return
    const chapNum = parseInt(newSubject.chapters) || 1
    setSubjects(prev => [...prev, {
      id: Date.now(),
      name: newSubject.name.trim(),
      icon: newSubject.icon,
      chapters: chapNum,
      completed: 0,
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
    }])
    setNewSubject({ name: '', chapters: '', icon: '📚' })
    setShowAddSubject(false)
  }

  const deleteSubject = (id) => {
    setSubjects(prev => prev.filter(s => s.id !== id))
  }

  const incrementCompleted = (id) => {
    setSubjects(prev => prev.map(s =>
      s.id === id && s.completed < s.chapters
        ? { ...s, completed: s.completed + 1 }
        : s
    ))
  }

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">📚 Study Hub</h1>
        <p className={`font-body ${darkMode ? 'text-white/50' : 'text-dark1/50'}`}>
          Track your academic progress and stay on top of your studies, Chandrika! ✨
        </p>
      </div>

      {/* Add Subject Button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold">📖 Subjects</h3>
        <button
          onClick={() => setShowAddSubject(!showAddSubject)}
          className={`text-xs px-3 py-1.5 rounded-full border-none cursor-pointer transition-all duration-300 ${
            darkMode
              ? 'bg-white/10 text-white/60 hover:bg-white/20'
              : 'bg-white/50 text-dark1/60 hover:bg-white/80'
          }`}
        >
          {showAddSubject ? 'Cancel' : '+ Add Subject'}
        </button>
      </div>

      {/* Add Subject Form */}
      {showAddSubject && (
        <div className={`rounded-3xl p-5 mb-4 animate-fade-in ${
          darkMode ? 'bg-white/5 border border-white/5' : 'bg-white/40 border border-white/30'
        }`}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex gap-2 items-center">
              <select
                value={newSubject.icon}
                onChange={(e) => setNewSubject(prev => ({ ...prev, icon: e.target.value }))}
                className={`text-lg px-2 py-2 rounded-xl border outline-none cursor-pointer ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white/60 border-blush/20'
                }`}
              >
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="Subject name..."
              value={newSubject.name}
              onChange={(e) => setNewSubject(prev => ({ ...prev, name: e.target.value }))}
              className={`flex-1 text-sm ${darkMode ? 'input-field-dark' : 'input-field'}`}
            />
            <input
              type="number"
              placeholder="Chapters"
              min="1"
              value={newSubject.chapters}
              onChange={(e) => setNewSubject(prev => ({ ...prev, chapters: e.target.value }))}
              className={`w-28 text-sm ${darkMode ? 'input-field-dark' : 'input-field'}`}
            />
            <button onClick={addSubject} className="btn-primary text-sm">Add</button>
          </div>
        </div>
      )}

      {/* Subject Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {subjects.map((subject) => {
          const progress = subject.chapters > 0 ? Math.round((subject.completed / subject.chapters) * 100) : 0
          return (
            <div
              key={subject.id}
              className={`rounded-3xl p-5 transition-all duration-300 card-hover group relative ${
                darkMode
                  ? 'bg-white/5 border border-white/5'
                  : 'bg-white/40 border border-white/30'
              }`}
            >
              {/* Delete button */}
              <button
                onClick={() => deleteSubject(subject.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-60 text-xs cursor-pointer border-none bg-transparent hover:opacity-100 transition-all"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{subject.icon}</span>
                <div className="flex-1">
                  <h4 className="font-body font-semibold text-sm">{subject.name}</h4>
                  <p className={`text-xs ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>
                    {subject.completed}/{subject.chapters} chapters
                  </p>
                </div>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-white/40'}`}>
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${subject.color} transition-all duration-1000`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className={`text-xs ${darkMode ? 'text-white/30' : 'text-dark1/30'}`}>{progress}% complete</p>
                {subject.completed < subject.chapters && (
                  <button
                    onClick={() => incrementCompleted(subject.id)}
                    className={`text-xs px-2 py-0.5 rounded-full border-none cursor-pointer transition-all ${
                      darkMode ? 'bg-white/10 text-white/50 hover:bg-white/20' : 'bg-blush/20 text-dark1/50 hover:bg-blush/30'
                    }`}
                  >
                    +1 chapter
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Tasks */}
        <div className={`rounded-3xl p-6 ${
          darkMode
            ? 'bg-gradient-to-br from-lavender/8 to-mint/8 border border-white/5'
            : 'bg-gradient-to-br from-lavender/20 to-mint/15 border border-white/40'
        }`}>
          <h3 className="font-display text-lg font-semibold mb-4">📝 Study Tasks</h3>
          <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
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
                      : darkMode ? 'border-white/20 bg-transparent' : 'border-blush/40 bg-transparent'
                  }`}
                >
                  {task.done && <span className="text-white text-xs">✓</span>}
                </button>
                <div className="flex-1">
                  <p className={`text-sm font-body ${task.done ? 'line-through opacity-40' : ''}`}>{task.text}</p>
                  <p className={`text-xs ${darkMode ? 'text-white/30' : 'text-dark1/30'}`}>{task.subject}</p>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-60 text-xs cursor-pointer border-none bg-transparent hover:opacity-100 transition-all"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add study task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              className={`flex-1 text-sm ${darkMode ? 'input-field-dark' : 'input-field'}`}
            />
            <button onClick={addTask} className="btn-primary text-sm !px-4 !py-2">Add</button>
          </div>
        </div>

        {/* Skills Progress */}
        <SkillCard />
      </div>
    </div>
  )
}
