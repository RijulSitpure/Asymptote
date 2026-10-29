import { writeDbJsFiles } from './batch11-db-js.js';
import { writeAlgorithms1Files } from './batch11-algorithms-1.js';
import { writeAlgorithms2Files } from './batch11-algorithms-2.js';

console.log('--- Generating Batch 11: LeetCode 1-500 Grand Slam ---');
console.log('\n[1/3] Generating Database & JavaScript problems...');
writeDbJsFiles();

console.log('\n[2/3] Generating Algorithms part 1 (14 problems)...');
writeAlgorithms1Files();

console.log('\n[3/3] Generating Algorithms part 2 (13 problems)...');
writeAlgorithms2Files();

console.log('\n✓ Successfully generated all 30 problems for Batch 11!');
