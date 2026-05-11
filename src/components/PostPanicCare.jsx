import React, { useState } from 'react';
import { CheckCircle2, Coffee, Thermometer, Moon, Heart, ArrowRight, HelpCircle, Phone, Check, X } from 'lucide-react';

const PostPanicCare = ({ onComplete }) => {
  const [step, setStep] = useState(1); // 1: Checklist, 2: Flashcards
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Igyál egy pohár vizet.', icon: <Coffee size={20} />, completed: false },
    { id: 2, text: 'Tegyél fel egy meleg pulóvert.', icon: <Thermometer size={20} />, completed: false },
    { id: 3, text: 'Most feküdj le 10 percre.', icon: <Moon size={20} />, completed: false }
  ]);

  const [cardIndex, setCardIndex] = useState(0);
  const flashcards = [
    { q: 'Ettél ma?', hint: 'Próbálj meg pár falat kekszet vagy gyümölcsöt enni.' },
    { q: 'Vettél be gyógyszert?', hint: 'Ha van orvos által felírt gyógyszered, ellenőrizd, beszedted-e.' },
    { q: 'Van nálad víz?', hint: 'Töltsd meg a kulacsodat vagy tarts egy pohár vizet a közeledben.' }
  ];

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleCallHelper = () => {
    const contacts = JSON.parse(localStorage.getItem('sosContacts') || '[]');
    const primaryPhone = contacts.length > 0 ? contacts[0].phone : '';
    if (primaryPhone) {
      window.location.href = `tel:${primaryPhone}`;
    } else {
      alert("Nincs mentett SOS elérhetőség.");
    }
  };

  const allCompleted = tasks.every(t => t.completed);

  if (step === 1) {
    return (
      <div className="recovery-container">
        <div style={{ textAlign: 'center', marginBottom: '30px', marginTop: '20px' }}>
          <div style={{ 
            backgroundColor: '#B39EB5', 
            width: '70px', 
            height: '70px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 20px',
            boxShadow: '0 10px 20px rgba(179, 158, 181, 0.3)'
          }}>
            <Heart size={36} color="white" fill="white" />
          </div>
          <h2 style={{ color: '#2D3748', fontSize: '1.8rem', marginBottom: '15px' }}>Megcsináltad. Túlélted.</h2>
          <p style={{ color: '#4A5568', lineHeight: '1.6', fontSize: '1.05rem', padding: '0 10px' }}>
            Ez nem a te hibád volt, büszke lehetsz magadra, hogy kezelted a helyzetet. Most a regenerálódásé a főszerep.
          </p>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ color: '#718096', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', paddingLeft: '5px' }}>
            Fizikai csekklista
          </h3>
          {tasks.map(task => (
            <div 
              key={task.id} 
              className={`checklist-item ${task.completed ? 'checked' : ''}`}
              onClick={() => toggleTask(task.id)}
            >
              <div style={{ 
                color: task.completed ? '#48BB78' : '#B39EB5',
                backgroundColor: task.completed ? 'rgba(72, 187, 120, 0.1)' : 'rgba(179, 158, 181, 0.1)',
                padding: '10px',
                borderRadius: '12px'
              }}>
                {task.completed ? <CheckCircle2 size={24} /> : task.icon}
              </div>
              <span style={{ flex: 1, fontSize: '1.1rem', color: '#2D3748' }}>{task.text}</span>
            </div>
          ))}
        </div>

        <div style={{ paddingBottom: '30px' }}>
          <button 
            onClick={() => setStep(2)}
            disabled={!allCompleted}
            style={{
              width: '100%',
              backgroundColor: allCompleted ? '#2D3748' : '#E2E8F0',
              color: allCompleted ? 'white' : '#A0AEC0',
              padding: '20px',
              borderRadius: '25px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
              cursor: allCompleted ? 'pointer' : 'not-allowed'
            }}
          >
            Következő: Döntéstámogatás
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Flashcards
  return (
    <div className="recovery-container">
      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <HelpCircle size={40} color="#B39EB5" style={{ marginBottom: '15px' }} />
        <h2 style={{ color: '#2D3748', fontSize: '1.6rem' }}>Segítünk a döntésben</h2>
        <p style={{ color: '#718096' }}>Válaszolj pár egyszerű kérdésre.</p>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {cardIndex < flashcards.length ? (
          <div key={cardIndex} className="flashcard">
            <h3 style={{ fontSize: '1.8rem', color: '#2D3748', marginBottom: '30px' }}>{flashcards[cardIndex].q}</h3>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button 
                onClick={() => setCardIndex(cardIndex + 1)}
                className="bounce-click"
                style={{
                  flex: 1,
                  backgroundColor: '#48BB78',
                  color: 'white',
                  padding: '25px',
                  borderRadius: '20px',
                  border: 'none',
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <Check size={32} /> IGEN
              </button>
              <button 
                onClick={() => {
                  alert(flashcards[cardIndex].hint);
                  setCardIndex(cardIndex + 1);
                }}
                className="bounce-click"
                style={{
                  flex: 1,
                  backgroundColor: '#FF6B6B',
                  color: 'white',
                  padding: '25px',
                  borderRadius: '20px',
                  border: 'none',
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <X size={32} /> NEM
              </button>
            </div>
          </div>
        ) : (
          <div className="flashcard" style={{ backgroundColor: 'rgba(72, 187, 120, 0.1)', border: '2px dashed #48BB78' }}>
            <CheckCircle2 size={48} color="#48BB78" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ color: '#2D3748', marginBottom: '10px' }}>Minden kész!</h3>
            <p style={{ color: '#4A5568' }}>Végigértél az alapvető lépéseken.</p>
          </div>
        )}

        <div style={{ marginTop: 'auto' }}>
          <button 
            onClick={handleCallHelper}
            style={{
              width: '100%',
              backgroundColor: 'white',
              color: '#FF6B6B',
              padding: '18px',
              borderRadius: '20px',
              fontWeight: 'bold',
              border: '2px solid #FF6B6B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '15px'
            }}
          >
            <Phone size={20} /> Hívj egy Taxit / Segítséget
          </button>
          
          <button 
            onClick={onComplete}
            style={{
              width: '100%',
              backgroundColor: '#B39EB5',
              color: 'white',
              padding: '18px',
              borderRadius: '20px',
              fontWeight: 'bold',
              border: 'none'
            }}
          >
            Kész vagyok, visszatérek a főoldalra
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPanicCare;
