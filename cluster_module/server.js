const cluster =  require("node:cluster");
const cpu = require('os').cpus().length;
const express =  require('express')


console.log(`CPU count: ${cpu}`);

if(cluster.isPrimary) {
  for(let i = 0; i < cpu; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const PORT = 8000
  app.get('/', (req, res) => {
    res.send(`Hello from worker ${process.pid}`);
  });
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}


// if i open server in different browser we can observe the work distribution by process pid 