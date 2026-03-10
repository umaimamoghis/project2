import { useState } from 'react'
import { Target } from 'lucide-react'

export default function GoalSetter({ goal, setGoal }) {
    const [val, setVal] = useState(goal ? goal.value : '')
    const [isEditing, setIsEditing] = useState(!goal)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!val) return
        setGoal({ value: parseFloat(val) })
        setIsEditing(false)
    }

    return (
        <div className="glass-card">
            <div className="card-header">
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Target size={20} color="var(--secondary)" />
                    Weight Goal
                </h2>
                {goal && !isEditing && (
                    <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={() => setIsEditing(true)}>
                        Edit Goal
                    </button>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="number"
                        step="0.1"
                        placeholder="Target weight"
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        required
                        style={{ flex: 1 }}
                    />
                    <button type="submit" className="btn">Save</button>
                </form>
            ) : (
                <p style={{ color: 'var(--text-secondary)' }}>
                    Your current goal is <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{goal.value}</span> lbs. Keep going!
                </p>
            )}
        </div>
    )
}
