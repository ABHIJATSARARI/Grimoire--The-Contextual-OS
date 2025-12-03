import { useEffect, useRef } from 'react';
import './ConfettiEffect.css';

function ConfettiEffect({ trigger }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    const container = containerRef.current;
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
      container.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    }
  }, [trigger]);

  return <div ref={containerRef} className="confetti-container" />;
}

export default ConfettiEffect;
