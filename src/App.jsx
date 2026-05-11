import React, { useState, useEffect } from 'react';
import BreathingCircle from './components/BreathingCircle';
import GroundingExercise from './components/GroundingExercise';
import SoundPlayer from './components/SoundPlayer';
import { HeartPulse, Home, Phone, Book, Wind, Anchor, Music } from 'lucide-react';

function App() {
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [exerciseType, setExerciseType] = useState('breathing'); // 'breathing', 'grounding', 'sounds'

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
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setExerciseType('breathing')}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                backgroundColor: exerciseType === 'breathing' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem'
              }}
            >
              <Wind size={14} /> Légzés
            </button>
            <button 
              onClick={() => setExerciseType('grounding')}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                backgroundColor: exerciseType === 'grounding' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem'
              }}
            >
              <Anchor size={14} /> Földelés
            </button>
            <button 
              onClick={() => setExerciseType('sounds')}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                backgroundColor: exerciseType === 'sounds' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem'
              }}
            >
              <Music size={14} /> Hangok
            </button>
          </div>
          <button 
            onClick={() => setIsPanicMode(false)}
            style={{ 
              background: 'transparent', 
              color: '#F7FAFC', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              padding: '8px',
              fontSize: '0.9rem'
            }}
          >
            Befejezés
          </button>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '15px', marginBottom: '15px' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '5px', color: '#98FF98' }}>Biztonságban vagy</h1>
          <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
            {exerciseType === 'breathing' ? 'Koncentrálj a légzésedre.' : 
             exerciseType === 'grounding' ? 'Koncentrálj a környezetedre.' : 
             'Hallgasd a nyugtató hangokat.'}
          </p>
        </div>

        {exerciseType === 'breathing' ? (
          <BreathingCircle />
        ) : exerciseType === 'grounding' ? (
          <GroundingExercise onComplete={() => setExerciseType('sounds')} />
        ) : (
          <SoundPlayer />
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
