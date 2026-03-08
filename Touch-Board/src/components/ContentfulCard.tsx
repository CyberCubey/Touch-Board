import './ContentfulCard.scss'

type Props = {
  entry: any
  index: number
  assetsById?: Record<string, any>
}

function extractRichTextPlain(node: any): string {
  if (!node) return ''

  if (Array.isArray(node)) {
    return node
      .map((child) => extractRichTextPlain(child))
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  if (node.nodeType === 'text') {
    return typeof node.value === 'string' ? node.value : ''
  }

  if (Array.isArray(node.content)) {
    const text = node.content
      .map((child: any) => extractRichTextPlain(child))
      .filter(Boolean)
      .join(node.nodeType === 'paragraph' ? ' ' : '\n')
    return text.replace(/\s+/g, ' ').trim()
  }

  return ''
}

function resolveLocalizedValue(value: any) {
  if (value == null) return null
  if (typeof value !== 'object' || Array.isArray(value)) return value

  const keys = Object.keys(value)
  const localeKey = keys.find((k) => k.includes('-'))
  if (localeKey) return value[localeKey]

  return value
}

function getAssetFromField(fieldValue: any, assetsById: Record<string, any>) {
  const resolved = resolveLocalizedValue(fieldValue)

  if (resolved?.fields?.file) {
    return resolved
  }

  const assetId = resolved?.sys?.id
  if (assetId && assetsById[assetId]) {
    return assetsById[assetId]
  }

  return null
}

function asImageUrl(fileUrl: string | undefined) {
  if (!fileUrl) return null
  if (fileUrl.startsWith('//')) return `https:${fileUrl}`
  return fileUrl
}

function formatDisplayValue(value: any): string {
  const resolved = resolveLocalizedValue(value)

  if (resolved == null) return '-'

  if (resolved?.nodeType === 'document' && Array.isArray(resolved?.content)) {
    const richText = extractRichTextPlain(resolved)
    return richText || '-'
  }

  if (typeof resolved === 'string' || typeof resolved === 'number' || typeof resolved === 'boolean') {
    return String(resolved)
  }
  if (Array.isArray(resolved)) {
    return resolved
      .map((item) => formatDisplayValue(item))
      .filter(Boolean)
      .join(', ')
  }

  if (resolved?.fields?.title) {
    return formatDisplayValue(resolved.fields.title)
  }

  if (resolved?.sys?.type === 'Link') {
    return resolved.sys.linkType ? `${resolved.sys.linkType} link` : 'Link'
  }

  return '-'
}

export default function ContentfulCard({ entry, index, assetsById = {} }: Props) {
  const fields = entry.fields || {}

  const title =
    formatDisplayValue(fields.title) !== '-'
      ? formatDisplayValue(fields.title)
      : formatDisplayValue(fields.name) !== '-'
        ? formatDisplayValue(fields.name)
        : `Entry ${index + 1}`

  const subtitle =
    formatDisplayValue(fields.subtitle) !== '-'
      ? formatDisplayValue(fields.subtitle)
      : formatDisplayValue(fields.heading) !== '-'
        ? formatDisplayValue(fields.heading)
        : null

  const imageField = fields.image ?? fields.thumbnail ?? fields.heroImage ?? fields.cover
  const asset = getAssetFromField(imageField, assetsById)
  const imageUrl = asImageUrl(asset?.fields?.file?.url)
  const imageAlt = formatDisplayValue(asset?.fields?.title) !== '-' ? formatDisplayValue(asset?.fields?.title) : title

  const bodyField = fields.description ?? fields.body ?? fields.content ?? fields.text
  const body = formatDisplayValue(bodyField)

  const ignoredKeys = new Set(['title', 'name', 'subtitle', 'heading', 'image', 'thumbnail', 'heroImage', 'cover', 'description', 'body', 'content', 'text'])
  const remainingFields = Object.entries(fields).filter(([key]) => !ignoredKeys.has(key))

  return (
    <div className="contentful-card">
      {imageUrl && (
        <div className="media-wrap">
          <img className="media" src={imageUrl} alt={imageAlt} />
        </div>
      )}

      <h3 className="title">{title}</h3>
      {subtitle && <p className="subtitle">{subtitle}</p>}

      {body !== '-' && <p className="body">{body}</p>}

      {remainingFields.length > 0 && (
        <div className="field-list">
          {remainingFields.map(([key, value]) => (
            <div className="field-row" key={key}>
              <span className="field-key">{key}</span>
              <span className="field-value">{formatDisplayValue(value)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
