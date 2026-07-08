const Redis = require('ioredis')

const subscriber = new Redis({url: process.env.REDIS_URL || 'redis://localhost:6379'})

subscriber.subscribe('notification', (err) => {
    if (err) {
        console.error('Failed to subscribe:', err.message)
    } else {
        console.log(`Subscribed successfully! This client is currently subscribed to ${count} channels.`)
    }
})

subscriber.on('message', (channel, message) => {
    console.log(`Received message from ${channel}: ${message}`)
})
