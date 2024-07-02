import { rm } from 'node:fs';

export default function clean(argv) {
  rm(argv.output, { recursive: true, force: true }, err => {
    if (err) console.error(`[clean]: error cleaning ${argv.output}`, err);
    
    console.log(`[clean]: cleaned "${argv.output}"`);
  })
}
