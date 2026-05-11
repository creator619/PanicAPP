import React from 'react';
import { X, MessageSquareQuote } from 'lucide-react';

const DigitalHelpCard = ({ onCancel }) => {
  return (
    <div className="help-card-overlay">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <MessageSquareQuote size={40} color="#B39EB5" style={{ margin: '0 auto' }} />
        <p style={{ color: '#A0AEC0', fontSize: '0.8rem', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Segítségkérő kártya
        </p>
      </div>

      <div className="help-card-text">
        Pánikrohamom van. Nem vagyok veszélyben, csak időre van szükségem. 
        <br /><br />
        Kérlek, ne érj hozzám, de maradj a közelemben, amíg bólintok.
      </div>

      <div style={{ marginTop: 'auto', textAlign: 'center' }}>
        <button 
          onClick={onCancel}
          style={{
            backgroundColor: '#1A202C',
            color: 'white',
            padding: '15px 40px',
            borderRadius: '30px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '0 auto'
          }}
        >
          <X size={20} /> Bezárás
        </button>
      </div>
    </div>
  );
};

export default DigitalHelpCard;
