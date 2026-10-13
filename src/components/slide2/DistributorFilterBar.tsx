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
    <div className="dist-selector-pillbar">
      <button
        className={`btn-dist-filter ${selectedFilter === 'all' ? 'is-filter-active' : ''}`}
        onClick={() => onSelectFilter('all')}
      >
        Nacional
      </button>

      {DISTRIBUTORS.map((d) => (
        <button
          key={d.id}
          className={`btn-dist-filter ${selectedFilter === d.id ? 'is-filter-active' : ''}`}
          onClick={() => onSelectFilter(d.id)}
        >
          {d.shortName}
        </button>
      ))}
    </div>
  );
};
