exports.config = {
  tests: './test/**/*.feature.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: process.env.ENVIRONMENT
        ? 'http://localhost:5000'
        : 'http://localhost:3000',
      waitForNavigation: 'networkidle0',
      fullPageScreenshots: true,
      show: true, // enable for debugging with browser
      chrome: {
        defaultViewport: {
          width: 1280,
          height: 960,
        },
      },
    },
    CreateHelper: {
      require: './test/steps/createHelper.js',
    },
  },
  include: {
    I: './test/steps/custom_steps.js',
  },
  bootstrap: null,
  mocha: {},
  name: 'ClientRelationshipManagerUI',
};
