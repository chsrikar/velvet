import { useState, useEffect } from 'react'
import { useTheme } from '../App.jsx'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

const colorOptions = [
  'from-peach to-blush',
  'from-mint to-lavender',
  'from-lavender to-blush',
  'from-blush to-peach',
  'from-mint to-peach',
  'from-lavender to-mint',
]

const defaultSkills = [
  { id: 1, name: 'Java', level: 75, color: 'from-peach to-blush' },
  { id: 2, name: 'Python', level: 80, color: 'from-mint to-lavender' },
  { id: 3, name: 'React', level: 70, color: 'from-lavender to-blush' },
  { id: 4, name: 'DBMS', level: 60, color: 'from-blush to-peach' },
  { id: 5, name: 'AI/ML', level: 55, color: 'from-mint to-peach' },
]

export default function SkillCard() {
  const { darkMode } = useTheme()
  const [skills, setSkills] = useState(() => loadFromStorage('skills', defaultSkills))
  const [showAdd, setShowAdd] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: '', level: '50' })

  useEffect(() => { saveToStorage('skills', skills) }, [skills])

  const addSkill = () => {
    if (!newSkill.name.trim()) return
    const lvl = Math.max(0, Math.min(100, parseInt(newSkill.level) || 50))
    setSkills(prev => [...prev, {
      id: Date.now(),
      name: newSkill.name.trim(),
      level: lvl,
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
    }])
    setNewSkill({ name: '', level: '50' })
    setShowAdd(false)
  }

  const deleteSkill = (id) => {
    setSkills(prev => prev.filter(s => s.id !== id))
  }

  const updateLevel = (id, delta) => {
    setSkills(prev => prev.map(s =>
      s.id === id ? { ...s, level: Math.max(0, Math.min(100, s.level + delta)) } : s
    ))
  }

  return (
    <div className={`rounded-3xl p-6 transition-all duration-300 card-hover ${
      darkMode
        ? 'bg-gradient-to-br from-lavender/8 to-mint/8 border border-white/5'
        : 'bg-gradient-to-br from-lavender/20 to-mint/20 border border-white/40'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold flex items-center gap-2">
          🎯 Skills Progress
        </h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className={`text-xs px-3 py-1 rounded-full border-none cursor-pointer transition-all duration-300 ${
            darkMode
              ? 'bg-white/10 text-white/60 hover:bg-white/20'
              : 'bg-white/50 text-dark1/60 hover:bg-white/80'
          }`}
        >
          {showAdd ? 'Cancel' : '+ Add'}
        </button>
      </div>

      {showAdd && (
        <div className={`p-3 rounded-2xl mb-4 animate-fade-in ${
          darkMode ? 'bg-white/5' : 'bg-white/30'
        }`}>
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className={`text-xs font-body block mb-1 ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>Skill name</label>
              <input
                type="text"
                placeholder="e.g., Node.js"
                value={newSkill.name}
                onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                className={`w-full text-sm px-3 py-2 rounded-xl border outline-none transition-all ${
                  darkMode
                    ? 'bg-white/5 border-white/10 text-white focus:border-lavender/40'
                    : 'bg-white/40 border-blush/20 focus:border-lavender'
                }`}
              />
            </div>
            <div className="w-20">
              <label className={`text-xs font-body block mb-1 ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>Level %</label>
              <input
                type="number"
                min="0"
                max="100"
                value={newSkill.level}
                onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value }))}
                className={`w-full text-sm px-3 py-2 rounded-xl border outline-none transition-all ${
                  darkMode
                    ? 'bg-white/5 border-white/10 text-white focus:border-lavender/40'
                    : 'bg-white/40 border-blush/20 focus:border-lavender'
                }`}
              />
            </div>
            <button onClick={addSkill} className="btn-primary text-sm !px-4 !py-2">Add</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.id} className="group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-body font-medium">{skill.name}</span>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => updateLevel(skill.id, -5)}
                    className={`w-5 h-5 rounded flex items-center justify-center text-[10px] border-none cursor-pointer ${
                      darkMode ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-blush/20 text-dark1/60 hover:bg-blush/30'
                    }`}
                  >
                    −
                  </button>
                  <button
                    onClick={() => updateLevel(skill.id, 5)}
                    className={`w-5 h-5 rounded flex items-center justify-center text-[10px] border-none cursor-pointer ${
                      darkMode ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-blush/20 text-dark1/60 hover:bg-blush/30'
                    }`}
                  >
                    +
                  </button>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="text-xs cursor-pointer border-none bg-transparent opacity-60 hover:opacity-100 transition-all"
                  >
                    ✕
                  </button>
                </div>
                <span className={`text-xs font-body ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>{skill.level}%</span>
              </div>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-white/50'}`}>
              <div
                className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-500`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
