import React from 'react';
import { DistributorTrajectory } from '../../types/presentation';
import { CalendarCheck, Target, Clock, Handshake } from 'lucide-react';

interface TrajectoryInsightsProps {
  trajectory: DistributorTrajectory;
  distributorName: string;
}

export const TrajectoryInsights: React.FC<TrajectoryInsightsProps> = ({
  trajectory,
  distributorName,
}) => {
  const metaDiff = (trajectory.cierre26 - trajectory.cierre25).toFixed(1);
  const metaGrowthPct = (((trajectory.cierre26 - trajectory.cierre25) / trajectory.cierre25) * 100).toFixed(1);
  const q4Gap = (trajectory.cierre26 - trajectory.q3_26).toFixed(1);
  const q4MonthlyRunRate = ((trajectory.cierre26 - trajectory.q3_26) / 3).toFixed(1);

  return (
    <section className="trajectory-sidebar">
      {/* Card 1: Avance Q3 */}
      <div className="insight-card" style={{ '--card-accent': '#0284c7' } as React.CSSProperties}>
        <div className="insight-header">
          <CalendarCheck size={14} style={{ color: '#0284c7' }} />
          <span>Cierre Q3 '26 vs Q3 '25</span>
        </div>
        <div className="insight-metric-row">
          <span className="insight-metric-val">{trajectory.q3_26.toFixed(1)}</span>
          <span className="insight-metric-unit">Mil Tons</span>
          <span className="insight-badge-pill pill-blue">+{trajectory.delta_pct}% YoY</span>
        </div>
        <p className="insight-description">
          Crecimiento de <strong>+{trajectory.delta_tons} Mil Toneladas</strong> respaldado por aceleración en pedidos en {distributorName}.
        </p>
      </div>

      {/* Card 2: Meta Cierre 2026 */}
      <div className="insight-card" style={{ '--card-accent': '#10b981' } as React.CSSProperties}>
        <div className="insight-header">
          <Target size={14} style={{ color: '#10b981' }} />
          <span>Meta Anual Cierre 2026</span>
        </div>
        <div className="insight-metric-row">
          <span className="insight-metric-val">{trajectory.cierre26.toFixed(1)}</span>
          <span className="insight-metric-unit">Mil Tons</span>
          <span className="insight-badge-pill pill-green">+{metaGrowthPct}% vs '25</span>
        </div>
        <p className="insight-description">
          Expansión estratégica de <strong>+{metaDiff} Mil Toneladas</strong> respecto al cierre del ejercicio 2025 ({trajectory.cierre25}K Tons).
        </p>
      </div>

      {/* Card 3: Brecha de Cierre Q4 */}
      <div className="insight-card" style={{ '--card-accent': '#f59e0b' } as React.CSSProperties}>
        <div className="insight-header">
          <Clock size={14} style={{ color: '#f59e0b' }} />
          <span>Rampa Estimada Q4 (Oct-Dic)</span>
        </div>
        <div className="insight-metric-row">
          <span className="insight-metric-val">{q4Gap}</span>
          <span className="insight-metric-unit">Mil Tons por colocar</span>
          <span className="insight-badge-pill pill-amber">{q4MonthlyRunRate}K / mes</span>
        </div>
        <p className="insight-description">
          Octubre proyecta <strong>{trajectory.oct26}K Tons</strong> y Noviembre <strong>{trajectory.nov26}K Tons</strong>, alcanzando velocidad crucero para coronar la meta.
        </p>
      </div>

      {/* Card 4: Alianza Estratégica */}
      <div className="insight-card" style={{ '--card-accent': '#8b5cf6' } as React.CSSProperties}>
        <div className="insight-header">
          <Handshake size={14} style={{ color: '#8b5cf6' }} />
          <span>Compromiso Comercial</span>
        </div>
        <p className="insight-description" style={{ marginTop: '4px' }}>
          "Lo construimos juntos": la sinergia comercial entre la gerencia y las distribuidoras garantiza el abastecimiento oportuno y cumplimiento del plan anual.
        </p>
      </div>
    </section>
  );
};
