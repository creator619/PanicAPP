import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, CloudRain, Waves, TreePine, VolumeX } from 'lucide-react';

const SoundPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  const sounds = [
    {
      id: 'rain',
      name: 'Eső',
      icon: <CloudRain size={24} />,
      url: 'https://actions.google.com/sounds/v1/water/rain_on_roof.ogg',
      color: '#AEC6CF'
    },
    {
      id: 'waves',
      name: 'Hullámok',
      icon: <Waves size={24} />,
      url: 'https://actions.google.com/sounds/v1/water/waves_crashing_on_shore.ogg',
      color: '#B39EB5'
    },
    {
      id: 'forest',
      name: 'Erdő',
      icon: <TreePine size={24} />,
      url: 'https://actions.google.com/sounds/v1/ambient/morning_forest.ogg',
      color: '#98FF98'
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = (sound) => {
    if (currentSound?.id === sound.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentSound(sound);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = sound.url;
        audioRef.current.play();
      }
    }
  };

  return (
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      width: '100%'
    }}>
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: '24px', 
        padding: '30px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
      }}>
        <h2 style={{ color: 'white', marginBottom: '20px', fontSize: '1.4rem' }}>Nyugtató hangok</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '30px' }}>
          {sounds.map((sound) => (
            <button
              key={sound.id}
              onClick={() => togglePlay(sound)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                padding: '15px 10px',
                borderRadius: '16px',
                backgroundColor: currentSound?.id === sound.id ? sound.color : 'rgba(255, 255, 255, 0.05)',
                color: currentSound?.id === sound.id ? '#1a202c' : 'white',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {sound.icon}
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{sound.name}</span>
            </button>
          ))}
        </div>

        {currentSound && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
              <button 
                onClick={() => togglePlay(currentSound)}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: currentSound.color,
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {isPlaying ? <Pause size={30} fill="#1a202c" /> : <Play size={30} fill="#1a202c" style={{ marginLeft: '4px' }} />}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '0 10px' }}>
              {volume === 0 ? <VolumeX size={20} color="white" /> : <Volume2 size={20} color="white" />}
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{
                  flex: 1,
                  height: '4px',
                  borderRadius: '2px',
                  appearance: 'none',
                  background: `linear-gradient(to right, ${currentSound.color} ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`,
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
        )}

        <audio ref={audioRef} loop />
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          input[type=range]::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
        `}
      </style>
    </div>
  );
};

export default SoundPlayer;
