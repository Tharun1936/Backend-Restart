const express =  require('express')
const emailQueue = require('./queue')

const app = express()

app.use(express.json())


app.post("/welcome-email", async (req, res) => {
    const job = emailQueue.add("welcome-email", {
        to:req.body.to,
        name:req.body.name
    }, {
        attempts: 5,
        backoff: {
            type: 'exponential',
            delay: 1000
        }
    });
})

app.listen(3000, () => {
    console.log("API server is running on http://localhost:3000");
});
