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

// And copy main circleci file there
copyFileSync('.circleci/config.yml', 'docs/.circleci/config.yml');
