import React, { useState, useEffect } from 'react';
import BreathingCircle from './components/BreathingCircle';
import GroundingExercise from './components/GroundingExercise';
import SoundPlayer from './components/SoundPlayer';
import MoodJournal from './components/MoodJournal';
import SOSContacts from './components/SOSContacts';
import HeartRateMonitor from './components/HeartRateMonitor';
import SafePlace from './components/SafePlace';
import CognitiveDistraction from './components/CognitiveDistraction';
import BuddySystem from './components/BuddySystem';
import BlindFlightModal from './components/BlindFlightModal';
import PostPanicCare from './components/PostPanicCare';
import DigitalHelpCard from './components/DigitalHelpCard';
import IntensitySelector from './components/IntensitySelector';
import AICopilot from './components/AICopilot';
import { HeartPulse, Home, Phone, Book, Wind, Anchor, Music, Activity, ShieldCheck, Brain, Users, MessageSquare, Sparkles } from 'lucide-react';

function App() {
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [exerciseType, setExerciseType] = useState('breathing'); // 'breathing', 'grounding', 'sounds'
  const [screen, setScreen] = useState('home'); // 'home', 'journal', 'sos'
  const [isPostPanic, setIsPostPanic] = useState(false);
  const [showHRMonitor, setShowHRMonitor] = useState(false);
  const [lastBpm, setLastBpm] = useState(null);
  const [showHRPrompt, setShowHRPrompt] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showBlindFlight, setShowBlindFlight] = useState(false);
  const [showHelpCard, setShowHelpCard] = useState(false);
  const [panicIntensity, setPanicIntensity] = useState(null); // null, 'mild', 'full'
  const [taps, setTaps] = useState([]);

  const addTap = (e) => {
    const newTap = { id: Date.now(), x: e.clientX, y: e.clientY };
    setTaps(prev => [...prev, newTap]);
    setTimeout(() => {
      setTaps(prev => prev.filter(t => t.id !== newTap.id));
    }, 600);
  };

  useEffect(() => {
    if (isPanicMode) {
      document.body.classList.add('panic-mode');
      setLastActivity(Date.now());
      setShowBlindFlight(false);
    } else {
      document.body.classList.remove('panic-mode');
      setExerciseType('breathing');
      setShowBlindFlight(false);
      setPanicIntensity(null);
    }
  }, [isPanicMode]);

  // Inactivity monitoring logic
  useEffect(() => {
    if (!isPanicMode || showBlindFlight) return;

    const checkInactivity = setInterval(() => {
      const now = Date.now();
      const inactivityThreshold = 120000; // 2 minutes
      
      if (now - lastActivity > inactivityThreshold) {
        setShowBlindFlight(true);
      }
    }, 5000);

    const handleInteraction = () => {
      setLastActivity(Date.now());
    };

    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('scroll', handleInteraction);

    return () => {
      clearInterval(checkInactivity);
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  }, [isPanicMode, lastActivity, showBlindFlight]);

  const handleHRResult = (bpm) => {
    setLastBpm(bpm);
    if (bpm > 100) {
      setShowHRPrompt(true);
    }
  };

  // Content rendering based on screen
  const renderContent = () => {
    switch(screen) {
      case 'journal':
        return <MoodJournal />;
      case 'sos':
        return <SOSContacts />;
      case 'buddy':
        return <BuddySystem />;
      default:
        return (
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
            {showHRPrompt && (
              <div style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '20px', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '320px',
                textAlign: 'center',
                animation: 'slideUp 0.5s ease'
              }}>
                <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Minden rendben?</p>
                <p style={{ fontSize: '0.9rem', color: '#4A5568', marginBottom: '15px' }}>
                  Úgy látom, kicsit felgyorsult a szívverésed ({lastBpm} BPM). Szeretnél egy 1 perces légzőgyakorlatot?
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => { setIsPanicMode(true); setShowHRPrompt(false); }}
                    style={{ flex: 1, backgroundColor: '#B39EB5', color: 'white', padding: '10px', borderRadius: '10px', fontWeight: 'bold' }}
                  >
                    Igen
                  </button>
                  <button 
                    onClick={() => setShowHRPrompt(false)}
                    style={{ flex: 1, backgroundColor: '#EDF2F7', color: '#4A5568', padding: '10px', borderRadius: '10px' }}
                  >
                    Most nem
                  </button>
                </div>
              </div>
            )}

            <button 
              onClick={() => setIsPanicMode(true)}
              style={{
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                backgroundColor: '#B39EB5',
                color: 'white',
                fontSize: '1.6rem',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
                boxShadow: '0 10px 30px rgba(179, 158, 181, 0.6)',
                transition: 'transform 0.2s ease-in-out',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <HeartPulse size={64} />
              <span style={{ textAlign: 'center', lineHeight: '1.2' }}>Segítségre van<br/>szükségem</span>
            </button>

            <button 
              onClick={() => setShowHRMonitor(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'white',
                padding: '12px 25px',
                borderRadius: '30px',
                color: '#4A5568',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid #EDF2F7'
              }}
            >
              <Activity size={20} color="#FF6B6B" /> Pulzusmérés
            </button>

            {showHRMonitor && (
              <HeartRateMonitor 
                onResult={handleHRResult} 
                onCancel={() => setShowHRMonitor(false)} 
              />
            )}

            <div style={{ marginTop: 'auto', opacity: 0.3, fontSize: '0.7rem' }}>
              v1.2 - Közösségi mód
            </div>
          </main>
        );
    }
  };

  if (isPanicMode) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px' }}>
        <style>
          {`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .tap-feedback { position: absolute; width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.5); pointer-events: none; transform: translate(-50%, -50%); animation: fadeOut 0.6s forwards; }
            @keyframes fadeOut { to { transform: translate(-50%, -50%) scale(3); opacity: 0; } }
            .nav-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          `}
        </style>
        {taps.map(tap => (
          <div key={tap.id} className="tap-feedback" style={{ left: tap.x, top: tap.y }}></div>
        ))}
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '15px',
          backgroundColor: 'rgba(0,0,0,0.2)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <button 
            onClick={() => {
              setIsPanicMode(false);
              setExerciseType('breathing');
            }}
            style={{ 
              backgroundColor: '#FF6B6B', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '12px 25px', 
              borderRadius: '15px',
              fontSize: '1.2rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            BEFEJEZÉS
          </button>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              onClick={() => setShowHelpCard(true)}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '15px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <MessageSquare size={24} />
            </button>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '15px', marginBottom: '15px' }}>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '5px', color: '#98FF98' }}>BIZTONSÁGBAN VAGY</h1>
        </div>

        {!panicIntensity ? (
          <IntensitySelector onSelect={setPanicIntensity} />
        ) : (
          <>
            <div className="nav-grid" style={{ marginBottom: '30px' }}>
              <button 
                onClick={() => setExerciseType('breathing')} 
                style={{ backgroundColor: exerciseType === 'breathing' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px', padding: '15px' }}
              >
                <Wind size={24} /> Légzés
              </button>
              <button 
                onClick={() => setExerciseType('grounding')} 
                style={{ backgroundColor: exerciseType === 'grounding' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px', padding: '15px' }}
              >
                <Anchor size={24} /> Földelés
              </button>
              <button 
                onClick={() => setExerciseType('ai')} 
                style={{ backgroundColor: exerciseType === 'ai' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px', padding: '15px' }}
              >
                <Sparkles size={24} /> AI Segítő
              </button>
              <button 
                onClick={() => setExerciseType('distraction')} 
                style={{ backgroundColor: exerciseType === 'distraction' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px', padding: '15px' }}
              >
                <Brain size={24} /> Játék
              </button>
            </div>

            {exerciseType === 'breathing' ? (
              <BreathingCircle intensity={panicIntensity} />
            ) : exerciseType === 'grounding' ? (
              <GroundingExercise 
                intensity={panicIntensity} 
                onComplete={() => setExerciseType('sounds')} 
              />
            ) : exerciseType === 'sounds' ? (
              <SoundPlayer />
            ) : exerciseType === 'safeplace' ? (
              <SafePlace />
            ) : exerciseType === 'distraction' ? (
              <CognitiveDistraction />
            ) : exerciseType === 'ai' ? (
              <AICopilot />
            ) : (
              <BuddySystem />
            )}
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: 'auto', paddingBottom: '40px', opacity: 0.6 }}>
          <p style={{ fontSize: '1.2rem' }}>Ez csak egy roham. El fog múlni.</p>
        </div>

        {showBlindFlight && (
          <BlindFlightModal 
            buddyName={localStorage.getItem('buddyName')} 
            onCancel={() => {
              setShowBlindFlight(false);
              setLastActivity(Date.now());
            }} 
          />
        )}

        {showHelpCard && (
          <DigitalHelpCard onCancel={() => setShowHelpCard(false)} />
        )}
      </div>
    );
  }

  if (isPostPanic) {
    return <PostPanicCare onComplete={() => setIsPostPanic(false)} />;
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px' }}>
      <header style={{ padding: '20px 0', textAlign: 'center' }}>
        <h1 style={{ color: '#2D3748', fontSize: '1.8rem', fontWeight: 'bold' }}>Pániksegély</h1>
      </header>

      {renderContent()}

      <footer style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0', borderTop: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'white' }}>
        <button 
          onClick={() => setScreen('home')}
          style={{ 
            background: 'transparent', 
            color: screen === 'home' ? '#B39EB5' : '#AEC6CF', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Home size={28} />
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Főoldal</span>
        </button>
        <button 
          onClick={() => setScreen('journal')}
          style={{ 
            background: 'transparent', 
            color: screen === 'journal' ? '#B39EB5' : '#AEC6CF', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Book size={28} />
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Napló</span>
        </button>
        <button 
          onClick={() => setScreen('sos')}
          style={{ 
            background: 'transparent', 
            color: screen === 'sos' ? '#B39EB5' : '#AEC6CF', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Phone size={28} />
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>SOS</span>
        </button>
        <button 
          onClick={() => setScreen('buddy')}
          style={{ 
            background: 'transparent', 
            color: screen === 'buddy' ? '#FF6B6B' : '#AEC6CF', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Users size={28} />
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Segítő</span>
        </button>
      </footer>
    </div>
  );
}

export default App;
