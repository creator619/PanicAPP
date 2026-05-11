import React from 'react';
import { Leaf, Zap, Brain } from 'lucide-react';

const IntensitySelector = ({ onSelect }) => {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '30px', padding: '10px' }}>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <Brain size={48} color="#B39EB5" style={{ margin: '0 auto 20px' }} />
        <h2 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '10px' }}>Hogy érzed magad?</h2>
        <p style={{ color: 'white', opacity: 0.8 }}>Válassz, hogy a legmegfelelőbb segítséget adhassuk.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button 
          onClick={() => onSelect('mild')}
          className="intensity-btn mild bounce-click"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Leaf size={28} color="#B39EB5" />
            <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Enyhe szorongás</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#718096', textAlign: 'center' }}>
            Lágyabb meditáció és finomabb útmutatás.
          </p>
        </button>

        <button 
          onClick={() => onSelect('full')}
          className="intensity-btn full bounce-click"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap size={28} color="white" />
            <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Teljes pánik</span>
          </div>
          <p style={{ fontSize: '0.9rem', opacity: 0.9, textAlign: 'center' }}>
            Rövid, határozott parancsok. Semmi felesleges duma.
          </p>
        </button>
      </div>
    </div>
  );
};

export default IntensitySelector;
