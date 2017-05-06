require('babel-polyfill');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
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
