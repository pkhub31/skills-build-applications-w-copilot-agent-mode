import { useCollection } from '../api'

function Workouts() {
  const { items, status, error } = useCollection('workouts')

  return <section><div className="page-heading"><span className="eyebrow">Training library</span><h1>Workouts</h1><p>Choose a session that meets you where you are.</p></div>{status === 'loading' && <p className="state">Loading workouts...</p>}{status === 'error' && <p className="state state-error">{error}</p>}{status === 'ready' && <div className="row g-3">{items.map((workout) => <article className="col-md-6 col-xl-4" key={workout._id || workout.id || workout.name}><div className="workout-card"><div className="workout-top"><span>{workout.focus}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.name}</h2><p>{workout.difficulty}</p><ul>{workout.exercises?.map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></div></article>)}</div>}</section>
}

export default Workouts
