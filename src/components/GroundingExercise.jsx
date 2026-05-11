import React, { useState } from 'react';
import { Eye, Hand, Volume2, Wind, Utensils, ChevronRight, CheckCircle2 } from 'lucide-react';

const GroundingExercise = ({ onComplete, intensity }) => {
  const [step, setStep] = useState(0);
  const isFull = intensity === 'full';

  const steps = [
    {
      title: "5 dolog, amit látsz",
      description: isFull ? "Nevezz meg 5 tárgyat magad körül." : "Nézz körül, és nevezz meg 5 tárgyat magad körül.",
      icon: <Eye size={48} />,
      color: "#AEC6CF",
      count: 5
    },
    {
      title: "4 dolog, amit érzel",
      description: isFull ? "Keress 4 dolgot, amit érzel." : "Figyelj a testedre, és keress 4 dolgot, amit érzel (pl. ruha érintése, szék alattad).",
      icon: <Hand size={48} />,
      color: "#B39EB5",
      count: 4
    },
    {
      title: "3 dolog, amit hallasz",
      description: isFull ? "Azonosíts 3 hangot." : "Figyelj a környezeted zajaira, és azonosíts 3 hangot.",
      icon: <Volume2 size={48} />,
      color: "#FFD1DC",
      count: 3
    },
    {
      title: "2 dolog, amit érzel (szaglás)",
      description: isFull ? "Érezz 2 illatot." : "Próbálj meg érezni 2 különböző illatot a környezetedben.",
      icon: <Wind size={48} />,
      color: "#FDFD96",
      count: 2
    },
    {
      title: "1 dolog, amit ízlelsz",
      description: isFull ? "Figyelj egy ízre." : "Figyelj az ízre a szádban, vagy gondolj egy kedvenc ízedre.",
      icon: <Utensils size={48} />,
      color: "#98FF98",
      count: 1
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const current = steps[step];

  return (
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      maxWidth: '500px',
      margin: '0 auto',
      width: '100%'
    }}>
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: '24px', 
        padding: '40px 20px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        <div style={{ 
          color: current.color,
          animation: 'pulse 2s infinite'
        }}>
          {current.icon}
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{current.title}</h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6', fontSize: '1.1rem' }}>
          {current.description}
        </p>

        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          {[...Array(steps.length)].map((_, i) => (
            <div 
              key={i}
              style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                backgroundColor: i <= step ? current.color : 'rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        <button 
          onClick={nextStep}
          style={{
            marginTop: '20px',
            padding: '15px 40px',
            borderRadius: '30px',
            backgroundColor: current.color,
            color: '#1a202c',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            boxShadow: `0 4px 15px ${current.color}44`
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {step < steps.length - 1 ? (
            <>Következő <ChevronRight size={20} /></>
          ) : (
            <>Kész <CheckCircle2 size={20} /></>
          )}
        </button>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default GroundingExercise;
