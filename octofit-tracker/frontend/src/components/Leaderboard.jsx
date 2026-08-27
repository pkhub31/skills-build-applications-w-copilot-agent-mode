import { useCollection } from '../api'

function Leaderboard() {
  const { items, status, error } = useCollection('leaderboard')
  const sortedItems = [...items].sort((a, b) => (a.rank || 999) - (b.rank || 999))

  return <section><div className="page-heading"><span className="eyebrow">Weekly race</span><h1>Leaderboard</h1><p>Consistency compounds. See who is climbing.</p></div>{status === 'loading' && <p className="state">Loading leaderboard...</p>}{status === 'error' && <p className="state state-error">{error}</p>}{status === 'ready' && <div className="leaderboard-list">{sortedItems.map((entry) => <div className="leaderboard-row" key={entry._id || entry.id || entry.rank}><span className="rank">{String(entry.rank).padStart(2, '0')}</span><span className="leaderboard-name">{entry.user?.name || entry.user || 'Athlete'}</span><strong>{entry.points} pts</strong></div>)}</div>}</section>
}

export default Leaderboard
