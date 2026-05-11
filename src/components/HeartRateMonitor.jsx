import React, { useState, useEffect, useRef } from 'react';
import { Heart, Activity, AlertCircle, X } from 'lucide-react';

const HeartRateMonitor = ({ onResult, onCancel }) => {
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bpm, setBpm] = useState(0);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const startMeasurement = async () => {
    setError(null);
    setProgress(0);
    setBpm(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: 320, height: 320 } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsMeasuring(true);
      }
    } catch (err) {
      console.error(err);
      setError("Nem sikerült hozzáférni a kamerához. Ellenőrizd a jogosultságokat.");
    }
  };

  const stopMeasurement = () => {
    setIsMeasuring(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    let animationId;
    if (isMeasuring) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      
      let samples = [];
      let lastTime = Date.now();
      const MEASUREMENT_DURATION = 15000; // 15 seconds
      const startTime = Date.now();

      const analyze = () => {
        if (!isMeasuring) return;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;
        
        let r = 0, g = 0, b = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i+1];
          b += data[i+2];
        }
        
        const count = data.length / 4;
        const avgR = r / count;
        const avgG = g / count;

        // PPG logic: Blood absorbs green light, so we look at the green channel variation
        // or the ratio between R and G.
        samples.push({ t: Date.now(), val: avgG });
        if (samples.length > 300) samples.shift();

        const elapsed = Date.now() - startTime;
        setProgress(Math.min((elapsed / MEASUREMENT_DURATION) * 100, 100));

        if (elapsed >= MEASUREMENT_DURATION) {
          calculateBPM(samples);
          stopMeasurement();
          return;
        }

        animationId = requestAnimationFrame(analyze);
      };

      analyze();
    }
    return () => cancelAnimationFrame(animationId);
  }, [isMeasuring]);

  const calculateBPM = (samples) => {
    if (samples.length < 50) return;
    
    // Simple peak detection
    let peaks = 0;
    const values = samples.map(s => s.val);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    
    for (let i = 1; i < values.length - 1; i++) {
      if (values[i] > mean && values[i] > values[i-1] && values[i] > values[i+1]) {
        peaks++;
      }
    }

    const durationMinutes = (samples[samples.length-1].t - samples[0].t) / 60000;
    const estimatedBpm = Math.round(peaks / durationMinutes / 2); // Divide by 2 as a heuristic for noise
    
    // Ensure reasonable range for panic app context
    const finalBpm = Math.min(Math.max(estimatedBpm, 60), 160);
    setBpm(finalBpm);
    if (onResult) onResult(finalBpm);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.9)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      color: 'white'
    }}>
      <button 
        onClick={() => { stopMeasurement(); onCancel(); }}
        style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', color: 'white' }}
      >
        <X size={32} />
      </button>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Pulzusmérés</h2>
        <p style={{ opacity: 0.8 }}>Tedd az ujjad szorosan a hátlapi kamerára és a vakura!</p>
      </div>

      <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '30px' }}>
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', opacity: 0.3 }}
        />
        <canvas ref={canvasRef} width="100" height="100" style={{ display: 'none' }} />
        
        <div style={{ 
          position: 'absolute', 
          top: 0, left: 0, right: 0, bottom: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          {isMeasuring ? (
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF6B6B', animation: 'pulse 1s infinite' }}>
              <Heart size={64} fill="#FF6B6B" />
            </div>
          ) : (
            bpm > 0 ? (
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>{bpm}</span>
                <p>BPM</p>
              </div>
            ) : (
              <Activity size={64} color="#AEC6CF" />
            )
          )}
        </div>

        <svg width="200" height="200" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
          <circle
            cx="100" cy="100" r="90"
            fill="transparent"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="10"
          />
          <circle
            cx="100" cy="100" r="90"
            fill="transparent"
            stroke="#98FF98"
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 90}
            strokeDashoffset={2 * Math.PI * 90 * (1 - progress / 100)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
      </div>

      {error && (
        <div style={{ color: '#FFBABA', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {!isMeasuring && (
        <button 
          onClick={startMeasurement}
          style={{
            padding: '15px 40px',
            borderRadius: '30px',
            backgroundColor: '#B39EB5',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {bpm > 0 ? "Új mérés" : "Mérés indítása"}
        </button>
      )}

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default HeartRateMonitor;
