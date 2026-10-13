import React, { useState, useEffect, useCallback } from 'react';
import { DISTRIBUTORS } from './data/distributors';
import { Distributor } from './types/presentation';
import { SlideHeader } from './components/layout/SlideHeader';
import { MapSlide } from './components/slide1/MapSlide';
import { TrajectorySlide } from './components/slide2/TrajectorySlide';
import { StoreGrowthSlide } from './components/slide3/StoreGrowthSlide';
import { ClosingSlide } from './components/slideClosing/ClosingSlide';

export const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [subStep, setSubStep] = useState<number>(1); // 1 to 6 on Slide 2
  const [isDark, setIsDark] = useState<boolean>(false); // Light theme is default
  const [selectedDistributor, setSelectedDistributor] = useState<Distributor | null>(null);
  const [isTouring, setIsTouring] = useState<boolean>(false);

  // ARCHITECTURE: Content slides count.
  // Whenever new intermediate slides are added (slide 4, slide 5...),
  // closingSlideIndex is ALWAYS dynamically set to the very end!
  const contentSlidesCount = 3; // Slide 1 (Mapa), Slide 2 (Trayectoria), Slide 3 (Crecimiento por Tienda)
  const closingSlideIndex = contentSlidesCount + 1; // Slide 4 (¡Muchas Gracias!)
  const totalSlides = closingSlideIndex;

  // Sync theme-dark class to document.body
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
  }, [isDark]);

  // Navigate Forward (Next)
  const handleNext = useCallback(() => {
    if (currentSlide === 1) {
      setCurrentSlide(2);
      setSubStep(1);
    } else if (currentSlide === 2) {
      if (subStep < 6) {
        setSubStep((prev) => prev + 1);
      } else {
        // Move to Slide 3 (Crecimiento por Tienda)
        setCurrentSlide(3);
      }
    } else if (currentSlide === 3) {
      // Move to Slide 4 (Closing Slide ¡Muchas Gracias!)
      setCurrentSlide(4);
    } else if (currentSlide < closingSlideIndex) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      // Loop from closing slide back to slide 1
      setCurrentSlide(1);
      setSubStep(1);
    }
  }, [currentSlide, subStep, closingSlideIndex]);

  // Navigate Backward (Prev)
  const handlePrev = useCallback(() => {
    if (currentSlide === closingSlideIndex) {
      // Return to Slide 3 (or the previous content slide)
      setCurrentSlide(3);
    } else if (currentSlide === 3) {
      // Return to Slide 2 with all bars visible (step 6)
      setCurrentSlide(2);
      setSubStep(6);
    } else if (currentSlide === 2) {
      if (subStep > 1) {
        setSubStep((prev) => prev - 1);
      } else {
        setCurrentSlide(1);
      }
    } else if (currentSlide === 1) {
      // Optional loop backwards to closing slide
      setCurrentSlide(closingSlideIndex);
    }
  }, [currentSlide, subStep, closingSlideIndex]);

  const handleReset = useCallback(() => {
    setSelectedDistributor(null);
    setIsTouring(false);
    if (currentSlide === 2) {
      setSubStep(1);
    }
  }, [currentSlide]);

  const handleRestartToSlide1 = useCallback(() => {
    setCurrentSlide(1);
    setSubStep(1);
    setSelectedDistributor(null);
    setIsTouring(false);
  }, []);

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
        {/* SLIDE 1: MAPA NACIONAL */}
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

        {/* SLIDE 2: TRAYECTORIA BARRAS GENERAL */}
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

        {/* SLIDE 3: CRECIMIENTO POR TIENDA (BARRAS DIVERGENTES) */}
        <section
          className={`slide-page ${currentSlide === 3 ? 'is-active-slide' : ''}`}
          id="slide-3"
        >
          <StoreGrowthSlide />
        </section>

        {/* SLIDE FINAL (SIEMPRE AL FINAL): ¡MUCHAS GRACIAS! */}
        <section
          className={`slide-page ${currentSlide === closingSlideIndex ? 'is-active-slide' : ''}`}
          id="slide-closing"
        >
          <ClosingSlide onRestart={handleRestartToSlide1} />
        </section>
      </div>
    </div>
  );
};

export default App;
