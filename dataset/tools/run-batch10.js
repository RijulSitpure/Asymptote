import { writeJavaScriptFiles } from './batch10-javascript.js';
import { writeDatabaseFiles } from './batch10-database.js';
import { writeAlgorithmsFiles } from './batch10-algorithms.js';

console.log('=== Compiling Batch 10 Problems ===\n');
writeJavaScriptFiles();
writeDatabaseFiles();
writeAlgorithmsFiles();
console.log('\n✓ Successfully generated all 30 Batch 10 curated problems.');
