module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
