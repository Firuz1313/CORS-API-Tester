import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { tutorials } from '../tutorials'; // Assuming tutorials.js is in src/
import '../styles/tutorial.css';

const TutorialContext = createContext();

export const useTutorial = () => useContext(TutorialContext);

export const TutorialProvider = ({ children }) => {
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const endTutorial = useCallback(() => {
    const previousPath = location.state?.previousPath || '/'; 
    const { tutorialId, step, ...restState } = location.state || {}; 
    
    setCurrentTutorial(null);
    setCurrentStepIndex(0);
    setIsTutorialActive(false);

    if (currentTutorial && currentTutorial.steps.some(s => s.page === location.pathname)) {
        navigate(previousPath, { state: restState, replace: true });
    } else {
        navigate(location.pathname, { state: restState, replace: true });
    }
  }, [navigate, location.pathname, location.state, currentTutorial]);

  useEffect(() => {
    const { tutorialId, step } = location.state || {};
    if (tutorialId && tutorials[tutorialId]) {
      const tutorial = tutorials[tutorialId];
      if (tutorial) {
        setCurrentTutorial(tutorial);
        const initialStep = parseInt(step, 10) || 0;
        setCurrentStepIndex(initialStep);
        setIsTutorialActive(true);
        
        if (tutorial.steps[initialStep]?.page && location.pathname !== tutorial.steps[initialStep].page) {
          navigate(tutorial.steps[initialStep].page, { state: { tutorialId, step: initialStep, previousPath: location.pathname } });
        }
      } else {
        console.warn(`Tutorial with id "${tutorialId}" not found.`);
        endTutorial();
      }
    } else if (location.state && 'tutorialId' in location.state && !tutorials[tutorialId]) {
        console.warn(`Tutorial with id "${tutorialId}" not found.`);
        endTutorial();
    }
  }, [location.state, location.pathname, navigate, endTutorial]); // endTutorial is now stable

  const startTutorial = useCallback((tutorialId, initialStep = 0) => {
    const tutorial = tutorials[tutorialId];
    if (tutorial) {
      setCurrentTutorial(tutorial);
      setCurrentStepIndex(initialStep);
      setIsTutorialActive(true);
      if (tutorial.steps[initialStep]?.page) {
        // Save the current path so we can potentially return to it when the tutorial ends
        const currentPathForHistory = location.pathname + location.search + location.hash;
        navigate(tutorial.steps[initialStep].page, { state: { tutorialId, step: initialStep, previousPath: currentPathForHistory } });
      }
    } else {
      console.error(`Tutorial with id "${tutorialId}" not found.`);
    }
  }, [navigate, location.pathname, location.search, location.hash]);

  const nextStep = useCallback(() => {
    if (currentTutorial && currentStepIndex < currentTutorial.steps.length - 1) {
      const nextStepIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextStepIdx);
      const nextStepDetails = currentTutorial.steps[nextStepIdx];
      if (nextStepDetails.page && location.pathname !== nextStepDetails.page) {
        navigate(nextStepDetails.page, { state: { ...location.state, step: nextStepIdx }});
      } else {
         navigate(location.pathname, { state: { ...location.state, step: nextStepIdx }, replace: true });
      }
    }
  }, [currentTutorial, currentStepIndex, navigate, location.pathname, location.state]);

  const prevStep = useCallback(() => {
    if (currentTutorial && currentStepIndex > 0) {
      const prevStepIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevStepIdx);
      const prevStepDetails = currentTutorial.steps[prevStepIdx];
      if (prevStepDetails.page && location.pathname !== prevStepDetails.page) {
        navigate(prevStepDetails.page, { state: { ...location.state, step: prevStepIdx }});
      } else {
         navigate(location.pathname, { state: { ...location.state, step: prevStepIdx }, replace: true });
      }
    }
  }, [currentTutorial, currentStepIndex, navigate, location.pathname, location.state]);
  
  const goToStep = useCallback((stepIndex) => {
    if (currentTutorial && stepIndex >= 0 && stepIndex < currentTutorial.steps.length) {
      setCurrentStepIndex(stepIndex);
      const stepDetails = currentTutorial.steps[stepIndex];
      if (stepDetails.page && location.pathname !== stepDetails.page) {
        navigate(stepDetails.page, { state: { ...location.state, step: stepIndex } });
      } else {
        navigate(location.pathname, { state: { ...location.state, step: stepIndex }, replace: true });
      }
    }
  }, [currentTutorial, navigate, location.pathname, location.state]);

  const currentStepData = currentTutorial ? currentTutorial.steps[currentStepIndex] : null;

  useEffect(() => {
    if (isTutorialActive && currentStepData && currentStepData.targetSelector) {
      const elements = document.querySelectorAll('.tutorial-highlight');
      elements.forEach(el => el.classList.remove('tutorial-highlight'));

      try {
        const targetElement = document.querySelector(currentStepData.targetSelector);
        if (targetElement) {
          targetElement.classList.add('tutorial-highlight');

          // Удаляем старый tooltip
          const existingTooltip = document.querySelector('.tutorial-tooltip');
          if (existingTooltip) {
            existingTooltip.remove();
          }

          // Создаём tooltip с кнопками
          const tooltipContainer = document.createElement('div');
          tooltipContainer.className = `tutorial-tooltip ${currentStepData.position || 'top'}`;
          // Кнопки: Назад и Далее
          const isFirstStep = currentStepIndex === 0;
          const isLastStep = currentTutorial && currentStepIndex === currentTutorial.steps.length - 1;
          tooltipContainer.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 8px;">${currentStepData.title}</div>
            <div style="margin-bottom: 12px;">${currentStepData.description}</div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
              <button id="tutorial-prev-btn" style="${isFirstStep ? 'display:none;' : ''}padding: 4px 12px; border-radius: 4px; border: none; background: #bbb; color: #222; cursor: pointer;">Назад</button>
              <button id="tutorial-next-btn" style="${isLastStep ? 'display:none;' : ''}padding: 4px 12px; border-radius: 4px; border: none; background: #FFD700; color: #222; cursor: pointer;">Далее</button>
            </div>
          `;

          targetElement.appendChild(tooltipContainer);

          // Делегируем обработчики кнопок
          setTimeout(() => {
            const prevBtn = document.getElementById('tutorial-prev-btn');
            const nextBtn = document.getElementById('tutorial-next-btn');
            if (prevBtn) prevBtn.onclick = prevStep;
            if (nextBtn) nextBtn.onclick = nextStep;
          }, 0);
        } else {
          console.warn(`Tutorial target element not found: ${currentStepData.targetSelector}`);
        }
      } catch (e) {
        console.error(`Invalid selector for tutorial step: ${currentStepData.targetSelector}`, e);
      }
    } else {
      const elements = document.querySelectorAll('.tutorial-highlight');
      elements.forEach(el => el.classList.remove('tutorial-highlight'));
      const tooltips = document.querySelectorAll('.tutorial-tooltip');
      tooltips.forEach(tooltip => tooltip.remove());
    }

    return () => {
      const elements = document.querySelectorAll('.tutorial-highlight');
      elements.forEach(el => el.classList.remove('tutorial-highlight'));
      const tooltips = document.querySelectorAll('.tutorial-tooltip');
      tooltips.forEach(tooltip => tooltip.remove());
    };
  }, [isTutorialActive, currentStepData, currentStepIndex, currentTutorial, nextStep, prevStep]);


  return (
    <TutorialContext.Provider value={{ 
      isTutorialActive, 
      currentTutorial, 
      currentStepIndex, 
      currentStepData,
      startTutorial, 
      endTutorial, 
      nextStep, 
      prevStep,
      goToStep
    }}>
      {children}
    </TutorialContext.Provider>
  );
}; 