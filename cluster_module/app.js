const express = require('express')

const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send(`Hello World ${process.pid}`);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});