import { CheckCircle2, ChevronLeft, Play, ShieldAlert } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { modules } from '../data/modules'
import { completeModule, getProgress } from '../utils/progress'

const snippets = {
  'cia-stride': {
    topic: 'Threat modelling scenario',
    vulnerable: 'A password reset endpoint returns whether an email exists in the system.',
    fixed: 'Return a consistent response and log the request internally, reducing unnecessary information disclosure.',
    question: 'Which security goal is most directly affected when private account information is exposed?',
    answer: 'Confidentiality',
  },
  'owasp-top-10': {
    topic: 'Injection risk',
    vulnerable: `const sql = "SELECT * FROM users WHERE id = " + req.query.id;`,
    fixed: `db.query("SELECT * FROM users WHERE id = ?", [validatedId]);`,
    question: 'What is the safer pattern shown in the fixed example?',
    answer: 'Parameterised query',
  },
  'secure-coding': {
    topic: 'Server-side input validation',
    vulnerable: `const role = req.body.role;\nuser.role = role;`,
    fixed: `const role = allowedRoles.includes(req.body.role) ? req.body.role : 'user';`,
    question: 'Why should the server validate the role instead of trusting the browser?',
    answer: 'Client input can be changed',
  },
  'dependencies': {
    topic: 'Dependency hygiene',
    vulnerable: 'A project keeps old packages indefinitely because the application still runs.',
    fixed: 'Track dependencies, review advisories, test updates and patch supported versions through a controlled process.',
    question: 'What should happen before blindly upgrading a production dependency?',
    answer: 'Review and test the update',
  },
  'ssdlc': {
    topic: 'Shift-left security',
    vulnerable: 'Security review starts only after production deployment.',
    fixed: 'Threat modelling, code review and automated checks are added throughout design and delivery.',
    question: 'What is the main benefit of finding security issues earlier?',
    answer: 'They are easier and cheaper to fix',
  },
  'pen-testing': {
    topic: 'Safe testing methodology',
    vulnerable: 'Testing an unknown public target without permission.',
    fixed: 'Use a controlled lab target, written scope and simulated requests designed for training.',
    question: 'What comes before testing a real system?',
    answer: 'Explicit authorisation and scope',
  },
}

export default function ModulePage() {
  const { slug } = useParams()
  const module = modules.find((item) => item.slug === slug)
  const lab = snippets[slug]
  const [simulated, setSimulated] = useState(false)
  const [selected, setSelected] = useState('')
  const [saved, setSaved] = useState(Boolean(getProgress()[slug]))

  const answers = useMemo(() => [lab?.answer, 'Skip validation', 'Hide all errors'].filter(Boolean), [lab])
  if (!module || !lab) return <Navigate to="/dashboard" replace />

  function finish() {
    completeModule(slug)
    setSaved(true)
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="container section lab-page">
        <Link className="back-link" to="/dashboard"><ChevronLeft size={17} /> Back to dashboard</Link>
        <div className="lab-heading">
          <div><span className="section-kicker">Module {module.number}</span><h1>{module.title}</h1><p>{module.description}</p></div>
          {saved && <span className="complete-chip"><CheckCircle2 size={17} /> Completed</span>}
        </div>

        <div className="lesson-layout">
          <section className="lesson-main">
            <article className="lesson-card">
              <span className="lesson-label">LAB 01</span>
              <h2>{lab.topic}</h2>
              <p>Study the risky pattern, then compare it with the safer approach.</p>
            </article>

            <article className="compare-grid">
              <div className="compare-card danger-card"><span>VULNERABLE / RISKY</span><pre><code>{lab.vulnerable}</code></pre></div>
              <div className="compare-card safe-card"><span>SAFER APPROACH</span><pre><code>{lab.fixed}</code></pre></div>
            </article>

            <article className="simulation-card">
              <div><ShieldAlert size={22} /><div><h3>Safe simulation</h3><p>This simulation does not send requests to an external system.</p></div></div>
              <button className="btn btn-outline" onClick={() => setSimulated(true)}><Play size={16} /> Run simulation</button>
              {simulated && <div className="simulation-output"><strong>Simulation result:</strong> The unsafe pattern was detected. The safer implementation reduces the demonstrated risk by validating or constraining untrusted input.</div>}
            </article>

            <article className="quiz-card">
              <span className="lesson-label">CHECK YOUR UNDERSTANDING</span>
              <h3>{lab.question}</h3>
              <div className="answer-list">
                {answers.map((answer) => (
                  <button key={answer} className={`answer ${selected === answer ? 'selected' : ''}`} onClick={() => setSelected(answer)}>{answer}</button>
                ))}
              </div>
              {selected && <p className={selected === lab.answer ? 'quiz-good' : 'quiz-bad'}>{selected === lab.answer ? 'Correct — nice work.' : 'Not quite. Compare the examples above and try again.'}</p>}
            </article>

            <button className="btn btn-primary btn-large finish-btn" disabled={selected !== lab.answer} onClick={finish}><CheckCircle2 size={18} /> {saved ? 'Module completed' : 'Complete module'}</button>
          </section>

          <aside className="lesson-side">
            <span className="section-kicker">Module outline</span>
            <ol>
              <li className="active">Core concept</li>
              <li>Vulnerable pattern</li>
              <li>Safer pattern</li>
              <li>Safe simulation</li>
              <li>Knowledge check</li>
            </ol>
            <p>V1 uses one representative lab per module. More labs can be added after beta feedback.</p>
          </aside>
        </div>
      </main>
    </div>
  )
}
