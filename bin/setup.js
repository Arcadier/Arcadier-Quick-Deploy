#! /usr/bin/env node
const shell = require("shelljs");
var child = require('child_process');

try
{
  child.execSync('firebase login', { stdio: 'inherit' });
}
catch(err)
{
  console.log("Downloading Firebase....");
  shell.exec("npm install -g firebase-tools");
  child.execSync('firebase login', { stdio: 'inherit' });
}

try
{
  const program = require("commander");
}
catch(err)
{
  console.log("Downloading Commander....");
  shell.exec("npm install -g commander");
}


console.log("Setup Complete!");
