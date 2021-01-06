module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.spec.ts$',
  coveragePathIgnorePatterns: ['/node_modules/', '/testing/'],
  roots: ['./src/'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.spec.json',
    },
  },
};
