import { app } from "../../server.js";
import validate from "../ajv/validate.js";
import { game_schema } from "../ajv/schemas/game_schema.js";
import redis_add_game from "../../redis/calls/redis_add_game.js";
import get_game from "./get_game.js";

const submit_game = async (game_data) => {
    if(validate( game_schema, game_data ) === true){
        // POST
        app.post(`/games/${game_data.game_id}`, (req, res) => {
            const test = req.body
            console.log(test)
            res.status(200).send(test)
        })
        // set GET endpoint for the game
        get_game(game_data.game_id)
        // Add to redis
        redis_add_game(game_data)
    }
    else console.error("can't submit game, validation didn't pass.")
}

export default submit_game