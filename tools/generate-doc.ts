/* eslint-disable import/no-extraneous-dependencies */
import { execSync } from 'child_process';
import rimraf from 'rimraf';
import { mkdirSync, copyFileSync } from 'fs';

// Clean up directory
rimraf.sync('docs');

// Got no nice documentation how to run it from the code, keep failing
// So I've decided to use easy way
// execSync('npx typedoc --out docs --theme minimal src');
execSync('npx typedoc --tsconfig ./tsconfig.json --out docs --theme default ./src/*');

// Create file for the circleci so circleci will ignore it
mkdirSync('docs/.circleci');

// And copy circleci file there
copyFileSync('.circleci/config.yml', 'docs/.circleci/config.yml');
