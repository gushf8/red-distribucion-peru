import React from 'react';
import { DistributorTrajectory } from '../../types/presentation';

interface TrajectoryBarChartProps {
  trajectory: DistributorTrajectory;
  accentColor: string;
}

export const TrajectoryBarChart: React.FC<TrajectoryBarChartProps> = ({
  trajectory,
  accentColor,
}) => {
  const bars = [
    { label: "Cierre '25", value: trajectory.cierre25, color: '#64748b', isTarget: false },
    { label: "Q3 '25", value: trajectory.q3_25, color: '#3b82f6', isTarget: false },
    { label: "Q3 '26", value: trajectory.q3_26, color: '#0ea5e9', isTarget: false, isHighlight: true },
    { label: "Oct '26", value: trajectory.oct26, color: '#10b981', isTarget: false },
    { label: "Nov '26", value: trajectory.nov26, color: '#059669', isTarget: false },
    { label: "Cierre '26 (Meta)", value: trajectory.cierre26, color: accentColor || '#f59e0b', isTarget: true },
  ];

  const maxValue = Math.max(...bars.map((b) => b.value)) * 1.25;
  const chartHeight = 220;
  const chartWidth = 840;
  const barWidth = 72;
  const startX = 60;
  const spacing = (chartWidth - startX) / bars.length;

  return (
    <div className="svg-chart-container">
      <svg viewBox="0 0 880 330" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="q3Grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Horizontal grid guide lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const y = chartHeight - pct * (chartHeight - 40) + 30;
          const val = Math.round((maxValue * pct) * 10) / 10;
          return (
            <g key={i}>
              <line
                x1={startX - 20}
                y1={y}
                x2={chartWidth + 20}
                y2={y}
                stroke="var(--border-color)"
                strokeDasharray="4 4"
              />
              <text
                x={startX - 28}
                y={y + 4}
                textAnchor="end"
                fontSize="11"
                fill="var(--text-muted)"
              >
                {val}k
              </text>
            </g>
          );
        })}

        {/* Bars and labels */}
        {bars.map((bar, idx) => {
          const x = startX + idx * spacing + (spacing - barWidth) / 2;
          const h = (bar.value / maxValue) * (chartHeight - 40);
          const y = chartHeight + 30 - h;

          return (
            <g key={bar.label}>
              {/* Bar Rect */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={h}
                rx={6}
                fill={bar.isTarget ? 'url(#targetGrad)' : bar.isHighlight ? 'url(#q3Grad)' : bar.color}
                opacity={bar.isTarget ? 1 : 0.85}
              />

              {/* Value on top of bar */}
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                fontSize="14"
                fontWeight="800"
                fill="var(--text-primary)"
              >
                {bar.value}k
              </text>

              {/* Bottom label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight + 52}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={bar.isTarget ? 'var(--accent-amber)' : 'var(--text-secondary)'}
              >
                {bar.label}
              </text>

              {/* Callout pill for Q3 '26 growth */}
              {bar.isHighlight && (
                <g transform={`translate(${x + barWidth / 2 - 50}, ${y - 48})`}>
                  <rect
                    width="100"
                    height="28"
                    rx="14"
                    fill="#10b981"
                    filter="drop-shadow(0 2px 6px rgba(16, 185, 129, 0.4))"
                  />
                  <text
                    x="50"
                    y="18"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="800"
                    fill="#ffffff"
                  >
                    +{trajectory.delta_tons}k TM (+{trajectory.delta_pct}%)
                  </text>
                </g>
              )}

              {/* Milestone badge for Target */}
              {bar.isTarget && (
                <g transform={`translate(${x + barWidth / 2 - 45}, ${y - 44})`}>
                  <rect
                    width="90"
                    height="24"
                    rx="12"
                    fill="#f59e0b"
                    filter="drop-shadow(0 2px 6px rgba(245, 158, 11, 0.4))"
                  />
                  <text
                    x="45"
                    y="16"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="800"
                    fill="#0f172a"
                  >
                    META 2026
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
