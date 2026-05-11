import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, Smile, Frown, Meh, Angry, Annoyed } from 'lucide-react';

const MoodJournal = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('mood_entries');
    return saved ? JSON.parse(saved) : [];
  });

  const [showAdd, setShowAdd] = useState(false);
  const [mood, setMood] = useState('meh');
  const [note, setNote] = useState('');

  const moods = [
    { id: 'happy', icon: <Smile size={32} />, label: 'Boldog', color: '#98FF98' },
    { id: 'meh', icon: <Meh size={32} />, label: 'Oké', color: '#FDFD96' },
    { id: 'annoyed', icon: <Annoyed size={32} />, label: 'Nyugtalan', color: '#FFD1DC' },
    { id: 'sad', icon: <Frown size={32} />, label: 'Szomorú', color: '#AEC6CF' },
    { id: 'angry', icon: <Angry size={32} />, label: 'Dühös', color: '#FFB347' },
  ];

  useEffect(() => {
    localStorage.setItem('mood_entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleString('hu-HU'),
      mood: moods.find(m => m.id === mood),
      note
    };
    setEntries([newEntry, ...entries]);
    setNote('');
    setShowAdd(false);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <Calendar size={48} color="#B39EB5" style={{ marginBottom: '10px' }} />
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#2D3748' }}>Hangulatnapló</h2>
        <p style={{ color: '#718096' }}>Kövesd nyomon, hogy érzed magad.</p>
      </header>

      {showAdd ? (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '25px', 
          borderRadius: '24px', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Hogy érzed magad most?</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
            {moods.map(m => (
              <button 
                key={m.id}
                onClick={() => setMood(m.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  opacity: mood === m.id ? 1 : 0.4,
                  transform: mood === m.id ? 'scale(1.2)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                  color: m.color === '#FDFD96' ? '#D4D400' : m.color
                }}
              >
                {m.icon}
                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#4A5568' }}>{m.label}</span>
              </button>
            ))}
          </div>

          <textarea 
            placeholder="Mi történt ma? (opcionális)"
            value={note}
            onChange={e => setNote(e.target.value)}
            style={{
              width: '100%',
              height: '100px',
              padding: '15px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              marginBottom: '20px',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={addEntry}
              style={{ flex: 2, backgroundColor: '#B39EB5', color: 'white', padding: '12px', borderRadius: '12px', border: 'none', fontWeight: 'bold' }}
            >
              Bejegyzés mentése
            </button>
            <button 
              onClick={() => setShowAdd(false)}
              style={{ flex: 1, backgroundColor: 'white', color: '#718096', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}
            >
              Mégse
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setShowAdd(true)}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '16px',
            backgroundColor: '#B39EB5',
            color: 'white',
            border: 'none',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '30px',
            boxShadow: '0 4px 15px rgba(179, 158, 181, 0.4)',
            cursor: 'pointer'
          }}
        >
          <Plus size={20} /> Új bejegyzés
        </button>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {entries.length === 0 && !showAdd && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#A0AEC0' }}>
            Még nincs bejegyzésed. Kezdd el rögzíteni a napodat!
          </div>
        )}
        {entries.map(entry => (
          <div key={entry.id} style={{ 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.03)',
            border: '1px solid #EDF2F7',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
              <div style={{ color: entry.mood.color === '#FDFD96' ? '#D4D400' : entry.mood.color }}>
                {moods.find(m => m.id === entry.mood.id)?.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#A0AEC0' }}>{entry.date}</div>
                <div style={{ fontWeight: 'bold', color: '#2D3748' }}>{entry.mood.label}</div>
              </div>
              <button 
                onClick={() => deleteEntry(entry.id)}
                style={{ 
                  position: 'absolute', 
                  right: '15px', 
                  top: '15px', 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#E2E8F0',
                  cursor: 'pointer'
                }}
                onMouseOver={e => e.currentTarget.style.color = '#E53E3E'}
                onMouseOut={e => e.currentTarget.style.color = '#E2E8F0'}
              >
                <Trash2 size={18} />
              </button>
            </div>
            {entry.note && (
              <p style={{ color: '#4A5568', lineHeight: '1.5', marginTop: '10px' }}>{entry.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodJournal;
