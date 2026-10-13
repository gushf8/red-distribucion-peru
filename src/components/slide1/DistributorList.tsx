import React from 'react';
import { Distributor } from '../../types/presentation';
import { DISTRIBUTORS } from '../../data/distributors';
import { Network, Store, Users, Truck } from 'lucide-react';

interface DistributorListProps {
  selectedId: string | null;
  onSelect: (distributor: Distributor) => void;
}

export const DistributorList: React.FC<DistributorListProps> = ({
  selectedId,
  onSelect,
}) => {
  return (
    <aside className="dist-column">
      <div className="dist-column-header">
        <div className="dist-column-title">
          <Network size={16} style={{ color: 'var(--accent-blue)' }} />
          <span>Red de Distribuidores</span>
        </div>
        <span className="dist-column-badge">10 Socios Oficiales</span>
      </div>

      <div className="dist-cards-list">
        {DISTRIBUTORS.map((dist) => {
          const isActive = selectedId === dist.id;
          return (
            <div
              key={dist.id}
              className={`dist-card ${isActive ? 'is-active' : ''}`}
              style={{ '--accent-dist': dist.color } as React.CSSProperties}
              onClick={() => onSelect(dist)}
            >
              <div className="dist-card-top">
                <div className="dist-header-title">
                  <span
                    className="dist-color-indicator"
                    style={{ background: dist.color }}
                  />
                  <span className="dist-name">{dist.name}</span>
                </div>
                <span className="dist-year-badge">Desde {dist.year}</span>
              </div>

              <div className="dist-kpi-row">
                <div className="kpi-mini">
                  <span className="kpi-mini-lbl">
                    <Store size={11} /> Clientes
                  </span>
                  <span className="kpi-mini-val">
                    {dist.clients.toLocaleString()}
                  </span>
                </div>
                <div className="kpi-mini">
                  <span className="kpi-mini-lbl">
                    <Users size={11} /> Vendedores
                  </span>
                  <span className="kpi-mini-val">{dist.sellers}</span>
                </div>
                <div className="kpi-mini">
                  <span className="kpi-mini-lbl">
                    <Truck size={11} /> Camiones
                  </span>
                  <span className="kpi-mini-val">{dist.trucks}</span>
                </div>
              </div>

              <div className="dist-cities-footer">
                {dist.cities.map((c) => (
                  <span key={c} className="city-pill">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
