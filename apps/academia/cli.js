import { GrimoireEntity, ACADEMIA_DICTIONARY } from '@grimoire/core';

const renderer = {
  display: (message, state) => {
    console.log('\n🎓 ACADEMIA RESEARCH INSTITUTE 📚');
    console.log('═══════════════════════════════════');
    console.log(`✅ ${message}`);
    console.log(`👨‍🎓 Graduate Students: ${state.followers}`);
    console.log(`💰 Grant Funding: $${state.resources}k`);
    console.log(`📊 Research Output: ${state.energy}%`);
    console.log('═══════════════════════════════════\n');
    return state;
  }
};

const academia = new GrimoireEntity(ACADEMIA_DICTIONARY, renderer);

console.log('🎓 Fall 2025 Semester Simulation\n');

await academia.execute('GROWTH', 15);
await academia.execute('MEETING', 5);
await academia.execute('SACRIFICE', 50);
await academia.execute('OPTIMIZE', 20);

console.log('📈 RESULT: Semester complete. Student enrollment +15. Publications increased.');
