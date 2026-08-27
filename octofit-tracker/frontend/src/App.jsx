import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { API_BASE_URL } from './api'
import './App.css'

const navigation = [
  { path: '/users', label: 'Users', detail: 'Community' },
  { path: '/teams', label: 'Teams', detail: 'Together' },
  { path: '/activities', label: 'Activities', detail: 'Momentum' },
  { path: '/leaderboard', label: 'Leaderboard', detail: 'Weekly race' },
  { path: '/workouts', label: 'Workouts', detail: 'Training library' },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark"><img src="/octofitapp-small.png" alt="OctoFit" /><div><strong>OctoFit</strong><small>TRACKER</small></div></div>
        <p className="sidebar-note">Move with intention.<br />Measure what matters.</p>
        <nav className="main-nav" aria-label="Primary navigation">
          {navigation.map((item) => <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} key={item.path} to={item.path}><span className="nav-index">{String(navigation.indexOf(item) + 1).padStart(2, '0')}</span>{item.label}</NavLink>)}
        </nav>
        <div className="connection"><span className="status-dot" />API connected<div>{API_BASE_URL.replace('https://', '').replace('http://', '')}</div></div>
      </aside>
      <main className="main-content">
        <header className="topbar"><span>August 2026 / Dashboard</span><span className="live-label">● Live workspace</span></header>
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
