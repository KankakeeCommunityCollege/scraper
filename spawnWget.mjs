import { spawn } from 'node:child_process';
import { rm } from 'node:fs';

export default function spawnWget(argv) {
  const cleanPromise = new Promise((res, rej) => {
    if (argv.clean) { // clean the output directory
      rm(argv.output, { recursive: true, force: true }, err => {
        if (err) rej(err);
        res(`[clean]: cleaned "${argv.output}"`);
      })
    } else {
      res('[clean]: skipping cleaning of output dir');
    }
  });

  cleanPromise.then((cleanMsg) => {
    console.log(cleanMsg);
    console.log(`[wget]: copying "${argv.url}" to "${argv.output}"...`);

    const quiet = (argv.quiet === undefined || argv.quiet === false) ? '' : '-q';
    const verbose = (argv.verbose === undefined || argv.verbose === false) ? '-nv' : '';
    const wget = spawn(`wget \
-E -r ${quiet} --no-parent ${verbose} \
--random-wait --wait=${argv.wait} \
--reject '*.js,*.css,*.ico,*.txt,*.gif,*.jpg,*.jpeg,*.png,*.mp3,*.pdf,*.tgz,*.flv,*.avi,*.mpeg,*.iso' \
--ignore-tags=img,link,script \
--header="Accept: text/html" \
-e robots=off \
-P ${argv.output} \
--no-host-directories \
${argv.url} \
--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"`,
      {
        stdio: 'inherit',
        shell: true
      }
    );

    wget.on('close', (code) => {
      console.log(`[wget success]: exited with code ${code}`);
    });
  }).catch(err => console.error(err));
}
