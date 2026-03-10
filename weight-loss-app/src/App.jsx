import { useState, useEffect } from 'react'
import { Activity, LogOut } from 'lucide-react'
import Dashboard from './components/Dashboard'
import AddWeightForm from './components/AddWeightForm'
import GoalSetter from './components/GoalSetter'
import WeightHistory from './components/WeightHistory'
import BMICalculator from './components/BMICalculator'
import ThemeToggle from './components/ThemeToggle'
import Login from './components/Login'
import './index.css'

function App() {
  const [currentUser, setCurrentUser] = useState(() => localStorage.getItem('currentUser') || null)

  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  // User specific data
  const [weights, setWeights] = useState([])
  const [goal, setGoal] = useState(null)
  const [height, setHeight] = useState(null)

  // Apply theme class to document body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Load user specific data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      const savedWeights = localStorage.getItem(`weights_${currentUser}`)
      const savedGoal = localStorage.getItem(`goal_${currentUser}`)
      const savedHeight = localStorage.getItem(`height_${currentUser}`)

      setWeights(savedWeights ? JSON.parse(savedWeights) : [])
      setGoal(savedGoal ? JSON.parse(savedGoal) : null)
      setHeight(savedHeight ? JSON.parse(savedHeight) : null)

      localStorage.setItem('currentUser', currentUser)
    } else {
      localStorage.removeItem('currentUser')
    }
  }, [currentUser])

  // Save data specifically for this user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`weights_${currentUser}`, JSON.stringify(weights))
    }
  }, [weights, currentUser])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`goal_${currentUser}`, JSON.stringify(goal))
    }
  }, [goal, currentUser])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`height_${currentUser}`, JSON.stringify(height))
    }
  }, [height, currentUser])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  const addWeight = (entry) => {
    setWeights(prev => [...prev, entry].sort((a, b) => new Date(a.date) - new Date(b.date)))
  }

  const deleteWeight = (id) => {
    setWeights(prev => prev.filter(w => w.id !== id))
  }

  if (!currentUser) {
    return (
      <>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <Login onLogin={setCurrentUser} />
      </>
    )
  }

  // Calculate current weight for BMI
  const currentWeight = weights.length > 0 ? weights[weights.length - 1].value : null

  return (
    <div className="auth-app-container">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      <header className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <button
          onClick={handleLogout}
          className="btn btn-secondary"
          style={{ position: 'absolute', left: '1rem', top: '1.5rem', padding: '0.5rem 1rem' }}
          title="Logout"
        >
          <LogOut size={18} /> <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem' }}>Logout</span>
        </button>

        <h1 className="text-gradient" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          <Activity size={32} color="var(--primary)" />
          LuminaTrack
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Welcome back, <span style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'capitalize' }}>{currentUser}</span>
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Dashboard weights={weights} goal={goal} />
          <BMICalculator height={height} setHeight={setHeight} currentWeight={currentWeight} />
          <GoalSetter goal={goal} setGoal={setGoal} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <AddWeightForm onAdd={addWeight} />
          <WeightHistory weights={weights} onDelete={deleteWeight} />
        </div>
      </div>
    </div>
  )
}

export default App
