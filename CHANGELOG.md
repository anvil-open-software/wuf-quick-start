# Changelog
Keeps track of changes made to the base building and packaging of the common components. Each package keeps their own [changelog.md](http://keepachangelog.com/en/1.0.0/) file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [2.0.0-rc.1] - 2019-02-14
### Changed
- Upgrade style guide, packages, and projects from WUF, Angular 6 version, to WUF Angular 7 version
#### BREAKING
- Removing origami polyfills for polymer support due to overhead.
- Removing polymer components, including Vaadin Grid.  WUF no longer supports polymer in favor of native angular and web components only.  Polyfills for polymer can be added to a Quick Start application-based instance as needed.

## [1.0.0]
- Initial version of WUF Quick Start application based on Style Guide from the [WUF](https://github.com/anvil-open-software/wuf).
