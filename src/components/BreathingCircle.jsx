import React, { useState, useEffect } from 'react';

const BreathingCircle = () => {
  const [phase, setPhase] = useState('Vegyél mély levegőt...');

  useEffect(() => {
    // 0-4s: Inhale
    // 4-5s: Hold
    // 5-9s: Exhale
    // 9-10s: Hold
    let timeoutIds = [];
    
    const vibrate = (pattern) => {
      if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    };

    const cycle = () => {
      // Inhale starts
      setPhase('Vegyél mély levegőt...');
      vibrate(100); 

      timeoutIds.push(setTimeout(() => {
        // Hold starts
        setPhase('Tartsd bent...');
        vibrate([50, 100, 50]); 
      }, 4000));

      timeoutIds.push(setTimeout(() => {
        // Exhale starts
        setPhase('Fújd ki lassan...');
        vibrate(300); 
      }, 5000));

      timeoutIds.push(setTimeout(() => {
        // Hold starts
        setPhase('Tartsd bent...');
        vibrate(50);
      }, 9000));
    };

    cycle();
    const intervalId = setInterval(cycle, 10000);

    return () => {
      clearInterval(intervalId);
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="breathing-circle-container">
      <div className="breathing-circle"></div>
      <div className="breathing-text">{phase}</div>
    </div>
  );
};

export default BreathingCircle;
