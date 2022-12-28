#! /usr/bin/env bash
cd docs
touch .nojekyll
git init
git add .
git config user.name "gridcat"
git config user.email "gridcat@protonmail.com"
git commit -m "docs(docs): update gh-pages"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/gridcat/gridcoin-rpc.git" master:gh-pages