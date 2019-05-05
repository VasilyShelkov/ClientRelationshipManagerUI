require('@babel/polyfill');

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-15');
Enzyme.configure({ adapter: new Adapter() });

const shallow = Enzyme.shallow;
global.shallow = shallow;

const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
const muiTheme = getMuiTheme();
global.shallowWithContext = node => shallow(node, { context: { muiTheme } });

// const jsdom = require("jsdom").jsdom;
// const document = jsdom("");

// global.document = document;
// global.window = document.defaultView;
// global.navigator = {
//   userAgent: "node.js"
// };
