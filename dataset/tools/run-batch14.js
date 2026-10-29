import { writeBatch14Algo1 } from './batch14-algo-1.js';
import { writeBatch14Algo2 } from './batch14-algo-2.js';

console.log('--- Generating Batch 14: Algorithms 501-750 Core Expansion (25 Problems) ---');

console.log('\n[1/2] Generating first 13 Algorithms problems (#510 - #641)...');
writeBatch14Algo1();

console.log('\n[2/2] Generating remaining 12 Algorithms problems (#642 - #716)...');
writeBatch14Algo2();

console.log('\n✓ Successfully generated all 25 problems for Batch 14!');
