import { useState } from 'react'
import { useTheme } from '../App.jsx'
import FlowerMenu from './FlowerMenu.jsx'

export default function Navbar({ toggleSidebar }) {
  const { darkMode, toggleDarkMode } = useTheme()
  const [showFlowerMenu, setShowFlowerMenu] = useState(false)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

  return (
    <header className={`sticky top-0 z-30 transition-all duration-300 ${
      darkMode
        ? 'bg-dark1/60 backdrop-blur-2xl border-b border-white/5'
        : 'bg-white/40 backdrop-blur-2xl border-b border-blush/10'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer border-none ${
              darkMode
                ? 'clay-btn-dark text-white'
                : 'clay-btn text-dark1'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          </button>
          <div>
            <p className={`text-sm font-body ${darkMode ? 'text-white/50' : 'text-dark1/50'}`}>{greeting} ✨</p>
            <h2 className="font-display text-lg font-semibold -mt-0.5">Chandrika</h2>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className={`relative w-14 h-7 rounded-full transition-all duration-500 cursor-pointer border-none ${
              darkMode
                ? 'bg-gradient-to-r from-dark3 to-lavender/30'
                : 'bg-gradient-to-r from-blush/40 to-peach/40'
            }`}
          >
            <div className={`absolute top-0.5 w-6 h-6 rounded-full shadow-md transition-all duration-500 flex items-center justify-center text-sm ${
              darkMode
                ? 'left-7.5 bg-dark1'
                : 'left-0.5 bg-white'
            }`}>
              {darkMode ? '🌙' : '☀️'}
            </div>
          </button>

          {/* Flower menu trigger */}
          <div className="relative">
            <button
              onClick={() => setShowFlowerMenu(!showFlowerMenu)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer border-none text-xl ${
                darkMode
                  ? 'clay-btn-dark'
                  : 'clay-btn'
              } ${showFlowerMenu ? 'rotate-45 scale-110' : ''}`}
            >
              🌷
            </button>
            {showFlowerMenu && (
              <FlowerMenu onClose={() => setShowFlowerMenu(false)} />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
