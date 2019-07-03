# arcadier-tools

These tools are made for developers to increase the efficiency of developing plugins for arcadier marketplaces. Inspiration for making these tools arose from making massive and frequent changes to a plugin. The tools increase development rate for plugins by mitigating the zipping process and reducing uploading changes to the dashboard.

## Installation

This is an npm package available at the [npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):


```bash
$ npm install arcadier-tools -g
```
In order to give global access for bash use sudo

```bash
$ sudo npm install arcadier-tools -g
```

After installing the package run the following to setup the arcadier-tools globally. 
```bash
$ arcadier-setup
```

## Features and Commands

1. On setting up the arcadier tools globally, run the following bash command after installing the npm package
    ```bash
    $ arcadier-setup
    ```

2. To make a plugin directory, open up the required directory from the terminal and run the following command to setup the file structure
    ```bash
    $ arcadier init
    ```
    The directory will come initialized with a zip file, the zip file contains the plugin structure which needs to be uploaded onto the admin dashboard. 

3. To deploy changes made to your plugin run the following command
    ```bash
    $ arcadier deploy
    ```
4. Once the plugin is finished and no more changes need to be made on firebase, we use the following 
    ```bash
    $ arcadier finalize
    ```
    to create a zip file which contains the final plugin code. <br/>
    Upload this zip file onto the admin dashboard, this will remove the need to use firebase hosting for any code.

## Setting up the development environment

Create a project on the google [firebase console](https://firebase.google.com/). 
<br>
![create project](gif/create-project-firebase.gif)
<br>
Open the required directory on the terminal, and run the following command to setup the required file structure
for development.  

```bash
$ arcadier init
```
Pick the following options while setting up the directory using arcadier init
<br>
![arcadier init](gif/arcadier-init.gif)
<br>
There should be an initial zip file. Upload the zip file to the developer dashboard, then install the package from the admin of your test/sandbox/dev marketplace.
<br>
![upload zip](gif/upload-zip.gif)
<br>


## Development environment

File structure
```bash
├───UploadThis.zip
│
├───host-files
│   │   .firebaserc
│   │   .gitignore
│   │   firebase.json
│   │
│   ├───.firebase
│   │       hosting.cHVibGlj.cache
│   │
│   └───public
│       │   404.html
│       │   index.html
│       │
│       ├───admin
│       │   ├───css
│       │   ├───html
│       │   │      index.html
│       │   │
│       │   ├───images
│       │   └───scripts
│       │           scripts.js
│       │
│       ├───server-files
│       │       renderer.js
│       │
│       └───user
│           ├───css
│           ├───html
│           ├───images
│           └───scripts
│                   scripts.js
│
└───zip-files
    ├───admin
    │   └───html
    │         index.html
    │
    └───user
        └───scripts
               scripts.js                              
```

Make any changes as you normally would inside the public folder inside the host-files, write code inside the admin and user side as you would do normally while making a plugin. Upon making changes to the plugin deploy the changes to witness the changes being made and finally finalize the project when its done and upload the finalized zip.

## Deploying changes to the deployed plugin 

After making a change to the plugin, run the following command to make changes to the deployed plugin. 
```bash
$ arcadier deploy
```
Hard refresh the page in order to witness the changes made using ```Ctrl+Shift+R```

![looking at changes](gif/making-changes.gif)

## Finalize the changes made 

Run the following command to zip the final plugin, this eliminates the need to use firebase to host any files.
```bash
arcadier finalize
```
![arcadier finalize](gif/arcadier-finalize.gif)

This should have made a zip file in your root directory called ```package.zip```. Upload this file to your developer dashboard and upgrade your package from the admin side to view the changes made.

![upload gif](gif/upload-final.gif)

## Issues
* While writing code for the user, there is a problem with the linking of the html, css and images in the package because of the change of domain of the firebase with respect to the plugin on the marketplace.
* Changes cannot be made to the PHP code as PHP code cannot be directly deployed onto the arcadier server.