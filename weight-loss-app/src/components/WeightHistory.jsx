import { Trash2, TrendingDown, TrendingUp, Minus } from 'lucide-react'

export default function WeightHistory({ weights, onDelete }) {
    if (weights.length === 0) {
        return null
    }

    // Sort weights by date descending for History View
    const sortedWeights = [...weights].sort((a, b) => new Date(b.date) - new Date(a.date))

    return (
        <div className="glass-card">
            <h2 className="card-header">History</h2>
            <div className="list-container">
                {sortedWeights.map((w, index) => {
                    const isLatest = index === 0;
                    const prevWeight = sortedWeights[index + 1]; // Previous chronological weight is next in descending array

                    let trendIcon = <Minus size={14} className="trend-flat" />

                    if (prevWeight) {
                        if (w.value < prevWeight.value) {
                            trendIcon = <TrendingDown size={14} className="trend-down" />
                        } else if (w.value > prevWeight.value) {
                            trendIcon = <TrendingUp size={14} className="trend-up" />
                        }
                    }

                    return (
                        <div className="history-item" key={w.id}>
                            <div className="history-date">
                                {new Date(w.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                {isLatest && <span style={{ marginLeft: '8px', fontSize: '0.7rem', padding: '2px 6px', background: 'var(--primary)', color: 'white', borderRadius: '12px' }}>Latest</span>}
                            </div>
                            <div className="history-weight">
                                {trendIcon}
                                <span>{w.value} lbs</span>
                                <button
                                    onClick={() => onDelete(w.id)}
                                    style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', marginLeft: '0.5rem', opacity: 0.7 }}
                                    title="Delete entry"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
