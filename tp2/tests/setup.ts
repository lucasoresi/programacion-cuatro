// Jest setup file for common test configurations
beforeEach(() => {
  // Reset any global state before each test
  jest.clearAllMocks();
});

// Global test timeout
jest.setTimeout(10000);