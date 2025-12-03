import { useState, useEffect, useRef } from 'react';
import { GrimoireEntity, HELL_DICTIONARY } from '@grimoire/core';
import { AutonomousAgent, GeminiCEO, StateManager } from '@grimoire/core/autonomous';
import HalloweenEffects from './components/HalloweenEffects';
import SoulParticles from './components/SoulParticles';
import Toast from './components/Toast';
import EntropyChart from './components/EntropyChart';
import LegionDisplay from './components/LegionDisplay';
import './App.css';

function App() {
  const stateManager = useRef(new StateManager('HELL'));
  const [state, setState] = useState(() => {
    const saved = stateManager.current.load();
    return saved || { energy: 100, followers: 0, resources: 1000 };
  });
  const [history, setHistory] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [entropy, setEntropy] = useState(0);
  const [toast, setToast] = useState(null);
  const [autoMode, setAutoMode] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  const canvasRef = useRef(null);
  const autonomousAgent = useRef(null);
  const geminiCEO = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2
      });
    }

    function animate() {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 0.5;
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(p.x, p.y, p.size, p.size);
        
        particles.slice(i + 1).forEach(p2 => {
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.globalAlpha = 1 - dist / 100;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }, []);

  const renderer = {
    display: (message, newState) => {
      setHistory(prev => [...prev, { message, state: { ...newState }, timestamp: Date.now() }]);
      setState(newState);
      return newState;
    }
  };

  const entity = new GrimoireEntity(HELL_DICTIONARY, renderer, 'HELL');
  entity.state = state;

  const executeAction = async (action, amount) => {
    // Generate narrative using Gemini
    const { GeminiAnalyzer } = await import('@grimoire/core/gemini');
    const analyzer = new GeminiAnalyzer(import.meta.env.VITE_GEMINI_API_KEY || '');
    const narrative = await analyzer.generateNarrative(action, 'HELL', { amount });
    
    // HELL MODE: Ominous toast + screen shake
    const toastMessage = `⛧ ${narrative}`;
    
    // Trigger screen shake effect
    const root = document.getElementById('root');
    if (root) {
      root.style.animation = 'shake 0.5s';
      setTimeout(() => { root.style.animation = ''; }, 500);
    }
    
    // Play low-frequency beep (browser native)
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 200; // Low, ominous tone
      gainNode.gain.value = 0.1; // Quiet
      
      oscillator.start();
      setTimeout(() => oscillator.stop(), 200);
    } catch (e) {
      // Audio not supported, continue silently
    }
    
    // Update state with narrative
    entity.renderer = {
      display: (message, newState) => {
        setHistory(prev => [...prev, { message: narrative, state: { ...newState }, timestamp: Date.now() }]);
        setState(newState);
        setToast(toastMessage);
        return newState;
      }
    };
    
    await entity.execute(action, amount);
    
    // Calculate entropy for visual effects (excess energy above 100)
    const excessEnergy = Math.max(0, entity.state.energy - 100);
    setEntropy(excessEnergy);
  };

  // Initialize autonomous agent after executeAction is defined
  useEffect(() => {
    if (!autonomousAgent.current) {
      autonomousAgent.current = new AutonomousAgent(entity, 'HELL', executeAction);
    }
    if (!geminiCEO.current) {
      geminiCEO.current = new GeminiCEO(import.meta.env.VITE_GEMINI_API_KEY || '', 'HELL');
    }
  }, []);

  // Save state on changes
  useEffect(() => {
    stateManager.current.save(state);
  }, [state]);

  const runRitual = async () => {
    setIsRunning(true);
    setHistory([]);
    setState({ energy: 100, followers: 0, resources: 1000 });
    setEntropy(0);
    
    await new Promise(r => setTimeout(r, 500));
    await executeAction('GROWTH', 15);
    await new Promise(r => setTimeout(r, 1200));
    await executeAction('MEETING', 5);
    await new Promise(r => setTimeout(r, 1200));
    await executeAction('SACRIFICE', 50);
    await new Promise(r => setTimeout(r, 1200));
    await executeAction('OPTIMIZE', 20);
    
    setIsRunning(false);
  };

  const toggleAutoMode = () => {
    if (autoMode) {
      autonomousAgent.current.stop();
      setAutoMode(false);
      setIsRunning(false);
    } else {
      autonomousAgent.current.start(2000);
      setAutoMode(true);
      setIsRunning(true);
    }
  };

  const toggleAiMode = async () => {
    if (aiMode) {
      setAiMode(false);
      setIsRunning(false);
    } else {
      setAiMode(true);
      setIsRunning(true);
      runAiLoop();
    }
  };

  const runAiLoop = async () => {
    if (!aiMode) return;
    
    const decision = await geminiCEO.current.decideAction(state);
    await executeAction(decision.action, decision.amount);
    
    setTimeout(() => {
      if (aiMode) runAiLoop();
    }, 2500);
  };

  const resetState = () => {
    stateManager.current.clear();
    setState({ energy: 100, followers: 0, resources: 1000 });
    setHistory([]);
    setEntropy(0);
    if (autoMode) toggleAutoMode();
    if (aiMode) setAiMode(false);
  };

  // Apply visual effects based on entropy (subtle!)
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      // Only apply effects when entropy is very high (>150)
      const entropyIntensity = Math.max(0, Math.min((entropy - 150) / 100, 1));
      root.style.filter = `grayscale(${entropyIntensity * 30}%) contrast(${1 + entropyIntensity * 0.3})`;
    }
  }, [entropy]);

  return (
    <>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <canvas ref={canvasRef} className="background-canvas" />
      <HalloweenEffects />
      <SoulParticles entropy={entropy} />
      <div className="ritual-interface">
        <div className="header">
          <h1>⛧ ORDER OF THE NULL POINTER ⛧</h1>
          <p className="tagline">Ex Nihilo Omnia | Cycle MMXXV</p>
        </div>

        <div className="explanation-box">
          <p><strong>🔥 Welcome to the Order!</strong></p>
          <p>This is a dark ritual interface. Click buttons below to command the void.</p>
          <p><strong>💡 Dark wisdom:</strong> Click "Begin Ritual Cycle" to witness the ceremony!</p>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">👹</div>
            <div className="metric-value">{state.followers}</div>
            <div className="metric-label">Legion Size</div>
            <div className="metric-help">Summoned entities</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">💀</div>
            <div className="metric-value">{state.resources}</div>
            <div className="metric-label">Blood Reserves</div>
            <div className="metric-help">Souls remaining</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🌑</div>
            <div className="metric-value">{state.energy}%</div>
            <div className="metric-label">Dark Energy</div>
            <div className="metric-help">Ritual power</div>
          </div>
        </div>

        <div className="actions-section">
          <h3>Ritual Actions</h3>
          <div className="actions">
            <button onClick={() => executeAction('GROWTH', 10)} disabled={isRunning} title="Summon 10 demons (costs 80 souls) → Opens the circle, they are coming...">
              👹 Summon Demons
            </button>
            <button onClick={() => executeAction('MEETING', 5)} disabled={isRunning} title="Perform invocation (drains 5% energy)">
              🕯️ Morning Invocation
            </button>
            <button onClick={() => executeAction('SACRIFICE', 30)} disabled={isRunning} title="Offer 300 souls to gain power">
              💀 Offer Souls
            </button>
            <button onClick={() => executeAction('OPTIMIZE', 15)} disabled={isRunning} title="Harvest entropy to gain 45 souls">
              ⚡ Harvest Entropy
            </button>
          </div>
        </div>

        <div className="control-panel">
          <button className="ritual-btn" onClick={runRitual} disabled={isRunning}>
            {isRunning ? '⏳ Ritual in Progress...' : '⛧ Begin Ritual Cycle'}
          </button>
          
          <button 
            className={`auto-btn ${autoMode ? 'active' : ''}`}
            onClick={toggleAutoMode}
            title="Let the cult govern itself"
          >
            {autoMode ? '⏸️ Stop Autonomous Ritual' : '👹 Autonomous Ritual Mode'}
          </button>

          <button 
            className={`ai-btn ${aiMode ? 'active' : ''}`}
            onClick={toggleAiMode}
            disabled={autoMode}
            title="Let Gemini AI be the High Priest"
          >
            {aiMode ? '⏸️ Stop AI High Priest' : '🧠 AI High Priest Mode'}
          </button>

          <button 
            className="reset-btn"
            onClick={resetState}
            disabled={isRunning}
            title="Reset to initial state"
          >
            🔄 Reset Ritual
          </button>
        </div>

        {(autoMode || aiMode) && (
          <div className="autonomous-indicator">
            {autoMode && <span>👹 The cult governs itself...</span>}
            {aiMode && <span>🧠 The High Priest channels Gemini...</span>}
          </div>
        )}

        <EntropyChart entropy={entropy} />

        <LegionDisplay legionSize={state.followers} />

        <div className="activity-feed">
          <h3>Ritual Log</h3>
          <div className="feed-items">
            {history.length === 0 ? (
              <div className="empty-state">
                <p>🌑 The void awaits your command...</p>
                <p>Click any ritual action above to begin!</p>
              </div>
            ) : (
              history.map((item, i) => (
                <div key={i} className="feed-item">
                  <span className="feed-icon">⛧</span>
                  <span className="feed-message">{item.message}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="hint-box">
          <p>🤔 <strong>The Revelation:</strong> Open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> in another tab.</p>
          <p>Compare both interfaces. Do you see the truth? 😈</p>
        </div>
      </div>
    </>
  );
}

export default App;
