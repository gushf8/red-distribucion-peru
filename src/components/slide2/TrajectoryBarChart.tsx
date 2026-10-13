import React from 'react';
import { DistributorTrajectory } from '../../types/presentation';

interface TrajectoryBarChartProps {
  trajectory: DistributorTrajectory;
  subStep: number;
}

export const TrajectoryBarChart: React.FC<TrajectoryBarChartProps> = ({
  trajectory,
  subStep,
}) => {
  const maxAxis = 140;
  const baseY = 415;
  const topY = 60;
  const chartHeight = baseY - topY; // 355px

  const getY = (val: number) => baseY - (val / maxAxis) * chartHeight;
  const getHeight = (val: number) => (val / maxAxis) * chartHeight;

  // 6 Bars configuration mapped to subStep appearance
  // Order: 1: Cierre 2025, 2: Cierre 2026 Meta, 3: Q3 '25, 4: Q3 '26, 5: Oct-26, 6: Nov-26
  const bars = [
    {
      id: 'cierre25',
      label: 'Cierre 2025',
      val: trajectory.cierre25,
      x: 140,
      grad: 'url(#grad-spring-lime)',
      stepRequired: 1,
      colorHex: '#84cc16',
    },
    {
      id: 'q3_25',
      label: "Cierre al Q3 '25",
      val: trajectory.q3_25,
      x: 290,
      grad: 'url(#grad-deep-navy)',
      stepRequired: 3,
      colorHex: '#0f2b48',
    },
    {
      id: 'q3_26',
      label: "Cierre al Q3 '26",
      val: trajectory.q3_26,
      x: 440,
      grad: 'url(#grad-ocean-blue)',
      stepRequired: 4,
      colorHex: '#0284c7',
    },
    {
      id: 'oct26',
      label: 'Oct-26',
      val: trajectory.oct26,
      x: 590,
      grad: 'url(#grad-sky-cyan)',
      stepRequired: 5,
      colorHex: '#38bdf8',
    },
    {
      id: 'nov26',
      label: 'Nov-26',
      val: trajectory.nov26,
      x: 740,
      grad: 'url(#grad-azure-blue)',
      stepRequired: 6,
      colorHex: '#60a5fa',
    },
    {
      id: 'cierre26',
      label: 'Cierre 2026',
      val: trajectory.cierre26,
      x: 890,
      grad: 'url(#grad-emerald-target)',
      stepRequired: 2,
      isTarget: true,
      colorHex: '#22c55e',
    },
  ];

  // Axis steps: 0, 20%, 40%, 60%, 80%, 100%
  const steps = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

  // Coordinates for Delta Callout between Bar Q3 '25 (x: 290) and Bar Q3 '26 (x: 440)
  const bar2Top = getY(trajectory.q3_25); // ~227
  const bar3Top = getY(trajectory.q3_26); // ~212
  // Callout Box placed well above with NO overlap over the numbers 74 or 80
  const calloutBoxY = 118;

  const showDeltaCallout = subStep >= 4;

  return (
    <div className="chart-canvas-area-clean">
      <svg
        id="trajectory-svg-clean"
        viewBox="0 0 1100 480"
        xmlns="http://www.w3.org/2000/svg"
        className="trajectory-svg-element"
      >
        <defs>
          {/* Luminous Spring Lime (Bar 1) */}
          <linearGradient id="grad-spring-lime" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a3e635" />
            <stop offset="60%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>

          {/* Deep Corporate Navy (Bar 2) */}
          <linearGradient id="grad-deep-navy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="70%" stopColor="#0f2b48" />
            <stop offset="100%" stopColor="#071530" />
          </linearGradient>

          {/* Oceanic Corporate Blue (Bar 3) */}
          <linearGradient id="grad-ocean-blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="70%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          {/* Sky Cyan (Bar 4) */}
          <linearGradient id="grad-sky-cyan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="70%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Azure Blue (Bar 5) */}
          <linearGradient id="grad-azure-blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="70%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>

          {/* Emerald Goal Green (Bar 6 Meta) */}
          <linearGradient id="grad-emerald-target" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>

          <filter id="clean-card-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#071530" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Y Axis Title */}
        <text
          x="35"
          y="235"
          transform="rotate(-90 35 235)"
          className="axis-y-label-clean"
        >
          Miles de Toneladas (K Tons)
        </text>

        {/* Horizontal Grid lines */}
        {steps.map((pct, idx) => {
          const val = Math.round(maxAxis * pct);
          const y = baseY - pct * chartHeight;
          return (
            <g key={idx}>
              <line
                x1="90"
                y1={y}
                x2="1050"
                y2={y}
                className={idx === 0 ? 'axis-baseline' : 'grid-line-clean'}
                stroke={idx === 0 ? 'var(--text-title)' : undefined}
                strokeWidth={idx === 0 ? 1.8 : 1}
                opacity={idx === 0 ? 0.7 : undefined}
              />
              <text x="80" y={y + 5} className="axis-y-text-clean">
                {val}
              </text>
            </g>
          );
        })}

        {/* 6 BARS */}
        {bars.map((bar) => {
          const isVisible = subStep >= bar.stepRequired;
          const h = isVisible ? getHeight(bar.val) : 0;
          const y = isVisible ? getY(bar.val) : baseY;
          const centerX = bar.x + 45;

          return (
            <g
              key={bar.id}
              className={`bar-group-clean ${isVisible ? 'is-bar-visible' : 'is-bar-hidden'}`}
              style={{
                transition: 'opacity 0.4s ease',
                opacity: isVisible ? 1 : 0.08,
              }}
            >
              {/* Ghost baseline placeholder when bar is not yet revealed */}
              {!isVisible && (
                <rect
                  x={bar.x}
                  y={baseY - 4}
                  width="90"
                  height="4"
                  rx="2"
                  fill="rgba(100, 116, 139, 0.25)"
                />
              )}

              {/* Main Bar Rectangle */}
              <rect
                className="chart-bar-rect-clean"
                x={bar.x}
                y={y}
                width="90"
                height={h}
                fill={bar.grad}
                style={{
                  transition: 'y 0.6s cubic-bezier(0.16, 1, 0.3, 1), height 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Value Text Above Bar (Clean, spacious, NO overlapping buttons) */}
              {isVisible && (
                <text
                  className="bar-value-text-clean"
                  x={centerX}
                  y={y - 14}
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                  }}
                >
                  {bar.val}
                </text>
              )}

              {/* X Axis Label Below Baseline */}
              <text
                className="axis-x-label-clean"
                x={centerX}
                y="442"
                style={{
                  fill: bar.isTarget ? '#16a34a' : isVisible ? 'var(--text-title)' : 'var(--text-muted)',
                  fontWeight: isVisible ? 800 : 600,
                  transition: 'fill 0.3s ease',
                }}
              >
                {bar.label}
              </text>
            </g>
          );
        })}

        {/* Delta Callout Box (+6 Mil Tons / +8.1%) - Elevated to avoid touching numbers 74 and 80 */}
        <g
          className="delta-callout-clean"
          style={{
            opacity: showDeltaCallout ? 1 : 0,
            pointerEvents: showDeltaCallout ? 'auto' : 'none',
            transform: showDeltaCallout ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Connector Path from Bar 2 to Callout to Bar 3 */}
          <path
            d={`M 335,${bar2Top - 28} L 410,${calloutBoxY + 54} L 485,${bar3Top - 28}`}
            fill="none"
            stroke="var(--text-title)"
            strokeWidth="1.8"
            strokeDasharray="4 3"
            opacity="0.6"
          />

          {/* Floating Glass Pill Callout */}
          <rect
            x="345"
            y={calloutBoxY}
            width="130"
            height="50"
            rx="12"
            fill="var(--card-bg)"
            stroke="#0284c7"
            strokeWidth="1.6"
            filter="url(#clean-card-shadow)"
          />

          <text
            x="410"
            y={calloutBoxY + 21}
            fontFamily="Outfit, sans-serif"
            fontSize="13.5"
            fontWeight="900"
            fill="var(--text-title)"
            textAnchor="middle"
          >
            + {trajectory.delta_tons} Mil Tons
          </text>
          <text
            x="410"
            y={calloutBoxY + 40}
            fontFamily="Outfit, sans-serif"
            fontSize="13"
            fontWeight="900"
            fill="#059669"
            textAnchor="middle"
          >
            + {trajectory.delta_pct}%
          </text>
        </g>
      </svg>

    </div>
  );
};
