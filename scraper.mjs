#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import clean from './clean.mjs';
import spawnWget from './spawnWget.mjs';
import crawler from './crawler.mjs';
// import { spawn } from 'node:child_process';

yargs(hideBin(process.argv))
  .usage('Usage: $0 <cmd> [options]') // usage string of application.
  .command({
    command: 'clean',
    describe: 'clean the output folder',
    builder: yargs => {
      yargs.options({
        'o': {
          alias: 'output',
          describe: 'the folder to clean',
          demandOption: true,
          type: 'string',
        }
      })
    },
    handler: clean
  })
  .command({
    command: 'copy',
    describe: 'copy a website locally using wget',
    builder: yargs => {
      yargs.options({
        'u': {
          alias: 'url',
          demandOption: true,
          describe: 'the url to fetch with wget',
          type: 'string'
        },
        'v': {
          alias: 'verbose',
          describe: 'make wget output verbose (use -q to silence output)',
          type: 'boolean'
        },
        'q': {
          alias: 'quiet',
          describe: 'quiet output for wget command',
          type: 'boolean'
        },
        'o': {
          alias: 'output',
          describe: 'the folder to copy the website to',
          default: './copy/',
          type: 'string'
        },
        'c': {
          alias: 'clean',
          describe: 'clean the output folder first',
          default: true,
          type: 'boolean'
        },
        'w': {
          alias: 'wait',
          describe: 'adjust the wait time between requests for wget (used with --random-wait)',
          default: 1,
          type: 'number'
        }
      })
    },
    handler: spawnWget
  })
  .command({
    command: 'crawl',
    describe: 'crawl the website line-by-line looking for a regex pattern',
    builder: yargs => {
      yargs.options({
        'r': {
          alias: ['regex', 'regexp'],
          demandOption: true,
          describe: 'the regex pattern to search for',
          type: 'string'
        },
        'f': {
          alias: 'flags',
          describe: 'the regex flags to use',
          default: 'g',
          type: 'string'
        },
        'o': {
          alias: 'output',
          describe: 'output folder where website was copied to',
          default: './copy/',
          type: 'string'
        }
      })
    },
    handler: crawler
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .parse()

