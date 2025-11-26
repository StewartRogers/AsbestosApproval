import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div className="animate-fade-in">
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AsbestosApproval
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', marginBottom: '3rem', maxWidth: '600px' }}>
          Intelligent Asbestos License Management System powered by Gemini AI.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <Link href="/apply" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
            Submit Application
          </Link>
          <Link href="/admin" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
            Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
