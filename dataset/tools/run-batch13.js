import { writeBatch13Js1 } from './batch13-js-1.js';
import { writeBatch13Js2 } from './batch13-js-2.js';
import { writeBatch13Db } from './batch13-db.js';

console.log('--- Generating Batch 13: Milestone 2 & Database Expansion (30 Problems) ---');

console.log('\n[1/3] Generating first 12 JavaScript problems (#2724 - #2775)...');
writeBatch13Js1();

console.log('\n[2/3] Generating final 12 JavaScript problems (#2776 - #2823) [Completing 100% JS Domain]...');
writeBatch13Js2();

console.log('\n[3/3] Generating 6 Database problems (#512, #534, #550, #574, #580, #585)...');
writeBatch13Db();

console.log('\n✓ Successfully generated all 30 problems for Batch 13!');
