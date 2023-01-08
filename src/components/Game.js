import GameTiles from "./GameTiles";
import { useState } from "react";
import { user_settings } from "../user_settings";
import Score from "./Score";

const Game = () => {
    
    // User settings
    const NUMBER_OF_TILES = 16
    const SETTINGS_TILE_TIMEOUT = user_settings.timeout
    
    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms))
    
    // States
    const [gameStarted, setGameStarted] = useState(false)
    const [userInputDisabled, setUserInputDisabled] = useState(false)
    const [score, setScore] = useState(0)
    
    let correct_tiles = []
    let userinput_tiles = []
    
    const get_highscore_on_render = () => {
        // LOCALSTORAGE -> GET HIGHSCORE -> SET STATE
    }
    
    const start_game = async () => {
    }
    
    const game_loop = async () => {
        for (let i = 0; i < correct_tiles.length; i++) {
            await animate_tile(correct_tiles[i])
            await timer(SETTINGS_TILE_TIMEOUT + 30) // + 30 to fix anim bug
        }
    }

    const roll_tile = async () => {
        const rolled_tile = Math.floor(Math.random() * NUMBER_OF_TILES) + 1
        correct_tiles.push(rolled_tile)
    }
    
    const animate_tile = async (tile_id) => {
        const animate_tile_promise = Promise.resolve(tile_id)
        animate_tile_promise.then((tile_id) => {
            // Add class 'animate' to run the anim
            document.getElementById(tile_id).classList.add("tile-animate");
            setTimeout(() => { document.getElementById(tile_id).classList.remove("tile-animate"); }, SETTINGS_TILE_TIMEOUT);
        });
    }
 
    const tile_input = (tile_id) => {
        userinput_tiles.push(tile_id)
    }

    const eval_round = () => {
        if(userinput_tiles.length === correct_tiles.length && userinput_tiles.every((value, index) => value === correct_tiles[index])){
        }
        else {
        }
    }

    const game_over = () => {
    }

    return (
        <>
        <Score score={score}></Score>
        <div className="game-tiles-ctn">
            <div className="game-tile-ctn">
                <GameTiles
                onClick={ userInputDisabled ? {} : tile_input}
                />
            </div>
        </div>
        <button className={ gameStarted ? "game-start-btn hidden" : "game-start-btn" } onClick={() => start_game()}> Play </button>
        </>
    );
}

export default Game;