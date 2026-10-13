import React from 'react';
import { DEPARTMENTS } from '../../data/departments';
import { DETAILED_CITIES, DetailedCityNode } from '../../data/cities';
import { Distributor } from '../../types/presentation';

interface PeruVectorMapProps {
  selectedDistributor: Distributor | null;
  onSelectDistributorById: (id: string) => void;
  onHoverCity: (city: DetailedCityNode | null, e?: React.MouseEvent) => void;
}

export const PeruVectorMap: React.FC<PeruVectorMapProps> = ({
  selectedDistributor,
  onSelectDistributorById,
  onHoverCity,
}) => {
  const activeDepts = selectedDistributor ? selectedDistributor.depts : [];
  const brandColor = selectedDistributor ? selectedDistributor.color : '#0284c7';

  return (
    <div className="svg-wrapper">
      <svg id="peru-svg" viewBox="0 0 600 850" xmlns="http://www.w3.org/2000/svg">
        {/* Departments layer */}
        <g id="departments-layer">
          {DEPARTMENTS.map((dept) => {
            const isHighlighted = activeDepts.includes(dept.name);
            return (
              <path
                key={dept.name}
                id={`dept-${dept.name}`}
                data-dept={dept.name}
                className="dept-shape"
                d={dept.d}
                style={{
                  fill: isHighlighted ? brandColor : undefined,
                  fillOpacity: isHighlighted ? 0.35 : selectedDistributor ? 0.08 : undefined,
                  stroke: isHighlighted ? brandColor : undefined,
                  strokeWidth: isHighlighted ? 1.3 : undefined,
                  strokeLinejoin: 'round',
                  strokeLinecap: 'round',
                }}
              >
                <title>{dept.name}</title>
              </path>
            );
          })}
        </g>

        {/* Cities marker layer */}
        <g id="cities-layer">
          {DETAILED_CITIES.map((city) => {
            const belongs = selectedDistributor
              ? city.distributorId === selectedDistributor.id ||
                selectedDistributor.cities.includes(city.name)
              : true;

            const isHub = city.isHub;

            return (
              <g
                key={city.id}
                className={`city-marker ${isHub ? 'hub-marker' : 'regular-marker'} ${
                  belongs && selectedDistributor ? 'is-active' : ''
                }`}
                style={{
                  opacity: selectedDistributor ? (belongs ? 1 : 0.22) : 1,
                  '--active-pin-color': brandColor,
                } as React.CSSProperties}
                transform={`translate(${city.x}, ${city.y})`}
                onClick={() => onSelectDistributorById(city.distributorId)}
                onMouseEnter={(e) => onHoverCity(city, e)}
                onMouseMove={(e) => onHoverCity(city, e)}
                onMouseLeave={() => onHoverCity(null)}
              >
                <g className="marker-graphics">
                  {belongs && selectedDistributor && (
                    <circle className="radar-pulse" cx="0" cy="0" r="12" />
                  )}
                  <circle
                    className="marker-dot"
                    cx="0"
                    cy="0"
                    r={belongs && selectedDistributor ? 5.2 : city.dotRadius}
                    style={{
                      fill:
                        belongs && selectedDistributor
                          ? brandColor
                          : isHub
                          ? 'var(--accent-crimson)'
                          : undefined,
                      stroke: belongs && selectedDistributor ? '#ffffff' : undefined,
                      strokeWidth: belongs && selectedDistributor ? 1.8 : undefined,
                    }}
                  />
                  <text
                    className="city-label"
                    x={city.labelDx}
                    y={city.labelDy}
                    textAnchor={city.textAnchor as any}
                  >
                    {city.name}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
