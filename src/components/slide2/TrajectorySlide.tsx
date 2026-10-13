import React, { useState } from 'react';
import { DISTRIBUTORS, CONSOLIDATED_TRAJECTORY } from '../../data/distributors';
import { DistributorFilterBar } from './DistributorFilterBar';
import { TrajectoryBarChart } from './TrajectoryBarChart';
import { TrajectoryInsights } from './TrajectoryInsights';

export const TrajectorySlide: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const currentDistributor =
    selectedFilter === 'all'
      ? null
      : DISTRIBUTORS.find((d) => d.id === selectedFilter) || null;

  const trajectory = currentDistributor
    ? currentDistributor.trajectory
    : CONSOLIDATED_TRAJECTORY;

  const displayName = currentDistributor
    ? currentDistributor.name
    : 'Consolidado Nacional';

  const accentColor = currentDistributor ? currentDistributor.color : '#f59e0b';

  return (
    <div className="slide2-layout">
      <div className="slide2-header glass-panel">
        <div className="slide2-titles">
          <h2>El Reto de la Gerencia de Distribuidores</h2>
          <p>
            Lo construimos juntos • Proyección de Cierre 2026 y Comparativa Interanual (k = Mil TM)
          </p>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-main glass-panel">
          <DistributorFilterBar
            selectedFilter={selectedFilter}
            onSelectFilter={setSelectedFilter}
          />
          <TrajectoryBarChart
            trajectory={trajectory}
            accentColor={accentColor}
          />
        </div>

        <TrajectoryInsights
          trajectory={trajectory}
          distributorName={displayName}
        />
      </div>
    </div>
  );
};
