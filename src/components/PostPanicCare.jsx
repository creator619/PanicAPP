import React, { useState } from 'react';
import { CheckCircle2, Coffee, Thermometer, Moon, Heart, ArrowRight } from 'lucide-react';

const PostPanicCare = ({ onComplete }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Igyál egy pohár vizet.', icon: <Coffee size={20} />, completed: false },
    { id: 2, text: 'Tegyél fel egy meleg pulóvert.', icon: <Thermometer size={20} />, completed: false },
    { id: 3, text: 'Most feküdj le 10 percre.', icon: <Moon size={20} />, completed: false }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const allCompleted = tasks.every(t => t.completed);

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
          onClick={onComplete}
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
          {allCompleted ? 'Most már jobban vagyok' : 'Végezd el a lépéseket'}
          {allCompleted && <ArrowRight size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PostPanicCare;
