import { useCollection } from '../api'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/` : 'http://localhost:8000/api/users/'

function Users() {
  const { items, status, error } = useCollection(usersEndpoint)

  return (
    <section>
      <div className="page-heading"><span className="eyebrow">Community</span><h1>Users</h1><p>Find the people powering the next workout.</p></div>
      <CollectionState status={status} error={error} />
      {status === 'ready' && <div className="row g-3">{items.map((user) => <article className="col-md-6 col-xl-4" key={user._id || user.id || user.email}><div className="profile-card"><span className="avatar">{user.name?.slice(0, 1)}</span><h2>{user.name}</h2><p>{user.email}</p><span className="badge text-bg-warning">{user.fitnessLevel}</span></div></article>)}</div>}
    </section>
  )
}

function CollectionState({ status, error }) {
  if (status === 'loading') return <p className="state">Loading collection...</p>
  if (status === 'error') return <p className="state state-error">{error}</p>
  return null
}

export default Users
