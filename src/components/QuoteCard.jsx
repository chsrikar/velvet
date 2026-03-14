import { useState, useEffect } from 'react'
import { useTheme } from '../App.jsx'

const quotes = [
  "Dream big. Start small. Act now. 🌟",
  "You are capable of amazing things. 💫",
  "Progress, not perfection. 🌷",
  "Every expert was once a beginner. 🦋",
  "Today is a beautiful day to learn something new. 🌸",
  "Success is the sum of small efforts, repeated day in and day out. ✨",
  "Believe in yourself and all that you are. 💖",
  "The only limit is the one you set for yourself. 🌺",
  "Great things take time. Be patient. 🍃",
  "Your potential is endless. Keep going. 🌈",
]

export default function QuoteCard() {
  const { darkMode } = useTheme()
  const [quote, setQuote] = useState('')

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
    setQuote(quotes[dayOfYear % quotes.length])
  }, [])

  const getNewQuote = () => {
    const randomIdx = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[randomIdx])
  }

  return (
    <div className={`rounded-3xl p-6 transition-all duration-300 card-hover ${
      darkMode
        ? 'bg-gradient-to-br from-lavender/10 to-blush/10 border border-white/5'
        : 'bg-gradient-to-br from-blush/30 to-lavender/20 border border-white/40'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl animate-float">💭</span>
        <button
          onClick={getNewQuote}
          className={`text-xs px-3 py-1 rounded-full border-none cursor-pointer transition-all duration-300 ${
            darkMode
              ? 'bg-white/10 text-white/60 hover:bg-white/20'
              : 'bg-white/50 text-dark1/60 hover:bg-white/80'
          }`}
        >
          New Quote ✨
        </button>
      </div>
      <p className="font-display text-xl md:text-2xl font-medium leading-relaxed italic">
        "{quote}"
      </p>
      <p className={`text-xs mt-3 font-body ${darkMode ? 'text-white/30' : 'text-dark1/30'}`}>
        Daily inspiration for you, Chandrika 🌸
      </p>
    </div>
  )
}
