const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.spec.ts$',
  coveragePathIgnorePatterns: ['/node_modules/', '/testing/'],
  roots: ['./src/'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.spec.json',
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
