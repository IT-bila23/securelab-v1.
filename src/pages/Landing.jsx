import { ArrowRight, BookOpenCheck, Check, Code2, FlaskConical, ShieldCheck, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ModuleCard from '../components/ModuleCard'
import { modules } from '../data/modules'

export default function Landing() {
  return (
    <div className="page">
      <section className="hero-shell">
        <Navbar dark />
        <div className="hero container">
          <div className="hero-copy">
            <span className="pill">Hands-on secure coding for beginners</span>
            <h1>Learn secure development by <span>breaking things safely.</span></h1>
            <p>SecureLab helps cybersecurity students and junior developers practise OWASP concepts, compare vulnerable and fixed code, run safe simulations and track progress.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-large" to="/dashboard">Start learning free <ArrowRight size={18} /></Link>
              <a className="btn btn-ghost btn-large" href="#how-it-works">See how it works</a>
            </div>
            <div className="trust-row">
              <span><Check size={16} /> No setup required</span>
              <span><Check size={16} /> Beginner friendly</span>
              <span><Check size={16} /> Safe simulations</span>
            </div>
          </div>
          <div className="code-card" aria-label="Secure coding example">
            <div className="code-card-head"><span></span><span></span><span></span><strong>Input validation lab</strong></div>
            <div className="code-block bad">
              <label>VULNERABLE</label>
              <code>{`const query = req.query.q;\ndb.query(query);`}</code>
            </div>
            <div className="explain">User-controlled input reaches a query without validation or parameterisation.</div>
            <div className="code-block good">
              <label>FIXED</label>
              <code>{`const q = validate(req.query.q);\ndb.query('... WHERE id = ?', [q]);`}</code>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className="section container intro-grid">
          <div>
            <span className="section-kicker">Built for practice</span>
            <h2>More than cybersecurity notes.</h2>
            <p className="section-copy">Every SecureLab lesson is designed around a small practical learning loop: recognise the issue, understand why it matters, compare safer code and complete a controlled challenge.</p>
          </div>
          <div className="feature-grid">
            <Feature icon={<Code2 />} title="Vulnerable vs fixed" text="See insecure and safer implementation patterns side by side." />
            <Feature icon={<FlaskConical />} title="Safe simulations" text="Practise the reasoning behind testing without attacking real systems." />
            <Feature icon={<BookOpenCheck />} title="Guided learning" text="Short explanations keep each lab focused and understandable." />
            <Feature icon={<Trophy />} title="Track progress" text="Complete modules and build toward a final SecureLab certificate." />
          </div>
        </section>

        <section id="modules" className="section section-soft">
          <div className="container">
            <span className="section-kicker">SecureLab curriculum</span>
            <h2>Six focused beginner modules.</h2>
            <div className="modules-grid landing-modules">
              {modules.map((module) => <ModuleCard key={module.slug} module={module} />)}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section container">
          <span className="section-kicker">How it works</span>
          <h2>A simple learning loop.</h2>
          <div className="steps">
            <Step number="1" title="Learn" text="Read one focused concept." />
            <Step number="2" title="Compare" text="Review vulnerable and fixed code." />
            <Step number="3" title="Simulate" text="Run a safe controlled exercise." />
            <Step number="4" title="Complete" text="Save progress and move forward." />
          </div>
        </section>

        <section className="cta-band">
          <div className="container cta-inner">
            <div>
              <span className="section-kicker light">SecureLab Beta</span>
              <h2>Start building secure development habits.</h2>
              <p>The first version is intentionally simple: practical modules, safe labs and progress tracking.</p>
            </div>
            <Link className="btn btn-white btn-large" to="/dashboard">Open learner dashboard <ArrowRight size={18} /></Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="brand"><span className="brand-icon"><ShieldCheck size={20} /></span><span>SecureLab</span></div>
          <p>Learn secure development by breaking things safely.</p>
          <span>V1 MVP</span>
        </div>
      </footer>
    </div>
  )
}

function Feature({ icon, title, text }) {
  return <article className="feature"><span className="feature-icon">{icon}</span><h3>{title}</h3><p>{text}</p></article>
}
function Step({ number, title, text }) {
  return <article className="step"><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
}
