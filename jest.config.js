module.exports = {
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json",
      babelConfig: true,
      diagnostics: false,
      testEnvironment: "node",
    },
  },
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 75,
      functions: 90,
      lines: 90,
    },
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/server/"],
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  coverageReporters: ["json", "lcov", "text", "text-summary"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/mocks.ts",
    "\\.(css|less|scss|html)$": "<rootDir>/test/mocks.ts",
    "^@(Test)(.*)$": "<rootDir>/test/$2",
    "^@(Server)(.*)$": "<rootDir>/server/$2",
    "^@([A-Z].*)$": "<rootDir>/src/$1",
  },
  preset: "ts-jest",
  setupFiles: ["./setupTests.ts"],
};
