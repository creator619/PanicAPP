import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Send, CheckCircle } from 'lucide-react';

const BlindFlightModal = ({ onCancel, buddyName }) => {
  const [countdown, setCountdown] = useState(30);
  const [isSending, setIsSending] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerSOS();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerSOS = () => {
    if (isSending) return;
    setIsSending(true);

    // Get Location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        sendSMS(googleMapsLink);
      }, (error) => {
        console.error("GPS error:", error);
        sendSMS("[Helyszín nem elérhető]");
      });
    } else {
      sendSMS("[GPS nem támogatott]");
    }
  };

  const sendSMS = (locationLink) => {
    const savedBuddyName = buddyName || localStorage.getItem('buddyName') || "Segítőm";
    const message = encodeURIComponent(`${savedBuddyName}, épp pánikrohamot élek át ezen a helyszínen, nézz rám! Helyszín: ${locationLink}`);
    
    // Try to find a phone number from SOS contacts
    const contacts = JSON.parse(localStorage.getItem('sosContacts') || '[]');
    const primaryPhone = contacts.length > 0 ? contacts[0].phone : '';
    
    const smsUri = `sms:${primaryPhone}?body=${message}`;
    window.location.href = smsUri;
  };

  return (
    <div className="modal-overlay">
      <div style={{
        backgroundColor: '#1A202C',
        color: 'white',
        padding: '30px',
        borderRadius: '30px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        border: '2px solid #FF6B6B',
        boxShadow: '0 0 50px rgba(255, 107, 107, 0.3)'
      }} className="emergency-pulse">
        <div style={{ marginBottom: '20px' }}>
          <AlertTriangle size={64} color="#FF6B6B" style={{ margin: '0 auto' }} />
        </div>
        
        <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Minden rendben?</h2>
        
        <p style={{ opacity: 0.8, marginBottom: '25px', lineHeight: '1.5' }}>
          Úgy látjuk, egy ideje nem mozdultál. Ha nem válaszolsz, automatikusan értesítjük a segítődet ({buddyName || 'Segítőd'}).
        </p>

        <div style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          color: '#FF6B6B',
          marginBottom: '30px',
          fontVariantNumeric: 'tabular-nums'
        }}>
          {countdown}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button 
            onClick={onCancel}
            style={{
              backgroundColor: 'white',
              color: '#2D3748',
              padding: '18px',
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <CheckCircle size={20} color="#48BB78" /> Minden rendben
          </button>
          
          <button 
            onClick={triggerSOS}
            style={{
              backgroundColor: 'transparent',
              color: '#FF6B6B',
              padding: '15px',
              borderRadius: '20px',
              fontWeight: 'bold',
              border: '1px solid rgba(255, 107, 107, 0.3)'
            }}
          >
            <Send size={16} style={{ marginRight: '8px' }} /> SOS küldése most
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlindFlightModal;
