import React, { useState, useEffect, useCallback } from 'react';
import { DISTRIBUTORS } from './data/distributors';
import { Distributor } from './types/presentation';
import { SlideHeader } from './components/layout/SlideHeader';
import { MapSlide } from './components/slide1/MapSlide';
import { TrajectorySlide } from './components/slide2/TrajectorySlide';

export const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [subStep, setSubStep] = useState<number>(1); // 1 to 6 on Slide 2
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

  // Next: on Slide 1 -> Slide 2 Step 1; on Slide 2 -> Step 2..6 -> Slide 1
  const handleNext = useCallback(() => {
    if (currentSlide === 1) {
      setCurrentSlide(2);
      setSubStep(1);
    } else if (currentSlide === 2) {
      if (subStep < 6) {
        setSubStep((prev) => prev + 1);
      } else {
        setCurrentSlide(1);
        setSubStep(1);
      }
    }
  }, [currentSlide, subStep]);

  // Prev: on Slide 2 -> Step 6..1 -> Slide 1; on Slide 1 -> Slide 2 Step 6
  const handlePrev = useCallback(() => {
    if (currentSlide === 2) {
      if (subStep > 1) {
        setSubStep((prev) => prev - 1);
      } else {
        setCurrentSlide(1);
      }
    } else if (currentSlide === 1) {
      setCurrentSlide(2);
      setSubStep(6);
    }
  }, [currentSlide, subStep]);

  const handleReset = useCallback(() => {
    setSelectedDistributor(null);
    setIsTouring(false);
    if (currentSlide === 2) {
      setSubStep(1);
    }
  }, [currentSlide]);

  // Global Keyboard Navigation (ArrowLeft / ArrowRight / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      } else if (e.key === 'Escape') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleReset]);

  // Auto-tour timer (only runs on slide 1)
  useEffect(() => {
    if (!isTouring) return;

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
        subStep={subStep}
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
          <TrajectorySlide
            subStep={subStep}
            onSetSubStep={setSubStep}
            onNextStep={() => setSubStep((prev) => Math.min(6, prev + 1))}
            onPrevStep={() => setSubStep((prev) => Math.max(1, prev - 1))}
          />
        </section>
      </div>
    </div>
  );
};

export default App;
