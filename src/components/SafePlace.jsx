import React, { useState, useEffect, useRef } from 'react';
import { Upload, Camera, Bird, X } from 'lucide-react';

const SafePlace = () => {
  const [image, setImage] = useState(localStorage.getItem('safePlaceImage') || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Nature sounds (Bird chirping)
    // Using a royalty-free nature sound URL
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Placeholder for now, better to use a specific short loop
    // Actually, let's use a more appropriate bird sound if possible.
    // For now, I'll use a reliable bird sound from a CDN if I can find one, or just keep a placeholder.
    audioRef.current.src = 'https://assets.mixkit.co/active_storage/sfx/2436/2436-preview.mp3';
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImage(base64String);
        localStorage.setItem('safePlaceImage', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    localStorage.removeItem('safePlaceImage');
  };

  // Generate leaves
  const leaves = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${6 + Math.random() * 4}s`,
    size: `${10 + Math.random() * 10}px`
  }));

  return (
    <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="safe-place-container">
        {image ? (
          <>
            <img src={image} alt="Saját biztonságos hely" className="safe-place-image" />
            <div className="leaves-container">
              {leaves.map(leaf => (
                <div 
                  key={leaf.id}
                  className="leaf"
                  style={{
                    left: leaf.left,
                    animationDelay: leaf.delay,
                    animationDuration: leaf.duration,
                    width: leaf.size,
                    height: leaf.size
                  }}
                />
              ))}
            </div>
            <button 
              onClick={removeImage}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                padding: '8px',
                cursor: 'pointer',
                zIndex: 20
              }}
            >
              <X size={20} />
            </button>
          </>
        ) : (
          <div className="upload-overlay">
            <div style={{ marginBottom: '20px', color: '#B39EB5' }}>
              <Camera size={48} style={{ margin: '0 auto' }} />
            </div>
            <h3 style={{ marginBottom: '10px', color: '#2D3748' }}>Hozd létre a menedéked</h3>
            <p style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '20px' }}>
              Tölts fel egy képet a szobádról vagy egy kedvenc helyedről, ahol biztonságban érzed magad.
            </p>
            <button 
              onClick={() => fileInputRef.current.click()}
              style={{
                backgroundColor: '#B39EB5',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                margin: '0 auto'
              }}
            >
              <Upload size={18} /> Kép feltöltése
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 25px',
            borderRadius: '30px',
            backgroundColor: isPlaying ? 'rgba(152, 255, 152, 0.2)' : 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}
        >
          <Bird size={20} color={isPlaying ? '#98FF98' : 'white'} />
          {isPlaying ? 'Hang kikapcsolása' : 'Madárcsicsergés'}
        </button>
      </div>

      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
        <p>Lélegezz mélyeket, és koncentrálj a kép részleteire.</p>
      </div>
    </div>
  );
};

export default SafePlace;
