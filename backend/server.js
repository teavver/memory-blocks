require('dotenv').config()
const redis = require("redis")
const express = require("express")
const axios = require("axios")
const cors = require("cors")
const app = express()
const PORT = 3000

app.use( express.json() )

// redis://<username>:<password>@<public-endpoint>:<port>
const client = redis.createClient({
    url: `redis://${process.env.USER}:${process.env.PASSWORD}@${process.env.ENDPOINT}:${process.env.PORT}`
})

const main = async () => {
    // Start express server
    app.listen(PORT, () => {
        console.log(`Express server started on http://localhost:${PORT}`)
    })

    // Connect to redis
    client.connect()
    const user = await client.aclWhoAmI()
    console.log(`Logged to redis as "${user}"`)
    return
}

app.get('/userprofile', (req, res) => {
    res.status(200).send({
        username: 'user123',
        id: '0001',
        settings: {
            dark_mode: true,
            tile_color_id: 2,
        },
    })
})

main()