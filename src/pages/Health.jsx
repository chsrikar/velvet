import { useState, useEffect } from 'react'
import { useTheme } from '../App.jsx'
import HabitCard from '../components/HabitCard.jsx'
import MoodCard from '../components/MoodCard.jsx'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

const waterGlasses = 8
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getDateKey(date) {
  return date.toISOString().slice(0, 10)
}

function getSleepHistory() {
  const history = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = getDateKey(d)
    const hours = loadFromStorage(`sleep_${key}`, i === 0 ? 0 : (6 + Math.random() * 3).toFixed(1))
    history.push({ day: weekDays[d.getDay() === 0 ? 6 : d.getDay() - 1], hours: parseFloat(hours), date: key })
  }
  return history
}

export default function Health() {
  const { darkMode } = useTheme()
  const today = new Date()
  const todayKey = getDateKey(today)

  const [water, setWater] = useState(() => loadFromStorage(`water_${todayKey}`, 0))
  const [sleepToday, setSleepToday] = useState(() => loadFromStorage(`sleep_${todayKey}`, 0))
  const [sleepHistory, setSleepHistory] = useState(getSleepHistory)
  const [exerciseMins, setExerciseMins] = useState(() => loadFromStorage(`exercise_${todayKey}`, 0))

  useEffect(() => { saveToStorage(`water_${todayKey}`, water) }, [water, todayKey])
  useEffect(() => {
    saveToStorage(`sleep_${todayKey}`, sleepToday)
    setSleepHistory(getSleepHistory())
  }, [sleepToday, todayKey])
  useEffect(() => { saveToStorage(`exercise_${todayKey}`, exerciseMins) }, [exerciseMins, todayKey])

  const adjustSleep = (delta) => {
    setSleepToday(prev => Math.max(0, Math.min(14, parseFloat((prev + delta).toFixed(1)))))
  }

  const adjustExercise = (delta) => {
    setExerciseMins(prev => Math.max(0, prev + delta))
  }

  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">💪 Health & Wellness</h1>
        <p className={`font-body ${darkMode ? 'text-white/50' : 'text-dark1/50'}`}>
          Take care of yourself first, Chandrika. You deserve it! 💖
        </p>
      </div>

      {/* Today's Date Card */}
      <div className={`rounded-3xl p-6 mb-6 text-center relative overflow-hidden ${
        darkMode
          ? 'bg-gradient-to-r from-lavender/15 via-blush/10 to-mint/10 border border-white/5'
          : 'bg-gradient-to-r from-blush/30 via-lavender/20 to-mint/20 border border-white/40'
      }`}>
        <div className="absolute top-3 right-5 text-3xl opacity-15 animate-float">🌸</div>
        <p className={`text-sm font-body mb-1 ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>Today is</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold">
          📅 {formatDate(today)}
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <div className={`px-4 py-2 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-white/40'}`}>
            <p className="text-lg font-bold">💧 {water}/{waterGlasses}</p>
            <p className={`text-xs ${darkMode ? 'text-white/30' : 'text-dark1/30'}`}>Water</p>
          </div>
          <div className={`px-4 py-2 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-white/40'}`}>
            <p className="text-lg font-bold">😴 {sleepToday}h</p>
            <p className={`text-xs ${darkMode ? 'text-white/30' : 'text-dark1/30'}`}>Sleep</p>
          </div>
          <div className={`px-4 py-2 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-white/40'}`}>
            <p className="text-lg font-bold">🏃 {exerciseMins}m</p>
            <p className={`text-xs ${darkMode ? 'text-white/30' : 'text-dark1/30'}`}>Exercise</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Water Tracker */}
        <div className={`rounded-3xl p-6 card-hover ${
          darkMode
            ? 'bg-gradient-to-br from-mint/8 to-lavender/8 border border-white/5'
            : 'bg-gradient-to-br from-mint/20 to-lavender/15 border border-white/40'
        }`}>
          <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            💧 Water Intake
          </h3>
          <p className={`text-sm font-body mb-3 ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>
            {water}/{waterGlasses} glasses today
          </p>
          <div className="flex gap-2 flex-wrap mb-4">
            {Array.from({ length: waterGlasses }).map((_, i) => (
              <button
                key={i}
                onClick={() => setWater(i + 1)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg cursor-pointer border-none transition-all duration-300 ${
                  i < water
                    ? 'bg-gradient-to-br from-mint to-lavender text-white scale-105 shadow-md'
                    : darkMode
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'bg-white/40 hover:bg-white/60'
                }`}
              >
                💧
              </button>
            ))}
          </div>
          <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-white/40'}`}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-mint to-lavender transition-all duration-500"
              style={{ width: `${(water / waterGlasses) * 100}%` }}
            />
          </div>
        </div>

        {/* Sleep Tracker */}
        <div className={`rounded-3xl p-6 card-hover ${
          darkMode
            ? 'bg-gradient-to-br from-lavender/8 to-blush/8 border border-white/5'
            : 'bg-gradient-to-br from-lavender/20 to-blush/15 border border-white/40'
        }`}>
          <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            😴 Sleep Tracker
          </h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl font-display font-bold bg-gradient-to-r from-lavender to-blush bg-clip-text text-transparent">
              {sleepToday}h
            </div>
            <p className={`text-sm font-body ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>
              last night's sleep
            </p>
            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => adjustSleep(-0.5)}
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm border-none cursor-pointer transition-all ${
                  darkMode ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-blush/20 text-dark1/60 hover:bg-blush/30'
                }`}
              >
                −
              </button>
              <button
                onClick={() => adjustSleep(0.5)}
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm border-none cursor-pointer transition-all ${
                  darkMode ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-blush/20 text-dark1/60 hover:bg-blush/30'
                }`}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-end gap-2 h-24">
            {sleepHistory.map((entry, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-lg bg-gradient-to-t from-lavender to-blush transition-all duration-500 ${
                    entry.date === todayKey ? 'opacity-100' : darkMode ? 'opacity-40' : 'opacity-60'
                  }`}
                  style={{ height: `${(entry.hours / 10) * 100}%` }}
                />
                <span className={`text-xs ${
                  entry.date === todayKey
                    ? darkMode ? 'text-lavender font-bold' : 'text-dark3 font-bold'
                    : darkMode ? 'text-white/30' : 'text-dark1/30'
                }`}>
                  {entry.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Exercise Tracker */}
        <div className={`rounded-3xl p-6 card-hover ${
          darkMode
            ? 'bg-gradient-to-br from-peach/8 to-blush/8 border border-white/5'
            : 'bg-gradient-to-br from-peach/20 to-blush/15 border border-white/40'
        }`}>
          <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
            🏃 Exercise
          </h3>
          <div className="text-center mb-3">
            <p className="text-4xl font-display font-bold bg-gradient-to-r from-peach to-blush bg-clip-text text-transparent">
              {exerciseMins}
            </p>
            <p className={`text-xs font-body ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>minutes today</p>
          </div>
          <div className={`w-full h-3 rounded-full overflow-hidden mb-3 ${darkMode ? 'bg-white/10' : 'bg-white/40'}`}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-peach to-blush transition-all duration-500"
              style={{ width: `${Math.min(100, (exerciseMins / 60) * 100)}%` }}
            />
          </div>
          <p className={`text-xs text-center font-body mb-3 ${darkMode ? 'text-white/30' : 'text-dark1/30'}`}>
            Goal: 60 minutes
          </p>
          <div className="flex justify-center gap-2">
            {[5, 10, 15, 30].map(mins => (
              <button
                key={mins}
                onClick={() => adjustExercise(mins)}
                className={`px-3 py-1.5 rounded-xl text-xs border-none cursor-pointer transition-all ${
                  darkMode ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-white/50 text-dark1/60 hover:bg-white/70'
                }`}
              >
                +{mins}m
              </button>
            ))}
          </div>
        </div>

        {/* Mood Tracker */}
        <MoodCard />

        {/* Habits */}
        <HabitCard />
      </div>

      {/* Wellness Tips */}
      <div className={`rounded-3xl p-6 ${
        darkMode
          ? 'bg-gradient-to-br from-peach/8 to-mint/8 border border-white/5'
          : 'bg-gradient-to-br from-peach/20 to-mint/15 border border-white/40'
      }`}>
        <h3 className="font-display text-lg font-semibold mb-4">🌿 Wellness Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { icon: '🧘', title: 'Mindfulness', tip: 'Take 5 deep breaths between study sessions' },
            { icon: '🍎', title: 'Nutrition', tip: 'Eat colorful fruits and stay hydrated' },
            { icon: '🏃', title: 'Movement', tip: '30 mins of exercise daily boosts focus' },
          ].map((card) => (
            <div
              key={card.title}
              className={`p-4 rounded-2xl transition-all duration-300 ${
                darkMode ? 'bg-white/5 hover:bg-white/8' : 'bg-white/40 hover:bg-white/60'
              }`}
            >
              <span className="text-2xl">{card.icon}</span>
              <h4 className="font-body font-semibold text-sm mt-2 mb-1">{card.title}</h4>
              <p className={`text-xs font-body ${darkMode ? 'text-white/50' : 'text-dark1/50'}`}>{card.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
