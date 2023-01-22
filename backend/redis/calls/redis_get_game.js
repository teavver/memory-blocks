import { client } from "../../server.js";

const redis_get_game = async (game_id) => {
    const game_data = await client.json.GET(`${game_id}`)
    if(game_data === null){ console.error(`couldn't find game ${game_id}`); return }
    return game_data
}

export default redis_get_game