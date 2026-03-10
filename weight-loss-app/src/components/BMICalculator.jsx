import { useState } from 'react'
import { Ruler } from 'lucide-react'

export default function BMICalculator({ height, setHeight, currentWeight }) {
    const [val, setVal] = useState(height || '')
    const [isEditing, setIsEditing] = useState(!height)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!val) return
        setHeight(parseFloat(val))
        setIsEditing(false)
    }

    // Calculate BMI: weight (lb) / [height (in)]2 x 703
    let bmi = null
    let category = ''
    let categoryColor = 'var(--text-secondary)'

    if (height && currentWeight) {
        bmi = (currentWeight / (height * height)) * 703

        if (bmi < 18.5) {
            category = 'Underweight'
            categoryColor = '#3b82f6' // blue
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Normal'
            categoryColor = 'var(--success)'
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight'
            categoryColor = '#eab308' // yellow
        } else {
            category = 'Obese'
            categoryColor = 'var(--danger)'
        }
    }

    return (
        <div className="glass-card">
            <div className="card-header">
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Ruler size={20} color="var(--primary)" />
                    BMI Calculator
                </h2>
                {height && !isEditing && (
                    <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={() => setIsEditing(true)}>
                        Edit Height
                    </button>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="number"
                        step="0.1"
                        placeholder="Height in inches (e.g. 70)"
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        required
                        style={{ flex: 1 }}
                    />
                    <button type="submit" className="btn">Save</button>
                </form>
            ) : (
                <div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Height: <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{height}"</span>
                    </p>

                    {bmi ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--stat-box-bg)', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
                            <div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current BMI</p>
                                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{bmi.toFixed(1)}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '999px', background: `${categoryColor}20`, color: categoryColor, fontWeight: '600', fontSize: '0.875rem' }}>
                                    {category}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-secondary)' }}>Add your height and a weight entry to calculate BMI.</p>
                    )}
                </div>
            )}
        </div>
    )
}
