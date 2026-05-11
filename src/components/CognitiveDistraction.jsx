import React, { useState, useEffect, useRef } from 'react';
import { Calculator, Camera, RefreshCw, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

const CognitiveDistraction = () => {
  const [mode, setMode] = useState(null); // 'math', 'color'
  const [mathProblem, setMathProblem] = useState({ a: 0, b: 0, answer: '' });
  const [mathFeedback, setMathFeedback] = useState(null);
  const [streak, setStreak] = useState(0);
  
  const [targetColor, setTargetColor] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const colors = [
    { name: 'Kék', hex: '#0000FF' },
    { name: 'Piros', hex: '#FF0000' },
    { name: 'Zöld', hex: '#008000' },
    { name: 'Sárga', hex: '#FFFF00' },
    { name: 'Narancssárga', hex: '#FFA500' },
    { name: 'Lila', hex: '#800080' }
  ];

  // Math Logic
  const generateMath = () => {
    const a = Math.floor(Math.random() * 40) + 10;
    const b = Math.floor(Math.random() * 40) + 10;
    setMathProblem({ a, b, answer: '' });
    setMathFeedback(null);
  };

  const checkMath = (e) => {
    e.preventDefault();
    const isCorrect = parseInt(mathProblem.answer) === mathProblem.a + mathProblem.b;
    if (isCorrect) {
      setMathFeedback('correct');
      setStreak(s => s + 1);
      setTimeout(generateMath, 1000);
    } else {
      setMathFeedback('wrong');
      setStreak(0);
    }
  };

  // Color Finder Logic
  const startColorFinder = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
    setCapturedImage(null);
  };

  const startCamera = async () => {
    setCameraActive(true);
    setCapturedImage(null);
    
    const constraints = {
      video: { 
        facingMode: { ideal: 'environment' },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Explicitly call play for better compatibility
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(e => console.error("Video play error:", e));
        };
      }
    } catch (err) {
      console.error("Camera error:", err);
      // Fallback to any available camera if 'environment' fails
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(e => console.error("Video play error:", e));
          };
        }
      } catch (fallbackErr) {
        console.error("Fallback camera error:", fallbackErr);
        alert("Nem sikerült elérni a kamerát. Kérlek, engedélyezd a hozzáférést a böngésző beállításaiban!");
        setCameraActive(false);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const dataUrl = canvasRef.current.toDataURL('image/png');
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  useEffect(() => {
    if (mode === 'math') generateMath();
    if (mode === 'color') startColorFinder();
    return () => stopCamera();
  }, [mode]);

  if (!mode) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '10px' }}>Válassz egy feladatot</h2>
        <button 
          onClick={() => setMode('math')}
          style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '20px',
            padding: '30px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontSize: '1.2rem',
            textAlign: 'left'
          }}
        >
          <div style={{ backgroundColor: '#4299E1', padding: '15px', borderRadius: '15px' }}>
            <Calculator size={32} />
          </div>
          <div>
            <strong style={{ display: 'block' }}>Matek Kihívás</strong>
            <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Gyors számolás az agy lefoglalására.</span>
          </div>
        </button>

        <button 
          onClick={() => setMode('color')}
          style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '20px',
            padding: '30px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontSize: '1.2rem',
            textAlign: 'left'
          }}
        >
          <div style={{ backgroundColor: '#48BB78', padding: '15px', borderRadius: '15px' }}>
            <Camera size={32} />
          </div>
          <div>
            <strong style={{ display: 'block' }}>Színkereső</strong>
            <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Keresd meg és fotózd le a megadott színt!</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <button 
        onClick={() => { setMode(null); stopCamera(); }}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', background: 'none', alignSelf: 'flex-start' }}
      >
        <ArrowLeft size={18} /> Vissza a választáshoz
      </button>

      {mode === 'math' ? (
        <div style={{ backgroundColor: 'white', borderRadius: '25px', padding: '40px 20px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '10px' }}>Sorozat: {streak}</div>
          <h2 style={{ fontSize: '3rem', color: '#2D3748', marginBottom: '30px' }}>
            {mathProblem.a} + {mathProblem.b} = ?
          </h2>
          <form onSubmit={checkMath}>
            <input 
              type="number" 
              value={mathProblem.answer}
              onChange={(e) => setMathProblem({...mathProblem, answer: e.target.value})}
              autoFocus
              style={{
                width: '120px',
                fontSize: '2rem',
                padding: '10px',
                textAlign: 'center',
                borderRadius: '15px',
                border: `2px solid ${mathFeedback === 'wrong' ? '#F56565' : mathFeedback === 'correct' ? '#48BB78' : '#E2E8F0'}`,
                outline: 'none',
                marginBottom: '20px'
              }}
            />
            <div style={{ height: '30px', marginBottom: '10px' }}>
              {mathFeedback === 'correct' && <span style={{ color: '#48BB78', fontWeight: 'bold' }}>Helyes!</span>}
              {mathFeedback === 'wrong' && <span style={{ color: '#F56565', fontWeight: 'bold' }}>Próbáld újra!</span>}
            </div>
            <button 
              type="submit"
              style={{
                backgroundColor: '#B39EB5',
                color: 'white',
                padding: '15px 40px',
                borderRadius: '15px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                width: '100%'
              }}
            >
              Ellenőrzés
            </button>
          </form>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px', textAlign: 'center' }}>
            <h3 style={{ color: '#4A5568', marginBottom: '10px' }}>Keresd meg ezt a színt:</h3>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '15px', 
              backgroundColor: '#F7FAFC', 
              padding: '10px 25px', 
              borderRadius: '15px',
              border: `2px solid ${targetColor.hex}`
            }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: targetColor.hex }}></div>
              <strong style={{ fontSize: '1.4rem', color: '#2D3748' }}>{targetColor.name}</strong>
            </div>
          </div>

          <div style={{ 
            flex: 1, 
            backgroundColor: '#000', 
            borderRadius: '25px', 
            overflow: 'hidden', 
            position: 'relative',
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {!cameraActive && !capturedImage ? (
              <button 
                onClick={startCamera}
                style={{ backgroundColor: 'white', padding: '15px 30px', borderRadius: '15px', fontWeight: 'bold' }}
              >
                Kamera indítása
              </button>
            ) : capturedImage ? (
              <>
                <img src={capturedImage} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', textAlign: 'center' }}>
                  <button 
                    onClick={() => { setCapturedImage(null); startCamera(); }}
                    style={{ backgroundColor: 'white', padding: '10px 20px', borderRadius: '30px', fontWeight: 'bold' }}
                  >
                    Újra
                  </button>
                </div>
              </>
            ) : (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <button 
                  onClick={capturePhoto}
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    border: '5px solid rgba(0,0,0,0.2)',
                    cursor: 'pointer'
                  }}
                />
              </>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>

          {capturedImage && (
            <button 
              onClick={startColorFinder}
              style={{
                backgroundColor: '#48BB78',
                color: 'white',
                padding: '15px',
                borderRadius: '15px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <RefreshCw size={20} /> Következő szín
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CognitiveDistraction;
