import React, { useEffect, useState } from 'react'
import ContentfulCard from './ContentfulCard'

const SPACE_ID = 'fgprzh3vayg6'
const ACCESS_TOKEN = 'Tj3D7r-2e5ksKPaWSnr1ZrI5hp9K-7ky6kVjU1qJYZY'

export default function ContentfulEntries() {
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEntries = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}`
      )
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      const data = await res.json()
      setEntries(data.items || [])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  return (
    <div className="contentful-entries">
      <div className="controls">
        <button onClick={fetchEntries}>Refresh</button>
        {loading && <span className="loading">Loading…</span>}
        {error && <div className="error">{error}</div>}
      </div>

      <div className="grid">
        {entries.slice(0, 2).map((e, i) => (
          <ContentfulCard key={e.sys?.id ?? i} entry={e} index={i} />
        ))}
        {entries.length === 0 && !loading && <div>No entries found</div>}
      </div>
    </div>
  )
}
