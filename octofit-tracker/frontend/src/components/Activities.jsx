import { useCollection } from '../api'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/` : 'http://localhost:8000/api/activities/'

function Activities() {
  const { items, status, error } = useCollection(activitiesEndpoint)

  return (
    <section>
      <div className="page-heading"><span className="eyebrow">Momentum</span><h1>Activities</h1><p>A live pulse of the team&apos;s movement.</p></div>
      {status === 'loading' && <p className="state">Loading activities...</p>}
      {status === 'error' && <p className="state state-error">{error}</p>}
      {status === 'ready' && <div className="table-responsive"><table className="table align-middle activity-table"><thead><tr><th>Type</th><th>Duration</th><th>Calories</th><th>Completed</th></tr></thead><tbody>{items.map((activity) => <tr key={activity._id || activity.id}><td><strong>{activity.type}</strong></td><td>{activity.durationMinutes} min</td><td>{activity.caloriesBurned} kcal</td><td>{new Date(activity.completedAt).toLocaleDateString()}</td></tr>)}</tbody></table></div>}
    </section>
  )
}

export default Activities
