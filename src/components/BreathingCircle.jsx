import React, { useState, useEffect } from 'react';

const BreathingCircle = () => {
  const [phase, setPhase] = useState('Vegyél mély levegőt...');

  useEffect(() => {
    // 0-4s: Inhale
    // 4-5s: Hold
    // 5-9s: Exhale
    // 9-10s: Hold
    let timeoutIds = [];
    
    const cycle = () => {
      setPhase('Vegyél mély levegőt...');
      timeoutIds.push(setTimeout(() => setPhase('Tartsd bent...'), 4000));
      timeoutIds.push(setTimeout(() => setPhase('Fújd ki lassan...'), 5000));
      timeoutIds.push(setTimeout(() => setPhase('Tartsd bent...'), 9000));
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
