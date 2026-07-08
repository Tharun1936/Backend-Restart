const express = require("express");
const Redis = require("ioredis");

const app = express();



const publisher = new Redis({url: process.env.REDIS_URL || 'redis://localhost:6379'});

app.post('/notification', async (req, res) => {
    const payload = {
        title: req.query.title || 'Default Title',
        createdAt: new Date().toISOString()
    }

    await publisher.publish('notification', JSON.stringify(payload));
    res.status(200).send('Notification sent');
});
