import { useTheme } from '../App.jsx'

const menuItems = [
  { icon: '👤', label: 'Profile', desc: 'View your profile' },
  { icon: '⚙️', label: 'Settings', desc: 'App settings' },
  { icon: '🔔', label: 'Notifications', desc: 'View alerts' },
  { icon: '⏰', label: 'Reminders', desc: 'Set reminders' },
  { icon: '🎨', label: 'Themes', desc: 'Customize look' },
  { icon: '💖', label: 'About Velvet Vision', desc: 'Version 1.0' },
]

export default function FlowerMenu({ onClose }) {
  const { darkMode } = useTheme()

  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose} />
      <div className={`absolute right-0 top-14 w-64 rounded-3xl p-2 z-50 animate-scale-in ${
        darkMode
          ? 'clay-card-dark'
          : 'clay-card'
      }`}>
        <div className="p-3 pb-2">
          <p className="text-xs font-body opacity-50 uppercase tracking-widest">Menu</p>
        </div>
        {menuItems.map((item, i) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all duration-200 cursor-pointer border-none bg-transparent ${
              darkMode
                ? 'hover:clay-btn-dark hover:text-white text-white/80'
                : 'hover:clay-btn hover:text-dark1 text-dark1/80'
            }`}
            style={{ animationDelay: `${i * 0.05}s` }}
            onClick={onClose}
          >
            <span className="text-lg">{item.icon}</span>
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p className={`text-xs ${darkMode ? 'text-white/30' : 'text-dark1/30'}`}>{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </>
  )
}
