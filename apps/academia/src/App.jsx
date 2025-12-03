import { useState } from 'react';
import { GrimoireEntity, ACADEMIA_DICTIONARY } from '@grimoire/core';
import './App.css';

function App() {
  const [state, setState] = useState({ energy: 100, followers: 0, resources: 1000 });
  const [history, setHistory] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const renderer = {
    display: (message, newState) => {
      setHistory(prev => [...prev, { message, state: { ...newState }, timestamp: Date.now() }]);
      setState(newState);
      return newState;
    }
  };

  const entity = new GrimoireEntity(ACADEMIA_DICTIONARY, renderer, 'ACADEMIA');
  entity.state = state;

  const executeAction = async (action, amount) => {
    await entity.execute(action, amount);
  };

  const runDemo = async () => {
    setIsRunning(true);
    setHistory([]);
    setState({ energy: 100, followers: 0, resources: 1000 });
    
    await new Promise(r => setTimeout(r, 500));
    await executeAction('GROWTH', 15);
    await new Promise(r => setTimeout(r, 800));
    await executeAction('MEETING', 5);
    await new Promise(r => setTimeout(r, 800));
    await executeAction('SACRIFICE', 50);
    await new Promise(r => setTimeout(r, 800));
    await executeAction('OPTIMIZE', 20);
    
    setIsRunning(false);
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>🎓 Academia Research Institute</h1>
        <p className="tagline">Advancing Knowledge | Fall 2025</p>
      </div>

      <div className="explanation-box">
        <p><strong>📚 Welcome to Academia!</strong></p>
        <p>This is a research institution dashboard. Manage your department below.</p>
        <p><strong>💡 Quick demo:</strong> Click "Run Semester Simulation" to see it in action!</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">👨‍🎓</div>
          <div className="metric-value">{state.followers}</div>
          <div className="metric-label">Graduate Students</div>
          <div className="metric-help">Research assistants</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-value">${state.resources}k</div>
          <div className="metric-label">Grant Funding</div>
          <div className="metric-help">Available budget</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-value">{state.energy}%</div>
          <div className="metric-label">Research Output</div>
          <div className="metric-help">Department productivity</div>
        </div>
      </div>

      <div className="actions-section">
        <h3>Department Actions</h3>
        <div className="actions">
          <button onClick={() => executeAction('GROWTH', 10)} disabled={isRunning}>
            👨‍🎓 Recruit Students
          </button>
          <button onClick={() => executeAction('MEETING', 5)} disabled={isRunning}>
            📅 Faculty Meeting
          </button>
          <button onClick={() => executeAction('SACRIFICE', 30)} disabled={isRunning}>
            💸 Spend Grant Money
          </button>
          <button onClick={() => executeAction('OPTIMIZE', 15)} disabled={isRunning}>
            📝 Publish Papers
          </button>
        </div>
      </div>

      <button className="demo-btn" onClick={runDemo} disabled={isRunning}>
        {isRunning ? '⏳ Running Semester...' : '🎓 Run Semester Simulation'}
      </button>

      <div className="activity-feed">
        <h3>Department Log</h3>
        <div className="feed-items">
          {history.length === 0 ? (
            <div className="empty-state">
              <p>📋 No activity yet.</p>
              <p>Click any button above to manage your department!</p>
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

      <div className="hint-box">
        <p>🤔 <strong>Notice something?</strong> Compare with <a href="http://localhost:3000" target="_blank">Unicorn Corp</a> and <a href="http://localhost:3001" target="_blank">Eldritch Cult</a></p>
        <p>Same numbers, different context. That's the point! 🎯</p>
      </div>
    </div>
  );
}

export default App;
