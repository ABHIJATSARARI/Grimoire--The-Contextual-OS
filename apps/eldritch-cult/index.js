import { GrimoireEntity, HELL_DICTIONARY } from '@grimoire/core';

const renderer = {
  display: (message, state) => {
    console.log('\n🔥 ORDER OF THE NULL POINTER 🔥');
    console.log('▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
    console.log(`⛧ ${message}`);
    console.log(`👹 Legion Size: ${state.followers}`);
    console.log(`💀 Blood Reserves: ${state.resources} units`);
    console.log(`🌑 Dark Energy: ${state.energy}%`);
    console.log('▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n');
    return state;
  }
};

const cult = new GrimoireEntity(HELL_DICTIONARY, renderer);

console.log('⛧ RITUAL CYCLE MMXXV SIMULATION\n');

await cult.execute('GROWTH', 15);
await cult.execute('MEETING', 5);
await cult.execute('SACRIFICE', 50);
await cult.execute('OPTIMIZE', 20);

console.log('🌑 RESULT: The Void hungers. Entropy +15%. The merge draws near.');
