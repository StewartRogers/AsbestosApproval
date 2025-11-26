'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/applications')
            .then(res => res.json())
            .then(data => {
                setApplications(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '4rem' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ marginBottom: 0 }}>Admin Dashboard</h1>
                <Link href="/" className="btn btn-secondary">
                    Back to Home
                </Link>
            </div>

            <div className="card">
                {applications.length === 0 ? (
                    <p style={{ color: 'var(--secondary)', textAlign: 'center' }}>No applications found.</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <th style={{ padding: '1rem', color: 'var(--secondary)' }}>Company</th>
                                    <th style={{ padding: '1rem', color: 'var(--secondary)' }}>License</th>
                                    <th style={{ padding: '1rem', color: 'var(--secondary)' }}>Date</th>
                                    <th style={{ padding: '1rem', color: 'var(--secondary)' }}>Status</th>
                                    <th style={{ padding: '1rem', color: 'var(--secondary)' }}>AI Analysis</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '1rem', fontWeight: '500' }}>{app.companyName}</td>
                                        <td style={{ padding: '1rem' }}>{app.licenseType}</td>
                                        <td style={{ padding: '1rem', color: 'var(--secondary)', fontSize: '0.9rem' }}>
                                            {new Date(app.submittedAt).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span className={`badge ${app.status === 'APPROVED' ? 'badge-success' : 'badge-warning'}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', maxWidth: '300px' }}>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--secondary)' }}>{app.aiReason}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
