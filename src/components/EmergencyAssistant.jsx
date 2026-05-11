import React, { useState, useEffect } from 'react';
import { Phone, Volume2, MapPin, X, Info } from 'lucide-react';

const EmergencyAssistant = ({ onCancel }) => {
  const [location, setLocation] = useState('Lekérdezés...');
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      }, (error) => {
        setLocation('Helyszín nem elérhető');
      });
    }
  }, []);

  const playMessage = () => {
    const locText = coords ? `A koordinátáim: szélesség ${coords.lat.toFixed(4)}, hosszúság ${coords.lng.toFixed(4)}.` : "A pontos helyszín nem elérhető.";
    const message = `Jó napot, egy automata segéd vagyok. A telefon tulajdonosának súlyos pánikrohama van, jelenleg képtelen beszélni. ${locText} Kérem, maradjon a vonalban.`;
    
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'hu-HU';
    utterance.rate = 0.9; // Slightly slower for clarity
    window.speechSynthesis.speak(utterance);
  };

  const startCall = () => {
    window.location.href = 'tel:112';
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 3000 }}>
      <div className="emergency-card" style={{ width: '90%', maxWidth: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onCancel} style={{ background: 'transparent', border: 'none', color: '#A0AEC0' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <div style={{ 
            backgroundColor: 'rgba(255, 107, 107, 0.1)', 
            width: '70px', 
            height: '70px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 20px'
          }}>
            <Phone size={36} color="#FF6B6B" />
          </div>
          <h2 style={{ fontSize: '1.8rem', color: '#2D3748', marginBottom: '10px' }}>Hívássegéd</h2>
          <p style={{ color: '#718096' }}>Segítünk beszélni a mentőkkel.</p>
        </div>

        <div style={{ 
          backgroundColor: '#F7FAFC', 
          padding: '15px', 
          borderRadius: '15px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          marginBottom: '25px',
          color: '#4A5568',
          fontSize: '0.9rem'
        }}>
          <MapPin size={18} color="#FF6B6B" />
          <span>Helyszín: <strong>{location}</strong></span>
        </div>

        <button onClick={startCall} className="voice-btn" style={{ backgroundColor: '#2D3748' }}>
          <Phone size={24} /> 112 hívása
        </button>

        <button onClick={playMessage} className="voice-btn">
          <Volume2 size={24} /> Üzenet bejátszása
        </button>

        <div className="instruction-text">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 'bold' }}>
            <Info size={16} /> FONTOS
          </div>
          Kapcsold be a <strong>KIHANGOSÍTÓT</strong> a hívás közben, hogy a diszpécser hallja az automata üzenetet!
        </div>
      </div>
    </div>
  );
};

export default EmergencyAssistant;
