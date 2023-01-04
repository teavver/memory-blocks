const app = require("express")()
const axios = require("axios")
const cors = require("cors")
const redis = require("redis")
require('dotenv').config()

// redis://<username>:<password>@<public-endpoint>:<port>

const client = redis.createClient({
    url: `redis://${process.env.USER}:${process.env.PASSWORD}@${process.env.ENDPOINT}:${process.env.PORT}`
})

const main = async () => {
    client.connect()
    const test = await client.aclWhoAmI()
    console.log(test)
    console.log('done')
    return
}

main()