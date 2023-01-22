import { client } from "../../server.js"

const redis_add_game = async (game_data) => {

    // Game index schema
    // "game_sequence": ARRAY/NUMERIC?
    // "last_tile": NUMERIC,
    // "score": NUMERIC,
    // "user_id": NUMERIC,
    // "game_id": NUMERIC,

    client.ft.CREATE('gameIdx',)
    client.json.SET(`game:${game_data.game_id}`, ".", game_data)
}

export default redis_add_game