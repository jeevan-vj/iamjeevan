export default function Section({ id, label, children }) {
  return (
    <section id={id} className="section">
      <h2 className="section-label">{label}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
