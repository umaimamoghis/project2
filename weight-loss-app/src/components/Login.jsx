import { useState } from 'react'
import { Activity } from 'lucide-react'

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!username.trim()) return
        onLogin(username.trim().toLowerCase())
    }

    return (
        <div className="auth-app-container" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 className="text-gradient" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <Activity size={32} color="var(--primary)" />
                        LuminaTrack
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Sign in to view your progress</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ marginBottom: '1rem' }}
                        />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%', padding: '1rem' }}>
                        Continue
                    </button>
                </form>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '1.5rem' }}>
                    No password required for this demo. Just enter any name to create or access a profile.
                </p>
            </div>
        </div>
    )
}
