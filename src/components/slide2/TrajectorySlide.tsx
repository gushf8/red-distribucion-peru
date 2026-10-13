import React from 'react';
import { CONSOLIDATED_TRAJECTORY } from '../../data/distributors';
import { TrajectoryBarChart } from './TrajectoryBarChart';
import { TrendingUp, Sparkles, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';

interface TrajectorySlideProps {
  subStep: number;
  onSetSubStep: (step: number) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

const STEP_DESCRIPTIONS = [
  { step: 1, title: '1. Línea Base', detail: 'Cierre 2025 (102K Tons)' },
  { step: 2, title: '2. Meta Anual', detail: 'Cierre 2026 Proyectado (120K Tons)' },
  { step: 3, title: '3. Referencia Q3', detail: "Cierre al Q3 '25 (74K Tons)" },
  { step: 4, title: '4. Crecimiento Q3', detail: "Cierre al Q3 '26 (80K Tons · +8.1%)" },
  { step: 5, title: '5. Aceleración Oct', detail: 'Octubre 2026 (93K Tons)' },
  { step: 6, title: '6. Cierre Noviembre', detail: 'Noviembre 2026 (105K Tons)' },
];

export const TrajectorySlide: React.FC<TrajectorySlideProps> = ({
  subStep,
  onSetSubStep,
  onNextStep,
  onPrevStep,
}) => {
  return (
    <main className="deck-grid-slide2-clean">
      <section className="trajectory-chart-card-full">
        {/* TOP TITLE BAR */}
        <div className="chart-top-bar-clean">
          <div className="chart-titles">
            <div className="chart-main-title">
              <TrendingUp size={26} style={{ color: '#0284c7' }} />
              <span>El reto de la gerencia distribuidores</span>
            </div>
            <div className="chart-sub-tag-row">
              <span className="chart-sub-tag">Lo construimos juntos</span>
              <span className="bullet-sep">•</span>
              <span className="chart-sub-meta">Consolidado General Nacional</span>
            </div>
          </div>

          {/* INTERACTIVE SEQUENTIAL STEP SELECTOR */}
          <div className="step-pill-controller" title="Secuencia narrativa de barras (Flechas ← y →)">
            <button
              className="btn-step-arrow"
              onClick={onPrevStep}
              disabled={subStep <= 1}
              title="Paso anterior (Flecha Izquierda ←)"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="step-pill-group">
              {STEP_DESCRIPTIONS.map((item) => (
                <button
                  key={item.step}
                  className={`btn-step-pill ${subStep === item.step ? 'is-active-step' : ''} ${
                    subStep > item.step ? 'is-passed-step' : ''
                  }`}
                  onClick={() => onSetSubStep(item.step)}
                  title={`${item.title}: ${item.detail}`}
                >
                  <span className="step-dot" />
                  <span className="step-num">Paso {item.step}</span>
                </button>
              ))}

              <button
                className={`btn-step-pill ${subStep === 6 ? 'is-complete-pill' : ''}`}
                onClick={() => onSetSubStep(6)}
                title="Mostrar todas las barras"
              >
                <Sparkles size={13} />
                <span>Ver Completo</span>
              </button>

              <button
                className="btn-step-pill btn-step-reset"
                onClick={() => onSetSubStep(1)}
                title="Reiniciar a Paso 1"
              >
                <RotateCcw size={12} />
              </button>
            </div>

            <button
              className="btn-step-arrow"
              onClick={onNextStep}
              disabled={subStep >= 6}
              title="Siguiente paso (Flecha Derecha →)"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* CURRENT STEP NARRATIVE BADGE */}
        <div className="step-narrative-banner">
          <span className="step-narrative-tag">Fase Activa {subStep}/6:</span>
          <span className="step-narrative-text">
            {STEP_DESCRIPTIONS[subStep - 1]?.detail || 'Todas las barras activas'}
          </span>
          <span className="step-nav-hint">
            Usa las flechas <strong>←</strong> / <strong>→</strong> del teclado para avanzar
          </span>
        </div>

        {/* FULL-WIDTH BAR CHART SVG */}
        <TrajectoryBarChart
          trajectory={CONSOLIDATED_TRAJECTORY}
          subStep={subStep}
        />
      </section>
    </main>
  );
};
