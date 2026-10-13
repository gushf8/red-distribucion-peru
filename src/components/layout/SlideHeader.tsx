import React from 'react';
import { Sun, Moon, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideHeaderProps {
  currentSlide: number;
  totalSlides: number;
  isDark: boolean;
  isTouring: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleTheme: () => void;
  onToggleTour: () => void;
}

export const SlideHeader: React.FC<SlideHeaderProps> = ({
  currentSlide,
  totalSlides,
  isDark,
  isTouring,
  onPrev,
  onNext,
  onToggleTheme,
  onToggleTour,
}) => {
  return (
    <header className="top-header glass-panel">
      <div className="header-left">
        <span className="header-badge">Estrategia Comercial 2026</span>
        <h1 className="header-title">
          {currentSlide === 1
            ? 'Red Nacional de Distribución y Cobertura Territorial'
            : 'Trayectoria Histórica y Metas de Cierre 2026'}
        </h1>
      </div>

      <div className="header-controls">
        <button
          className={`btn-pill ${isTouring ? 'active' : ''}`}
          onClick={onToggleTour}
          title="Tour Automático de Distribuidores"
        >
          {isTouring ? <Pause size={16} /> : <Play size={16} />}
          <span>{isTouring ? 'Pausar Tour' : 'Auto Tour'}</span>
        </button>

        <button className="btn-icon" onClick={onToggleTheme} title="Cambiar Tema Visual">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px' }}>
          <button className="btn-icon" onClick={onPrev} title="Diapositiva Anterior (←)">
            <ChevronLeft size={18} />
          </button>
          <span className="page-indicator">
            {currentSlide} / {totalSlides}
          </span>
          <button className="btn-icon" onClick={onNext} title="Siguiente Diapositiva (→)">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
