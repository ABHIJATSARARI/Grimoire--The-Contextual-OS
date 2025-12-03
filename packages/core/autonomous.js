// Autonomous Agent: Self-Governing Organization
export class AutonomousAgent {
  constructor(entity, mode, onAction) {
    this.entity = entity;
    this.mode = mode;
    this.onAction = onAction;
    this.isRunning = false;
    this.intervalId = null;
  }

  // Policy function: State-driven decision making
  decideAction() {
    const { energy, followers, resources } = this.entity.state;

    // Different strategies per mode
    if (this.mode === 'REALITY') {
      // Startup logic: Growth-focused until cash runs low
      if (resources > 500 && followers < 50) return { action: 'GROWTH', amount: 10 };
      if (resources < 300) return { action: 'OPTIMIZE', amount: 15 };
      if (energy < 50) return { action: 'MEETING', amount: 5 };
      return { action: 'SACRIFICE', amount: 20 };
    } 
    else if (this.mode === 'HELL') {
      // Cult logic: Entropy-seeking, sacrifice-heavy
      if (energy < 150 && resources > 300) return { action: 'SACRIFICE', amount: 30 };
      if (followers < 30 && resources > 400) return { action: 'GROWTH', amount: 10 };
      if (energy > 200) return { action: 'OPTIMIZE', amount: 15 };
      return { action: 'MEETING', amount: 5 };
    }
    else if (this.mode === 'ACADEMIA') {
      // Academic logic: Conservative, meeting-heavy
      if (followers < 20 && resources > 600) return { action: 'GROWTH', amount: 10 };
      if (energy < 60) return { action: 'MEETING', amount: 5 };
      if (resources < 400) return { action: 'OPTIMIZE', amount: 15 };
      return { action: 'SACRIFICE', amount: 25 };
    }

    return { action: 'MEETING', amount: 5 }; // Default
  }

  async start(intervalMs = 2000) {
    if (this.isRunning) return;
    
    this.isRunning = true;
    
    const tick = async () => {
      if (!this.isRunning) return;
      
      const decision = this.decideAction();
      await this.onAction(decision.action, decision.amount);
      
      this.intervalId = setTimeout(tick, intervalMs);
    };
    
    tick();
  }

  stop() {
    this.isRunning = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  isActive() {
    return this.isRunning;
  }
}

// Gemini-Driven Decision Engine
export class GeminiCEO {
  constructor(apiKey, mode) {
    this.apiKey = apiKey;
    this.mode = mode;
  }

  async decideAction(state) {
    if (!this.apiKey || this.apiKey === 'YOUR_API_KEY_HERE') {
      return this.mockDecision(state);
    }

    try {
      const prompts = {
        REALITY: `You are the CEO of a startup. Current state: ${state.followers} employees, $${state.resources}k runway, ${state.energy}% velocity. Choose ONE action: "GROWTH" (hire), "MEETING" (standup), "SACRIFICE" (burn runway), or "OPTIMIZE" (refactor). Reply with ONLY the action name and amount (e.g., "GROWTH 10").`,
        HELL: `You are the High Priest of a dark cult. Current state: ${state.followers} demons, ${state.resources} souls, ${state.energy}% dark energy. Choose ONE ritual: "GROWTH" (summon), "MEETING" (invocation), "SACRIFICE" (offer souls), or "OPTIMIZE" (harvest entropy). Reply with ONLY the action name and amount (e.g., "SACRIFICE 30").`,
        ACADEMIA: `You are a department dean. Current state: ${state.followers} grad students, $${state.resources}k grants, ${state.energy}% research output. Choose ONE action: "GROWTH" (recruit), "MEETING" (faculty meeting), "SACRIFICE" (spend grants), or "OPTIMIZE" (publish). Reply with ONLY the action name and amount (e.g., "OPTIMIZE 15").`
      };

      const prompt = prompts[this.mode];
      const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

      const response = await fetch(`${endpoint}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      const result = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      
      return this.parseDecision(result);
    } catch (error) {
      console.error('Gemini CEO error:', error);
      return this.mockDecision(state);
    }
  }

  parseDecision(text) {
    const match = text.match(/(GROWTH|MEETING|SACRIFICE|OPTIMIZE)\s+(\d+)/i);
    if (match) {
      return { action: match[1].toUpperCase(), amount: parseInt(match[2]) };
    }
    return { action: 'MEETING', amount: 5 };
  }

  mockDecision(state) {
    // Smart mock based on state
    if (state.resources < 300) return { action: 'OPTIMIZE', amount: 15 };
    if (state.energy < 50) return { action: 'MEETING', amount: 5 };
    if (state.followers < 20) return { action: 'GROWTH', amount: 10 };
    return { action: 'SACRIFICE', amount: 25 };
  }
}

// Persistent State Manager
export class StateManager {
  constructor(mode) {
    this.storageKey = `grimoire_${mode}_state`;
  }

  save(state) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({
        ...state,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  }

  load() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        // Return state without timestamp
        const { timestamp, ...state } = data;
        return state;
      }
    } catch (e) {
      console.warn('Failed to load state:', e);
    }
    return null;
  }

  clear() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (e) {
      console.warn('Failed to clear state:', e);
    }
  }

  hasState() {
    return !!localStorage.getItem(this.storageKey);
  }
}
