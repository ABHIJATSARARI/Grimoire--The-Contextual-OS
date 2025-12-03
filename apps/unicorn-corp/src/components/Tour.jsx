import { useState } from 'react';
import './Tour.css';

function Tour({ onClose }) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Grimoire! 🦄",
      content: "This is a Contextual Operating System - one state machine that powers three different realities. Let's take a quick tour!",
      highlight: null
    },
    {
      title: "The Core Concept",
      content: "This startup dashboard shares 90% of its code with a dark cult simulator. Same numbers, different words. That's the point.",
      highlight: ".metrics-grid"
    },
    {
      title: "Manual Actions",
      content: "Click these buttons to manually control your organization. Each action affects your metrics differently.",
      highlight: ".actions"
    },
    {
      title: "Autonomous Mode 🤖",
      content: "Let the organization govern itself! It will make decisions based on its current state. No user input needed.",
      highlight: ".auto-btn"
    },
    {
      title: "AI CEO Mode 🧠",
      content: "Let Gemini AI be the CEO. It analyzes the state and makes unpredictable decisions. Every run is unique!",
      highlight: ".ai-btn"
    },
    {
      title: "The Proof: Charts",
      content: "This chart shows runway depleting. In the cult version, the SAME data shows chaos increasing. Mathematical equivalence!",
      highlight: ".burn-rate-chart"
    },
    {
      title: "AI Analyzer",
      content: "Analyze corporate speak and see how it translates to cult language. Try the examples!",
      highlight: ".ai-analyzer"
    },
    {
      title: "Launch Other Servers 🚀",
      content: "Want to see the other realities? Click the buttons below to open them in new tabs. Compare all three apps side-by-side!",
      highlight: null,
      showServers: true
    }
  ];

  const currentStep = steps[step];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const skipTour = () => {
    // Don't save to localStorage - tour will show every time
    onClose();
  };

  const openServer = (url, name) => {
    window.open(url, '_blank');
  };

  return (
    <div className="tour-overlay">
      <div className="tour-tooltip" onClick={(e) => e.stopPropagation()}>
        <div className="tour-header">
          <span className="tour-step">Step {step + 1} of {steps.length}</span>
          <button className="tour-close" onClick={skipTour}>✕</button>
        </div>
        
        <h3 className="tour-title">{currentStep.title}</h3>
        <p className="tour-content">{currentStep.content}</p>
        
        {currentStep.showServers && (
          <div className="server-buttons">
            <button 
              className="server-btn hell"
              onClick={() => openServer('http://localhost:3001', 'Eldritch Cult')}
            >
              ⛧ Open Eldritch Cult (Port 3001)
            </button>
            <button 
              className="server-btn academia"
              onClick={() => openServer('http://localhost:3002', 'Academia')}
            >
              🎓 Open Academia (Port 3002)
            </button>
            <p className="server-note">
              💡 Make sure to run <code>npm run hell</code> and <code>npm run academia</code> in separate terminals first!
            </p>
          </div>
        )}
        
        <div className="tour-footer">
          <button 
            className="tour-btn secondary" 
            onClick={prevStep}
            disabled={step === 0}
          >
            ← Back
          </button>
          <button className="tour-btn primary" onClick={nextStep}>
            {step === steps.length - 1 ? 'Got it!' : 'Next →'}
          </button>
        </div>
        
        <button className="tour-skip" onClick={skipTour}>
          Skip tour
        </button>
      </div>
    </div>
  );
}

export default Tour;
