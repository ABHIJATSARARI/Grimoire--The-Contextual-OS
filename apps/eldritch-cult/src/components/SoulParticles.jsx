import { useEffect, useRef } from 'react';
import './SoulParticles.css';

function SoulParticles({ entropy }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (entropy > 50) {
      const container = containerRef.current;
      const soulCount = Math.floor(entropy / 20);
      
      for (let i = 0; i < soulCount; i++) {
        const soul = document.createElement('div');
        soul.className = 'soul';
        soul.textContent = '👻';
        soul.style.left = Math.random() * 100 + '%';
        soul.style.top = Math.random() * 100 + '%';
        soul.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(soul);

        setTimeout(() => soul.remove(), 5000);
      }
    }
  }, [entropy]);

  return <div ref={containerRef} className="soul-particles" />;
}

export default SoulParticles;
