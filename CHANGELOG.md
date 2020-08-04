# Changelog and release notes

_This changelog follows the [keep a changelog][1] format to maintain a human readable changelog._

## [Unreleased]

_no changes since the last release yet._

## [1.0.2][1.0.2] - 2020-08-04

### Fixed

- fix import paths in generated code

## [1.0.1][1.0.1] - 2020-07-27

### Fixed

- generate declarations files when building prod version

## [1.0.0][1.0.0] - 2020-07-27

### Added

- added the `MailgunModuleOptions.sender` option to allow specifying sender email address

### Changed

- moved from Travis CI to Github Actions
- moved from TSLint to ESLint
- updated all of the dependencies

## [0.1.2][0.1.2] - 2019-08-28

### Added

- added the `MailgunModuleOptions.mailgunBaseUrl` option to allow specifying the used API base url for the Mailgun API

## [0.1.1][0.1.1] - 2019-07-02

### Fixed

- entry point is added
- LICENSE added to the project

### Changed

- Travis now runs format and linter checks before tests
- incremental builds for Typescript are disabled

## [0.1.0] - 2019-06-10

Initial release.

<!-- compare URL for every tagged release -->

[1.0.2]: https://github.com/spreadmonitor/nest-mailgun-module/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/spreadmonitor/nest-mailgun-module/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/spreadmonitor/nest-mailgun-module/compare/v0.1.2...v1.0.0
[0.1.2]: https://github.com/spreadmonitor/nest-mailgun-module/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/spreadmonitor/nest-mailgun-module/compare/v0.1.0...v0.1.1
[1]: http://keepachangelog.com/en/1.0.0/
