'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ApplyPage() {
    const [formData, setFormData] = useState({
        companyName: '',
        licenseType: 'Class A',
        safetyHistory: '',
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/submit-application', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setResult(data);
                setStatus('success');
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="container animate-fade-in" style={{ paddingTop: '4rem', maxWidth: '600px', textAlign: 'center' }}>
                <div className="card">
                    <h2 style={{ color: 'var(--success)', marginBottom: '1rem' }}>Application Submitted!</h2>
                    <p style={{ marginBottom: '2rem', color: 'var(--secondary)' }}>
                        Your application ID is <strong>{result?.id}</strong>.
                    </p>

                    <div style={{ padding: '1.5rem', background: 'var(--background)', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                        <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--secondary)' }}>Status</p>
                        <div className={`badge ${result?.status === 'APPROVED' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '1.25rem', padding: '0.5rem 1.5rem' }}>
                            {result?.status}
                        </div>
                    </div>

                    <p style={{ marginBottom: '2rem' }}>
                        {result?.status === 'APPROVED'
                            ? 'Congratulations! Your license has been auto-approved based on our AI assessment.'
                            : 'Your application has been flagged for manual review by an administrator.'}
                    </p>

                    <Link href="/" className="btn btn-secondary">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '4rem', maxWidth: '600px' }}>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/" style={{ color: 'var(--primary)', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    ← Back to Home
                </Link>
            </div>

            <div className="card">
                <h1 style={{ marginBottom: '0.5rem' }}>New License Application</h1>
                <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>
                    Please fill out the details below. Our AI will review your application instantly.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="label">Company Name</label>
                        <input
                            type="text"
                            className="input"
                            required
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            placeholder="e.g. Acme Construction Ltd."
                        />
                    </div>

                    <div className="input-group">
                        <label className="label">License Type</label>
                        <select
                            className="select"
                            value={formData.licenseType}
                            onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
                        >
                            <option value="Class A">Class A (Friable Asbestos)</option>
                            <option value="Class B">Class B (Non-Friable Asbestos)</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="label">Safety History & Experience</label>
                        <textarea
                            className="textarea"
                            rows="5"
                            required
                            value={formData.safetyHistory}
                            onChange={(e) => setFormData({ ...formData, safetyHistory: e.target.value })}
                            placeholder="Describe your team's experience and safety record..."
                        ></textarea>
                        <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', marginTop: '0.5rem' }}>
                            Be detailed. This will be analyzed by AI.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        disabled={status === 'submitting'}
                    >
                        {status === 'submitting' ? 'Analyzing...' : 'Submit Application'}
                    </button>

                    {status === 'error' && (
                        <p style={{ color: 'var(--error)', marginTop: '1rem', textAlign: 'center' }}>
                            Something went wrong. Please try again.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
