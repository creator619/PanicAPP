import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const AICopilot = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Szia! Én vagyok a digitális kísérőd. Ne feledd: biztonságban vagy. Hogy érzed most magad? Nyugodtan írd le, ami benned van.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const responses = [
    { 
      keywords: ['megőrül', 'bolond', 'kattan'], 
      reply: 'Nem őrülsz meg, ígérem. Ez csak az adrenalin játéka az elméddel. Emlékszel, múltkor is ezt érezted, és elmúlt. Ez is el fog múlni.' 
    },
    { 
      keywords: ['meghal', 'szívroham', 'leáll'], 
      reply: 'A tested csak próbál megvédeni, de nincs valós veszély. A szíved erős és tudja a dolgát. Figyelj a légzésedre, maradj velem.' 
    },
    { 
      keywords: ['levegő', 'fullad', 'fojt'], 
      reply: 'Valójában kapsz levegőt, csak a mellkasi izmaid feszültek. Próbálj meg egy kicsit hosszabbat kifújni, mint ahogy beszívtad. Megy ez.' 
    },
    { 
      keywords: ['félek', 'retteg', 'rossz'], 
      reply: 'Természetes, hogy most félsz, de ez az érzés nem bánt téged. Olyan, mint egy vihar: zajos, de elvonul. Itt vagyok veled.' 
    }
  ];

  const getAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    const match = responses.find(r => r.keywords.some(k => lowerInput.includes(k)));
    
    if (match) return match.reply;
    
    const fallbacks = [
      'Értem. Mesélj még, mi van magad körül? Mit látsz most?',
      'Büszke vagyok rád, hogy leírod ezeket. Ez segít az elmédnek lelassulni.',
      'Csak így tovább, maradj a jelenben. Mondj 3 dolgot, amit most érzel a kezeddel.',
      'Ez csak egy hullám, és te már a tetején vagy. Hamarosan lecsillapodik minden.'
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = { id: Date.now() + 1, type: 'ai', text: getAIResponse(input) };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#F7FAFC', borderRadius: '30px', overflow: 'hidden', height: '60vh' }}>
      <div style={{ backgroundColor: '#B39EB5', padding: '15px', display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
        <Sparkles size={20} />
        <span style={{ fontWeight: 'bold' }}>AI Copilot</span>
      </div>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {messages.map(msg => (
          <div key={msg.id} className={`chat-bubble ${msg.type === 'user' ? 'user-bubble' : 'ai-bubble'}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', opacity: 0.7, fontSize: '0.75rem' }}>
              {msg.type === 'user' ? <User size={12} /> : <Bot size={12} />}
              {msg.type === 'user' ? 'Te' : 'AI Segítő'}
            </div>
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="chat-bubble ai-bubble" style={{ opacity: 0.6, fontSize: '0.8rem', fontStyle: 'italic' }}>
            Az AI gépel...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input 
          type="text" 
          className="chat-input" 
          placeholder="Írj ide..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          style={{ 
            backgroundColor: '#B39EB5', 
            color: 'white', 
            border: 'none', 
            width: '45px', 
            height: '45px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default AICopilot;
