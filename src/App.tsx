import React, { useState, useEffect, useCallback } from 'react';
import { DISTRIBUTORS } from './data/distributors';
import { Distributor } from './types/presentation';
import { SlideHeader } from './components/layout/SlideHeader';
import { MapSlide } from './components/slide1/MapSlide';
import { TrajectorySlide } from './components/slide2/TrajectorySlide';

export const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isDark, setIsDark] = useState<boolean>(false); // Light theme is default!
  const [selectedDistributor, setSelectedDistributor] = useState<Distributor | null>(null);
  const [isTouring, setIsTouring] = useState<boolean>(false);

  const totalSlides = 2;

  // Sync theme-dark class to document.body
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
  }, [isDark]);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1));
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : totalSlides));
  }, [totalSlides]);

  const handleReset = useCallback(() => {
    setSelectedDistributor(null);
    setIsTouring(false);
  }, []);

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

  // Auto-tour timer
  useEffect(() => {
    if (!isTouring) return;

    // Ensure we are on slide 1
    setCurrentSlide(1);

    let index = 0;
    setSelectedDistributor(DISTRIBUTORS[index]);

    const interval = setInterval(() => {
      index = (index + 1) % DISTRIBUTORS.length;
      setSelectedDistributor(DISTRIBUTORS[index]);
    }, 3200);

    return () => clearInterval(interval);
  }, [isTouring]);

  return (
    <div className="deck-viewport" id="deck-stage">
      <SlideHeader
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        isDark={isDark}
        isTouring={isTouring}
        onPrev={handlePrev}
        onNext={handleNext}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onReset={handleReset}
        onToggleTour={() => setIsTouring((prev) => !prev)}
      />

      <div className="slides-wrapper">
        <section
          className={`slide-page ${currentSlide === 1 ? 'is-active-slide' : ''}`}
          id="slide-1"
        >
          <MapSlide
            selectedDistributor={selectedDistributor}
            onSelectDistributor={(d) => {
              setSelectedDistributor(d);
              setIsTouring(false);
            }}
          />
        </section>

        <section
          className={`slide-page ${currentSlide === 2 ? 'is-active-slide' : ''}`}
          id="slide-2"
        >
          <TrajectorySlide />
        </section>
      </div>
    </div>
  );
};

export default App;
