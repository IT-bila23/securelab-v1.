import { ArrowRight, CheckCircle2, Circle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ModuleCard({ module, complete = false }) {
  return (
    <article className="module-card">
      <div className="module-topline">
        <span className="module-number">{module.number}</span>
        {complete ? <CheckCircle2 size={20} className="success" /> : <Circle size={18} className="muted" />}
      </div>
      <h3>{module.title}</h3>
      <p className="eyebrow-text">{module.short}</p>
      <p>{module.description}</p>
      <div className="module-footer">
        <span>{module.lessons} lessons</span>
        <Link to={`/module/${module.slug}`}>Open module <ArrowRight size={16} /></Link>
      </div>
    </article>
  )
}
