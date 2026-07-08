const express = require('express')
const Redis = require('ioredis')
const PORT = process.env.PORT || 3000


const app = express()
app.use(express.json())
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

function otpkey(phone) {
  const key = `otp:${phone}`
  return key
}

app.post('/otp' , async (req,res)=>{
    const { phone } = req.body
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    await redis.set(otpkey(phone), otp, 'EX', 60)  //valid till only 60 sec

    res.json({ message: 'OTP sent successfully'})
})


app.post('/verify', async (req,res)=>{
    const { phone, otp } = req.body

    const storedOtp = await redis.get(otpkey(phone))

    if (storedOtp === otp) {
        await redis.del(otpkey(phone))
        res.json({ message: 'OTP verified successfully' })
    } else {
        res.status(400).json({ message: 'Invalid OTP' })
    }

    await redis.del(otpkey(phone))
    res.json({ message: 'OTP verified successfully' })

})


//how to get to know ttl
app.get('/ttl/:phone', async (req, res) => {
    const { phone } = req.params
    const ttl = await redis.ttl(otpkey(phone))
    res.json({ ttl })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})