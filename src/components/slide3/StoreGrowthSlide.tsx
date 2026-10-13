import React, { useState } from 'react';
import { STORE_GROWTH_DATA, POSITIVE_STORES, NEGATIVE_STORES, AVG_GROWTH } from '../../data/storeGrowth';
import { StoreGrowthItem } from '../../data/storeGrowth';
import { TrendingUp, Award, AlertTriangle } from 'lucide-react';

export const StoreGrowthSlide: React.FC = () => {
  const [hoveredStore, setHoveredStore] = useState<StoreGrowthItem | null>(null);

  // SVG Geometry constants
  const svgWidth = 1100;
  const svgHeight = 520;
  const zeroX = 728; // X position for 0%
  const pxPerPct = 13.6; // 680px for 50% (-30% to +20%)
  const startY = 72;
  const rowHeight = 27;
  const barThickness = 17;
  const axisY = startY + STORE_GROWTH_DATA.length * rowHeight + 10; // ~460px

  const ticks = [
    { pct: -30, x: zeroX - 30 * pxPerPct, label: '-30%' },
    { pct: -20, x: zeroX - 20 * pxPerPct, label: '-20%' },
    { pct: -10, x: zeroX - 10 * pxPerPct, label: '-10%' },
    { pct: 0, x: zeroX, label: '0%' },
    { pct: 10, x: zeroX + 10 * pxPerPct, label: '10%' },
    { pct: 20, x: zeroX + 20 * pxPerPct, label: '20%' },
  ];

  return (
    <main className="deck-grid-slide3">
      <section className="growth-chart-card-full">
        {/* TOP TITLE BAR */}
        <div className="growth-top-bar">
          <div className="growth-header-titles">
            <div className="growth-main-title">
              <TrendingUp size={25} style={{ color: '#0284c7' }} />
              <span>El reto de la gerencia distribuidores</span>
            </div>
            <div className="growth-sub-tag-row">
              <span className="growth-sub-tag">Lo construimos juntos</span>
              <span className="bullet-sep">•</span>
              <span className="growth-sub-meta">Desempeño y Crecimiento por Tienda</span>
            </div>
          </div>

          {/* KPI HIGHLIGHT PILLS */}
          <div className="growth-kpi-cluster">
            <div className="growth-pill-badge pill-growth-avg" title="Promedio ponderado nacional">
              <TrendingUp size={14} />
              <span>Promedio: <strong>+{AVG_GROWTH}%</strong></span>
            </div>
            <div className="growth-pill-badge pill-growth-positive" title="Tiendas con desempeño positivo">
              <Award size={14} />
              <span>{POSITIVE_STORES} en Crecimiento</span>
            </div>
            <div className="growth-pill-badge pill-growth-negative" title="Tiendas en retroceso">
              <AlertTriangle size={14} />
              <span>{NEGATIVE_STORES} en Contracción</span>
            </div>
          </div>
        </div>

        {/* SVG HORIZONTAL DIVERGENT BAR CHART */}
        <div className="growth-canvas-area">
          <svg
            id="growth-svg"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            xmlns="http://www.w3.org/2000/svg"
            className="growth-svg-element"
          >
            <defs>
              {/* Green Gradients for Positive Bars */}
              <linearGradient id="grad-green-high" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="grad-green-mid" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="grad-green-mod" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
              <linearGradient id="grad-green-low" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>

              {/* Red Gradients for Negative Bars */}
              <linearGradient id="grad-red-low" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="100%" stopColor="#f87171" />
              </linearGradient>
              <linearGradient id="grad-red-mid" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <linearGradient id="grad-red-high" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>

            {/* In-chart Title and Subtitle matching original PPT */}
            <text
              x="135"
              y="32"
              fontFamily="Outfit, sans-serif"
              fontSize="21"
              fontWeight="900"
              fill="var(--text-title)"
              letterSpacing="-0.3px"
            >
              Crecimiento por Tienda
            </text>
            <text
              x="135"
              y="50"
              fontFamily="Outfit, sans-serif"
              fontSize="12.5"
              fontWeight="600"
              fill="var(--text-muted)"
            >
              Variación % vs. periodo anterior
            </text>

            {/* Vertical Grid lines */}
            {ticks.map((t) => (
              <g key={t.pct}>
                <line
                  x1={t.x}
                  y1={startY - 10}
                  x2={t.x}
                  y2={axisY}
                  className="growth-grid-line"
                  strokeWidth={t.pct === 0 ? 1.6 : 1}
                  strokeDasharray={t.pct === 0 ? 'none' : '4 4'}
                  opacity={t.pct === 0 ? 0.65 : 0.4}
                />
                <text
                  x={t.x}
                  y={axisY + 18}
                  className="growth-axis-text"
                >
                  {t.label}
                </text>
              </g>
            ))}

            {/* X Axis Baseline Line */}
            <line
              x1={ticks[0].x}
              y1={axisY}
              x2={ticks[ticks.length - 1].x}
              y2={axisY}
              stroke="var(--text-title)"
              strokeWidth="1.6"
              opacity="0.65"
            />

            {/* X Axis Title below ticks */}
            <text
              x={zeroX}
              y={axisY + 38}
              className="growth-axis-title"
            >
              Variación %
            </text>

            {/* 14 STORE ROWS */}
            {STORE_GROWTH_DATA.map((item, idx) => {
              const y = startY + idx * rowHeight;
              const isHovered = hoveredStore?.id === item.id;

              // Color assignment based on growth tier
              let barGrad = 'url(#grad-green-mod)';
              if (item.growth >= 14) barGrad = 'url(#grad-green-high)';
              else if (item.growth >= 10) barGrad = 'url(#grad-green-mid)';
              else if (item.growth >= 8) barGrad = 'url(#grad-green-mod)';
              else if (item.growth > 0) barGrad = 'url(#grad-green-low)';
              else if (item.growth === -1) barGrad = 'url(#grad-red-low)';
              else if (item.growth === -5) barGrad = 'url(#grad-red-mid)';
              else if (item.growth <= -20) barGrad = 'url(#grad-red-high)';

              const barWidth = Math.abs(item.growth) * pxPerPct;
              const barX = item.growth >= 0 ? zeroX : zeroX - barWidth;

              return (
                <g
                  key={item.id}
                  className="growth-row-group"
                  onMouseEnter={() => setHoveredStore(item)}
                  onMouseLeave={() => setHoveredStore(null)}
                  opacity={hoveredStore && !isHovered ? 0.5 : 1}
                >
                  {/* Subtle row highlight */}
                  {isHovered && (
                    <rect
                      x="100"
                      y={y - 4}
                      width="920"
                      height={rowHeight}
                      rx="6"
                      fill="rgba(2, 132, 199, 0.06)"
                    />
                  )}

                  {/* Store Name Label on Left (Right-aligned) */}
                  <text
                    x="295"
                    y={y + 13}
                    className="growth-store-label"
                    style={{
                      fill: isHovered ? 'var(--accent-blue)' : undefined,
                      fontWeight: isHovered ? 800 : 700,
                    }}
                  >
                    {item.store}
                  </text>

                  {/* Horizontal Bar Rectangle */}
                  {item.growth !== 0 && (
                    <rect
                      className="growth-bar-rect"
                      x={barX}
                      y={y}
                      width={barWidth}
                      height={barThickness}
                      fill={barGrad}
                      rx="3"
                    />
                  )}

                  {/* Percentage Value Label */}
                  <text
                    className="growth-val-label"
                    x={item.growth >= 0 ? zeroX + barWidth + 8 : barX - 8}
                    y={y + 13}
                    textAnchor={item.growth >= 0 ? 'start' : 'end'}
                    fill={item.growth >= 0 ? '#059669' : '#e11d48'}
                  >
                    {item.growth > 0 ? `${item.growth}%` : `${item.growth}%`}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </section>
    </main>
  );
};
