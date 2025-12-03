// Verification script: Proves both dictionaries produce identical state
import { GrimoireEntity, REALITY_DICTIONARY, HELL_DICTIONARY } from './index.js';

const nullRenderer = { display: (msg, state) => state };

console.log('🧪 GRIMOIRE VERIFICATION TEST\n');
console.log('Testing: Both dictionaries produce identical state transitions\n');

// Test Reality mode
const startup = new GrimoireEntity(REALITY_DICTIONARY, nullRenderer);
await startup.execute('GROWTH', 15);
await startup.execute('MEETING', 5);
await startup.execute('SACRIFICE', 50);
await startup.execute('OPTIMIZE', 20);
const realityState = startup.getMetrics();

// Test Hell mode
const cult = new GrimoireEntity(HELL_DICTIONARY, nullRenderer);
await cult.execute('GROWTH', 15);
await cult.execute('MEETING', 5);
await cult.execute('SACRIFICE', 50);
await cult.execute('OPTIMIZE', 20);
const hellState = cult.getMetrics();

// Compare
console.log('Reality State:', realityState);
console.log('Hell State:   ', hellState);

const identical = JSON.stringify(realityState) === JSON.stringify(hellState);

if (identical) {
  console.log('\n✅ VERIFICATION PASSED');
  console.log('Both modes produce identical state transitions.');
  console.log('The thesis is proven: Startups and cults are mathematically equivalent.\n');
  process.exit(0);
} else {
  console.log('\n❌ VERIFICATION FAILED');
  console.log('State divergence detected. Check core logic.\n');
  process.exit(1);
}
