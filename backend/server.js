import "dotenv/config.js";
import redis from "redis";
import express from "express";

import validate_game from "./api/game/validate_game.js";
import submit_game from "./api/game/submit_game.js";

const PORT = 3000

export const app = express()
export const client = redis.createClient({
    url: `redis://${process.env.USER}:${process.env.PASSWORD}@${process.env.ENDPOINT}:${process.env.PORT}`
})

client.connect()
const user = await client.aclWhoAmI()
console.log(`Logged to redis as "${user}"`)

app.listen(PORT, () => {
    console.log(`Express server started on http://localhost:${PORT}`)
})

const test_game_data = {
    game_sequence: [1,2,3,4],
    last_tile: 4,
    score: 4,
    user_id: 4321,
    game_id: 122,
}

const valid_game = validate_game(test_game_data)
console.log(valid_game)
submit_game(test_game_data)