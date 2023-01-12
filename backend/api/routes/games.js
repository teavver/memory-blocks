import { Router } from "express";
import redis_key_exists from "../../redis/calls/redis_key_exists.js";
import redis_get_game from "../../redis/calls/redis_get_game.js";
// import redis_add_game from "../../redis/calls/redis_add_game.js";
// import validate from "../ajv/validate.js";
// import { game_schema } from "../ajv/schemas/game_schema.js";

const games = Router()

// games.use(function(req, res, next) {
//     console.log("Connecting...")
//     next()
// })

const GET_game = async (req, res) => {

    const game_id = req.params
    res.send(await redis_get_game(game_id.id))
}

const POST_game = async (req, res) => {
    
    const game_id = req.params
    const game_data = req.body

    // Check duplicate
    const exists = await redis_key_exists(game_id.id)
    console.log(exists)
    
    // console.log(game_id.id)
    // console.log(game_data)
}

games.route('/games/:id')
    .get(GET_game)
    .post(POST_game)

export default games