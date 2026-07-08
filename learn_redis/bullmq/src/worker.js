const Worker = require('bullmq')
const connection = require('./queue')


const worker = new Worker(
    "emails",
    async (job) => {
        console.log("Processing email job:", job.id, job.name, job.data);
        (await new Promise((resolve) => setTimeout(resolve, 1000)));
        console.log("Email job processed:", job.id, job.name, job.data);
    },
    { connection }
)

worker.on("completed", (job) => {
    console.log("Job completed:", job.id, job.name, job.data);
});

worker.on("failed", (job, err) => {
    console.error("Job failed:", job.id, job.name, job.data, err);
});