import { useTheme } from '../App.jsx'

export default function VisionBoard() {
  const { darkMode } = useTheme()

  return (
    <div className="page-enter flex items-center justify-center min-h-[70vh]">
      <div className={`rounded-3xl p-10 md:p-16 text-center max-w-lg mx-auto relative overflow-hidden ${
        darkMode
          ? 'bg-gradient-to-br from-mint/10 via-lavender/10 to-dark2 border border-white/5'
          : 'bg-gradient-to-br from-mint/20 via-lavender/20 to-peach/20 border border-white/40'
      }`}>
        {/* Decorative floating elements */}
        <div className="absolute top-6 left-6 text-4xl opacity-15 animate-float">✨</div>
        <div className="absolute bottom-6 right-6 text-3xl opacity-15 animate-float" style={{ animationDelay: '1.5s' }}>🎯</div>
        <div className="absolute top-1/2 right-8 text-2xl opacity-10 animate-float" style={{ animationDelay: '0.8s' }}>🌷</div>

        {/* Main icon */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-mint/30 to-lavender/30 flex items-center justify-center text-5xl mx-auto mb-6 animate-float">
          ✨
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
          Coming Soon
        </h1>
        <h2 className={`font-display text-lg mb-4 ${darkMode ? 'text-lavender' : 'text-dark3'}`}>
          Vision Board 🌸
        </h2>
        <p className={`font-body text-sm leading-relaxed mb-6 ${
          darkMode ? 'text-white/50' : 'text-dark1/50'
        }`}>
          Your personal Pinterest-style inspiration board is being designed with care. 
          Soon you'll be able to upload images, add captions, and arrange your dreams 
          in a beautiful visual layout. 💖
        </p>

        {/* Feature previews */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['Upload Images', 'Add Captions', 'Grid Layout', 'Dream Gallery'].map((feature) => (
            <span
              key={feature}
              className={`text-xs px-3 py-1.5 rounded-full font-body ${
                darkMode
                  ? 'bg-white/5 text-white/40 border border-white/5'
                  : 'bg-white/50 text-dark1/50 border border-white/40'
              }`}
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Notify */}
        <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-body text-sm ${
          darkMode
            ? 'bg-gradient-to-r from-mint/20 to-lavender/20 text-white/60'
            : 'bg-gradient-to-r from-mint/20 to-lavender/20 text-dark1/60'
        }`}>
          🔔 We'll notify you when it's ready!
        </div>
      </div>
    </div>
  )
}
