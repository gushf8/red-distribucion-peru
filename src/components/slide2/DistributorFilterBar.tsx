import React from 'react';
import { DISTRIBUTORS } from '../../data/distributors';

interface DistributorFilterBarProps {
  selectedFilter: string; // 'all' or distributor id
  onSelectFilter: (id: string) => void;
}

export const DistributorFilterBar: React.FC<DistributorFilterBarProps> = ({
  selectedFilter,
  onSelectFilter,
}) => {
  return (
    <div className="chart-filters">
      <button
        className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
        onClick={() => onSelectFilter('all')}
      >
        Consolidado Nacional (10 Distribuidores)
      </button>

      {DISTRIBUTORS.map((d) => (
        <button
          key={d.id}
          className={`filter-btn ${selectedFilter === d.id ? 'active' : ''}`}
          onClick={() => onSelectFilter(d.id)}
          style={{
            borderColor: selectedFilter === d.id ? d.color : undefined,
            backgroundColor: selectedFilter === d.id ? d.color : undefined,
            color: selectedFilter === d.id ? '#ffffff' : undefined,
          }}
        >
          {d.shortName}
        </button>
      ))}
    </div>
  );
};
