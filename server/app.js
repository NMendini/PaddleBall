/* eslint-disable no-console */
const { app } = require('./server.js');

const port = 3000;

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
