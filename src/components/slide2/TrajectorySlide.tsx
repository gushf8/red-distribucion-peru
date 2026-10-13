import React, { useState } from 'react';
import { DISTRIBUTORS, CONSOLIDATED_TRAJECTORY } from '../../data/distributors';
import { DistributorFilterBar } from './DistributorFilterBar';
import { TrajectoryBarChart } from './TrajectoryBarChart';
import { TrajectoryInsights } from './TrajectoryInsights';
import { TrendingUp } from 'lucide-react';

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
    : 'El reto de la gerencia distribuidores';

  return (
    <main className="deck-grid-slide2">
      {/* LEFT: INTERACTIVE BAR CHART STAGE */}
      <section className="trajectory-chart-card">
        <div className="chart-top-bar">
          <div className="chart-titles">
            <div className="chart-main-title">
              <TrendingUp size={24} style={{ color: '#0284c7' }} />
              <span>{displayName}</span>
            </div>
            <div className="chart-sub-tag">Lo construimos juntos</div>
          </div>

          <DistributorFilterBar
            selectedFilter={selectedFilter}
            onSelectFilter={setSelectedFilter}
          />
        </div>

        <TrajectoryBarChart
          trajectory={trajectory}
          isNational={selectedFilter === 'all'}
        />
      </section>

      {/* RIGHT: TRAJECTORY INSIGHTS DASHBOARD */}
      <TrajectoryInsights
        trajectory={trajectory}
        distributorName={currentDistributor ? currentDistributor.shortName : 'Consolidado Nacional'}
      />
    </main>
  );
};
