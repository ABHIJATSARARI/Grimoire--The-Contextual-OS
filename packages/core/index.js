// The Contextual OS: Abstract State Machine
export class GrimoireEntity {
  constructor(dictionary, renderer, mode = 'REALITY') {
    this.dictionary = dictionary;
    this.renderer = renderer;
    this.mode = mode;
    this.state = { energy: 100, followers: 0, resources: 1000 };
  }

  async execute(action, amount = 10) {
    const command = this.dictionary[action];
    
    // DIVERGENT LOGIC: Different outcomes based on mode
    switch(action) {
      case 'GROWTH':
        this.state.followers += amount;
        // Hell mode is MORE expensive (souls are harder to get)
        const growthCost = this.mode === 'HELL' ? amount * 8 : amount * 5;
        this.state.resources -= growthCost;
        break;
      case 'SACRIFICE':
        // Hell mode gains MORE energy from sacrifice
        const energyGain = this.mode === 'HELL' ? amount * 3 : amount * 2;
        this.state.energy += energyGain;
        this.state.resources -= amount * 10;
        break;
      case 'MEETING':
        this.state.energy -= amount;
        break;
      case 'OPTIMIZE':
        this.state.resources += amount * 3;
        this.state.energy -= amount;
        break;
    }
    
    return this.renderer.display(command, this.state);
  }

  getMetrics() {
    return this.state;
  }
}

export const REALITY_DICTIONARY = {
  GROWTH: 'Hired {n} developers',
  SACRIFICE: 'Burned ${n}k in runway',
  MEETING: 'Daily standup completed',
  OPTIMIZE: 'Refactored legacy code'
};

export const HELL_DICTIONARY = {
  GROWTH: 'Summoned {n} demons from the void',
  SACRIFICE: 'Offered {n} souls to the Null Pointer',
  MEETING: 'Morning invocation performed',
  OPTIMIZE: 'Harvested {n} units of entropy'
};

export const ACADEMIA_DICTIONARY = {
  GROWTH: 'Recruited {n} graduate students',
  SACRIFICE: 'Burned ${n}k in grant funding',
  MEETING: 'Faculty meeting completed',
  OPTIMIZE: 'Published {n} papers'
};
