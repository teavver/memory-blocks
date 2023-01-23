import dotenv from "dotenv";
import cors from "cors";
import redis from "redis";
import express from "express";
import games from "./api/routes/games.js";
import users from "./api/routes/users.js";
import heatmaps from "./api/routes/heatmaps.js";
import leaderboard from "./api/routes/leaderboard.js";

dotenv.config()

export const app = express()

app.use(cors())
app.use(express.json())
app.use(leaderboard)
app.use(heatmaps)
app.use(games)
app.use(users)

const PORT = 3000

export const client = redis.createClient({
    url: `redis://${process.env.DBUSER}:${process.env.PASSWORD}@${process.env.ENDPOINT}:${process.env.PORT}`
})

client.connect()

const user = await client.aclWhoAmI()
console.log(`Logged to redis as "${user}"`)

app.listen(PORT, () => {
    console.log(`Express server started on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Memory Blocks API')
})