const sonarqubeScanner = require("sonarqube-scanner");

sonarqubeScanner(
  {
    serverUrl: "http://localhost",
    options: {
      "sonar.sources": "src",
      "sonar.inclusions": "src/**", // Entry point of your code
      "sonar.exclusions": "src/**/*.spec.tsx, src/Utils/*, src/Lib/*",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.projectVersion": "1",
      "sonar.projectName": "Storefront",
      "sonar.projectKey": "Storefront",
      "sonar.login": "Auth toketn",
    },
    // tslint:disable-next-line:no-empty
  },
  () => {}
);
