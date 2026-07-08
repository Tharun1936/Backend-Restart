const express = require('express')
const Redis = require('ioredis')
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())


const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

const QUEUE_KEY = 'queue:emails'

app.post('/emails', async (req, res) => {
    const job = {
        to : req.body.to,
        subject : req.body.subject || 'No Subject',
        body : req.body.body || 'No Content',
        createdAt : new Date().toISOString()
    }
    await redis.lpush(QUEUE_KEY, JSON.stringify(job))
    res.json({ message: 'Email added to queue' , job })
})

app.get('/emails/process', async (req, res) => {
    const rawjob = await redis.rpop(QUEUE_KEY)
    if (!rawjob) {
        return res.status(404).json({ message: 'No email to process' })
    }
    const job = JSON.parse(rawjob)
    // Process the email (e.g., send it)
    res.json({ message: 'Email processed', job })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
