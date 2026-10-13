import React from 'react';
import { MapPin, ChevronLeft, ChevronRight, Moon, Sun, RotateCcw, Play, Pause } from 'lucide-react';

interface SlideHeaderProps {
  currentSlide: number;
  totalSlides: number;
  isDark: boolean;
  isTouring: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleTheme: () => void;
  onReset: () => void;
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
  onReset,
  onToggleTour,
}) => {
  return (
    <header className="slide-header">
      <div className="header-left">
        <div className="header-badge-tag">
          <MapPin size={17} />
          <span>RED NACIONAL</span>
        </div>
        <div>
          <h1>Presencia a lo largo del Perú</h1>
          <p>Red Estratégica de Distribución Comercial · 10 Socios · 26 Plazas</p>
        </div>
      </div>

      <div className="header-controls">
        <div className="deck-nav-cluster" title="Navegar entre diapositivas (Flechas ← y →)">
          <button
            className="btn-slide-nav"
            onClick={onPrev}
            title="Diapositiva anterior (Flecha Izquierda ←)"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="slide-page-indicator">
            {currentSlide} / {totalSlides}
          </span>
          <button
            className="btn-slide-nav"
            onClick={onNext}
            title="Siguiente diapositiva (Flecha Derecha →)"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <button className="btn-exec" onClick={onToggleTheme} title="Alternar tema visual">
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
          <span>{isDark ? 'Modo Claro' : 'Modo Oscuro'}</span>
        </button>

        <button className="btn-exec" onClick={onReset} title="Restablecer vista nacional">
          <RotateCcw size={17} />
          <span>Ver Todo</span>
        </button>

        <button
          className={`btn-exec btn-primary ${isTouring ? 'tour-active' : ''}`}
          onClick={onToggleTour}
          title="Iniciar recorrido guiado interactivo"
        >
          {isTouring ? <Pause size={17} /> : <Play size={17} />}
          <span>{isTouring ? 'Pausar Tour' : 'Tour Automático'}</span>
        </button>
      </div>
    </header>
  );
};
