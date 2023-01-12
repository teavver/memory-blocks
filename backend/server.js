import "dotenv/config.js";
import cors from "cors";
import redis from "redis";
import express from "express";
import games from "./api/routes/games.js";

export const app = express()
app.use(cors())
app.use(express.json())
app.use(games)

const PORT = 3000

export const client = redis.createClient({
    url: `redis://${process.env.USER}:${process.env.PASSWORD}@${process.env.ENDPOINT}:${process.env.PORT}`
})

await client.connect()
const user = await client.aclWhoAmI()
console.log(`Logged to redis as "${user}"`)

app.listen(PORT, () => {
    console.log(`Express server started on http://localhost:${PORT}`)
})