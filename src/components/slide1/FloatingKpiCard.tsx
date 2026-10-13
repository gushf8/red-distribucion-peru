import React from 'react';
import { Truck, Users, Calendar, Store } from 'lucide-react';
import { Distributor } from '../../types/presentation';
import {
  TOTAL_NATIONAL_CLIENTS,
  TOTAL_NATIONAL_SELLERS,
  TOTAL_NATIONAL_TRUCKS,
} from '../../data/distributors';

interface FloatingKpiCardProps {
  selectedDistributor: Distributor | null;
}

export const FloatingKpiCard: React.FC<FloatingKpiCardProps> = ({ selectedDistributor }) => {
  const trucks = selectedDistributor ? selectedDistributor.trucks : TOTAL_NATIONAL_TRUCKS;
  const sellers = selectedDistributor ? selectedDistributor.sellers : TOTAL_NATIONAL_SELLERS;
  const yearText = selectedDistributor ? `${selectedDistributor.year}` : '1998 - 2022';
  const clients = selectedDistributor
    ? selectedDistributor.clients.toLocaleString()
    : TOTAL_NATIONAL_CLIENTS.toLocaleString();

  return (
    <div className="floating-kpi-grid">
      <div className="kpi-card glass-panel">
        <div className="kpi-icon-wrap" style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)' }}>
          <Truck size={22} />
        </div>
        <div className="kpi-content">
          <span className="kpi-label">Camiones de Reparto</span>
          <span className="kpi-value">{trucks}</span>
          <span className="kpi-sub">
            {selectedDistributor ? `Flota propia de ${selectedDistributor.shortName}` : 'Flota total nacional'}
          </span>
        </div>
      </div>

      <div className="kpi-card glass-panel">
        <div className="kpi-icon-wrap" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.15)' }}>
          <Users size={22} />
        </div>
        <div className="kpi-content">
          <span className="kpi-label">Fuerza de Ventas</span>
          <span className="kpi-value">{sellers}</span>
          <span className="kpi-sub">
            {selectedDistributor ? `Vendedores de campo` : 'Vendedores en territorio'}
          </span>
        </div>
      </div>

      <div className="kpi-card glass-panel">
        <div className="kpi-icon-wrap" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.15)' }}>
          <Calendar size={22} />
        </div>
        <div className="kpi-content">
          <span className="kpi-label">Año de Inicio</span>
          <span className="kpi-value">{yearText}</span>
          <span className="kpi-sub">
            {selectedDistributor ? `Operación activa` : 'Trayectoria consolidada'}
          </span>
        </div>
      </div>

      <div className="kpi-card glass-panel">
        <div className="kpi-icon-wrap" style={{ color: '#a855f7', background: 'rgba(168, 85, 247, 0.15)' }}>
          <Store size={22} />
        </div>
        <div className="kpi-content">
          <span className="kpi-label">Clientes Activos</span>
          <span className="kpi-value">{clients}</span>
          <span className="kpi-sub">
            {selectedDistributor ? `Bodegas y comercios` : 'Puntos de venta atendidos'}
          </span>
        </div>
      </div>
    </div>
  );
};
