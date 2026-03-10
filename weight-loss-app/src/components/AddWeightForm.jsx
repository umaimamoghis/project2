import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function AddWeightForm({ onAdd }) {
    const [weight, setWeight] = useState('')
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!weight || !date) return

        onAdd({
            id: crypto.randomUUID(),
            value: parseFloat(weight),
            date: date
        })

        setWeight('')
    }

    return (
        <div className="glass-card">
            <h2 className="card-header">Log Weight</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group flex-row">
                    <div style={{ flex: 1 }}>
                        <label>Weight (lbs)</label>
                        <input
                            type="number"
                            step="0.1"
                            required
                            placeholder="150.5"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>Date</label>
                        <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className="btn" style={{ width: '100%', marginTop: '0.5rem' }}>
                    <Plus size={18} /> Add Entry
                </button>
            </form>
        </div>
    )
}
