import { NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../App.jsx'

const navItems = [
  { path: '/', label: 'Dashboard', icon: '🏠' },
  { path: '/study', label: 'Study', icon: '📚' },
  { path: '/startups', label: 'Startups', icon: '🚀' },
  { path: '/weekly', label: 'Weekly Planner', icon: '📅' },
  { path: '/health', label: 'Health', icon: '💪' },
  { path: '/growth', label: 'Growth', icon: '🌱' },
  { path: '/vision-board', label: 'Vision Board', icon: '✨' },
  { path: '/chatbot', label: 'Chatbot', icon: '🤖' },
]

export default function Sidebar({ isOpen, toggleSidebar }) {
  const { darkMode } = useTheme()
  const location = useLocation()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-screen w-64 flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${
        darkMode
          ? 'bg-dark1/90 backdrop-blur-2xl border-r border-white/5'
          : 'bg-white/60 backdrop-blur-2xl border-r border-blush/20'
      }`}>
        {/* Brand */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blush to-lavender flex items-center justify-center text-xl animate-float">
            🌸
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight">Velvet Vision</h1>
            <p className={`text-xs font-body ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>Dream • Plan • Grow</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 no-underline ${
                    isActive
                      ? darkMode
                        ? 'bg-gradient-to-r from-lavender/20 to-blush/20 text-white shadow-lg shadow-lavender/10'
                        : 'bg-gradient-to-r from-blush/40 to-lavender/30 text-dark1 shadow-lg shadow-blush/20'
                      : darkMode
                        ? 'text-white/60 hover:text-white hover:bg-white/5'
                        : 'text-dark1/60 hover:text-dark1 hover:bg-blush/10'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-body">{item.label}</span>
                  {isActive && (
                    <div className={`ml-auto w-1.5 h-5 rounded-full ${
                      darkMode ? 'bg-lavender' : 'bg-blush'
                    }`} />
                  )}
                </NavLink>
              )
            })}
          </div>
        </nav>

        {/* Bottom section */}
        <div className={`p-4 m-3 mb-6 rounded-2xl ${
          darkMode ? 'bg-gradient-to-br from-lavender/10 to-blush/10' : 'bg-gradient-to-br from-blush/20 to-lavender/20'
        }`}>
          <p className="text-xs font-body opacity-70 text-center">✨ You're doing amazing, Chandrika! ✨</p>
        </div>
      </aside>
    </>
  )
}
