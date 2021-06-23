module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'test/tsconfig.json',
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: [
    'ts',
    'js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/src/GridcoinRPC.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 90,
      lines: 75,
      statements: 75,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/*.{js,ts}',
  ],
};
