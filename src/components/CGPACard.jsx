import { useTheme } from '../App.jsx'

export default function CGPACard() {
  const { darkMode } = useTheme()
  const currentCGPA = 8.2
  const previousCGPA = 7.8
  const maxCGPA = 10
  const progress = (currentCGPA / maxCGPA) * 100
  const improvement = (currentCGPA - previousCGPA).toFixed(1)

  const suggestions = [
    '📖 Focus more on DBMS',
    '💻 Improve Java coding practice',
    '🧠 Dedicate more time to AI concepts',
  ]

  return (
    <div className={`rounded-3xl p-6 transition-all duration-300 card-hover ${
      darkMode
        ? 'bg-gradient-to-br from-peach/8 to-blush/8 border border-white/5'
        : 'bg-gradient-to-br from-peach/30 to-blush/20 border border-white/40'
    }`}>
      <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
        📊 CGPA Progress
      </h3>

      {/* CGPA display */}
      <div className="flex items-end gap-4 mb-4">
        <div>
          <p className={`text-xs font-body mb-1 ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>Current</p>
          <p className="font-display text-4xl font-bold bg-gradient-to-r from-peach to-blush bg-clip-text text-transparent">
            {currentCGPA}
          </p>
        </div>
        <div className="mb-1">
          <p className={`text-xs font-body mb-1 ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>Previous</p>
          <p className="font-body text-lg opacity-50">{previousCGPA}</p>
        </div>
        <div className={`mb-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
          improvement > 0 ? 'bg-mint/20 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {improvement > 0 ? '↑' : '↓'} {improvement}
        </div>
      </div>

      {/* Progress bar */}
      <div className={`w-full h-3 rounded-full mb-4 overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-white/50'}`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-peach to-blush transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Suggestions */}
      <div>
        <p className={`text-xs font-body mb-2 ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>Suggestions</p>
        <div className="space-y-1.5">
          {suggestions.map((s, i) => (
            <p key={i} className={`text-sm font-body px-3 py-2 rounded-xl ${
              darkMode ? 'bg-white/5' : 'bg-white/40'
            }`}>
              {s}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
