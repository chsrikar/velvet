import { useState } from 'react'
import { useTheme } from '../App.jsx'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

const moods = [
  { emoji: '😊', label: 'Happy', color: 'bg-mint/30' },
  { emoji: '😌', label: 'Calm', color: 'bg-lavender/30' },
  { emoji: '🤩', label: 'Excited', color: 'bg-peach/30' },
  { emoji: '😓', label: 'Stressed', color: 'bg-blush/30' },
  { emoji: '😴', label: 'Tired', color: 'bg-cream' },
]

export default function MoodCard() {
  const { darkMode } = useTheme()
  const todayKey = new Date().toISOString().slice(0, 10)
  const [selected, setSelected] = useState(() => loadFromStorage(`mood_${todayKey}`, null))

  const selectMood = (label) => {
    setSelected(label)
    saveToStorage(`mood_${todayKey}`, label)
  }

  return (
    <div className={`rounded-3xl p-6 transition-all duration-300 card-hover ${
      darkMode
        ? 'bg-gradient-to-br from-peach/8 to-mint/8 border border-white/5'
        : 'bg-gradient-to-br from-peach/20 to-mint/15 border border-white/40'
    }`}>
      <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
        🌈 How are you feeling?
      </h3>
      <div className="flex gap-2 flex-wrap">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => selectMood(mood.label)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 cursor-pointer border-2 ${
              selected === mood.label
                ? `${mood.color} border-lavender/50 scale-110 shadow-lg`
                : darkMode
                  ? 'bg-white/5 border-transparent hover:bg-white/10'
                  : 'bg-white/30 border-transparent hover:bg-white/50'
            }`}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-xs font-body">{mood.label}</span>
          </button>
        ))}
      </div>
      {selected && (
        <p className={`mt-3 text-sm font-body animate-fade-in ${
          darkMode ? 'text-white/50' : 'text-dark1/50'
        }`}>
          You're feeling {selected.toLowerCase()} today! 💖 Take care of yourself, Chandrika.
        </p>
      )}
    </div>
  )
}
