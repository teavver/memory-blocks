import { client } from "../../server.js"
import { app } from "../../server.js"

const get_game = (game_id) => {
    app.get(`/games/${game_id}`, async (req, res) => {
        const game_data = await client.json.GET(`game:${game_id}`) 
        res.status(200).send(game_data)
    })
} 

export default get_game