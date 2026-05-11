import React, { useState, useEffect } from 'react';
import { Phone, UserPlus, Trash2, Heart } from 'lucide-react';

const SOSContacts = () => {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('sos_contacts');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Általános segélyhívó', number: '112', isSystem: true },
      { id: 2, name: 'Lelki Elsősegély', number: '116-123', isSystem: true }
    ];
  });

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    localStorage.setItem('sos_contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (e) => {
    e.preventDefault();
    if (newName && newNumber) {
      setContacts([...contacts, { id: Date.now(), name: newName, number: newNumber, isSystem: false }]);
      setNewName('');
      setNewNumber('');
      setShowAdd(false);
    }
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <Heart size={48} color="#FF6B6B" style={{ marginBottom: '10px' }} />
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#2D3748' }}>Segítségkérés</h2>
        <p style={{ color: '#718096' }}>Gyors elérés vészhelyzet esetén.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {contacts.map(contact => (
          <div key={contact.id} style={{ 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: contact.isSystem ? '2px solid #EBF4FF' : '1px solid #EDF2F7'
          }}>
            <div>
              <h3 style={{ fontWeight: 'bold', color: '#2D3748', fontSize: '1.1rem' }}>{contact.name}</h3>
              <p style={{ color: '#4A5568', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '5px' }}>{contact.number}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a 
                href={`tel:${contact.number}`}
                style={{ 
                  backgroundColor: contact.isSystem ? '#EBF4FF' : '#F0FFF4',
                  color: contact.isSystem ? '#3182CE' : '#38A169',
                  padding: '12px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Phone size={24} />
              </a>
              {!contact.isSystem && (
                <button 
                  onClick={() => deleteContact(contact.id)}
                  style={{ 
                    backgroundColor: '#FFF5F5',
                    color: '#E53E3E',
                    padding: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {!showAdd ? (
        <button 
          onClick={() => setShowAdd(true)}
          style={{
            marginTop: '20px',
            width: '100%',
            padding: '15px',
            borderRadius: '16px',
            backgroundColor: '#EDF2F7',
            color: '#4A5568',
            border: '2px dashed #CBD5E0',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <UserPlus size={20} /> Kapcsolat hozzáadása
        </button>
      ) : (
        <form onSubmit={addContact} style={{ 
          marginTop: '20px', 
          backgroundColor: '#F7FAFC', 
          padding: '20px', 
          borderRadius: '16px',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#4A5568', fontWeight: 'bold' }}>Név</label>
            <input 
              type="text" 
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Pl. Anya vagy Barát"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0' }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#4A5568', fontWeight: 'bold' }}>Telefonszám</label>
            <input 
              type="tel" 
              value={newNumber}
              onChange={e => setNewNumber(e.target.value)}
              placeholder="+36..."
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0' }}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit"
              style={{ flex: 1, backgroundColor: '#B39EB5', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold' }}
            >
              Mentés
            </button>
            <button 
              type="button"
              onClick={() => setShowAdd(false)}
              style={{ flex: 1, backgroundColor: 'white', color: '#718096', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0' }}
            >
              Mégse
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SOSContacts;
