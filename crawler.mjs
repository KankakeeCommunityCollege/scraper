import { readdir } from 'node:fs';
import { open } from 'node:fs/promises';
import { Counter } from './utils.mjs';

export default function crawler(argv) {
  if (argv.regex === '') {
    console.error(`regex cannot be an empty string`);
    process.exit(1);
  }
  
  const searchRegex = new RegExp(
    argv.regex,
    argv.flags
  );

  console.log(`[USING REGEX]: ${searchRegex}`);

  async function fileReader(file) {
    const fileHandle = await open(`${argv.output}${file}`);
    const counter = new Counter(0);

    for await (const line of fileHandle.readLines()) {
      counter.increment();
      if (line.search(searchRegex) !== -1) {
        const matches = line.match(searchRegex);

        matches.forEach(
          match => console.log(`[FILE]:  ${file} (line: ${counter.report()})
[FOUND]: ${match}
[LINE]:  ${line}\n=====`)
        );
      }
    }
  }

  console.log(`\n==== [SEARCHING in: ${argv.output}] ====`);

  readdir(argv.output, { recursive: true }, (err, files) => {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    }

    // Filter out directories so that fileReader doesn't error on them
    const htmlFileRegExp = /.+\.(html)$/;
    const htmlFiles = files.filter(file => !file.search(htmlFileRegExp));

    htmlFiles.forEach(fileReader);
  });

  console.log(`\n====   [RESULTS]    ====`);
}
