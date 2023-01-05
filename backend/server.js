import "dotenv/config.js";
import redis from "redis";
import express from "express";

import submit_game from "./api/games/submit_game.js";
import get_game from "./api/games/get_game.js";

const PORT = 3000

export const client = redis.createClient({
    url: `redis://${process.env.USER}:${process.env.PASSWORD}@${process.env.ENDPOINT}:${process.env.PORT}`
})

// Connect to redis db
client.connect()
const user = await client.aclWhoAmI()
console.log(`Logged to redis as "${user}"`)


// Start express api
export const app = express()
app.listen(PORT, () => {
    console.log(`Express server started on http://localhost:${PORT}`)
})

// game data model
const test_game_data = {
    game_sequence: [13,9,5,8,11,16,2,1], // from Game.js
    last_tile: 1, // game_sequence.indexof(-1)
    score: 8, // game_sequence.length
    user_id: 1337, // set to 0000 === anon?
    game_id: 1000, // rng
}

submit_game(test_game_data)
// submit_game() => validates data => POST + GET => redis