import { execSync } from 'child_process';
import rimraf from 'rimraf';
import { mkdirSync, writeFileSync, copyFileSync } from 'fs';

// Clean up directory
rimraf.sync('docs');

// Got no nice documentation how to run it from the code, keep failing
// So I've decided to use easy way
execSync('typedoc --out docs --target es6 --theme minimal --mode file src');

// Create file for the circleci so circleci will ignore it
mkdirSync('docs/.circleci');

// And create circleci file there
const code: string = 'version: 2\n' + 'general:\n' + '\tbranches:\n' + '\t\tignore:\n' + '\t\t\t- gh-pages\n';
writeFileSync('docs/.circleci/config.yml', code);
