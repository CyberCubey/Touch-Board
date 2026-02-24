import './ContentfulCard.scss'

type Props = {
  entry: any
  index: number
}

export default function ContentfulCard({ entry, index }: Props) {
  const title = entry.fields?.title ?? entry.fields?.name ?? `Entry ${index + 1}`

  return (
    <div className="contentful-card">
      <h3 className="title">{title}</h3>
      <div className="id">id: {entry.sys?.id}</div>
      <pre className="fields">{JSON.stringify(entry.fields, null, 2)}</pre>
    </div>
  )
}
