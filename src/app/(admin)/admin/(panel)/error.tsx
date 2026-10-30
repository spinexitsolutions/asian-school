'use client'

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  const db = /mongo|ECONNREFUSED|Server selection/i.test(error.message)
  return (
    <div className="a-card mx-auto mt-10 max-w-lg p-8 text-center">
      <h1 className="text-xl font-bold">{db ? 'Database is not reachable' : 'Something went wrong'}</h1>
      <p className="mt-2 text-[14.5px] text-mute">
        {db ? 'Start the local database (npm run db:local) or check DATABASE_URI, then try again.' : 'Please try again. If it keeps happening, contact the website developer.'}
      </p>
      <button onClick={reset} className="a-btn a-btn-primary mt-6">
        Try again
      </button>
    </div>
  )
}
