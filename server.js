const path = require('path');
const compression = require('compression');
const express = require('express');

const app = express();
app.use(compression());
const port = process.env.PORT || 8080;

app.use('/', express.static('./dist'));
app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist', 'index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Server running at http://localhost: ${port}`);
});
