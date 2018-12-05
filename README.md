WUF Quickstart Application
=============================
The WUF Quickstart Application, which is a part of the WUF repos at [https://gitlab.dematic.com/cloud_visualization_services](https://gitlab.dematic.com/cloud_visualization_services), is intended to be used as a baseline, plain-vanilla application for quickly creating a new web-based application from scratch. 


Installation and Setup
-----------------------
The setup process includes the following steps, in order.  Additional details about each step follows below.

1. Set up your development environment
2. Create a new project based on Quickstart app
3. Bootstrap the new app
4. Run the new app

### 1. Set Up Your Development Environment

Follow the steps below to set up your development environment and install dependencies.

#### Dependencies
The following are dependencies for WUF development:
* [node](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine. 
* [npm](https://www.npmjs.com/) - Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world and we use it extensively.  This is usually installed along with node by default.
* [Angular-CLI](https://github.com/angular/angular-cli) - A collection of command line tools to create and develop a new Angular application.
* [Angular](https://angular.io/) - There is no need to install this since it is installed by Angular-CLI.
* [Typescript](https://www.typescriptlang.org/) - Typescript is a typed superset of JavaScript that compiles to plain JavaScript and it is the language in which all of our Angular application development is done.

#### Configure NPM to Access the Dematic Artifactory NPM Registry
In order for your NPM command line client to work with Artifactory you will first need to set up your `.npmrc` file with the necessary credentials. For getting authentication details run the following command:

```bash
$ curl -u "your KION username:your KION password" "https://artifactory.dematic.com/artifactory/api/npm/npm-local/auth/kion"
```

The response should be pasted in the `~/.npmrc` (in Windows `%USERPROFILE%/.npmrc`) file, as follows:
```text
ca=
strict-ssl=false
always-auth=false
@kion:registry=https://artifactory.dematic.com/artifactory/api/npm/npm-local/
//artifactory.dematic.com/artifactory/api/npm/npm-local/:_password=<your encoded password>
//artifactory.dematic.com/artifactory/api/npm/npm-local/:username=luvaas
//artifactory.dematic.com/artifactory/api/npm/npm-local/:email=Darren.Luvaas@dematic.com
//artifactory.dematic.com/artifactory/api/npm/npm-local/:always-auth=true
```

***NOTE:*** If the port number (:443) appears in the output, be sure to remove the port numbers or you will get authentication errors.
***NOTE:*** Because the values for the password property will change when your corporate password changes (i.e., every 90 days), you will need to run the above command whenever your corporate password changes and update your .npmrc file accordingly.

### 2. Create a New Project Based on the Quickstart App 

Clone this repo into a new project folder (e.g., `my-proj`):
```bash
git clone https://gitlab.dematic.com/cloud_visualization_services/quickstart-app
cd my-proj
```

Discard everything "git-like" by deleting the `.git` folder:
```bash
rm -rf .git  # non-Windows
rd .git /S/Q # windows
```

#### Create a new git repo

Initialize this project as a *local git repo* and make the first commit:
```bash
git init
git add .
git commit -m "Initial commit"
```

Create a *remote repository* for this project on the service of your choice.

Grab its address (e.g. *`https://gitlab.dematic.com/<my-org>/<project-name>.git`*) and push the *local repo* to the *remote*:
```bash
git remote add origin https://gitlab.dematic.com/<my-org>/<project-name>
git push -u origin master
```

### 3. Bootstrap the New App

Follow these steps to bootstrap your new app:

1. `cd` to the project's root folder (`~/my-proj`)
2. Run the following command:

```bash
 $ npm run bootstrap
```

The bootstrap script will run `npm install`, then do an `ng build --prod` for the new app.

**NOTE:** The bootstrap script may take a while when run the first time.  

Once the above steps are completed, your new app should be ready to run (see below).


### 1. Run the New App

```bash
$ npm run start
```

The Quick Start application can now be viewed at:
[http://localhost:4200/](http://localhost:4200/)


Fake Backend Provider
-----------------------
The Quickstart app comes bundled with a "Fake Backend Provider".  This provider includes an HttpInterceptor that will intercept certain requests from the app (e.g., '/api/users') and return fake data.  This is handy for development purposes because it allows the front-end developers to provide fake data in the UI during development without requiring functioning backend services.

To intercept service requests from the app before they are sent to the backend, you can modify `/src/app/internal/fake-backend` to handle specific URLs and return fake data.

When backend services ***DO*** become available, however, it's very important to turn off the Fake Backend Provider.  You can do this for specific URLs that were being intercepted by modifying `/src/app/internal/fake-backend` accordingly, ***OR*** you can remove the fake backend altogether.  To remove the fake backend, modify app.module.ts to remove references to `fakeBackendProvider` and (optionally) remove the `/src/app/internal/fake-backend` folder.

***NOTE*** that the fake backend is (out of the box) providing the data used to perform user authentication, return user configuration data, and provide navigation data.  Be sure to change this code so that such data is, instead, being provided from a ***real*** backend when such a backend is available.  Be sure to read the relevant information on ***configuration*** and the use of the ***navigation component*** from the [Living Style Guide](https://gitlab.dematic.com/cloud_visualization_services/living-style-guide).

Testing the Application
-----------------------

Run unit tests on the app with:
```bash
$ npm run test
```

Run integration (e2e) tests on the app with:
```bash
$ ng e2e
```

More Information
----------------
The [Living Style Guide](https://gitlab.dematic.com/cloud_visualization_services/living-style-guide) maintain copious instructions and examples on the usage of the components from the [WUF Library of Components](https://gitlab.dematic.com/cloud_visualization_services/common-components) used by your new application.  It is highly recommended that your study this material and keep a link handy for reference.

The Living Style Guide will soon be available for reference as online material. [Link TBD]