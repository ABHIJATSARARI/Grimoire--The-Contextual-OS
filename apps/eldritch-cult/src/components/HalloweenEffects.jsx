import { useEffect, useRef } from 'react';
import './HalloweenEffects.css';

function HalloweenEffects() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Falling blood drops
    const drops = [];
    for (let i = 0; i < 30; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        speed: Math.random() * 2 + 1,
        size: Math.random() * 3 + 2
      });
    }

    // Floating ghosts/spirits
    const spirits = [];
    for (let i = 0; i < 10; i++) {
      spirits.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 20 + 10,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    function animate() {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw blood drops
      drops.forEach(drop => {
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -10;
          drop.x = Math.random() * canvas.width;
        }
        
        ctx.fillStyle = '#ff0000';
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw spirits
      spirits.forEach(spirit => {
        spirit.x += spirit.vx;
        spirit.y += spirit.vy;
        
        if (spirit.x < 0 || spirit.x > canvas.width) spirit.vx *= -1;
        if (spirit.y < 0 || spirit.y > canvas.height) spirit.vy *= -1;
        
        ctx.fillStyle = '#ff0000';
        ctx.globalAlpha = spirit.opacity;
        ctx.beginPath();
        ctx.arc(spirit.x, spirit.y, spirit.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="halloween-canvas" />
      <div className="pumpkins">
        <div className="pumpkin pumpkin-1">🎃</div>
        <div className="pumpkin pumpkin-2">🎃</div>
      </div>
      <div className="bats">
        <div className="bat bat-1">🦇</div>
        <div className="bat bat-2">🦇</div>
        <div className="bat bat-3">🦇</div>
      </div>
    </>
  );
}

export default HalloweenEffects;
