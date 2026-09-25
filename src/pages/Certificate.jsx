import { Award, ChevronLeft, ShieldCheck } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { modules } from '../data/modules'
import { percentComplete } from '../utils/progress'

export default function Certificate() {
  if (percentComplete(modules) < 100) return <Navigate to="/dashboard" replace />
  return (
    <div className="app-shell">
      <Navbar />
      <main className="container section certificate-page">
        <Link className="back-link" to="/dashboard"><ChevronLeft size={17} /> Back to dashboard</Link>
        <section className="certificate">
          <ShieldCheck size={42} />
          <span className="section-kicker">SecureLab V1</span>
          <h1>Certificate of Completion</h1>
          <p>This recognises successful completion of the SecureLab beginner secure web development learning path.</p>
          <div className="certificate-line"></div>
          <strong>Secure Coding Foundations</strong>
          <span>6 modules completed</span>
          <Award size={34} />
        </section>
      </main>
    </div>
  )
}
