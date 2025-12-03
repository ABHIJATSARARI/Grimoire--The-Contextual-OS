import { useEffect, useRef, useState } from 'react';
import './EntropyChart.css';

function EntropyChart({ entropy }) {
  const canvasRef = useRef(null);
  const historyRef = useRef([]);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = canvas.parentElement.clientWidth - 32;
    const canvasHeight = 250;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    ctx.scale(dpr, dpr);

    // Add current entropy to history
    historyRef.current.push(entropy);
    if (historyRef.current.length > 50) {
      historyRef.current.shift();
    }

    const width = canvasWidth;
    const height = canvasHeight;

    // Clear canvas with dark gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#0a0a0a');
    bgGradient.addColorStop(1, '#1a0000');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Draw grid with red glow
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = (i * height) / 5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Vertical grid
    for (let i = 0; i <= 10; i++) {
      const x = (i * width) / 10;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw line chart with gradient
    if (historyRef.current.length > 1) {
      const lineGradient = ctx.createLinearGradient(0, 0, width, 0);
      lineGradient.addColorStop(0, '#ff0000');
      lineGradient.addColorStop(0.5, '#ff3333');
      lineGradient.addColorStop(1, '#cc0000');
      
      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = 4;
      ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
      ctx.shadowBlur = 20;
      ctx.beginPath();

      const points = [];
      historyRef.current.forEach((value, index) => {
        const x = (index / (historyRef.current.length - 1)) * width;
        const y = height - (value / 200) * height;
        points.push({ x, y, value });
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
      ctx.shadowBlur = 0;

      // Fill area with gradient
      const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
      fillGradient.addColorStop(0, 'rgba(255, 0, 0, 0.5)');
      fillGradient.addColorStop(1, 'rgba(255, 0, 0, 0.05)');
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = fillGradient;
      ctx.fill();

      // Draw glowing points
      points.forEach((point, index) => {
        if (index % 3 === 0 || index === points.length - 1) {
          ctx.shadowColor = '#ff0000';
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#ff0000';
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    }

    // Draw labels
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 14px system-ui';
    ctx.fillText('MAX', 10, 20);
    ctx.fillText('0', 10, height - 10);
    
    ctx.fillStyle = entropy > 150 ? '#ff0000' : entropy > 75 ? '#ff6666' : '#ff9999';
    ctx.font = 'bold 16px system-ui';
    ctx.fillText(`${Math.round(entropy)}`, width - 60, 25);

  }, [entropy]);

  return (
    <div className="entropy-chart">
      <div className="chart-header">
        <h4>🌑 Entropy Accumulation</h4>
        <div className="chart-stats">
          <span className={`stat-value ${entropy > 150 ? 'critical' : entropy > 75 ? 'high' : 'normal'}`}>
            {Math.round(entropy)}
          </span>
        </div>
      </div>
      <canvas ref={canvasRef} />
      <p className="chart-label">
        <span className="label-icon">📈</span>
        Chaos increasing over time
      </p>
    </div>
  );
}

export default EntropyChart;
