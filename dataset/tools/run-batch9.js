import { writeShellPandasFiles } from './batch9-shell-pandas.js';
import { writeConcurrencyFiles } from './batch9-concurrency.js';
import { writeAlgorithmsFiles } from './batch9-algorithms.js';

console.log('=== Compiling Batch 9 Problems ===\n');
writeShellPandasFiles();
writeConcurrencyFiles();
writeAlgorithmsFiles();
console.log('\n✓ Successfully generated all 30 Batch 9 curated problems.');
