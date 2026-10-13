import React from 'react';
import { Sparkles, MapPin, Users, Truck, RotateCcw } from 'lucide-react';
import { TOTAL_NATIONAL_CLIENTS, TOTAL_NATIONAL_TRUCKS } from '../../data/distributors';

interface ClosingSlideProps {
  onRestart: () => void;
}

export const ClosingSlide: React.FC<ClosingSlideProps> = ({ onRestart }) => {
  return (
    <main className="deck-grid-closing">
      <div className="closing-card">
        {/* TOP BADGE */}
        <div className="closing-badge-tag">
          <Sparkles size={16} />
          <span>Cierre de Presentación</span>
        </div>

        {/* MAIN TITLE */}
        <h1 className="closing-title">¡Muchas Gracias!</h1>
        <p className="closing-subtitle">
          Presencia a lo largo del Perú · Red Estratégica de Distribución Comercial
        </p>
        <p className="closing-motto">
          "El reto de la gerencia distribuidores: lo construimos juntos"
        </p>

        {/* METRICS HIGHLIGHTS GRID */}
        <div className="closing-kpi-grid">
          <div className="closing-kpi-box">
            <div className="closing-kpi-icon icon-blue">
              <Users size={20} />
            </div>
            <div className="closing-kpi-val">10</div>
            <div className="closing-kpi-lbl">Socios Estratégicos</div>
          </div>

          <div className="closing-kpi-box">
            <div className="closing-kpi-icon icon-rose">
              <MapPin size={20} />
            </div>
            <div className="closing-kpi-val">26</div>
            <div className="closing-kpi-lbl">Plazas Comerciales</div>
          </div>

          <div className="closing-kpi-box">
            <div className="closing-kpi-icon icon-green">
              <Truck size={20} />
            </div>
            <div className="closing-kpi-val">{TOTAL_NATIONAL_TRUCKS}</div>
            <div className="closing-kpi-lbl">Camiones de Flota</div>
          </div>

          <div className="closing-kpi-box">
            <div className="closing-kpi-icon icon-amber">
              <Sparkles size={20} />
            </div>
            <div className="closing-kpi-val">{TOTAL_NATIONAL_CLIENTS.toLocaleString()}</div>
            <div className="closing-kpi-lbl">Clientes Coberturados</div>
          </div>
        </div>

        {/* RESTART ACTION BUTTON */}
        <div className="closing-actions">
          <button
            className="btn-closing-restart"
            onClick={onRestart}
            title="Reiniciar presentación desde la diapositiva 1"
          >
            <RotateCcw size={17} />
            <span>Volver al Inicio</span>
          </button>
        </div>
      </div>
    </main>
  );
};
