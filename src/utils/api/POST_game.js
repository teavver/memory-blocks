import axios from "axios";
import id_generator from "../game/id_generator";

const POST_game = (game_data) => {
    
    const game_id = id_generator(6)

    const game_data_final = {
        ...game_data,
        game_id
    }

    axios.post(`http://localhost:3000/users/${game_data.user_id}/games/${game_id}`, game_data_final )
    .then(function (res) {
        console.log(res)
    })
    .catch(function (error) {
        console.log(error)
    })
}

export default POST_game