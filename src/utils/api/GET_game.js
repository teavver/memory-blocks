import axios from "axios"

const GET_game = (game_id) => {
    axios
        .get(`http://localhost:3000/games/game:${game_id}`)
        .then( function (response){
            console.log(response.data) // game data object
        })
}

export default GET_game