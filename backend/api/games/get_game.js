import { client } from "../../server.js"
import { app } from "../../server.js"

const get_game = () => {
    // ex: localhost:1234/games/game:1234
    app.get(`/games/:gameid`, async (req, res) => {

        const { gameid } = req.params
        const game_data = await client.json.GET(gameid)
        if(game_data === null){
            res.send({ message: `Couldn't find game ${gameid}` })
        }
        else {
            res.send(game_data)
        }
    })
} 

export default get_game