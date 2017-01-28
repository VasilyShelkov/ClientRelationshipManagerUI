require('babel-polyfill');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const shallow = require('enzyme').shallow;
const getMuiTheme = require('material-ui/styles/getMuiTheme');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const jsdom = require('jsdom').jsdom;
const document = jsdom('');

global.document = document;
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js'
};

global.expect = chai.expect;
global.sinon = require('sinon');
global.shallow = shallow;
global.shallowWithContext = node => shallow(node, { context: { muiTheme } });
