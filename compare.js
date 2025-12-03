// Side-by-side comparison: The punchline visualized
import { GrimoireEntity, REALITY_DICTIONARY, HELL_DICTIONARY } from './packages/core/index.js';

const realityRenderer = {
  display: (msg, state) => {
    console.log(`  🦄 ${msg.padEnd(40)} | 📊 Team: ${state.followers} | 💰 $${state.resources}k | ⚡ ${state.energy}%`);
    return state;
  }
};

const hellRenderer = {
  display: (msg, state) => {
    console.log(`  ⛧  ${msg.padEnd(40)} | 👹 Legion: ${state.followers} | 💀 ${state.resources} souls | 🌑 ${state.energy}%`);
    return state;
  }
};

console.log('\n╔════════════════════════════════════════════════════════════════════════════════════════════════╗');
console.log('║                    GRIMOIRE: THE CONTEXTUAL OS - SIDE BY SIDE COMPARISON                       ║');
console.log('╚════════════════════════════════════════════════════════════════════════════════════════════════╝\n');

console.log('  ACTION: GROWTH (Expand the organization)\n');
const startup1 = new GrimoireEntity(REALITY_DICTIONARY, realityRenderer);
const cult1 = new GrimoireEntity(HELL_DICTIONARY, hellRenderer);
await startup1.execute('GROWTH', 15);
await cult1.execute('GROWTH', 15);

console.log('\n  ACTION: MEETING (Align the collective)\n');
const startup2 = new GrimoireEntity(REALITY_DICTIONARY, realityRenderer);
const cult2 = new GrimoireEntity(HELL_DICTIONARY, hellRenderer);
startup2.state = { energy: 100, followers: 15, resources: 925 };
cult2.state = { energy: 100, followers: 15, resources: 925 };
await startup2.execute('MEETING', 5);
await cult2.execute('MEETING', 5);

console.log('\n  ACTION: SACRIFICE (Consume resources for power)\n');
const startup3 = new GrimoireEntity(REALITY_DICTIONARY, realityRenderer);
const cult3 = new GrimoireEntity(HELL_DICTIONARY, hellRenderer);
startup3.state = { energy: 95, followers: 15, resources: 925 };
cult3.state = { energy: 95, followers: 15, resources: 925 };
await startup3.execute('SACRIFICE', 50);
await cult3.execute('SACRIFICE', 50);

console.log('\n  ACTION: OPTIMIZE (Improve efficiency)\n');
const startup4 = new GrimoireEntity(REALITY_DICTIONARY, realityRenderer);
const cult4 = new GrimoireEntity(HELL_DICTIONARY, hellRenderer);
startup4.state = { energy: 195, followers: 15, resources: 425 };
cult4.state = { energy: 195, followers: 15, resources: 425 };
await startup4.execute('OPTIMIZE', 20);
await cult4.execute('OPTIMIZE', 20);

console.log('\n╔════════════════════════════════════════════════════════════════════════════════════════════════╗');
console.log('║                                    CONCLUSION                                                  ║');
console.log('╠════════════════════════════════════════════════════════════════════════════════════════════════╣');
console.log('║  Notice: Identical state transitions. Different labels. Same optimization function.            ║');
console.log('║                                                                                                ║');
console.log('║  Thesis: All hierarchical organizations are mathematically equivalent.                         ║');
console.log('║  Proof:  This output.                                                                          ║');
console.log('╚════════════════════════════════════════════════════════════════════════════════════════════════╝\n');
