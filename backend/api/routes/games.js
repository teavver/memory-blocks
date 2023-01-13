import { Router } from "express";
import { game_schema } from "../ajv/schemas/game_schema.js";
import redis_key_exists from "../../redis/calls/redis_key_exists.js";
import redis_get_game from "../../redis/calls/redis_get_game.js";
import validate from "../ajv/validate.js";
import redis_add_game from "../../redis/calls/redis_add_game.js";

const games = Router()

const GET_game = async (req, res) => {

    const game_id = req.params
    res.send(await redis_get_game(game_id.id))
}

const POST_game = async (req, res) => {
    
    const game_id = req.params
    const game_data = req.body

    console.log(game_data)
    
    // Check duplicate
    const exists = await redis_key_exists("game:"+game_id.id)
    if(exists === 1){
        // Duplicate -- re-generate game_id again?
        console.error("Trying to POST duplicate")
        return
    }

    const valid = validate(game_schema, game_data)
    console.log("valid: "+valid)

    if(valid){
        await redis_add_game(game_data)
        console.log("POST success")
        return
    }
    console.error("Couldn't validate data")
}

games.route('/games/:id')
    .get(GET_game)
    .post(POST_game)

export default games