// Jest setup file for common test configurations
beforeEach(() => {
  // Reset any global state before each test
  jest.clearAllMocks();
});

// Global test timeout
jest.setTimeout(10000);

// Silence noisy error logs in tests (expected failures), keep opt-out via env
let consoleErrorSpy: jest.SpyInstance | undefined;
beforeAll(() => {
  if (process.env.SHOW_TEST_ERRORS !== '1') {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  }
});

afterAll(() => {
  consoleErrorSpy?.mockRestore();
});