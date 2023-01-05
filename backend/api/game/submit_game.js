import validate_game from "./validate_game.js";

const submit_game = (game_data) => {
    if(validate_game(game_data) === true){
        console.log(`submitting game ${game_data.game_id}`)
        // POST the game object to API -> JSON.SET in /game to Redis?
    }
    else console.error("can't submit game, couldn't validate.")
}

export default submit_game