# Changelog
Keeps track of changes made to the base building and packaging of the common components. Each package keeps their own [changelog.md](http://keepachangelog.com/en/1.0.0/) file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2019-12-02
### Changed
- Move the `global.config` file to /data;
- Refactor `/server/helpers/config.js` to read `global.config`  from it new location;
- Do not copy the `/configuration` files when building the docker image;
- Refactor the `docker run` commands to mount the `/configuration` folder
- Harmonized the configuration file names, now that all of of the form `<some name>Config.json`;
- Fixed unit and integration test errors; worthy of notice are the changes required for the  CIRCLECI integation tests to pass; essentially, we have to install chromium, chromedriver, and confiture protractor to use them instead of using the default, as per this [link](https://stackoverflow.com/questions/50763289/how-to-run-angular6-e2e-tests-on-alpine-linux).

## [2.0.3] - 2019-03-21
### Added
- Adding ngx-translate
- Adding sidedrawer and some example utilities in the header

## [2.0.3] - 2019-03-19
### Changed
- Changing server config system to use local.config
- Moving data files around.  Ensuring configuration files and data files are available in the docker image.

## [2.0.2] - 2019-03-11
### Changed
- Improved package.json scripts. Config now comes from BFF.

## [2.0.1] - 2019-03-05
### Changed
- Trim down the fake backend, enable it by default, and remove the user route from the BFF.  The fake backend will now serve fake user data by default.

## [2.0.0] - 2019-03-01
### Added
- Adding a [Backend for Frontend](https://samnewman.io/patterns/architectural/bff/) to the Quick Start app for handing API requests from the front-end.

## [2.0.0-rc.1] - 2019-02-14
### Changed
- Upgrade style guide, packages, and projects from WUF, Angular 6 version, to WUF Angular 7 version
#### BREAKING
- Removing origami polyfills for polymer support due to overhead.
- Removing polymer components, including Vaadin Grid.  WUF no longer supports polymer in favor of native angular and web components only.  Polyfills for polymer can be added to a Quick Start application-based instance as needed.

## [1.0.0]
- Initial version of WUF Quick Start application based on Style Guide from the [WUF](https://github.com/anvil-open-software/wuf).
