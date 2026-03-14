import { useState, createContext, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Academic from './pages/Academic.jsx'
import Startups from './pages/Startups.jsx'
import Weekly from './pages/Weekly.jsx'
import Health from './pages/Health.jsx'
import Growth from './pages/Growth.jsx'
import VisionBoard from './pages/VisionBoard.jsx'
import Chatbot from './pages/Chatbot.jsx'
import { loadFromStorage, saveToStorage } from './utils/storage.js'

export const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

function App() {
  const [darkMode, setDarkMode] = useState(() => loadFromStorage('dark_mode', false))
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev
      saveToStorage('dark_mode', next)
      return next
    })
  }
  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={`min-h-screen flex transition-colors duration-500 ${
        darkMode
          ? 'bg-gradient-to-br from-dark1 via-dark2 to-dark3 text-white/90'
          : 'bg-gradient-to-br from-cream via-blush/20 to-lavender/20 text-dark1'
      }`}>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-0 lg:ml-64' : 'ml-0'}`}>
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/study" element={<Academic />} />
              <Route path="/startups" element={<Startups />} />
              <Route path="/weekly" element={<Weekly />} />
              <Route path="/health" element={<Health />} />
              <Route path="/growth" element={<Growth />} />
              <Route path="/vision-board" element={<VisionBoard />} />
              <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
