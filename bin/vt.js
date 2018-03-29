#!/usr/bin/env node

const program = require('commander');

program
  .version('1.0.2', '-v, --version')
  .usage('<command>')
  // .on('--help', function() {
  //   console.log();
  //   console.log('  Enter vt <command> -h for detailed help, examples:');
  //   console.log();
  //   console.log('    $ vt g -h ');
  //   console.log('    $ vt generate -h');
  //   console.log();
  // });

program
.command('generate <component-name>','generate the vue component').alias('g')

program.parse(process.argv);
// define parameter types vue-ts-cli generate/g xxx/*  --tsx (if using tsx) will

console.log(program.command.name);