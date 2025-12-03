import { GrimoireEntity, REALITY_DICTIONARY } from '@grimoire/core';

const renderer = {
  display: (message, state) => {
    console.log('\n🦄 UNICORN CORP DASHBOARD 🚀');
    console.log('═══════════════════════════════');
    console.log(`✅ ${message}`);
    console.log(`📊 Team Size: ${state.followers}`);
    console.log(`💰 Runway: $${state.resources}k`);
    console.log(`⚡ Velocity: ${state.energy}%`);
    console.log('═══════════════════════════════\n');
    return state;
  }
};

const startup = new GrimoireEntity(REALITY_DICTIONARY, renderer);

console.log('🎯 Q3 2025 OKR Execution Simulation\n');

await startup.execute('GROWTH', 15);
await startup.execute('MEETING', 5);
await startup.execute('SACRIFICE', 50);
await startup.execute('OPTIMIZE', 20);

console.log('📈 RESULT: Q3 OKRs exceeded. Headcount +15%. Series B imminent.');
