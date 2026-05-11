import React, { useState, useEffect } from 'react';
import { Users, Heart, Send, BellRing, ShieldCheck, MessageCircle } from 'lucide-react';

const BuddySystem = () => {
  const [buddyName, setBuddyName] = useState(localStorage.getItem('buddyName') || '');
  const [isNotifying, setIsNotifying] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle', 'notifying', 'buddy-present'
  const [hearts, setHearts] = useState([]);
  const [isSetup, setIsSetup] = useState(!!localStorage.getItem('buddyName'));

  const handleSetup = (e) => {
    e.preventDefault();
    if (buddyName.trim()) {
      localStorage.setItem('buddyName', buddyName);
      setIsSetup(true);
    }
  };

  const notifyBuddy = () => {
    setIsNotifying(true);
    setStatus('notifying');
    
    // Simulate Buddy Response
    setTimeout(() => {
      setStatus('buddy-present');
      setIsNotifying(false);
      triggerHearts();
    }, 3000);
  };

  const triggerHearts = () => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      size: 20 + Math.random() * 30,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 2
    }));
    setHearts(h => [...h, ...newHearts]);
    
    // Clean up hearts after animation
    setTimeout(() => {
      setHearts([]);
    }, 10000);
  };

  if (!isSetup) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
        <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '30px', borderRadius: '25px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
          <div style={{ backgroundColor: 'rgba(179, 158, 181, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Users size={40} color="#B39EB5" />
          </div>
          <h2 style={{ color: '#2D3748', marginBottom: '10px' }}>Segítő beállítása</h2>
          <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '25px' }}>
            Adj meg egy nevet (párja, barát, szülő), akit értesíteni szeretnél, ha segítségre van szükséged.
          </p>
          <form onSubmit={handleSetup}>
            <input 
              type="text" 
              placeholder="Segítő neve" 
              value={buddyName}
              onChange={(e) => setBuddyName(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '15px',
                border: '2px solid #E2E8F0',
                marginBottom: '20px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button 
              type="submit"
              style={{
                backgroundColor: '#B39EB5',
                color: 'white',
                width: '100%',
                padding: '15px',
                borderRadius: '15px',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              Mentés
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', overflow: 'hidden' }}>
      {/* Heart Animations Overlay */}
      {hearts.map(heart => (
        <div 
          key={heart.id}
          className="heart-animation"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`
          }}
        >
          <Heart size={heart.size} fill="#FF6B6B" />
        </div>
      ))}

      <div style={{ textAlign: 'center', color: 'white', marginBottom: '10px' }}>
        <h2 style={{ fontSize: '1.5rem' }}>{buddyName} jelenléte</h2>
      </div>

      <div style={{ 
        flex: 1, 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        borderRadius: '30px', 
        border: '1px solid rgba(255,255,255,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        {status === 'idle' ? (
          <>
            <div style={{ marginBottom: '30px' }}>
              <BellRing size={64} color="white" opacity={0.6} />
            </div>
            <h3 style={{ color: 'white', marginBottom: '15px' }}>Szükséged van támogatásra?</h3>
            <p style={{ color: 'white', opacity: 0.8, marginBottom: '30px', fontSize: '0.95rem' }}>
              Egy gombnyomással jelezheted {buddyName} számára, hogy éppen pánikrohamod van. Nem kell beszélned, csak a jelenlétére van szükséged.
            </p>
            <button 
              onClick={notifyBuddy}
              style={{
                backgroundColor: '#FF6B6B',
                color: 'white',
                padding: '18px 40px',
                borderRadius: '30px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 10px 20px rgba(255, 107, 107, 0.4)'
              }}
            >
              <Send size={20} /> Értesítés küldése
            </button>
          </>
        ) : status === 'notifying' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              border: '4px solid rgba(255,255,255,0.3)',
              borderTopColor: 'white',
              animation: 'spin 1s linear infinite',
              marginBottom: '30px'
            }}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <h3 style={{ color: 'white' }}>Értesítés küldése...</h3>
            <p style={{ color: 'white', opacity: 0.8, marginTop: '10px' }}>Kérlek, lélegezz nyugodtan.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.5s ease' }}>
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }`}</style>
            <div className="buddy-status-pulse" style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              backgroundColor: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '30px'
            }}>
              <Heart size={60} color="#FF6B6B" fill="#FF6B6B" />
            </div>
            <h2 style={{ color: 'white', marginBottom: '10px', fontSize: '1.8rem' }}>Veled vagyok</h2>
            <p style={{ color: 'white', opacity: 0.9, fontSize: '1.1rem' }}>
              {buddyName} látja a jelzésed és lélekben veled van.
            </p>
            <button 
              onClick={triggerHearts}
              style={{
                marginTop: '30px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.3)',
                fontSize: '0.9rem'
              }}
            >
              Újabb ölelés kérése
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: 'auto' }}>
        <button 
          onClick={() => setIsSetup(false)}
          style={{ background: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <Users size={14} /> Segítő módosítása
        </button>
      </div>

      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', paddingBottom: '20px' }}>
        <p>A szimuláció bemutatja, hogyan működik az összeköttetés.</p>
      </div>
    </div>
  );
};

export default BuddySystem;
