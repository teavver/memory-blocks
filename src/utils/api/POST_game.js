import axios from "axios";
import id_generator from "../game/id_generator";

const POST_game = (game_data) => {

    // Generate user ID (local for now)
    // const user_id = id_generator(4)

    // Gen game ID
    const game_id = id_generator(6)

    const game_data_final = {
        ...game_data,
        game_id
    }

    axios.post(`http://localhost:3000/games/${game_id.toString()}`, game_data_final )
    .then(function (res) {
        console.log(res)
    })
    .catch(function (error) {
        console.log(error)
    })
}

export default POST_game