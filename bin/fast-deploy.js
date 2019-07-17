#! /usr/bin/env node
const shell = require("shelljs");
const program = require("commander");
var client = require('firebase-tools');
const cmd = program.parse(process.argv);
const option = cmd.args[0];
const fs = require("fs");
const archiver = require('archiver');

var child = require('child_process');
var firebaseUrl;
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
console.log(cmd.args[0]);
if (option == "init") {
  var thisFile = __dirname.replaceAll("\\", "/");
  thisFile = thisFile.replace('/bin', '')
  shell.exec("mkdir host-files");
  shell.exec("mkdir zip-files");



  // shell.exec("firebase login");
  shell.cd("host-files");
  // child.execSync("cd host-files", {stdio: 'inherit'});
  shell.exec("mkdir public");
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
  shell.cd("public");
  shell.exec("mkdir admin");
  shell.exec("mkdir user");
  shell.exec("mkdir server-files");
  shell.cd("server-files");
  makeFile("renderer.js", thisFile + "/prewritten/renderer.js");
  shell.cd("..");
  shell.cd("admin");
  shell.exec("mkdir html");
  shell.exec("mkdir css");
  shell.exec("mkdir scripts");
  shell.exec("mkdir images");
  shell.cd("scripts");
  makeFile("scripts.js",thisFile + "/prewritten/admin.js");
  shell.cd("..");
  shell.cd("html");
  makeFile('index.html', thisFile + "/prewritten/render.html");
  shell.cd("..");
  shell.cd("..");
  shell.cd("user");
  shell.exec("mkdir html");
  shell.exec("mkdir css");
  shell.exec("mkdir scripts");
  shell.exec("mkdir images");
  shell.cd("scripts");
  makeFile("scripts.js", thisFile + "/prewritten/userscripts.js");
  shell.cd("..");
  shell.cd("..");
  shell.cd("..");
  shell.cd("..");

  shell.cd("zip-files");
  shell.exec("mkdir admin");
  shell.exec("mkdir user");

  shell.cd("admin");
  shell.exec("mkdir html");
  shell.cd("html");
  makeFile("index.html", thisFile + "/prewritten/zip.html");
  shell.cd("..");
  shell.cd("..");

  shell.cd("user");
  shell.exec("mkdir scripts");
  shell.cd("scripts");
  makeFile("scripts.js", thisFile + "/prewritten/user.js");
  shell.cd("..");
  shell.cd("..");
  shell.cd("..");
  shell.exec("arcadier deploy");
  var output = fs.createWriteStream('./UploadThis.zip');
  var archive = archiver("zip");
  archive.pipe(output);
  archive.directory("zip-files",{name:"zip-files"});
  archive.finalize();
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
else if(option == "finalize")
{
  var output = fs.createWriteStream('./package.zip');
  var archive = archiver("zip");
  archive.pipe(output);
  shell.cd("host-files/public");
  archive.directory("admin",{name:"admin"});
  archive.directory("user",{name:"user"});

  archive.finalize();
}

else
{
  console.log(option + " is not a valid arcadier command")
}
// shell.exec("mkdir")
function makeFile(filePathWrite, filePathRead) {
  var read = fs.readFileSync(filePathRead).toString().replaceAll("<BASE-URL-FOR-FIREBASE-WEBAPP>",firebaseUrl);
  fs.writeFileSync(filePathWrite, read);
}
