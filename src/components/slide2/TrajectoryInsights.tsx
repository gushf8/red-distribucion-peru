import React from 'react';
import { DistributorTrajectory } from '../../types/presentation';

interface TrajectoryInsightsProps {
  trajectory: DistributorTrajectory;
  distributorName: string;
}

export const TrajectoryInsights: React.FC<TrajectoryInsightsProps> = ({
  trajectory,
  distributorName,
}) => {
  return (
    <aside className="insights-sidebar glass-panel">
      <div className="insight-item">
        <h4>Expansión Q3 '26</h4>
        <div className="val">+{trajectory.delta_pct}%</div>
        <p>
          Incremento neto de <strong>+{trajectory.delta_tons}k TM</strong> frente al Q3 del año anterior en {distributorName}.
        </p>
      </div>

      <div className="insight-item">
        <h4>Aceleración Q4</h4>
        <div className="val">{trajectory.oct26}k → {trajectory.nov26}k</div>
        <p>
          Rampa de ventas en campaña final superando la media histórica mensual.
        </p>
      </div>

      <div className="insight-item">
        <h4>Meta Cierre '26</h4>
        <div className="val">{trajectory.cierre26}k TM</div>
        <p>
          Objetivo de volumen acordado con la gerencia nacional para alcanzar el récord anual.
        </p>
      </div>

      <div className="insight-item">
        <h4>Cumplimiento Acumulado</h4>
        <div className="val" style={{ color: 'var(--accent-emerald)' }}>
          100% On-Track
        </div>
        <p>
          Sincronización logística y abastecimiento prioritario en toda la red capilar.
        </p>
      </div>
    </aside>
  );
};
