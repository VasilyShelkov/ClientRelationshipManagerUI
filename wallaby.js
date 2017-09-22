module.exports = function(wallaby) {
  process.env.BABEL_ENV = 'testing';
  return {
    files: [
      { pattern: 'node_modules/sinon/pkg/sinon.js', load: true },
      { pattern: 'config.js', load: true, instrument: false },
      { pattern: 'src/**/*.gql', load: true, instrument: false },
      'src/**/*.ts?(x)*',
      'src/**/*.js',
      '!src/**/*.spec.js'
    ],

    tests: ['src/**/*.spec.js'],

    preprocessors: {
      'src/**/*.gql': file => `module.exports = ${JSON.stringify(require('graphql-tag')`${file.content}`)}`
    },

    compilers: {
      'config.js': wallaby.compilers.babel(),
      'src/**/*.js': wallaby.compilers.babel(),
      'src/**/*.ts?(x)': wallaby.compilers.typeScript()
    },

    env: {
      type: 'node'
    },

    testFramework: 'mocha',

    setup: function(wallaby) {
      require('babel-polyfill');

      const chai = require('chai');
      const chaiAsPromised = require('chai-as-promised');
      let sinon = require('sinon');
      const sinonTest = require('sinon-test');
      const sinonChai = require('sinon-chai');
      const shallow = require('enzyme').shallow;
      const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

      chai.use(chaiAsPromised);
      chai.use(sinonChai);

      sinon.test = sinonTest.configureTest(sinon);

      const jsdom = require('jsdom').jsdom;
      const document = jsdom('');

      global.document = document;
      global.window = document.defaultView;
      global.navigator = {
        userAgent: 'node.js'
      };

      global.expect = chai.expect;
      global.sinon = sinon;
      global.shallow = shallow;

      const muiTheme = getMuiTheme();
      global.shallowWithContext = node => shallow(node, { context: { muiTheme } });

      global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
    }
  };
};
