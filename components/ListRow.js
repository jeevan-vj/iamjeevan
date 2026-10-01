import Link from './Link'

export function StaticRow({ title, summary, meta }) {
  return (
    <li>
      <div className="row">
        <span className="row-main">
          <h3 className="row-title">{title}</h3>
          {summary ? <span className="row-summary">{summary}</span> : null}
        </span>
        {meta ? <span className="row-meta">{meta}</span> : null}
      </div>
    </li>
  )
}

export default function ListRow({ href, title, summary, meta }) {
  return (
    <li>
      <Link href={href} className="row-link">
        <span className="row-main">
          <h3 className="row-title">{title}</h3>
          {summary ? <span className="row-summary">{summary}</span> : null}
        </span>
        {meta ? <span className="row-meta">{meta}</span> : null}
      </Link>
    </li>
  )
}
