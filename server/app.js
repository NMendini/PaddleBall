/* eslint-disable no-console */
const { app } = require('./server.js');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
