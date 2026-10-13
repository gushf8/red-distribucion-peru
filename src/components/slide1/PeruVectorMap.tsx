import React from 'react';
import { DEPARTMENTS } from '../../data/departments';
import { CITIES } from '../../data/cities';
import { Distributor } from '../../types/presentation';

interface PeruVectorMapProps {
  selectedDistributor: Distributor | null;
  onSelectDistributorById: (id: string) => void;
}

export const PeruVectorMap: React.FC<PeruVectorMapProps> = ({
  selectedDistributor,
  onSelectDistributorById,
}) => {
  const activeDepts = selectedDistributor ? selectedDistributor.depts : [];
  const distributorColor = selectedDistributor ? selectedDistributor.color : '#38bdf8';

  return (
    <div className="map-canvas-wrap">
      <svg
        className="peru-svg"
        viewBox="0 0 600 820"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Departments vector layer */}
        <g id="departments-layer">
          {DEPARTMENTS.map((dept) => {
            const isHighlighted = activeDepts.includes(dept.name);
            return (
              <path
                key={dept.name}
                d={dept.d}
                className={`dept-path ${isHighlighted ? 'highlighted' : ''}`}
                style={{
                  fill: isHighlighted ? distributorColor : undefined,
                  fillOpacity: isHighlighted ? 0.35 : undefined,
                  stroke: isHighlighted ? distributorColor : undefined,
                }}
              >
                <title>{dept.name}</title>
              </path>
            );
          })}
        </g>

        {/* Cities marker layer */}
        <g id="cities-layer">
          {CITIES.map((city) => {
            const isCityActive = selectedDistributor
              ? selectedDistributor.id === city.distributorId
              : true;

            const radius = isCityActive && selectedDistributor ? 5.5 : 3.5;
            const dotColor = isCityActive && selectedDistributor ? distributorColor : '#94a3b8';

            return (
              <g
                key={city.name}
                className="city-node"
                transform={`translate(${city.x}, ${city.y})`}
                onClick={() => onSelectDistributorById(city.distributorId)}
              >
                {isCityActive && selectedDistributor && (
                  <circle
                    r={radius + 4}
                    fill={dotColor}
                    opacity="0.3"
                    className="pulse-circle"
                  />
                )}
                <circle
                  r={radius}
                  fill={dotColor}
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                <text
                  x={radius + 5}
                  y={3}
                  className="city-label"
                  style={{
                    fill: isCityActive && selectedDistributor ? '#ffffff' : undefined,
                    fontWeight: isCityActive && selectedDistributor ? 800 : 600,
                  }}
                >
                  {city.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
