#! /usr/bin/env node
const shell = require("shelljs");
const program = require("commander");
const cmd = program.parse(process.argv);
const option = cmd.args[0];
const fs = require("fs");
var client = require('firebase-tools');
var child = require('child_process');
var firebaseUrl;
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
if (option == "init") {
  var thisFile = __dirname.replaceAll("\\", "/");
  thisFile = thisFile.replace('/bin', '')
  shell.exec("mkdir host-files");
  shell.exec("mkdir zip-files");
  // shell.exec("firebase login");
  shell.cd("host-files");
  // child.execSync("cd host-files", {stdio: 'inherit'});
  shell.exec("mkdir public");
  shell.cd("public");
  makeFile('render.html', thisFile + "/prewritten/render.html");
  shell.exec("mkdir css");
  shell.exec("mkdir scripts");
  shell.cd("scripts");
  makeFile("renderer.js", thisFile + "/prewritten/renderer.js");
  makeFile("adminScript.js",thisFile + "/prewritten/admin.js");
  makeFile("userScript.js", thisFile + "/prewritten/userscripts.js");
  shell.cd("..")
  shell.exec("mkdir images");
  // call write for render.html
  shell.cd("..");
  try {
    child.execSync('firebase init', { stdio: 'inherit' });
  }
  catch(err){
    console.log("\n Downloading Firebase....")
    child.execSync('npm install -g firebase-tools', {stdio: 'inherit'});
    child.execSync('firebase init', {stdio: 'inherit'});
  }
  var firebaserc = fs.readFileSync(".firebaserc");
  firebaserc = JSON.parse(firebaserc);
  firebaseUrl = firebaserc["projects"]["default"]+".firebaseapp.com";
  shell.cd("..");
  shell.cd("zip-files");
  shell.exec("mkdir admin");
  shell.exec("mkdir user");

  shell.cd("admin");
  shell.exec("mkdir css");
  shell.exec("mkdir html");
  shell.cd("html");
  makeFile("index.html", thisFile + "/prewritten/zip.html");
  shell.cd("..");
  shell.exec("mkdir scripts");
  shell.exec("mkdir images");
  shell.cd("..");

  shell.cd("user");
  shell.exec("mkdir css");
  shell.exec("mkdir html");
  shell.exec("mkdir scripts");
  shell.cd("scripts");
  makeFile("scripts.js", thisFile + "/prewritten/user.js");
  shell.cd("..");
  shell.exec("mkdir images");
  shell.cd("..");
  shell.cd("..");
  shell.exec("arcadier deploy");



}
else if (option == "firebase-login") {
  try {
    child.execSync('firebase login', { stdio: 'inherit' });
  }
  catch(err){
    console.log("\n Downloading Firebase....")
    child.execSync('npm install -g firebase-tools', {stdio: 'inherit'});
    child.execSync('firebase login', {stdio: 'inherit'});
  }

}
else if (option == "deploy") {
  shell.cd("host-files");
  child.execSync('firebase deploy', { stdio: 'inherit' });
}
// shell.exec("mkdir")
function makeFile(filePathWrite, filePathRead) {
  var read = fs.readFileSync(filePathRead).toString().replaceAll("<BASE-URL-FOR-FIREBASE-WEBAPP>",firebaseUrl);
  fs.writeFileSync(filePathWrite, read);
}
