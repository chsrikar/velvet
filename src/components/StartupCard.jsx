import { useState, useEffect } from 'react'
import { useTheme } from '../App.jsx'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

const defaultStartups = [
  {
    id: 1, name: 'ArchConnect', emoji: '🏗️', tagline: 'Connecting Architects',
    progress: 35, color: 'from-lavender to-blush',
    goals: ['Launch MVP', 'Create landing page', 'Find first users'],
  },
  {
    id: 2, name: 'Weboraa', emoji: '🌐', tagline: 'Web Solutions Platform',
    progress: 20, color: 'from-mint to-lavender',
    goals: ['Design brand identity', 'Build portfolio site', 'Get first client'],
  },
  {
    id: 3, name: 'Eterna', emoji: '💎', tagline: 'Timeless Fashion',
    progress: 45, color: 'from-peach to-blush',
    goals: ['Complete catalog', 'Set up e-commerce', 'Social media launch'],
  },
]

export default function StartupCard() {
  const { darkMode } = useTheme()
  const [startups, setStartups] = useState(() => loadFromStorage('startup_overview', defaultStartups))

  useEffect(() => { saveToStorage('startup_overview', startups) }, [startups])

  return (
    <div className={`rounded-3xl p-6 transition-all duration-300 card-hover ${
      darkMode
        ? 'bg-gradient-to-br from-blush/8 to-peach/8 border border-white/5'
        : 'bg-gradient-to-br from-cream to-peach/20 border border-white/40'
    }`}>
      <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
        🚀 Startup Progress
      </h3>

      <div className="space-y-4">
        {startups.map((s) => (
          <div
            key={s.id}
            className={`p-4 rounded-2xl transition-all duration-300 ${
              darkMode ? 'bg-white/5 hover:bg-white/8' : 'bg-white/40 hover:bg-white/60'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{s.emoji}</span>
              <div className="flex-1">
                <h4 className="font-body font-semibold text-sm">{s.name}</h4>
                <p className={`text-xs ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>{s.tagline}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r ${s.color} text-white`}>
                {s.progress}%
              </span>
            </div>
            <div className={`w-full h-1.5 rounded-full mb-2 overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-white/30'}`}>
              <div
                className={`h-full rounded-full bg-gradient-to-r ${s.color} transition-all duration-1000`}
                style={{ width: `${s.progress}%` }}
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {s.goals.map((g, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    darkMode ? 'bg-white/5 text-white/50' : 'bg-white/50 text-dark1/50'
                  }`}
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
