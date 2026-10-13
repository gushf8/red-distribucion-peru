import React, { useState, useEffect, useCallback } from 'react';
import { DISTRIBUTORS } from './data/distributors';
import { Distributor } from './types/presentation';
import { SlideHeader } from './components/layout/SlideHeader';
import { BottomDock } from './components/layout/BottomDock';
import { MapSlide } from './components/slide1/MapSlide';
import { TrajectorySlide } from './components/slide2/TrajectorySlide';

export const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [selectedDistributor, setSelectedDistributor] = useState<Distributor | null>(null);
  const [isTouring, setIsTouring] = useState<boolean>(false);

  const totalSlides = 2;

  // Sync theme attribute to HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1));
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : totalSlides));
  }, [totalSlides]);

  // Global Keyboard Navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Auto Tour Timer
  useEffect(() => {
    if (!isTouring || currentSlide !== 1) return;

    let index = 0;
    const interval = setInterval(() => {
      setSelectedDistributor(DISTRIBUTORS[index]);
      index = (index + 1) % DISTRIBUTORS.length;
    }, 3200);

    return () => clearInterval(interval);
  }, [isTouring, currentSlide]);

  return (
    <div className="app-container">
      <SlideHeader
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        isDark={isDark}
        isTouring={isTouring}
        onPrev={handlePrev}
        onNext={handleNext}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onToggleTour={() => setIsTouring((prev) => !prev)}
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {currentSlide === 1 ? (
          <MapSlide
            selectedDistributor={selectedDistributor}
            onSelectDistributor={(d) => {
              setSelectedDistributor(d);
              setIsTouring(false);
            }}
            onClearSelection={() => {
              setSelectedDistributor(null);
              setIsTouring(false);
            }}
          />
        ) : (
          <TrajectorySlide />
        )}
      </main>

      <BottomDock
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default App;
