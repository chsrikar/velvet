import { useState, useEffect } from 'react'
import { useTheme } from '../App.jsx'
import HabitCard from '../components/HabitCard.jsx'
import MoodCard from '../components/MoodCard.jsx'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

const DEFAULT_WATER_GOAL = 8
const DEFAULT_EXERCISE_GOAL = 60
const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

function getDateKey(date) {
  return date.toISOString().slice(0, 10)
}

function getShortDate(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function getLast7Days() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = getDateKey(d)
    days.push({
      date: key,
      label: weekDayNames[d.getDay()],
      shortDate: getShortDate(d),
      water: loadFromStorage(`water_${key}`, 0),
      sleep: parseFloat(loadFromStorage(`sleep_${key}`, 0)),
      exercise: loadFromStorage(`exercise_${key}`, 0),
      mood: loadFromStorage(`mood_${key}`, null),
      isToday: i === 0,
    })
  }
  return days
}

export default function Health() {
  const { darkMode } = useTheme()
  const today = new Date()
  const todayKey = getDateKey(today)

  const [water, setWater] = useState(() => loadFromStorage(`water_${todayKey}`, 0))
  const [waterGoal, setWaterGoal] = useState(() => loadFromStorage('water_goal', DEFAULT_WATER_GOAL))
  const [sleepToday, setSleepToday] = useState(() => loadFromStorage(`sleep_${todayKey}`, 0))
  const [exerciseMins, setExerciseMins] = useState(() => loadFromStorage(`exercise_${todayKey}`, 0))
  const [exerciseGoal, setExerciseGoal] = useState(() => loadFromStorage('exercise_goal', DEFAULT_EXERCISE_GOAL))
  const [history, setHistory] = useState(getLast7Days)
  const [editingWaterGoal, setEditingWaterGoal] = useState(false)
  const [editingExerciseGoal, setEditingExerciseGoal] = useState(false)

  useEffect(() => {
    saveToStorage(`water_${todayKey}`, water)
    setHistory(getLast7Days())
  }, [water, todayKey])

  useEffect(() => { saveToStorage('water_goal', waterGoal) }, [waterGoal])
  useEffect(() => { saveToStorage('exercise_goal', exerciseGoal) }, [exerciseGoal])

  useEffect(() => {
    const handleMoodUpdate = () => {
      setHistory(getLast7Days())
    }
    window.addEventListener('moodUpdated', handleMoodUpdate)
    return () => window.removeEventListener('moodUpdated', handleMoodUpdate)
  }, [])

  useEffect(() => {
    saveToStorage(`sleep_${todayKey}`, sleepToday)
    setHistory(getLast7Days())
  }, [sleepToday, todayKey])

  useEffect(() => {
    saveToStorage(`exercise_${todayKey}`, exerciseMins)
    setHistory(getLast7Days())
  }, [exerciseMins, todayKey])

  const adjustSleep = (delta) => {
    setSleepToday(prev => Math.max(0, Math.min(14, parseFloat((prev + delta).toFixed(1)))))
  }

  const adjustExercise = (delta) => {
    setExerciseMins(prev => Math.max(0, prev + delta))
  }

  const adjustWaterGoal = (delta) => {
    setWaterGoal(prev => Math.max(1, Math.min(20, prev + delta)))
  }

  const adjustExerciseGoal = (delta) => {
    setExerciseGoal(prev => Math.max(5, Math.min(180, prev + delta)))
  }

  const moodEmojis = {
    Happy: '😊', Loved: '🥰', Calm: '😌', Excited: '🤩', Confident: '😎',
    Stressed: '😓', Anxious: '😰', Overwhelmed: '😵‍💫', Sad: '😢', Tired: '😴'
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
            <p className="text-lg font-bold">💧 {water}/{waterGoal}</p>
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">💧 Water Intake</h3>
            <button
              onClick={() => setEditingWaterGoal(!editingWaterGoal)}
              className={`text-xs px-3 py-1 rounded-full border-none cursor-pointer transition-all duration-300 ${
                darkMode
                  ? 'bg-white/10 text-white/60 hover:bg-white/20'
                  : 'bg-white/50 text-dark1/60 hover:bg-white/80'
              }`}
            >
              {editingWaterGoal ? 'Done ✓' : `Goal: ${waterGoal} 🥤`}
            </button>
          </div>

          {editingWaterGoal && (
            <div className={`flex items-center gap-3 mb-4 p-3 rounded-2xl animate-fade-in ${
              darkMode ? 'bg-white/5' : 'bg-white/30'
            }`}>
              <span className={`text-sm font-body ${darkMode ? 'text-white/50' : 'text-dark1/50'}`}>Daily goal:</span>
              <button onClick={() => adjustWaterGoal(-1)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm border-none cursor-pointer ${
                  darkMode ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-blush/20 text-dark1/60 hover:bg-blush/30'
                }`}>−</button>
              <span className="text-lg font-bold font-display">{waterGoal}</span>
              <button onClick={() => adjustWaterGoal(1)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm border-none cursor-pointer ${
                  darkMode ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-blush/20 text-dark1/60 hover:bg-blush/30'
                }`}>+</button>
              <span className={`text-sm font-body ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>glasses</span>
            </div>
          )}

          <p className={`text-sm font-body mb-3 ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>
            {water}/{waterGoal} glasses today {water >= waterGoal ? '🎉' : ''}
          </p>
          <div className="flex gap-2 flex-wrap mb-4">
            {Array.from({ length: waterGoal }).map((_, i) => (
              <button
                key={i}
                onClick={() => setWater(water === i + 1 ? i : i + 1)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg cursor-pointer border-none transition-all duration-300 ${
                  i < water
                    ? 'bg-gradient-to-br from-mint to-lavender text-white scale-105 shadow-md'
                    : darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-white/40 hover:bg-white/60'
                }`}
              >
                💧
              </button>
            ))}
          </div>
          <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-white/40'}`}>
            <div className="h-full rounded-full bg-gradient-to-r from-mint to-lavender transition-all duration-500"
              style={{ width: `${Math.min(100, (water / waterGoal) * 100)}%` }} />
          </div>
        </div>

        {/* Sleep Tracker */}
        <div className={`rounded-3xl p-6 card-hover ${
          darkMode
            ? 'bg-gradient-to-br from-lavender/8 to-blush/8 border border-white/5'
            : 'bg-gradient-to-br from-lavender/20 to-blush/15 border border-white/40'
        }`}>
          <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">😴 Sleep Tracker</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl font-display font-bold bg-gradient-to-r from-lavender to-blush bg-clip-text text-transparent">
              {sleepToday}h
            </div>
            <p className={`text-sm font-body ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>last night's sleep</p>
            <div className="flex items-center gap-1 ml-auto">
              <button onClick={() => adjustSleep(-0.5)}
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm border-none cursor-pointer transition-all ${
                  darkMode ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-blush/20 text-dark1/60 hover:bg-blush/30'
                }`}>−</button>
              <button onClick={() => adjustSleep(0.5)}
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm border-none cursor-pointer transition-all ${
                  darkMode ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-blush/20 text-dark1/60 hover:bg-blush/30'
                }`}>+</button>
            </div>
          </div>
          <div className="flex items-end gap-2 h-24">
            {history.map((entry, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-lg bg-gradient-to-t from-lavender to-blush transition-all duration-500 ${
                    entry.isToday ? 'opacity-100' : darkMode ? 'opacity-40' : 'opacity-60'
                  }`}
                  style={{ height: `${Math.max(4, (entry.sleep / 10) * 100)}%` }}
                />
                <span className={`text-xs ${
                  entry.isToday ? darkMode ? 'text-lavender font-bold' : 'text-dark3 font-bold' : darkMode ? 'text-white/30' : 'text-dark1/30'
                }`}>{entry.label}</span>
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
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">🏃 Exercise</h3>
            <button
              onClick={() => setEditingExerciseGoal(!editingExerciseGoal)}
              className={`text-[10px] px-2 py-0.5 rounded-full border-none cursor-pointer transition-all ${
                darkMode
                  ? 'bg-white/10 text-white/60 hover:bg-white/20'
                  : 'bg-white/50 text-dark1/60 hover:bg-white/80'
              }`}
            >
              {editingExerciseGoal ? 'Done ✓' : `Goal: ${exerciseGoal}m`}
            </button>
          </div>

          {editingExerciseGoal && (
            <div className={`flex items-center justify-center gap-2 mb-3 p-2 rounded-2xl animate-fade-in ${
              darkMode ? 'bg-white/5' : 'bg-white/30'
            }`}>
              <button onClick={() => adjustExerciseGoal(-5)}
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs border-none cursor-pointer ${
                  darkMode ? 'bg-white/10 text-white/60' : 'bg-blush/20 text-dark1/60'
                }`}>−</button>
              <span className="text-sm font-bold">{exerciseGoal}m</span>
              <button onClick={() => adjustExerciseGoal(5)}
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs border-none cursor-pointer ${
                  darkMode ? 'bg-white/10 text-white/60' : 'bg-blush/20 text-dark1/60'
                }`}>+</button>
            </div>
          )}

          <div className="text-center mb-3">
            <p className="text-4xl font-display font-bold bg-gradient-to-r from-peach to-blush bg-clip-text text-transparent">{exerciseMins}</p>
            <p className={`text-xs font-body ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>minutes today</p>
          </div>
          <div className={`w-full h-3 rounded-full overflow-hidden mb-3 ${darkMode ? 'bg-white/10' : 'bg-white/40'}`}>
            <div className="h-full rounded-full bg-gradient-to-r from-peach to-blush transition-all duration-500"
              style={{ width: `${Math.min(100, (exerciseMins / exerciseGoal) * 100)}%` }} />
          </div>
          <p className={`text-xs text-center font-body mb-3 ${darkMode ? 'text-white/30' : 'text-dark1/30'}`}>
            Goal: {exerciseGoal} minutes {exerciseMins >= exerciseGoal ? '🎉' : ''}
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {[-10, -5, 5, 10, 15, 30].map(mins => (
              <button key={mins} onClick={() => adjustExercise(mins)}
                className={`px-3 py-1.5 rounded-xl text-xs border-none cursor-pointer transition-all ${
                  darkMode ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-white/50 text-dark1/60 hover:bg-white/70'
                }`}>{mins > 0 ? '+' : ''}{mins}m</button>
            ))}
          </div>
        </div>

        <MoodCard />
        <HabitCard />
      </div>

      {/* 7-Day Health History */}
      <div className={`rounded-3xl p-6 mb-6 ${
        darkMode
          ? 'bg-gradient-to-br from-lavender/8 to-mint/8 border border-white/5'
          : 'bg-gradient-to-br from-lavender/15 to-mint/15 border border-white/40'
      }`}>
        <h3 className="font-display text-lg font-semibold mb-4">📊 Last 7 Days Overview</h3>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 gap-3 min-w-[600px]">
            {history.map((day, i) => (
              <div
                key={i}
                className={`rounded-2xl p-3 text-center transition-all duration-300 ${
                  day.isToday
                    ? darkMode
                      ? 'bg-gradient-to-br from-lavender/20 to-blush/20 border-2 border-lavender/30 shadow-lg'
                      : 'bg-gradient-to-br from-blush/30 to-lavender/25 border-2 border-blush/40 shadow-lg'
                    : darkMode
                      ? 'bg-white/5 border border-white/5'
                      : 'bg-white/40 border border-white/30'
                }`}
              >
                <p className={`text-xs font-body font-semibold mb-0.5 ${
                  day.isToday ? (darkMode ? 'text-lavender' : 'text-dark3') : ''
                }`}>
                  {day.label}
                </p>
                <p className={`text-[10px] mb-2 ${darkMode ? 'text-white/30' : 'text-dark1/30'}`}>
                  {day.shortDate}
                </p>

                {day.isToday && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full mb-2 inline-block ${
                    darkMode ? 'bg-lavender/20 text-lavender' : 'bg-blush/30 text-dark1'
                  }`}>
                    Today
                  </span>
                )}

                <div className="space-y-1.5 mt-1">
                  <div>
                    <span className="text-sm">💧</span>
                    <p className={`text-xs font-bold ${day.water >= waterGoal ? 'text-green-500' : ''}`}>{day.water}/{waterGoal}</p>
                  </div>
                  <div>
                    <span className="text-sm">😴</span>
                    <p className={`text-xs font-bold ${day.sleep >= 7 ? 'text-green-500' : day.sleep > 0 ? '' : (darkMode ? 'text-white/20' : 'text-dark1/20')}`}>
                      {day.sleep > 0 ? `${day.sleep}h` : '—'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm">🏃</span>
                    <p className={`text-xs font-bold ${day.exercise >= 30 ? 'text-green-500' : ''}`}>
                      {day.exercise > 0 ? `${day.exercise}m` : '—'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm">{day.mood ? (moodEmojis[day.mood] || '🌈') : '🌈'}</span>
                    <p className={`text-[10px] ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>
                      {day.mood || '—'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
            <div key={card.title}
              className={`p-4 rounded-2xl transition-all duration-300 ${
                darkMode ? 'bg-white/5 hover:bg-white/8' : 'bg-white/40 hover:bg-white/60'
              }`}>
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
