# Changelog
Keeps track of changes made to the base building and packaging of the common components. Each package keeps their own [changelog.md](http://keepachangelog.com/en/1.0.0/) file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [4.0.0] - 2018-10-03
### Changed
- Upgrading to Angular 6 version of WUF. Major upgrade.
#### BREAKING CHANGES
The following instructions will walk you through the process of upgrading from the Angular 5 version of WUF to the Angular 6 version.  It is important to follow every step of this process in order to ensure you are using the latest version of WUF and the WUF components.

The update to Angular 6 is substantial.  For details beyond the following upgrade guide visit the [Angular Update Guide](https://update.angular.io/).

NOTE: The Smart Table component has been deprecated and REMOVED from the WUF library.  Vaadin Grid is the fully endorsed, replacement component.  Refer to the Living Style Guide for instructions on its usage.  If you cannot replace your existing Smart Table components with Vaadin Grid, it is recommended to NOT upgrade at this time.

- Update your application code to switch from HttpModule and the Http service to HttpClientModule and the HttpClient service.  If you're using HttpModule anywhere in your app (including anything from `@angular/http`), it will no longer work.  Search for "HttpModule" and "@angular/http" and replace as necessary.
- Update your machine to use Node 8 or later
- Install [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable).  Yarn is now the preferred package manager for node while working with WUF.
- Because we now use Yarn for package management, add 'package-lock.json' to your app's local .gitignore file
- Delete incompatible packages (we will replace these later):
    ```bash
    yarn remove @codebakery/origami @kion/kg-library-angular @kion/paper-elements @kion/vaadin-elements @webcomponents/webcomponentsjs ng2-completer
    ```
- Delete your application's `node_modules` folder.
- There is an outstanding bug in angular-cli that prevents the "ng update" command from working with Artifactory.  [See details](https://github.com/angular/angular-cli/issues/12100).  To temporarily work around this issue, do the following:
    - Open your ~/.npmrc file.  Copy the contents to a safe location where you can retrieve it later.  Then delete the contents of the file.
    - Open the application's `package.json` file and DELETE all of the lines referencing any of the @kion or @dlabs packages. We will reinstall @kion packages later on in this guide.
    - You can now proceed with the following steps.
- Update your Angular CLI globally and locally, and migrate the configuration to the new angular.json format by running the following:
    ```bash
      npm install -g @angular/cli@6.2.3
      yarn add @angular/cli@6.2.3 --dev
      ng update @angular/cli
    ```
- Update any scripts you may have in your `package.json` to use the latest Angular CLI commands. All CLI commands now use two dashes for flags (eg ng build --prod --source-map) to be POSIX compliant.
- Update all of your Angular framework packages to v6, and the correct version of RxJS and TypeScript.
    ```bash
    ng update @angular/core
    ```
    - NOTE: After the update, TypeScript and RxJS will more accurately flow types across your application, which may expose existing errors in your application's typings
    - ngModelChange is now emitted after the value/validity is updated on its control instead of before to better match expectations. If you rely on the order of these events, you will need to begin tracking the old value in your component.
- Update Angular Material to version 6.4.7.
    ```bash
    yarn add @angular/material@6.4.7 @angular/cdk@6.4.7
    ```
- If you are using any version of @ng-bootstrap/ng-bootstrap, you will have to update it:
    ```bash
    ng update @ng-bootstrap/ng-bootstrap
    ```
- Add @webcomponents/webcomponentsjs:
    ```bash
    yarn add @webcomponents/webcomponentsjs@2.1.3
    ```
- The option `enableLegacyTemplate` and the `<template>` element has been removed in Angular v6 in favor of `<ng-template>`.  The avoids the conflict with the `<template>` tag used in web components.  Remove the `enableLegacyTemplate` option from `tsconfig.json` and `main.json`
- Upgrade @codebakery/origami:
    - `yarn add @codebakery/origami`
    - Add `import { OrigamiModule } from '@codebakery/origami';` to the top of your app.module.ts file.
    - Add `OrigamiModule` to the "imports" sectdion of your app.module.ts file
    - Update all <template> tags in your app to include 'ngNonBindable': `<template ngNonBindable>`
    - `[polymer]="this"` should no longer be required in polymer templates.  That means `<template ngNonBindable [polymer]="this">` should become simply `<template ngNonBindable>`
    - Delete this line from your app wherever it appears: `import { PolymerModule } from '@codebakery/origami';`
    - Remove the `PolymerModule` from the "imports" section of any module.ts file
    - Replace `import { webcomponentsReady } from '@codebakery/origami';` with `import { webcomponentsReady } from '@codebakery/origami/polyfills';`
    - Your main.ts file should now look like this:
    ```typescript
        import { enableProdMode } from '@angular/core';
        import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
        import { webcomponentsReady } from '@codebakery/origami/polyfills';
        import { AppModule } from './app/app.module';
        import { environment } from './environments/environment'; 
        import 'hammerjs'; // touch gesture support (required by Angular Material)
        
       
        webcomponentsReady().then(() => {
            platformBrowserDynamic().bootstrapModule(AppModule, {})
            .catch(err => console.log(err));
        });
        
        if (environment.production) {
            enableProdMode();
        }
    ```
- Use `ng update` or your normal package manager tools to identify and update other dependencies.
- Verify the following package version updates in `package.json`.  Note that some of these should use FIXED versions (do not use ~ or ^ in the package versions):
    - All Angular packages should now be "^6.1.8" or greater
    - "@angular/cdk": "6.4.7" (use a fixed version and remove the "^")
    - "@angular/material": "6.4.7" (use a fixed version and remove the "^")
    - "@webcomponents/webcomponentsjs": "2.1.3" (use a fixed version and remove the "^")
    - "@codebakery/origami": "^3.0.2"
    - "rxjs": "^6.2.2"
    - "zone.js": "^0.8.26"
    - "typescript": "~2.9.2"
- Restore your .npmrc file to its previous state.  We will need it in order to access the internal Artifactory registry.
- Add the newest versions of the @kion components:
    ```bash
    yarn add @kion/base-test @kion/kg-ang-configuration @kion/kg-ang-layout @kion/kg-ang-navigation @kion/kg-ang-utils @kion/kg-poly-paper-elements @kion/kg-poly-vaadin-elements @kion/kg-web-assets @kion/kg-web-message @kion/kg-web-code-sample
    ```
- Run `yarn install` to ensure all packages have been properly installed
- The following string replacements will convert your app from using deprecated @kion packages to using their new equivalents:
    - replace `import { deepMerge } from '@kion/kg-library-angular';` with `import { deepMerge } from '@kion/kg-ang-utils';`
    - replace `import { KgConfigurationService } from '@kion/kg-library-angular';` with `import { KgConfigurationService } from '@kion/kg-ang-configuration';
    - replace `import '@kion/kg-code-sample';` with `import '@kion/kg-web-code-sample';`
    - replace `import '@kion/kg-grid/kg-grid-styles/kg-grid-styles.js';` with `import '@kion/kg-poly-grid-styles';`
    - replace `import { KgContentFooterService } from '@kion/kg-library-angular';` with `import { KgContentFooterService } from '@kion/kg-ang-layout';`
    - replace `import { KgNavigationService } from '@kion/kg-library-angular';` with `import { KgNavigationService } from '@kion/kg-ang-navigation';`
    - replace `~@kion/kg-library-angular/src/` with `~@kion/kg-web-assets/`
    - replace `assets/kion/kg-library-angular/images/favicons/` with `assets/kion/kg-web-assets/images/favicons/`
    - Search for any remaining instances of `KgModule` and replace with one of the above packages.  Pay particular addition to `*.spec` files which may have previously depended on `KgModule`.  These references may now need to be replaced with one or more of the above new packages.
- `KgSmartTable` now lives in a new package `@kion/kg-ang-smart-table`.  To continue using Smart Table, you must now install this new package:
    - `yarn add @kion/kg-ang-smart-table`
    - Add `import { KgSmartTableModule } from '@kion/kg-ang-smart-table';` to the parent module of the component where Smart Table will be used.
    - Add `KgSmartTableModule` to the imports section of the parent module.  Use `KgSmartTableModule.forRoot()` is the parent module is the `app.module.ts`.
    - If using any of the services from Smart Table, the names of those services have changed:
        - ValidatorService --> KgSmartTableValidatorService
        - ViewCell --> KgSmartTableViewCell
        - DefaultEditor --> KgSmartTableDefaultEditor
        - Editor --> KgSmartTableEditor
        - Cell --> KgSmartTableCell
        - LocalDataSource --> KgSmartTableLocalDataSource
        - ServerDataSource --> KgSmartTableServerDataSource
- Assets (like fonts, CSS, and images) now come from the `@kion/kg-web-assets`.  Update the "assets" section of the angular.json file accordingly.  Note that the source and destination paths have also changed:
    ```json
            "assets": [
              "src/assets",
              {
                "glob": "**/*",
                "input": "node_modules/@kion/kg-web-assets/assets/images",
                "output": "/assets/kion/kg-web-assets/images"
              }
            ],
    ```
- Add `KgLayoutModule` to all app modules:
    - Add the following to the top of your `app.module.ts` file:
        ```typescript
            import { KgLayoutModule } from '@kion/kg-ang-layout';
        ```
    - Then add the following to the "imports" section:
        ```typescript
            KgLayoutModule.forRoot()
        ```
    - Do the above for all submodule files as well.  The `.forRoot()` should ONLY be used in the `app.module.ts` file.  All other modules do not need to include `.forRoot()`.
- Add `KgConfigurationModule` and `KgConfigurationService` to all app modules:
    - Add the following to the top of your `app.module.ts` file:
        ```typescript
            import { KgConfigurationService, KgConfigurationModule } from '@kion/kg-ang-configuration';
        ```
    - Add the following to the "imports" section:
        ```typescript
            KgConfigurationModule.forRoot()
        ```
    - Add the following to the "providers" section:
        ```typescript
            providers: [
                KgConfigurationService
           ]
        ```
    - Do the above for all submodule files as well.  The `.forRoot()` should ONLY be used in the `app.module.ts` file.  All other modules do not need to include `.forRoot()`.
- Add `KgNavigationModule` to app module and layouts module:
    - Add the following to the top of your `app.module.ts` and `layouts.module.ts` files:
        ```typescript
            import { KgNavigationModule } from '@kion/kg-ang-navigation';
        ```
    - Add the following to the "imports" section of your `app.module.ts`:
        ```typescript
            KgNavigationModule.forRoot()
        ```
    - Add the following to the "imports" section of your `layouts.module.ts`.  Note that forRoot() is not used:
        ```typescript
            KgNavigationModule
        ```
- The --preserveSymlinks option is no longer supported (or needed) by Angular-CLI.  Remove this flag from any scripts in your package.json file that use it.
- Ensure `stylePreprocessorOptions` exists in angular.json's `projects.[projectname].architect.build.options` AND `projects.[projectname].architect.test.options`
            "stylePreprocessorOptions": {
                "includePaths": [
                    "./node_modules"
                ]
            },
- Modify your index.html page to include the following in the <head> tag.  This resolves an issue where 3rd party Node scripts expect global to be available where it is not in a Web app:
    ```typescript
        <script>
            // Solution: https://stackoverflow.com/questions/50356408/upgrading-to-angular-6-x-gives-uncaught-referenceerror-global-is-not-defined
            // Resolves issue with Node scripts being used with Angular 6.  The proposed solution here does not work: https://github.com/angular/angular-cli/issues/9827
            var global = global || window;
            var Buffer = Buffer || [];
            var process = process || {
                env: { DEBUG: undefined },
                version: []
            };
        </script>
    ```
- Remove deprecated RxJS 6 features using rxjs-tslint auto update rules. For most applications this will mean running the following two commands:
    ```bash
    npm install -g rxjs-tslint
    rxjs-5-to-6-migrate -p src/tsconfig.app.json
    ```
- Once you and all of your dependencies have updated to RxJS 6, remove rxjs-compat (if installed)
- The RxJS migrate script may not solve all issues, particularly regarding conversion to [pipe syntax](https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/v6/migration.md#pipe-syntax).  Observable.of() has been deprecated, for example.  Your app may have additional issues.  You may need to follow the instructions at [RxJS v5.x to v6 Update Guide](https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/v6/migration.md).
- (OPTIONAL) Because many 3rd party dependencies are still relying on RxJS v 5, you may need to install `rxjs-compat` as a short term solution if you are encountering RxJS errors in your builds.  We have removed all such 3rd party libraries from Quick Start and Living Style Guide, so the following IS NOT NECESSARY for these vanilla apps:
    ```bash
    yarn add rxjs-compat --save
    ```
- DONE! You should now be able to verify your application is running as expected: `npm run start`


==================================

## [2.6.1] - 2018-09-16
### Changed
- Add note about where/how to send config data back to server on change
### Fixed
- Update to @kion/kg-library-angular@4.6.1 to fix sidebar scroll issue

## [2.6.0] - 2018-08-28
### Changed
- Updating to @kion/kg-library-angular@4.4.0
- Updating to @kion/kg-code-sample@0.0.5
- Updating to @kion/kg-grid@1.1.0
- Adding fakebackend provider.  Allows fetching dummy navigation & user information out of the box
- Using new config service from kg-library-angular to set and use config
- 404 and forbidden pages now using mdc-card
- Adding services for fetching user, footer content, and navigation content from a service.  Out of the box, these services utilize the fakebackend provider to intercept the '/api/*' requests and return fake data from /src/app/internal/fake-backend/data.  Reference the README.md document for information on removing the fakebackend provider in a production app.
- Removing ng-bootstrap (Angular Bootstrap) module
- @kion/kg-grid is a dependency of @kion/vaadin-elements and shouldn't be necessary to install on its own.
### Fixed
- Ensuring layout module is set up to use forRoot() so the KgConfigurationService will work as a singleton across the entire app, including within lazy-loaded modules.  Make sure no modules inside any *.module.ts submodule file are using .forRoot()
- Ensuring CustomMaterialModule is available across all sub modules using forRoot()
- LayoutModule does not need to be imported into submodules.  Removed from all submodules.

## [2.5.0] - 2018-07-25
### Changed
- Updating to Angular 5.2.11
- Updating to @kion/kg-library-angular@3.1.0
### Added
- Added loading screen (shown before/during Angular bootstrapping)

## [2.4.0] - 2018-06-19
### Changed
- Updating to @kion/kg-library-angular@2.4.1
- Replaced @blox MaterialModule with Angular Material
- Follow these instructions to completely remove @blox from any app based on quickstart-app:
    1) Downgrade @angular/material from "5.2.5" to "5.2.4" in package.json
    2) Remove "@blox/material": "0.5.0" from package.json
    3) Update @kion/kg-library-angular to version "2.4.1" in package.json
    4) Search your application for any module that uses `import { MaterialModule } from '@blox/material';` and delete the import.  Also delete the associated `MaterialModule` from the module's `imports:[]` array.
    5) Replace the contents of your `src/app/internal/material.module.ts` file with the contents from master branch: [https://gitlab.dematic.com/cloud_visualization_services/angular-quickstart-app-minimal/blob/master/src/app/internal/material.module.ts](https://gitlab.dematic.com/cloud_visualization_services/angular-quickstart-app-minimal/blob/master/src/app/internal/material.module.ts)
    6) Delete your `node_modules` folder.
    7) Re-install your `node_modules` folder using the comman `npm install`

## [2.3.1] - 2018-06-15
### Fixed
- Fixed issue with incompatible versions of @blox and material-components-web breaking the build

## [2.3.0] - 2018-06-04
### Changed
- Updating to @kion/kg-library-angular@2.3.0
- Updating to @kion/kg-code-sample@0.0.3
- Adding examples of breadcrumb trail content projection
- Using default copyright text in sidebar footer
- Renaming feature module pages/components for clarity
### Fixed
- Add missing dependency material-components-web to package.json

## [2.2.0] - 2018-06-04
### Changed
- Updating to @kion/kg-library-angular@2.2.0

## [2.1.0] - 2018-05-29
### Changed
- Updating to @kion/kg-library-angular@1.9.0
- <kg-layout-main> now takes param `logoRoute` in order to specify where to take the user when cliking on the logo.  In order to allow the user to click on the logo, add `logoRoute` to the application's `src/app/internal/layouts/main/main.component.html` page as follows, where `logoRoute` is set to the route to go to when clicking (e.g., '/'):
```typescript
<kg-view-main [logoRoute]="logoRoute">
```

## [2.0.0] - 2018-05-25
### Fixed
- Roboto is now being properly set as the default font
### Changed
- Updating to @kion/kg-library-angular@1.8.0
- Ensuring that all assets can be loaded locally and that no external assets are used.  This allows us to be fully self-contained.  Roboto, for example, is now being loaded locally instead of from Google's CDN (which requires network access).
#### BREAKING
- The Roboto font is now being loaded from local assets.  In order to avoid conflicts, delete the following line from your application's index.html:
```typescript
    <!-- google fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
```

Add the `$kg-font-path` variable to the `src/styles/scss/partials/_3rdParty.scss` file, as follows, ensuring that it appears **before** the ~@kion/gk-library-angular import:

```typescript
/***** @kion WUF *****/
$kg-font-path: '~@kion/kg-library-angular/src/assets/fonts/roboto';
@import '~@kion/kg-library-angular/src/assets/styles/library';
```

## [1.2.0] - 2018-05-21
### Changed
- Updating to @kion/kg-library-angular@1.6.0

## [1.1.0] - 2018-05-04
### Changed
- Update to Angular v5.2.10
- Update to to @kion/kg-library-angular@1.4.0

### Fixed
- Fixed polyfill issue with browsers other than Chrome and Safari.  To fix:

Run the following command from application root:
```typescript
npm install @webcomponents/webcomponentsjs@2.0.0 --save
npm install @codebakery/origami@2.0.3 --save
```
Confirm that package.json is using @webcomponents/webcomponentsjs version 2.0.0 or higher.

Delete the following lines from index.html:
```typescript
    <!-- web component polyfill -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.22/webcomponents-lite.js"></script>
```

Add the following to the bottom of polyfill.ts:
```typescript
/***************************************************************************************************
 * WEB COMPONENTS
 */
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';
```

Add the following import to main.ts:
```typescript
import { webcomponentsReady } from '@codebakery/origami';
```

Also in main.ts, wrap `platformBrowserDynamic().bootstrapModule()` with a check for `webcomponentsReady()`, like so:
```typescript
webcomponentsReady().then(() => {
    platformBrowserDynamic().bootstrapModule(AppModule, {
        // Angular 4 consumes native <template> tags, which are commonly used in web components.
        // The following will prevent Angular 4 from turning native <template> elements into <ng-template>s
        enableLegacyTemplate: false
    })
    .catch(err => console.log(err));
});
```

## [1.0.13] - 2018-05-01
### Fixed
- Update to to @kion/kg-library-angular@1.3.1 to fix sidebar resizing issue
- @angular/cdk and @angular/material became dependencies as of @kion/kg-library-angular@1.3.0.  Adding them.

## [1.0.12] - 2018-04-23
### Changed
- Update to @kion/kg-library-angular@1.2.3

## [1.0.11] - 2018-04-04
### Changed
- Update to @kion/kg-library-angular@1.2.0
- Pages using basic layouts now stretch to 100% width by default.
- New CSS custom properites --kg-page-width, --kg-page-padding, and --kg-page-margin allow overriding of this behavior.
- The content area now supports --kg-content-padding for overriding of page content padding.
#### BREAKING
- Pages using basic layouts (i.e., no header, sidebar, etc) should now be wrapped in `<kg-content-main>`, just like content in those pages using the main layout.  Update page-not-found and forbidden pages accordingly.
- Quickstart-based apps must change src/app/internal/layouts/basic to use the following markup:
``` html
<kg-view-basic>
    <ng-container main>
        <router-outlet></router-outlet>
    </ng-container>
</kg-view-basic>
```
- For Quickstart-based apps, the last route (404 route) in src/app/app-routes.ts must now look like this:
``` typescript
    { path: '', component: LayoutBasicComponent, children: [
        { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
    ]}
```

## [1.0.10] - 2018-04-03
### Changed
- Update to @kion/kg-library-angular@1.1.18

## [1.0.9] - 2018-04-03
### Changed
- Update to @kion/kg-library-angular@1.1.17

## [1.0.8]
### Changed
- Update to @kion/kg-library-angular@1.1.16
### Fixed
- Fix issue where colors are not displaying due to change in libsass.  CSS custom properties using SCSS variables must use #{$myvar} syntax for values.
To implement this fix on any app based on the Quickstart App, perform the following steps:
1. Delete the local .npmrc file at the root of the app.
2. Update package.json to use @kion/kg-library-angular  @1.1.16
3. Run “npm install”
4. Replace src/assets/dumydata/branding.scss with this file: [https://gitlab.dematic.com/cloud_visualization_services/living-style-guide/blob/master/src/assets/dummydata/branding.scss](https://gitlab.dematic.com/cloud_visualization_services/living-style-guide/blob/master/src/assets/dummydata/branding.scss)
5. Replace src/assets/styles/scss/partials/_custom-properties.scss with this file: [https://gitlab.dematic.com/cloud_visualization_services/living-style-guide/blob/master/src/assets/styles/scss/partials/_custom-properties.scss](https://gitlab.dematic.com/cloud_visualization_services/living-style-guide/blob/master/src/assets/styles/scss/partials/_custom-properties.scss)
6. Restart ng server by executing “npm run start"

## [1.0.7]
### Changed
- Update README.md with instructions on creating and installing an app based on Quickstart.
- Update to @kion/kg-library-angular@1.1.14.
- Removing unused components.

## [1.0.6]
### Changed
- Update to @kion/kg-library-angular@1.1.13

### Added
- Add font-awesome as a dependency to app.

### Fixed:
- Fixing some file paths to work with base-href changes.

## [1.0.5]
### Changed
- Update to @kion/kg-library-angular@1.1.11
- Asset paths are now relative so they work with base href changes.

## [1.0.4]
### Changed
- Now passing JSON object to navigation component instead of using URL.

## [1.0.3]
### Changed
- Basing quick start off latest version of styleguide

## [1.0.2]
#### BREAKING
- The latest version of Angular 5 requires routes now requires "pathMatch: 'full'" (https://stackoverflow.com/questions/47614558/how-to-debug-uncaught-in-promise-emptyerror-no-elements-in-sequence-caused-b)

## [1.0.1]
### Fixed
- Fix branding overrides.

## [1.0.0]
- Initial version of WUF Quickstart application based on Style Guide from the [WUF](https://gitlab.dematic.com/cloud_visualization_services/living-style-guide).
