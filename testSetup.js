require("babel-polyfill");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
sinon.test = require("sinon-test")(sinon);
const sinonChai = require("sinon-chai");
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-15");
Enzyme.configure({ adapter: new Adapter() });
const shallow = Enzyme.shallow;
const getMuiTheme = require("material-ui/styles/getMuiTheme").default;

chai.use(chaiAsPromised);
chai.use(sinonChai);

const jsdom = require("jsdom").jsdom;
const document = jsdom("");

global.document = document;
global.window = document.defaultView;
global.navigator = {
  userAgent: "node.js"
};

global.expect = chai.expect;
global.sinon = sinon;
global.shallow = shallow;

const muiTheme = getMuiTheme();
global.shallowWithContext = node => shallow(node, { context: { muiTheme } });

global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
