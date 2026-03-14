import { useState, useEffect } from 'react'
import { useTheme } from '../App.jsx'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

export default function CGPACard() {
  const { darkMode } = useTheme()
  const [cgpaData, setCgpaData] = useState(() => loadFromStorage('cgpa_data', {
    current: 8.2,
    previous: 7.8,
    max: 10,
    suggestions: [
      '📖 Focus more on DBMS',
      '💻 Improve Java coding practice',
      '🧠 Dedicate more time to AI concepts',
    ],
  }))
  const [editing, setEditing] = useState(false)
  const [editValues, setEditValues] = useState({ current: '', previous: '' })
  const [newSuggestion, setNewSuggestion] = useState('')

  useEffect(() => { saveToStorage('cgpa_data', cgpaData) }, [cgpaData])

  const progress = (cgpaData.current / cgpaData.max) * 100
  const improvement = (cgpaData.current - cgpaData.previous).toFixed(1)

  const startEditing = () => {
    setEditValues({ current: cgpaData.current.toString(), previous: cgpaData.previous.toString() })
    setEditing(true)
  }

  const saveEditing = () => {
    const cur = parseFloat(editValues.current)
    const prev = parseFloat(editValues.previous)
    if (!isNaN(cur) && !isNaN(prev) && cur >= 0 && cur <= 10 && prev >= 0 && prev <= 10) {
      setCgpaData(d => ({ ...d, current: cur, previous: prev }))
    }
    setEditing(false)
  }

  const addSuggestion = () => {
    if (!newSuggestion.trim()) return
    setCgpaData(d => ({ ...d, suggestions: [...d.suggestions, newSuggestion.trim()] }))
    setNewSuggestion('')
  }

  const deleteSuggestion = (idx) => {
    setCgpaData(d => ({ ...d, suggestions: d.suggestions.filter((_, i) => i !== idx) }))
  }

  return (
    <div className={`rounded-3xl p-6 transition-all duration-300 card-hover ${
      darkMode
        ? 'bg-gradient-to-br from-peach/8 to-blush/8 border border-white/5'
        : 'bg-gradient-to-br from-peach/30 to-blush/20 border border-white/40'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold flex items-center gap-2">
          📊 CGPA Progress
        </h3>
        <button
          onClick={editing ? saveEditing : startEditing}
          className={`text-xs px-3 py-1 rounded-full border-none cursor-pointer transition-all duration-300 ${
            darkMode
              ? 'bg-white/10 text-white/60 hover:bg-white/20'
              : 'bg-white/50 text-dark1/60 hover:bg-white/80'
          }`}
        >
          {editing ? 'Save ✓' : 'Edit ✏️'}
        </button>
      </div>

      {/* CGPA display */}
      {editing ? (
        <div className="flex items-end gap-4 mb-4">
          <div>
            <p className={`text-xs font-body mb-1 ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>Current</p>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={editValues.current}
              onChange={(e) => setEditValues(prev => ({ ...prev, current: e.target.value }))}
              className={`w-20 text-2xl font-display font-bold text-center rounded-xl py-1 border outline-none ${
                darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white/60 border-blush/30'
              }`}
            />
          </div>
          <div className="mb-1">
            <p className={`text-xs font-body mb-1 ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>Previous</p>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={editValues.previous}
              onChange={(e) => setEditValues(prev => ({ ...prev, previous: e.target.value }))}
              className={`w-20 text-lg font-body text-center rounded-xl py-1 border outline-none ${
                darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white/60 border-blush/30'
              }`}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-end gap-4 mb-4">
          <div>
            <p className={`text-xs font-body mb-1 ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>Current</p>
            <p className="font-display text-4xl font-bold bg-gradient-to-r from-peach to-blush bg-clip-text text-transparent">
              {cgpaData.current}
            </p>
          </div>
          <div className="mb-1">
            <p className={`text-xs font-body mb-1 ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>Previous</p>
            <p className="font-body text-lg opacity-50">{cgpaData.previous}</p>
          </div>
          <div className={`mb-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
            improvement > 0 ? 'bg-mint/20 text-green-600' : improvement < 0 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
          }`}>
            {improvement > 0 ? '↑' : improvement < 0 ? '↓' : '='} {Math.abs(improvement)}
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className={`w-full h-3 rounded-full mb-4 overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-white/50'}`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-peach to-blush transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Suggestions */}
      <div>
        <p className={`text-xs font-body mb-2 ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>Suggestions</p>
        <div className="space-y-1.5 mb-2">
          {cgpaData.suggestions.map((s, i) => (
            <div
              key={i}
              className={`flex items-center justify-between text-sm font-body px-3 py-2 rounded-xl group ${
                darkMode ? 'bg-white/5' : 'bg-white/40'
              }`}
            >
              <span>{s}</span>
              <button
                onClick={() => deleteSuggestion(i)}
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
            placeholder="Add suggestion..."
            value={newSuggestion}
            onChange={(e) => setNewSuggestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSuggestion()}
            className={`flex-1 text-xs px-3 py-2 rounded-xl border outline-none transition-all ${
              darkMode
                ? 'bg-white/5 border-white/10 text-white focus:border-lavender/40'
                : 'bg-white/40 border-blush/20 focus:border-lavender'
            }`}
          />
          <button
            onClick={addSuggestion}
            className={`px-2.5 py-2 rounded-xl text-xs cursor-pointer border-none transition-all ${
              darkMode ? 'bg-lavender/20 text-white hover:bg-lavender/30' : 'bg-blush/30 text-dark1 hover:bg-blush/40'
            }`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
