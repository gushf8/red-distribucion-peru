import React, { useState } from 'react';
import { Distributor } from '../../types/presentation';
import { DISTRIBUTORS, TOTAL_NATIONAL_CLIENTS, TOTAL_NATIONAL_SELLERS, TOTAL_NATIONAL_TRUCKS } from '../../data/distributors';
import { DetailedCityNode } from '../../data/cities';
import { DistributorList } from './DistributorList';
import { PeruVectorMap } from './PeruVectorMap';
import { Truck, Users, Calendar, Store, ShieldCheck } from 'lucide-react';

interface MapSlideProps {
  selectedDistributor: Distributor | null;
  onSelectDistributor: (distributor: Distributor) => void;
}

export const MapSlide: React.FC<MapSlideProps> = ({
  selectedDistributor,
  onSelectDistributor,
}) => {
  const [tooltipState, setTooltipState] = useState<{
    visible: boolean;
    city: DetailedCityNode | null;
    x: number;
    y: number;
  }>({ visible: false, city: null, x: 0, y: 0 });

  const handleSelectById = (id: string) => {
    const found = DISTRIBUTORS.find((d) => d.id === id);
    if (found) {
      onSelectDistributor(found);
    }
  };

  const handleHoverCity = (city: DetailedCityNode | null, e?: React.MouseEvent) => {
    if (!city || !e) {
      setTooltipState((prev) => ({ ...prev, visible: false }));
    } else {
      setTooltipState({
        visible: true,
        city,
        x: e.clientX,
        y: e.clientY - 12,
      });
    }
  };

  const brandColor = selectedDistributor ? selectedDistributor.color : '#0284c7';
  const trucks = selectedDistributor ? selectedDistributor.trucks : TOTAL_NATIONAL_TRUCKS;
  const sellers = selectedDistributor ? selectedDistributor.sellers : TOTAL_NATIONAL_SELLERS;
  const yearText = selectedDistributor ? `${selectedDistributor.year}` : '2018';
  const clients = selectedDistributor
    ? selectedDistributor.clients.toLocaleString()
    : TOTAL_NATIONAL_CLIENTS.toLocaleString();

  return (
    <main className="deck-grid-slide1">
      {/* LEFT: DYNAMIC MAP WITH FLOATING KPIS */}
      <section className="map-section">
        <div
          className="map-dynamic-header"
          style={
            {
              '--active-brand-color': brandColor,
              '--active-border-color': brandColor,
            } as React.CSSProperties
          }
        >
          <div className="header-dynamic-info">
            <div className="header-dynamic-title-row">
              <span
                className="dist-brand-dot"
                style={{ background: brandColor, boxShadow: `0 0 12px ${brandColor}` }}
              />
              <span className="header-dynamic-title">
                {selectedDistributor
                  ? selectedDistributor.name.toUpperCase()
                  : 'RED NACIONAL DE DISTRIBUCIÓN'}
              </span>
            </div>
            <div className="header-dynamic-subtitle">
              {selectedDistributor
                ? selectedDistributor.desc || selectedDistributor.region
                : '10 Socios Estratégicos · 26 Plazas Comerciales · Cobertura 100% Macrorregiones'}
            </div>
          </div>
          <div className="header-dynamic-pill">
            <ShieldCheck size={14} />
            <span>
              {selectedDistributor
                ? `SOCIO ESTRATÉGICO (${selectedDistributor.region.toUpperCase()})`
                : 'RED INTEGRAL DE COBERTURA'}
            </span>
          </div>
        </div>

        {/* Canvas with 4 Floating KPIs */}
        <div className="map-canvas-container">
          {/* KPI 1: Camiones */}
          <div className="map-floating-kpi kpi-pos-trucks">
            <div className="kpi-badge-icon icon-trucks-bg">
              <Truck size={27} strokeWidth={2.2} />
            </div>
            <div className="kpi-badge-content">
              <span className="kpi-badge-label">Camiones de Reparto</span>
              <span className="kpi-badge-number">{trucks}</span>
              <span className="kpi-badge-sub">
                {selectedDistributor ? 'Flota Propia' : 'Flota Logística'}
              </span>
            </div>
          </div>

          {/* KPI 2: Vendedores */}
          <div className="map-floating-kpi kpi-pos-sellers">
            <div className="kpi-badge-icon icon-sellers-bg">
              <Users size={27} strokeWidth={2.2} />
            </div>
            <div className="kpi-badge-content">
              <span className="kpi-badge-label">Fuerza de Ventas</span>
              <span className="kpi-badge-number">{sellers}</span>
              <span className="kpi-badge-sub">
                {selectedDistributor ? 'Equipo de Campo' : 'Vendedores en Campo'}
              </span>
            </div>
          </div>

          {/* KPI 3: Año */}
          <div className="map-floating-kpi kpi-pos-year">
            <div className="kpi-badge-icon icon-year-bg">
              <Calendar size={27} strokeWidth={2.2} />
            </div>
            <div className="kpi-badge-content">
              <span className="kpi-badge-label">Año de Inicio</span>
              <span className="kpi-badge-number">{yearText}</span>
              <span className="kpi-badge-sub">
                {selectedDistributor ? 'Operación Continua' : 'Trayectoria Continua'}
              </span>
            </div>
          </div>

          {/* KPI 4: Clientes */}
          <div className="map-floating-kpi kpi-pos-clients">
            <div className="kpi-badge-icon icon-clients-bg">
              <Store size={27} strokeWidth={2.2} />
            </div>
            <div className="kpi-badge-content">
              <span className="kpi-badge-label">Clientes Activos</span>
              <span className="kpi-badge-number">{clients}</span>
              <span className="kpi-badge-sub">
                {selectedDistributor ? 'Puntos Atendidos' : 'Puntos de Venta (POS)'}
              </span>
            </div>
          </div>

          {/* SVG Map */}
          <PeruVectorMap
            selectedDistributor={selectedDistributor}
            onSelectDistributorById={handleSelectById}
            onHoverCity={handleHoverCity}
          />

          {/* Bottom right legend */}
          <div className="map-bottom-legend">
            <div className="legend-tag">
              <div
                className="legend-dot"
                style={{ background: 'var(--accent-crimson)' }}
              />
              <span>Hub Principal</span>
            </div>
            <div className="legend-tag">
              <div
                className="legend-dot"
                style={{ background: 'var(--text-title)' }}
              />
              <span>Plaza Comercial</span>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT: DISTRIBUTOR COLUMN */}
      <DistributorList
        selectedId={selectedDistributor?.id || null}
        onSelect={onSelectDistributor}
      />

      {/* Floating Tooltip */}
      {tooltipState.visible && tooltipState.city && (
        <div
          id="map-tooltip"
          style={{
            opacity: 1,
            left: `${tooltipState.x}px`,
            top: `${tooltipState.y}px`,
          }}
        >
          <div className="tt-city">{tooltipState.city.name}</div>
          <div className="tt-dist">
            {tooltipState.city.distributor} ({tooltipState.city.dept})
          </div>
          <div className="tt-kpi">
            <span>Puntos de venta:</span>
            <strong>{tooltipState.city.clients.toLocaleString()} POS</strong>
          </div>
        </div>
      )}
    </main>
  );
};
