import { useEffect, useRef } from 'react';
import './CoinRain.css';

function CoinRain({ resources }) {
  const containerRef = useRef(null);
  const lastResourcesRef = useRef(resources);

  useEffect(() => {
    if (resources > lastResourcesRef.current) {
      const container = containerRef.current;
      const increase = resources - lastResourcesRef.current;
      const coinCount = Math.min(Math.floor(increase / 10), 20);
      
      for (let i = 0; i < coinCount; i++) {
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.textContent = '💰';
        coin.style.left = Math.random() * 100 + '%';
        coin.style.animationDelay = Math.random() * 0.5 + 's';
        coin.style.animationDuration = Math.random() * 2 + 2 + 's';
        container.appendChild(coin);

        setTimeout(() => coin.remove(), 4000);
      }
    }
    
    lastResourcesRef.current = resources;
  }, [resources]);

  return <div ref={containerRef} className="coin-rain" />;
}

export default CoinRain;
