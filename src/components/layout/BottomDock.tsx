import React from 'react';
import { ChevronLeft, ChevronRight, Keyboard } from 'lucide-react';

interface BottomDockProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
}) => {
  return (
    <footer className="bottom-dock glass-panel">
      <div className="shortcut-hint">
        <Keyboard size={16} />
        <span>Navega con flechas del teclado:</span>
        <kbd>←</kbd>
        <kbd>→</kbd>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button className="btn-pill" onClick={onPrev}>
          <ChevronLeft size={16} />
          <span>Anterior</span>
        </button>

        <span className="page-indicator">
          Pág {currentSlide} de {totalSlides}
        </span>

        <button className="btn-pill" onClick={onNext}>
          <span>Siguiente</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </footer>
  );
};
