import { useCollection } from '../api'

function Teams() {
  const { items, status, error } = useCollection('/api/teams/')

  return <section><div className="page-heading"><span className="eyebrow">Together</span><h1>Teams</h1><p>Small groups, shared goals, visible progress.</p></div>{status === 'loading' && <p className="state">Loading teams...</p>}{status === 'error' && <p className="state state-error">{error}</p>}{status === 'ready' && <div className="row g-3">{items.map((team) => <article className="col-md-6" key={team._id || team.id || team.name}><div className="team-card"><div className="d-flex justify-content-between gap-3"><h2>{team.name}</h2><span className="team-count">{team.members?.length || 0} members</span></div><p>{team.description}</p></div></article>)}</div>}</section>
}

export default Teams
