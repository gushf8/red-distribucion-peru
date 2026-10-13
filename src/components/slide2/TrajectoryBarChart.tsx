import React from 'react';
import { DistributorTrajectory } from '../../types/presentation';
import { Flag } from 'lucide-react';

interface TrajectoryBarChartProps {
  trajectory: DistributorTrajectory;
  isNational: boolean;
}

export const TrajectoryBarChart: React.FC<TrajectoryBarChartProps> = ({
  trajectory,
  isNational,
}) => {
  // Determine scale
  const rawMax = Math.max(
    trajectory.cierre25,
    trajectory.q3_25,
    trajectory.q3_26,
    trajectory.oct26,
    trajectory.nov26,
    trajectory.cierre26
  );

  const maxAxis = isNational ? 140 : Math.ceil((rawMax * 1.25) / 5) * 5;
  const baseY = 410;
  const topY = 60;
  const chartHeight = baseY - topY; // 350

  const getY = (val: number) => baseY - (val / maxAxis) * chartHeight;
  const getHeight = (val: number) => (val / maxAxis) * chartHeight;

  // 6 Bars config
  const bars = [
    { label: 'Cierre 2025', val: trajectory.cierre25, x: 120, grad: 'url(#grad-bar-green)' },
    { label: "Cierre al Q3 '25", val: trajectory.q3_25, x: 245, grad: 'url(#grad-bar-darknavy)' },
    { label: "Cierre al Q3 '26", val: trajectory.q3_26, x: 370, grad: 'url(#grad-bar-medblue)' },
    { label: 'Oct-26', val: trajectory.oct26, x: 495, grad: 'url(#grad-bar-skyblue1)' },
    { label: 'Nov-26', val: trajectory.nov26, x: 620, grad: 'url(#grad-bar-skyblue2)' },
    { label: 'Cierre 2026', val: trajectory.cierre26, x: 745, grad: 'url(#grad-bar-targetgreen)', isTarget: true },
  ];

  // Axis steps (7 ticks: 0, 1/6, 2/6... 1)
  const steps = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

  // Callout coordinates between Bar 2 (x: 285) and Bar 3 (x: 410)
  const bar2Top = getY(trajectory.q3_25);
  const bar3Top = getY(trajectory.q3_26);
  const calloutBoxY = Math.min(bar2Top, bar3Top) - 65;

  return (
    <div className="chart-canvas-area">
      <svg id="trajectory-svg" viewBox="0 0 920 480" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-bar-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a8d38d" />
            <stop offset="100%" stopColor="#84b865" />
          </linearGradient>

          <linearGradient id="grad-bar-darknavy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#143c68" />
            <stop offset="100%" stopColor="#0a2342" />
          </linearGradient>

          <linearGradient id="grad-bar-medblue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1b6ca8" />
            <stop offset="100%" stopColor="#104e7a" />
          </linearGradient>

          <linearGradient id="grad-bar-skyblue1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#549fd6" />
            <stop offset="100%" stopColor="#3b82b6" />
          </linearGradient>

          <linearGradient id="grad-bar-skyblue2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6bafe2" />
            <stop offset="100%" stopColor="#4e92c4" />
          </linearGradient>

          <linearGradient id="grad-bar-targetgreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b2db97" />
            <stop offset="100%" stopColor="#8fc471" />
          </linearGradient>

          <filter id="callout-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.18" />
          </filter>
        </defs>

        <text x="35" y="240" transform="rotate(-90 35 240)" className="axis-y-label">
          Miles de Toneladas
        </text>

        {/* Grid lines */}
        {steps.map((pct, idx) => {
          const val = Math.round(maxAxis * pct * 10) / 10;
          const y = baseY - pct * chartHeight;
          return (
            <g key={idx}>
              <line
                x1="85"
                y1={y}
                x2="890"
                y2={y}
                className={idx === 0 ? undefined : 'grid-line'}
                stroke={idx === 0 ? 'var(--text-title)' : undefined}
                strokeWidth={idx === 0 ? 1.8 : undefined}
                opacity={idx === 0 ? 0.6 : undefined}
              />
              <text x="75" y={y + 5} className="axis-y-text">
                {val}
              </text>
            </g>
          );
        })}

        {/* 6 Bars */}
        {bars.map((bar) => {
          const h = getHeight(bar.val);
          const y = getY(bar.val);
          const centerX = bar.x + 40;

          return (
            <g key={bar.label} className="bar-group">
              <rect
                className="chart-bar-rect"
                x={bar.x}
                y={y}
                width="80"
                height={h}
                fill={bar.grad}
              />
              <text className="bar-value-text" x={centerX} y={y - 12}>
                {bar.val}
              </text>
              <text
                className="axis-x-label"
                x={centerX}
                y="438"
                style={{ fill: bar.isTarget ? '#15803d' : undefined }}
              >
                {bar.label}
              </text>
            </g>
          );
        })}

        {/* Delta Callout Box */}
        <g className="delta-callout-bubble">
          <path
            d={`M 285,${bar2Top - 15} L 348,${calloutBoxY + 50} L 410,${bar3Top - 15}`}
            fill="none"
            stroke="var(--text-title)"
            strokeWidth="1.6"
            opacity="0.65"
          />
          <rect
            x="290"
            y={calloutBoxY}
            width="120"
            height="46"
            rx="8"
            fill="var(--card-bg)"
            stroke="#0284c7"
            strokeWidth="1.4"
            filter="url(#callout-shadow)"
          />
          <text
            x="350"
            y={calloutBoxY + 19}
            fontFamily="Outfit, sans-serif"
            fontSize="12.5"
            fontWeight="900"
            fill="var(--text-title)"
            textAnchor="middle"
          >
            + {trajectory.delta_tons} Mil Tons
          </text>
          <text
            x="350"
            y={calloutBoxY + 36}
            fontFamily="Outfit, sans-serif"
            fontSize="12"
            fontWeight="800"
            fill="#059669"
            textAnchor="middle"
          >
            + {trajectory.delta_pct}%
          </text>
        </g>
      </svg>

      {/* Target Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '24px',
          background: 'var(--glass-badge-bg)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(21, 128, 61, 0.3)',
          borderRadius: '12px',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(21, 128, 61, 0.15)',
            color: '#15803d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Flag size={16} />
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#15803d' }}>
            Meta Anual 2026
          </div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
            {trajectory.cierre26}K Tons Proyectadas
          </div>
        </div>
      </div>
    </div>
  );
};
