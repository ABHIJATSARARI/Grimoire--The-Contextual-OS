import { useEffect, useRef, useState } from 'react';
import './BurnRateChart.css';

function BurnRateChart({ burnRate }) {
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

    // Add current burn rate to history
    historyRef.current.push(burnRate);
    if (historyRef.current.length > 50) {
      historyRef.current.shift();
    }

    const width = canvasWidth;
    const height = canvasHeight;

    // Clear canvas with gradient background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#1a1a2e');
    bgGradient.addColorStop(1, '#16213e');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Draw grid with glow
    ctx.strokeStyle = 'rgba(138, 43, 226, 0.15)';
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

    // Draw line chart with gradient fill
    if (historyRef.current.length > 1) {
      // Create gradient for line
      const lineGradient = ctx.createLinearGradient(0, 0, width, 0);
      lineGradient.addColorStop(0, '#667eea');
      lineGradient.addColorStop(0.5, '#8a2be2');
      lineGradient.addColorStop(1, '#764ba2');
      
      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = 4;
      ctx.shadowColor = 'rgba(138, 43, 226, 0.6)';
      ctx.shadowBlur = 15;
      ctx.beginPath();

      const points = [];
      historyRef.current.forEach((value, index) => {
        const x = (index / (historyRef.current.length - 1)) * width;
        const y = height - ((100 - value) / 100) * height;
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
      fillGradient.addColorStop(0, 'rgba(138, 43, 226, 0.4)');
      fillGradient.addColorStop(1, 'rgba(138, 43, 226, 0.05)');
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = fillGradient;
      ctx.fill();

      // Draw points with glow
      points.forEach((point, index) => {
        if (index % 3 === 0 || index === points.length - 1) {
          ctx.shadowColor = '#8a2be2';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#8a2be2';
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    }

    // Draw labels with better styling
    ctx.fillStyle = '#8a2be2';
    ctx.font = 'bold 14px system-ui';
    ctx.fillText('100%', 10, 20);
    ctx.fillText('0%', 10, height - 10);
    
    const remaining = Math.round(100 - burnRate);
    ctx.fillStyle = remaining > 50 ? '#10b981' : remaining > 20 ? '#f59e0b' : '#ef4444';
    ctx.font = 'bold 16px system-ui';
    ctx.fillText(`${remaining}%`, width - 60, 25);

  }, [burnRate]);

  return (
    <div className="burn-rate-chart">
      <div className="chart-header">
        <h4>💰 Runway Remaining</h4>
        <div className="chart-stats">
          <span className={`stat-value ${(100 - burnRate) > 50 ? 'good' : (100 - burnRate) > 20 ? 'warning' : 'danger'}`}>
            ${Math.round((1000 * (100 - burnRate)) / 100)}k
          </span>
        </div>
      </div>
      <canvas ref={canvasRef} />
      <p className="chart-label">
        <span className="label-icon">📉</span>
        Money depleting over time
      </p>
    </div>
  );
}

export default BurnRateChart;
