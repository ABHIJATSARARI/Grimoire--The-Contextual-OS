import { useState, useEffect, useRef } from 'react';
import { GrimoireEntity, REALITY_DICTIONARY } from '@grimoire/core';
import { AutonomousAgent, GeminiCEO, StateManager } from '@grimoire/core/autonomous';
import AIAnalyzer from './components/AIAnalyzer';
import ConfettiEffect from './components/ConfettiEffect';
import CoinRain from './components/CoinRain';
import Toast from './components/Toast';
import BurnRateChart from './components/BurnRateChart';
import TeamDisplay from './components/TeamDisplay';
import SplashScreen from './components/SplashScreen';
import Tour from './components/Tour';
import './App.css';

function App() {
  const stateManager = useRef(new StateManager('REALITY'));
  const [state, setState] = useState(() => {
    const saved = stateManager.current.load();
    return saved || { energy: 100, followers: 0, resources: 1000 };
  });
  const [history, setHistory] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(0);
  const [burnRate, setBurnRate] = useState(0);
  const [toast, setToast] = useState(null);
  const [autoMode, setAutoMode] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showTour, setShowTour] = useState(false);
  const autonomousAgent = useRef(null);
  const geminiCEO = useRef(null);

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Always show tour on every refresh
    setTimeout(() => setShowTour(true), 500);
  };

  const renderer = {
    display: (message, newState) => {
      setHistory(prev => [...prev, { message, state: { ...newState }, timestamp: Date.now() }]);
      setState(newState);
      return newState;
    }
  };

  const entity = new GrimoireEntity(REALITY_DICTIONARY, renderer, 'REALITY');
  entity.state = state;

  const executeAction = async (action, amount) => {
    // Generate narrative using Gemini
    const { GeminiAnalyzer } = await import('@grimoire/core/gemini');
    const analyzer = new GeminiAnalyzer(import.meta.env.VITE_GEMINI_API_KEY || '');
    const narrative = await analyzer.generateNarrative(action, 'REALITY', { amount });
    
    // REALITY MODE: Professional toast notification
    const toastMessage = `✅ ${narrative}`;
    
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
    setShowConfetti(prev => prev + 1);
    
    // Calculate burn rate for visual effects (percentage of money lost)
    const moneyLost = 1000 - entity.state.resources;
    const burnPercentage = (moneyLost / 1000) * 100;
    setBurnRate(burnPercentage);
  };

  // Initialize autonomous agent after executeAction is defined
  useEffect(() => {
    if (!autonomousAgent.current) {
      autonomousAgent.current = new AutonomousAgent(entity, 'REALITY', executeAction);
    }
    if (!geminiCEO.current) {
      geminiCEO.current = new GeminiCEO(import.meta.env.VITE_GEMINI_API_KEY || '', 'REALITY');
    }
  }, []);

  // Save state on changes
  useEffect(() => {
    stateManager.current.save(state);
  }, [state]);

  const runDemo = async () => {
    setIsRunning(true);
    setHistory([]);
    setState({ energy: 100, followers: 0, resources: 1000 });
    setBurnRate(0);
    
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
    setBurnRate(0);
    if (autoMode) toggleAutoMode();
    if (aiMode) setAiMode(false);
  };

  // Apply visual effects based on state (subtle!)
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      // Only apply effects when burn rate is very high (>80%)
      const burnIntensity = Math.max(0, (burnRate - 80) / 20);
      root.style.filter = `blur(${burnIntensity * 0.5}px) hue-rotate(${burnIntensity * 10}deg)`;
    }
  }, [burnRate]);

  // Don't render app until splash is complete
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <>
      {showTour && <Tour onClose={() => setShowTour(false)} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <ConfettiEffect trigger={showConfetti} />
      <CoinRain resources={state.resources} />
      <div className="dashboard">
      <div className="header">
        <h1>🦄 Unicorn Corp</h1>
        <p className="tagline">Disrupting the Disruption | Q3 2025</p>
      </div>

      <div className="explanation-box">
        <p><strong>👋 Welcome to Unicorn Corp!</strong></p>
        <p>This is a startup dashboard. Click buttons below to manage your company.</p>
        <p><strong>💡 Pro tip:</strong> Click "Run Q3 OKR Demo" to see an automated simulation!</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-value">{state.followers}</div>
          <div className="metric-label">Team Size</div>
          <div className="metric-help">Number of employees</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-value">${state.resources}k</div>
          <div className="metric-label">Runway</div>
          <div className="metric-help">Cash remaining</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">⚡</div>
          <div className="metric-value">{state.energy}%</div>
          <div className="metric-label">Velocity</div>
          <div className="metric-help">Team productivity</div>
        </div>
      </div>

      <div className="actions-section">
        <h3>Actions</h3>
        <div className="actions">
          <button onClick={() => executeAction('GROWTH', 10)} disabled={isRunning} title="Hire 10 developers (costs $50k) → Sends offer letters via DocuSign">
            👥 Hire Talent
          </button>
          <button onClick={() => executeAction('MEETING', 5)} disabled={isRunning} title="Hold a meeting (reduces velocity by 5%)">
            📅 Daily Standup
          </button>
          <button onClick={() => executeAction('SACRIFICE', 30)} disabled={isRunning} title="Spend $300k to boost velocity">
            🔥 Burn Runway
          </button>
          <button onClick={() => executeAction('OPTIMIZE', 15)} disabled={isRunning} title="Improve code to gain $45k">
            🔧 Refactor Code
          </button>
        </div>
      </div>

      <div className="control-panel">
        <button className="demo-btn" onClick={runDemo} disabled={isRunning}>
          {isRunning ? '⏳ Running Q3 Simulation...' : '🎯 Run Q3 OKR Demo'}
        </button>
        
        <button 
          className={`auto-btn ${autoMode ? 'active' : ''}`}
          onClick={toggleAutoMode}
          title="Let the organization govern itself"
        >
          {autoMode ? '⏸️ Stop Autonomous Mode' : '🤖 Start Autonomous Mode'}
        </button>

        <button 
          className={`ai-btn ${aiMode ? 'active' : ''}`}
          onClick={toggleAiMode}
          disabled={autoMode}
          title="Let Gemini AI be the CEO"
        >
          {aiMode ? '⏸️ Stop AI CEO' : '🧠 AI CEO Mode'}
        </button>

        <button 
          className="reset-btn"
          onClick={resetState}
          disabled={isRunning}
          title="Reset to initial state"
        >
          🔄 Reset
        </button>
      </div>

      {(autoMode || aiMode) && (
        <div className="autonomous-indicator">
          {autoMode && <span>🤖 Organization is self-governing...</span>}
          {aiMode && <span>🧠 Gemini AI is making decisions...</span>}
        </div>
      )}

      <BurnRateChart burnRate={burnRate} />

      <TeamDisplay teamSize={state.followers} />

      <div className="activity-feed">
        <h3>Activity Feed</h3>
        <div className="feed-items">
          {history.length === 0 ? (
            <div className="empty-state">
              <p>📋 No activity yet.</p>
              <p>Click any button above to see what happens!</p>
            </div>
          ) : (
            history.map((item, i) => (
              <div key={i} className="feed-item">
                <span className="feed-icon">✅</span>
                <span className="feed-message">{item.message}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <AIAnalyzer />

      <div className="hint-box">
        <p>🤔 <strong>The Secret:</strong> Open <a href="http://localhost:3001" target="_blank">http://localhost:3001</a> in another tab.</p>
        <p>Watch both apps side-by-side. Notice anything familiar? 😉</p>
        <button className="tour-restart-btn" onClick={() => setShowTour(true)}>
          🎯 Restart Tour
        </button>
      </div>
    </div>
    </>
  );
}

export default App;
