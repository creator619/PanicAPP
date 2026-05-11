import React, { useState, useEffect } from 'react';
import BreathingCircle from './components/BreathingCircle';
import GroundingExercise from './components/GroundingExercise';
import { HeartPulse, Home, Phone, Book, Wind, Anchor } from 'lucide-react';

function App() {
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [exerciseType, setExerciseType] = useState('breathing'); // 'breathing' or 'grounding'

  useEffect(() => {
    if (isPanicMode) {
      document.body.classList.add('panic-mode');
    } else {
      document.body.classList.remove('panic-mode');
      setExerciseType('breathing');
    }
  }, [isPanicMode]);

  if (isPanicMode) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setExerciseType('breathing')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                backgroundColor: exerciseType === 'breathing' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.9rem'
              }}
            >
              <Wind size={16} /> Légzés
            </button>
            <button 
              onClick={() => setExerciseType('grounding')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                backgroundColor: exerciseType === 'grounding' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.9rem'
              }}
            >
              <Anchor size={16} /> Földelés
            </button>
          </div>
          <button 
            onClick={() => setIsPanicMode(false)}
            style={{ 
              background: 'transparent', 
              color: '#F7FAFC', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '10px',
              fontSize: '1rem'
            }}
          >
            Befejezés
          </button>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '10px', color: '#98FF98' }}>Biztonságban vagy</h1>
          <p style={{ opacity: 0.8 }}>
            {exerciseType === 'breathing' ? 'Koncentrálj a légzésedre.' : 'Koncentrálj a környezetedre.'}
          </p>
        </div>

        {exerciseType === 'breathing' ? (
          <BreathingCircle />
        ) : (
          <GroundingExercise onComplete={() => setExerciseType('breathing')} />
        )}

        <div style={{ textAlign: 'center', marginTop: 'auto', paddingBottom: '40px', opacity: 0.6 }}>
          <p style={{ fontSize: '1.2rem' }}>Ez csak egy roham. El fog múlni.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px' }}>
      <header style={{ padding: '20px 0', textAlign: 'center' }}>
        <h1 style={{ color: '#2D3748', fontSize: '1.8rem', fontWeight: 'bold' }}>Pániksegély</h1>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button 
          onClick={() => setIsPanicMode(true)}
          style={{
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            backgroundColor: '#B39EB5',
            color: 'white',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            boxShadow: '0 10px 30px rgba(179, 158, 181, 0.6)',
            transition: 'transform 0.2s ease-in-out'
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <HeartPulse size={72} />
          <span style={{ textAlign: 'center', lineHeight: '1.2' }}>Segítségre van<br/>szükségem</span>
        </button>
      </main>

      <footer style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <button style={{ background: 'transparent', color: '#B39EB5', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Home size={28} />
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Főoldal</span>
        </button>
        <button style={{ background: 'transparent', color: '#AEC6CF', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Book size={28} />
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Napló</span>
        </button>
        <button style={{ background: 'transparent', color: '#AEC6CF', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Phone size={28} />
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>SOS</span>
        </button>
      </footer>
    </div>
  );
}

export default App;
