import React, { useState, useEffect } from 'react';

const BreathingCircle = ({ intensity }) => {
  const isFull = intensity === 'full';
  const [phase, setPhase] = useState(isFull ? 'LÉLEGEZZ BE' : 'Vegyél mély levegőt...');
  const [canVibrate, setCanVibrate] = useState('vibrate' in navigator);

  useEffect(() => {
    let timeoutIds = [];
    
    const vibrate = (pattern) => {
      if ('vibrate' in navigator) {
        try {
          navigator.vibrate(pattern);
        } catch (e) {
          console.error("Vibration failed", e);
        }
      }
    };
    
    const cycle = () => {
      // Inhale starts
      setPhase(isFull ? 'LÉLEGEZZ BE' : 'Vegyél mély levegőt...');
      vibrate([150]); 

      timeoutIds.push(setTimeout(() => {
        setPhase(isFull ? 'TARTSD BENT' : 'Tartsd bent...');
        vibrate([50, 100, 50]); 
      }, 4000));

      timeoutIds.push(setTimeout(() => {
        setPhase(isFull ? 'FÚJD KI' : 'Fújd ki lassan...');
        vibrate([400]); 
      }, 5000));

      timeoutIds.push(setTimeout(() => {
        setPhase(isFull ? 'PIHENJ' : 'Tartsd bent...');
        vibrate([50]);
      }, 9000));
    };

    // Note: Some browsers need a direct user interaction to "unlock" vibration.
    // The click that enters Panic Mode should cover this, but we'll try to run a tiny pulse.
    vibrate(10); 
    
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
      {!canVibrate && (
        <div style={{ position: 'absolute', bottom: '20px', fontSize: '0.7rem', opacity: 0.5 }}>
          A rezgés ezen az eszközön nem támogatott (pl. iOS/Safari).
        </div>
      )}
    </div>
  );
};

export default BreathingCircle;
