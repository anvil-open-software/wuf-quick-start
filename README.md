WUF Quickstart Application
=============================
The WUF Quickstart Application, which is a part of the WUF repos at [https://github.com/anvil-open-software/wuf](https://github.com/anvil-open-software/wuf), is intended to be used as a baseline, plain-vanilla application for quickly creating a new web-based application from scratch. 


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
* [Node.js](https://nodejs.org/en/) version 8.0.0 or greater, installed globally - A JavaScript runtime built on Chrome's V8 JavaScript engine. 
* [Yarn](https://yarnpkg.com/en/) version 1.10.0 or greater, installed globally - A dependency management system that replaces NPM.  Yarn is required over NPM for WUF development because of WUF's dependency on Yarn Workspaces for inter-linking package dependencies.  Do not use NPM with WUF because it has the potential to conflict with Yarn and cause problems.
* [Angular](https://angular.io/guide/quickstart) version 6.1.0 or greater, installed globally - This is installation includes Angular-CLI.
* [Typescript](https://www.typescriptlang.org/) version 2.9.2 or greater, installed globally - Typescript is a typed superset of JavaScript that compiles to plain JavaScript and it is the language in which all of our Angular application development is done.

### 2. Create a New Project Based on the Quickstart App 

Clone this repo into a new project folder (e.g., `my-proj`):
```bash
git clone https://github.com/anvil-open-software/wuf-quick-start
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

Grab its address (e.g. *`https://github.com/<my-org>/<project-name>.git`*) and push the *local repo* to the *remote*:
```bash
git remote add origin https://github.com/<my-org>/<project-name>
git push -u origin master
```

### 3. Bootstrap the New App

Follow these steps to bootstrap your new app:

1. `cd` to the project's root folder (`~/my-proj`)
2. Run the following command:

```bash
 $ npm run bootstrap
```

OR

```bash
 $ yarn bootstrap
```

The bootstrap script will install packages and then do an `ng build --prod` for the new app.

**NOTE:** The bootstrap script may take a while when run the first time.  

Once the above steps are completed, your new app should be ready to run (see below).

### 4. Run the New App

```bash
$ npm run start
```

OR

```bash
$ yarn start
```

The Quick Start application can now be viewed at:
[http://localhost:4200/](http://localhost:4200/)

Fake Backend Provider
-----------------------
The Quickstart app comes bundled with a "Fake Backend Provider".  This provider includes an HttpInterceptor that will intercept certain requests from the app (e.g., '/api/users') and return fake data.  This is handy for development purposes because it allows the front-end developers to provide fake data in the UI during development without requiring functioning backend services.

To intercept service requests from the app before they are sent to the backend, you can modify `/src/app/internal/fake-backend` to handle specific URLs and return fake data.

When backend services ***DO*** become available, however, it's very important to turn off the Fake Backend Provider.  You can do this for specific URLs that were being intercepted by modifying `/src/app/internal/fake-backend` accordingly, ***OR*** you can remove the fake backend altogether.  To remove the fake backend, modify app.module.ts to remove references to `fakeBackendProvider` and (optionally) remove the `/src/app/internal/fake-backend` folder.

***NOTE*** that the fake backend is (out of the box) providing the data used to perform user authentication, return user configuration data, and provide navigation data.  Be sure to change this code so that such data is, instead, being provided from a ***real*** backend when such a backend is available.  Be sure to read the relevant information on ***configuration*** and the use of the ***navigation component*** from the [Living Style Guide](https://github.com/anvil-open-software/wuf).

Testing the Application
-----------------------

Run unit tests on the app with:
```bash
$ npm run test
```

OR 

```bash
$ yarn test
```

Run integration (e2e) tests on the app with:
```bash
$ ng e2e
```

More Information
----------------
The [Living Style Guide](https://github.com/anvil-open-software/wuf) maintain copious instructions and examples on the usage of the components from the [WUF Library of Components](https://github.com/anvil-open-software/wuf) used by your new application.  It is highly recommended that your study this material and keep a link handy for reference.

The Living Style Guide will soon be available for reference as online material. [Link TBD]
