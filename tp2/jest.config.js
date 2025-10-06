export default {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.(ts|js)$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        allowJs: true,
        moduleResolution: 'NodeNext',
        allowImportingTsExtensions: true
      }
    }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^\\.\\./controllers/(.*)\\.js$': '<rootDir>/src/controllers/$1',
    '^\\.\\./routes/(.*)\\.js$': '<rootDir>/src/routes/$1',
    '^\\.\\./services/(.*)\\.js$': '<rootDir>/src/services/$1',
    '^\\.\\./repositories/(.*)\\.js$': '<rootDir>/src/repositories/$1'
  },
  transformIgnorePatterns: ['/node_modules/(?!uuid/)'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/server.ts',
    '!src/types/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts']
};
