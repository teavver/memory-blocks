import { client } from "../../server.js"

const redis_add_game = async (game_data) => {
    client.json.SET(`game:${game_data.game_id}`, ".", game_data)
    // console.log( await client.json.GET(`game:${game_data.game_id}`) )
}

export default redis_add_game