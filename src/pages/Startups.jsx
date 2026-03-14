import { useState, useEffect } from 'react'
import { useTheme } from '../App.jsx'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

const defaultStartupData = [
  {
    id: 1,
    name: 'ArchConnect',
    emoji: '🏗️',
    tagline: 'Connecting Architects & Clients',
    description: 'A premium SaaS platform bridging the gap between architects and clients for seamless project collaboration.',
    progress: 35,
    color: 'from-lavender to-blush',
    milestones: [
      { id: 101, text: 'Market Research', done: true },
      { id: 102, text: 'Wireframe Design', done: true },
      { id: 103, text: 'Build MVP', done: false },
      { id: 104, text: 'Launch Landing Page', done: false },
      { id: 105, text: 'Find First Users', done: false },
    ],
  },
  {
    id: 2,
    name: 'Weboraa',
    emoji: '🌐',
    tagline: 'Web Solutions Platform',
    description: 'Full-stack web development and design agency offering modern digital solutions for businesses.',
    progress: 20,
    color: 'from-mint to-lavender',
    milestones: [
      { id: 201, text: 'Brand Identity Design', done: true },
      { id: 202, text: 'Build Portfolio Website', done: false },
      { id: 203, text: 'Social Media Presence', done: false },
      { id: 204, text: 'Get First Client', done: false },
      { id: 205, text: 'Scale Operations', done: false },
    ],
  },
  {
    id: 3,
    name: 'Eterna',
    emoji: '💎',
    tagline: 'Timeless Fashion E-Commerce',
    description: 'An elegant e-commerce platform curating timeless fashion pieces for the modern, sophisticated shopper.',
    progress: 45,
    color: 'from-peach to-blush',
    milestones: [
      { id: 301, text: 'Product Catalog', done: true },
      { id: 302, text: 'E-Commerce Setup', done: true },
      { id: 303, text: 'Payment Integration', done: false },
      { id: 304, text: 'Social Media Launch', done: false },
      { id: 305, text: 'First 100 Customers', done: false },
    ],
  },
]

export default function Startups() {
  const { darkMode } = useTheme()
  const [startups, setStartups] = useState(() => loadFromStorage('startups', defaultStartupData))
  const [expandedId, setExpandedId] = useState(null)
  const [newMilestones, setNewMilestones] = useState({})

  useEffect(() => { saveToStorage('startups', startups) }, [startups])

  const toggleMilestone = (startupId, milestoneId) => {
    setStartups(prev => prev.map(s =>
      s.id === startupId
        ? {
            ...s,
            milestones: s.milestones.map(m => m.id === milestoneId ? { ...m, done: !m.done } : m),
            progress: Math.round(
              s.milestones.map(m => m.id === milestoneId ? { ...m, done: !m.done } : m)
                .filter(m => m.done).length /
              s.milestones.length * 100
            ),
          }
        : s
    ))
  }

  const addMilestone = (startupId) => {
    const text = newMilestones[startupId]?.trim()
    if (!text) return
    setStartups(prev => prev.map(s =>
      s.id === startupId
        ? {
            ...s,
            milestones: [...s.milestones, { id: Date.now(), text, done: false }],
            progress: Math.round(s.milestones.filter(m => m.done).length / (s.milestones.length + 1) * 100),
          }
        : s
    ))
    setNewMilestones(prev => ({ ...prev, [startupId]: '' }))
  }

  const deleteMilestone = (startupId, milestoneId) => {
    setStartups(prev => prev.map(s => {
      if (s.id !== startupId) return s
      const updated = s.milestones.filter(m => m.id !== milestoneId)
      return {
        ...s,
        milestones: updated,
        progress: updated.length > 0 ? Math.round(updated.filter(m => m.done).length / updated.length * 100) : 0,
      }
    }))
  }

  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">🚀 Startups</h1>
        <p className={`font-body ${darkMode ? 'text-white/50' : 'text-dark1/50'}`}>
          Track your entrepreneurial journey and startup milestones ✨
        </p>
      </div>

      <div className="space-y-6">
        {startups.map((startup) => (
          <div
            key={startup.id}
            className={`rounded-3xl p-6 md:p-8 transition-all duration-300 card-hover ${
              darkMode
                ? 'bg-gradient-to-br from-white/5 to-white/2 border border-white/5'
                : 'bg-white/40 border border-white/40'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              {/* Icon */}
              <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${startup.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                {startup.emoji}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-display text-xl font-bold">{startup.name}</h3>
                    <p className={`text-sm font-body ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>
                      {startup.tagline}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${startup.color} text-white`}>
                    {startup.progress}%
                  </span>
                </div>

                <p className={`text-sm font-body mb-4 ${darkMode ? 'text-white/60' : 'text-dark1/60'}`}>
                  {startup.description}
                </p>

                {/* Progress bar */}
                <div className={`w-full h-2.5 rounded-full mb-4 overflow-hidden ${
                  darkMode ? 'bg-white/10' : 'bg-white/50'
                }`}>
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${startup.color} transition-all duration-1000`}
                    style={{ width: `${startup.progress}%` }}
                  />
                </div>

                {/* Milestones toggle */}
                <button
                  onClick={() => setExpandedId(expandedId === startup.id ? null : startup.id)}
                  className={`text-sm font-body cursor-pointer border-none bg-transparent ${
                    darkMode ? 'text-lavender' : 'text-dark3'
                  }`}
                >
                  {expandedId === startup.id ? 'Hide' : 'Show'} Milestones ({startup.milestones.filter(m => m.done).length}/{startup.milestones.length}) ▾
                </button>

                {/* Milestones */}
                {expandedId === startup.id && (
                  <div className="mt-3 space-y-2 animate-fade-in">
                    {startup.milestones.map((m) => (
                      <div
                        key={m.id}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl group ${
                          darkMode ? 'bg-white/5' : 'bg-white/40'
                        }`}
                      >
                        <div
                          onClick={() => toggleMilestone(startup.id, m.id)}
                          className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                            m.done
                              ? `bg-gradient-to-br ${startup.color} border-transparent`
                              : darkMode ? 'border-white/20' : 'border-blush/30'
                          }`}
                        >
                          {m.done && <span className="text-white text-xs">✓</span>}
                        </div>
                        <span
                          onClick={() => toggleMilestone(startup.id, m.id)}
                          className={`flex-1 text-sm font-body cursor-pointer ${m.done ? 'line-through opacity-50' : ''}`}
                        >
                          {m.text}
                        </span>
                        <button
                          onClick={() => deleteMilestone(startup.id, m.id)}
                          className="opacity-0 group-hover:opacity-60 text-xs cursor-pointer border-none bg-transparent hover:opacity-100 transition-all"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    {/* Add milestone */}
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Add milestone..."
                        value={newMilestones[startup.id] || ''}
                        onChange={(e) => setNewMilestones(prev => ({ ...prev, [startup.id]: e.target.value }))}
                        onKeyDown={(e) => e.key === 'Enter' && addMilestone(startup.id)}
                        className={`flex-1 text-sm ${darkMode ? 'input-field-dark' : 'input-field'}`}
                      />
                      <button
                        onClick={() => addMilestone(startup.id)}
                        className="btn-primary text-sm !px-4 !py-2"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
