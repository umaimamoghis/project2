import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'

export default function Dashboard({ weights, goal }) {
    if (weights.length === 0) {
        return (
            <div className="glass-card">
                <h2 className="card-header">Dashboard</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Add your first weight entry to see your progress chart!</p>
            </div>
        )
    }

    // Calculate stats
    const currentWeight = weights[weights.length - 1].value
    const startingWeight = weights[0].value
    const totalLost = startingWeight - currentWeight

    // Format data for Recharts
    const chartData = weights.map(w => {
        const d = new Date(w.date)
        return {
            name: `${d.getMonth() + 1}/${d.getDate()}`,
            weight: parseFloat(w.value)
        }
    })

    // Y-axis bounds
    const minW = Math.min(...chartData.map(d => d.weight))
    const maxW = Math.max(...chartData.map(d => d.weight))
    const domainMin = goal ? Math.min(minW, goal.value) - 2 : minW - 2
    const domainMax = Math.max(maxW, startingWeight) + 2

    return (
        <div className="glass-card" style={{ flex: '1' }}>
            <div className="card-header">
                <h2>Dashboard</h2>
                {totalLost > 0 ? (
                    <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <TrendingDown size={18} /> {totalLost.toFixed(1)} lbs lost
                    </span>
                ) : totalLost < 0 ? (
                    <span style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <TrendingUp size={18} /> {Math.abs(totalLost).toFixed(1)} lbs gained
                    </span>
                ) : (
                    <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Minus size={18} /> No change
                    </span>
                )}
            </div>

            <div className="stat-grid">
                <div className="stat-box">
                    <div className="stat-value">{currentWeight}</div>
                    <div className="stat-label">Current Weight</div>
                </div>
                <div className="stat-box">
                    <div className="stat-value">{startingWeight}</div>
                    <div className="stat-label">Starting Weight</div>
                </div>
                <div className="stat-box">
                    <div className="stat-value" style={{ color: goal ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {goal ? goal.value : '--'}
                    </div>
                    <div className="stat-label">Goal Weight</div>
                </div>
            </div>

            <div style={{ width: '100%', height: 250, marginTop: '2rem' }}>
                <ResponsiveContainer>
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" vertical={false} />
                        <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                        <YAxis domain={[domainMin, domainMax]} stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--surface-border)', borderRadius: '8px' }}
                            itemStyle={{ color: 'var(--primary)' }}
                        />
                        {goal && (
                            <ReferenceLine y={goal.value} stroke="var(--secondary)" strokeDasharray="3 3" label={{ position: 'right', fill: 'var(--secondary)', fontSize: 12, value: 'Goal' }} />
                        )}
                        <Line type="monotone" dataKey="weight" stroke="var(--primary)" strokeWidth={3} dot={{ fill: 'var(--background)', stroke: 'var(--primary)', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: 'var(--secondary)', stroke: 'none' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
