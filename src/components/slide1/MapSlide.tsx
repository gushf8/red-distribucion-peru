import React from 'react';
import { Distributor } from '../../types/presentation';
import { DISTRIBUTORS } from '../../data/distributors';
import { DistributorList } from './DistributorList';
import { FloatingKpiCard } from './FloatingKpiCard';
import { PeruVectorMap } from './PeruVectorMap';

interface MapSlideProps {
  selectedDistributor: Distributor | null;
  onSelectDistributor: (distributor: Distributor) => void;
  onClearSelection: () => void;
}

export const MapSlide: React.FC<MapSlideProps> = ({
  selectedDistributor,
  onSelectDistributor,
  onClearSelection,
}) => {
  const handleSelectById = (id: string) => {
    const found = DISTRIBUTORS.find((d) => d.id === id);
    if (found) {
      onSelectDistributor(found);
    }
  };

  return (
    <div className="slide1-layout">
      <DistributorList
        selectedId={selectedDistributor?.id || null}
        onSelect={onSelectDistributor}
        onClear={onClearSelection}
      />

      <section className="map-panel glass-panel">
        <FloatingKpiCard selectedDistributor={selectedDistributor} />
        <PeruVectorMap
          selectedDistributor={selectedDistributor}
          onSelectDistributorById={handleSelectById}
        />
      </section>
    </div>
  );
};
