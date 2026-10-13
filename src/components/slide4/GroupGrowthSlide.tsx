import React, { useState, useEffect, useCallback } from 'react';
import {
  GROUP_GROWTH_DATA,
  TOTAL_GROUP_DATA,
  TOTAL_GROUPS_COUNT,
  LEADER_GROUP,
  EXCEL_TABLE_DATA,
} from '../../data/groupGrowth';
import { TrendingUp, Award, CheckCircle2, RefreshCw } from 'lucide-react';

interface GroupGrowthSlideProps {
  isActive?: boolean;
}

export const GroupGrowthSlide: React.FC<GroupGrowthSlideProps> = ({ isActive = true }) => {
  const [hoveredGroupId, setHoveredGroupId] = useState<string | null>(null);
  const [isHoveredTotal, setIsHoveredTotal] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [cycleCount, setCycleCount] = useState<number>(0);

  // Trigger cascade on slide entry and every 10 seconds
  const triggerCascade = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsAnimating(true);
      setCycleCount((prev) => prev + 1);
    }, 60);
  }, []);

  useEffect(() => {
    if (!isActive) {
      setIsAnimating(false);
      return;
    }

    triggerCascade();

    const interval = setInterval(() => {
      triggerCascade();
    }, 10000);

    return () => clearInterval(interval);
  }, [isActive, triggerCascade]);

  // SVG Geometry constants
  const svgWidth = 730;
  const svgHeight = 470;
  const zeroX = 135; // X position for 0%
  const maxPct = 30;
  const chartWidth = 550;
  const pxPerPct = chartWidth / maxPct; // 18.33px per 1%
  const startY = 46;
  const rowHeight = 31;
  const barThickness = 19;
  const sepY = startY + GROUP_GROWTH_DATA.length * rowHeight + 5; // Separator before Total
  const totalY = sepY + 14;
  const axisY = totalY + rowHeight + 14; // Baseline for X axis

  const ticks = [0, 5, 10, 15, 20, 25, 30].map((pct) => ({
    pct,
    x: zeroX + pct * pxPerPct,
    label: `${pct}%`,
  }));

  return (
    <main className="deck-grid-slide4">
      <section className="group-growth-card-full">
        {/* TOP TITLE BAR */}
        <div className="group-top-bar">
          <div className="group-header-titles">
            <div className="group-main-title">
              <TrendingUp size={25} style={{ color: '#059669' }} />
              <span>El reto de la gerencia distribuidores</span>
            </div>
            <div className="group-sub-tag-row">
              <span className="group-sub-tag">Lo construimos juntos</span>
              <span className="bullet-sep">•</span>
              <span className="group-sub-meta">Desempeño y Crecimiento YTD por Grupo</span>
            </div>
          </div>

          {/* KPI HIGHLIGHT PILLS & REPLAY CONTROLLER */}
          <div className="group-kpi-cluster">
            <button
              className="btn-replay-cascade"
              onClick={triggerCascade}
              title="Repetir flujo de animación de barras (Autoreproduce cada 10s)"
            >
              <RefreshCw size={13} className={!isAnimating ? 'spin-fast' : ''} />
              <span>Flujo 10s ({cycleCount > 0 ? `#${cycleCount}` : 'Activo'})</span>
            </button>

            <div className="growth-pill-badge pill-group-total" title="Promedio ponderado total red">
              <TrendingUp size={14} />
              <span>
                Total Red: <strong>+{TOTAL_GROUP_DATA.growth}%</strong>
              </span>
            </div>

            <div className="growth-pill-badge pill-group-leader" title="Grupo líder en expansión">
              <Award size={14} />
              <span>
                Líder: <strong>{LEADER_GROUP.group} (+{LEADER_GROUP.growth}%)</strong>
              </span>
            </div>

            <div className="growth-pill-badge pill-group-count" title="Grupos con desempeño positivo">
              <CheckCircle2 size={14} />
              <span>
                <strong>{TOTAL_GROUPS_COUNT}/{TOTAL_GROUPS_COUNT}</strong> en Crecimiento
              </span>
            </div>
          </div>
        </div>

        {/* DUAL SPLIT: HORIZONTAL CHART (LEFT) + EXACT EXCEL TABLE (RIGHT) */}
        <div className="group-content-split">
          {/* LEFT: SVG HORIZONTAL BAR CHART */}
          <div className="group-chart-canvas-wrap">
            <svg
              id="group-svg"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              xmlns="http://www.w3.org/2000/svg"
              className="group-svg-element"
            >
              <defs>
                <linearGradient id="grad-green-leader" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>

                <linearGradient id="grad-green-tier2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>

                <linearGradient id="grad-green-tier3" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>

                <linearGradient id="grad-green-tier4" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>

                <linearGradient id="grad-total-navy" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>

              {/* In-chart Title */}
              <text
                x={zeroX}
                y="26"
                fontFamily="Outfit, sans-serif"
                fontSize="17"
                fontWeight="900"
                fill="var(--text-title)"
                letterSpacing="-0.3px"
              >
                Crecimiento YTD por grupo
              </text>

              {/* Vertical Gridlines & Ticks */}
              {ticks.map((t) => (
                <g key={t.pct}>
                  <line
                    x1={t.x}
                    y1={startY - 6}
                    x2={t.x}
                    y2={axisY}
                    className="group-grid-line"
                    strokeWidth={t.pct === 0 ? 1.6 : 1}
                    strokeDasharray={t.pct === 0 ? 'none' : '4 4'}
                    opacity={t.pct === 0 ? 0.7 : 0.45}
                  />
                  <text x={t.x} y={axisY + 16} className="group-axis-text">
                    {t.label}
                  </text>
                </g>
              ))}

              {/* X Axis Baseline */}
              <line
                x1={ticks[0].x}
                y1={axisY}
                x2={ticks[ticks.length - 1].x}
                y2={axisY}
                stroke="var(--text-title)"
                strokeWidth="1.6"
                opacity="0.65"
              />

              {/* X Axis Title */}
              <text
                x={zeroX + chartWidth / 2}
                y={axisY + 33}
                className="group-axis-title"
              >
                Crecimiento (%)
              </text>

              {/* 9 GROUP ROWS (TOP TO BOTTOM CASCADE) */}
              {GROUP_GROWTH_DATA.map((item, idx) => {
                const y = startY + idx * rowHeight;
                const isHovered = hoveredGroupId === item.id;
                const delayMs = idx * 80;

                let barGrad = 'url(#grad-green-tier3)';
                if (item.growth >= 20) barGrad = 'url(#grad-green-leader)';
                else if (item.growth >= 9) barGrad = 'url(#grad-green-tier2)';
                else if (item.growth === 8) barGrad = 'url(#grad-green-tier3)';
                else barGrad = 'url(#grad-green-tier4)';

                const barWidth = item.growth * pxPerPct;

                return (
                  <g
                    key={item.id}
                    className="group-row-group"
                    onMouseEnter={() => setHoveredGroupId(item.id)}
                    onMouseLeave={() => setHoveredGroupId(null)}
                    opacity={hoveredGroupId && !isHovered ? 0.45 : 1}
                  >
                    {isHovered && (
                      <rect
                        x="20"
                        y={y - 3}
                        width={svgWidth - 30}
                        height={rowHeight}
                        rx="6"
                        fill="rgba(5, 150, 105, 0.08)"
                      />
                    )}

                    {/* Group Name Label */}
                    <text
                      x={zeroX - 12}
                      y={y + 14}
                      textAnchor="end"
                      className="group-name-label"
                      style={{
                        fill: isHovered ? '#059669' : undefined,
                        opacity: isAnimating ? 1 : 0.35,
                        transition: isAnimating ? `opacity 0.3s ease ${delayMs}ms` : 'none',
                      }}
                    >
                      {item.group}
                    </text>

                    {/* Horizontal Bar Rectangle */}
                    <rect
                      x={zeroX}
                      y={y}
                      width={barWidth}
                      height={barThickness}
                      fill={barGrad}
                      rx="4"
                      style={{
                        transformOrigin: `${zeroX}px ${y + barThickness / 2}px`,
                        transform: isAnimating ? 'scaleX(1)' : 'scaleX(0)',
                        opacity: isAnimating ? 1 : 0,
                        transition: isAnimating
                          ? `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, opacity 0.25s ease ${delayMs}ms`
                          : 'none',
                      }}
                    />

                    {/* Percentage Value Label */}
                    <text
                      className="group-val-label"
                      x={zeroX + barWidth + 8}
                      y={y + 14}
                      textAnchor="start"
                      fill={isHovered ? '#047857' : '#059669'}
                      style={{
                        opacity: isAnimating ? 1 : 0,
                        transform: isAnimating ? 'translateX(0)' : 'translateX(-8px)',
                        transition: isAnimating
                          ? `opacity 0.35s ease ${delayMs + 200}ms, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs + 200}ms`
                          : 'none',
                      }}
                    >
                      {item.growth}%
                    </text>
                  </g>
                );
              })}

              {/* DIVIDER LINE BEFORE TOTAL ROW */}
              <line
                x1="20"
                y1={sepY}
                x2={ticks[ticks.length - 1].x}
                y2={sepY}
                stroke="rgba(148, 163, 184, 0.4)"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />

              {/* TOTAL ROW (DARK NAVY / SLATE BAR) */}
              {(() => {
                const totalBarWidth = TOTAL_GROUP_DATA.growth * pxPerPct;
                const delayMs = GROUP_GROWTH_DATA.length * 80 + 100;

                return (
                  <g
                    className="group-row-group"
                    onMouseEnter={() => setIsHoveredTotal(true)}
                    onMouseLeave={() => setIsHoveredTotal(false)}
                    opacity={hoveredGroupId ? 0.45 : 1}
                  >
                    {isHoveredTotal && (
                      <rect
                        x="20"
                        y={totalY - 3}
                        width={svgWidth - 30}
                        height={rowHeight}
                        rx="6"
                        fill="rgba(15, 23, 42, 0.08)"
                      />
                    )}

                    <text
                      x={zeroX - 12}
                      y={totalY + 14}
                      textAnchor="end"
                      className="group-name-label"
                      style={{
                        fontWeight: 900,
                        fill: isHoveredTotal ? 'var(--text-title)' : 'var(--text-title)',
                      }}
                    >
                      {TOTAL_GROUP_DATA.group}
                    </text>

                    <rect
                      x={zeroX}
                      y={totalY}
                      width={totalBarWidth}
                      height={barThickness}
                      fill="url(#grad-total-navy)"
                      rx="4"
                      style={{
                        transformOrigin: `${zeroX}px ${totalY + barThickness / 2}px`,
                        transform: isAnimating ? 'scaleX(1)' : 'scaleX(0)',
                        opacity: isAnimating ? 1 : 0,
                        transition: isAnimating
                          ? `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, opacity 0.25s ease ${delayMs}ms`
                          : 'none',
                      }}
                    />

                    <text
                      className="group-val-label"
                      x={zeroX + totalBarWidth + 8}
                      y={totalY + 14}
                      textAnchor="start"
                      fill="var(--text-title)"
                      style={{
                        fontWeight: 900,
                        opacity: isAnimating ? 1 : 0,
                        transform: isAnimating ? 'translateX(0)' : 'translateX(-8px)',
                        transition: isAnimating
                          ? `opacity 0.35s ease ${delayMs + 200}ms, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs + 200}ms`
                          : 'none',
                      }}
                    >
                      {TOTAL_GROUP_DATA.growth}%
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* RIGHT: EXACT EXCEL TABLE FROM IMAGE (Grupo | Crec YTD) */}
          <div className="group-excel-panel">
            <div className="excel-table-card">
              {/* Main Native Table with Peach Header */}
              <table className="excel-native-table">
                <thead>
                  <tr>
                    <th className="th-left">Grupo</th>
                    <th className="th-right">Crec YTD</th>
                  </tr>
                </thead>
                <tbody>
                  {EXCEL_TABLE_DATA.map((row) => {
                    const isTotal = row.isTotal;
                    const isHovered = hoveredGroupId === row.id || (isTotal && isHoveredTotal);

                    if (isTotal) {
                      return (
                        <tr
                          key="total-row"
                          className={`excel-row excel-row-total ${isHovered ? 'is-active-excel-row' : ''}`}
                          onMouseEnter={() => setIsHoveredTotal(true)}
                          onMouseLeave={() => setIsHoveredTotal(false)}
                        >
                          <td className="excel-cell-group">{row.group}</td>
                          <td className="excel-cell-val">
                            {row.growth}%
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr
                        key={row.id}
                        className={`excel-row ${isHovered ? 'is-active-excel-row' : ''}`}
                        onMouseEnter={() => setHoveredGroupId(row.id)}
                        onMouseLeave={() => setHoveredGroupId(null)}
                      >
                        <td className="excel-cell-group">{row.group}</td>
                        <td className="excel-cell-val">{row.growth}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GroupGrowthSlide;
