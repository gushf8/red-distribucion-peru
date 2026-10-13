import React from 'react';
import { MapPin, ChevronLeft, ChevronRight, Moon, Sun, RotateCcw, Play, Pause, Sparkles } from 'lucide-react';

interface SlideHeaderProps {
  currentSlide: number;
  totalSlides: number;
  subStep: number;
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
  subStep,
  isDark,
  isTouring,
  onPrev,
  onNext,
  onToggleTheme,
  onReset,
  onToggleTour,
}) => {
  const isClosingSlide = currentSlide === totalSlides;

  const getBadgeText = () => {
    if (isClosingSlide) return 'AGRADECIMIENTO';
    if (currentSlide === 1) return 'RED NACIONAL';
    if (currentSlide === 2) return 'TRAYECTORIA NACIONAL';
    if (currentSlide === 3) return 'CRECIMIENTO POR TIENDA';
    return `MÓDULO ${currentSlide}`;
  };

  const getTitle = () => {
    if (isClosingSlide) return '¡Muchas Gracias!';
    if (currentSlide === 1) return 'Presencia a lo largo del Perú';
    if (currentSlide === 2 || currentSlide === 3) return 'El reto de la gerencia distribuidores';
    return `Sección ${currentSlide}`;
  };

  const getSubtitle = () => {
    if (isClosingSlide) {
      return 'Presencia a lo largo del Perú · Red Estratégica de Distribución Comercial';
    }
    if (currentSlide === 1) {
      return 'Red Estratégica de Distribución Comercial · 10 Socios · 26 Plazas';
    }
    if (currentSlide === 2) {
      return `Lo construimos juntos · Consolidado General · Fase ${subStep} de 6`;
    }
    if (currentSlide === 3) {
      return 'Crecimiento por Tienda · Variación % vs. periodo anterior · 14 Plazas Evaluadas';
    }
    return '';
  };

  return (
    <header className="slide-header">
      <div className="header-left">
        <div className="header-badge-tag">
          {isClosingSlide ? <Sparkles size={17} /> : <MapPin size={17} />}
          <span>{getBadgeText()}</span>
        </div>
        <div>
          <h1>{getTitle()}</h1>
          <p>{getSubtitle()}</p>
        </div>
      </div>

      <div className="header-controls">
        <div className="deck-nav-cluster" title="Navegar entre diapositivas y fases (Flechas ← y →)">
          <button
            className="btn-slide-nav"
            onClick={onPrev}
            title="Anterior (Flecha Izquierda ←)"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="slide-page-indicator">
            {currentSlide === 2 ? (
              <span>
                <strong>2 / {totalSlides}</strong> <span className="indicator-substep">{subStep}/6</span>
              </span>
            ) : (
              `${currentSlide} / ${totalSlides}`
            )}
          </span>
          <button
            className="btn-slide-nav"
            onClick={onNext}
            title="Siguiente (Flecha Derecha →)"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <button className="btn-exec" onClick={onToggleTheme} title="Alternar tema visual">
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
          <span>{isDark ? 'Modo Claro' : 'Modo Oscuro'}</span>
        </button>

        <button className="btn-exec" onClick={onReset} title="Restablecer vista">
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
