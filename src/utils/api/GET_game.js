import axios from "axios"

const GET_game = (game_id) => {
    axios
        .get(`http://localhost:3000/users/all/games/${game_id}`)
        .then( function (response){
            return response.data
        })
}

export default GET_game