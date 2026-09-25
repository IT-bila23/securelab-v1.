import { Award, RotateCcw } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ModuleCard from '../components/ModuleCard'
import { modules } from '../data/modules'
import { getProgress, percentComplete, resetProgress } from '../utils/progress'

export default function Dashboard() {
  const [progress, setProgress] = useState(getProgress())
  const percent = useMemo(() => percentComplete(modules), [progress])
  const completed = modules.filter((module) => progress[module.slug]).length
  const nextModule = modules.find((module) => !progress[module.slug]) || modules[0]

  function handleReset() {
    resetProgress()
    setProgress({})
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="container dashboard section">
        <div className="dashboard-head">
          <div>
            <span className="section-kicker">Learner dashboard</span>
            <h1>Welcome to SecureLab.</h1>
            <p>Work through the modules at your own pace. Your progress is saved in this browser.</p>
          </div>
          <button className="btn btn-outline" onClick={handleReset}><RotateCcw size={16} /> Reset progress</button>
        </div>

        <section className="progress-panel">
          <div className="progress-copy">
            <strong>{percent}% complete</strong>
            <span>{completed} of {modules.length} modules completed</span>
          </div>
          <div className="progress-track" aria-label={`${percent}% complete`}><div style={{ width: `${percent}%` }} /></div>
          {completed === modules.length ? (
            <Link className="btn btn-primary" to="/certificate"><Award size={18} /> View certificate</Link>
          ) : (
            <Link className="btn btn-primary" to={`/module/${nextModule.slug}`}>Continue learning</Link>
          )}
        </section>

        <section>
          <div className="section-heading-row"><div><span className="section-kicker">Curriculum</span><h2>Your modules</h2></div></div>
          <div className="modules-grid">
            {modules.map((module) => <ModuleCard key={module.slug} module={module} complete={Boolean(progress[module.slug])} />)}
          </div>
        </section>
      </main>
    </div>
  )
}
