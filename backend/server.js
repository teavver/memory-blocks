import "dotenv/config.js";
import redis from "redis";
import express from "express";
import get_game from "./api/games/get_game.js";
// import submit_game from "./api/games/submit_game.js";

export const app = express()
app.use(express.json())
const PORT = 3000

export const client = redis.createClient({
    url: `redis://${process.env.USER}:${process.env.PASSWORD}@${process.env.ENDPOINT}:${process.env.PORT}`
})

// Connect to redis db
await client.connect()
const user = await client.aclWhoAmI()
console.log(`Logged to redis as "${user}"`)

// Start express api
app.listen(PORT, () => {
    console.log(`Express server started on http://localhost:${PORT}`)
    get_game()
})