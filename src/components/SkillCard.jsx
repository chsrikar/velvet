import { useTheme } from '../App.jsx'

export default function SkillCard() {
  const { darkMode } = useTheme()

  const skills = [
    { name: 'Java', level: 75, color: 'from-peach to-blush' },
    { name: 'Python', level: 80, color: 'from-mint to-lavender' },
    { name: 'React', level: 70, color: 'from-lavender to-blush' },
    { name: 'DBMS', level: 60, color: 'from-blush to-peach' },
    { name: 'AI/ML', level: 55, color: 'from-mint to-peach' },
  ]

  return (
    <div className={`rounded-3xl p-6 transition-all duration-300 card-hover ${
      darkMode
        ? 'bg-gradient-to-br from-lavender/8 to-mint/8 border border-white/5'
        : 'bg-gradient-to-br from-lavender/20 to-mint/20 border border-white/40'
    }`}>
      <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
        🎯 Skills Progress
      </h3>

      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-body font-medium">{skill.name}</span>
              <span className={`text-xs font-body ${darkMode ? 'text-white/40' : 'text-dark1/40'}`}>{skill.level}%</span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-white/50'}`}>
              <div
                className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
