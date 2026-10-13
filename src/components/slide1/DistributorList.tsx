import React from 'react';
import { Distributor } from '../../types/presentation';
import { DISTRIBUTORS } from '../../data/distributors';
import { Truck, Users } from 'lucide-react';

interface DistributorListProps {
  selectedId: string | null;
  onSelect: (distributor: Distributor) => void;
  onClear: () => void;
}

export const DistributorList: React.FC<DistributorListProps> = ({
  selectedId,
  onSelect,
  onClear,
}) => {
  return (
    <aside className="distributor-sidebar glass-panel">
      <div className="sidebar-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>10 Distribuidores</h2>
          {selectedId && (
            <button
              onClick={onClear}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-cyan)',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Ver Nacional
            </button>
          )}
        </div>
        <p>Selecciona un socio comercial para enfocar su región</p>
      </div>

      <div className="distributor-list">
        {DISTRIBUTORS.map((dist) => {
          const isSelected = selectedId === dist.id;
          return (
            <div
              key={dist.id}
              className={`distributor-card ${isSelected ? 'active' : ''}`}
              onClick={() => onSelect(dist)}
            >
              <div className="card-top">
                <span className="card-name">
                  <span className="card-dot" style={{ backgroundColor: dist.color }} />
                  {dist.name}
                </span>
                <span className="card-year">Inicio {dist.year}</span>
              </div>
              <div className="card-region">{dist.region}</div>
              <div className="card-metrics">
                <span>
                  <Users size={12} />
                  <strong>{dist.sellers}</strong> vend.
                </span>
                <span>
                  <Truck size={12} />
                  <strong>{dist.trucks}</strong> cam.
                </span>
                <span>
                  <strong>{dist.clients.toLocaleString()}</strong> clientes
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
