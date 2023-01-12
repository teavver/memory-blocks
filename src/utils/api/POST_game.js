import axios from "axios";
import id_generator from "../game/id_generator";

const POST_game = (game_data) => {

    // Generate user ID (local for now)
    const user_id = id_generator(4)

    // Gen game ID (local)
    const game_id = id_generator(6)

}

export default POST_game