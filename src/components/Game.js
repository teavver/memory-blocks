import GameTiles from "./GameTiles";
import { useEffect, useState, useRef } from "react";
import { user_settings } from "../user_settings";
import update_settings from "../utils/update_settings";
import Score from "./Score";

const Game = () => {
   
    // User settings
    const SETTINGS_TILE_TIMEOUT = user_settings.timeout;
    // const TILE_COLOR = settings.tile_color;
    
    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms));
    
    // Render
    const isFirstRender = useRef(true);

    // States
    const [gameStarted, setGameStarted] = useState(false);
    const [userInputDisabled, setUserInputDisabled] = useState(false);
    const [score, setScore] = useState(0);

    let correct_tiles = []
    let userinput_tiles = []

     useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        // console.log('userInputTiles: ', userInputTiles);
    }, []);
    
    const start_game = () => {
        // setGameStarted(true);
        // game_loop();
    }
     
    const roll_tile = () => {
        const rolled_tile = Math.floor(Math.random() * 9) + 1;
        // correctTiles.push(rolled_tile);
    }
    
    const animate_tile = async (tile_id) => {
        // console.log("animating tile "+tile_id);
        // const animate_tile_promise = Promise.resolve(tile_id)
        // animate_tile_promise.then((tile_id) => {
        //     // Add class 'animate' to run the anim
        //     document.getElementById(tile_id).classList.add("tile-animate");
        //     setTimeout(() => { document.getElementById(tile_id).classList.remove("tile-animate"); }, SETTINGS_TILE_TIMEOUT);
        // });
    }
    
    const game_loop = async () => {
        // console.log("Game loop started")
        // setScore(score +1)
        // setUserInputDisabled(true)
        
        // roll_tile()
        // // Animate correctTiles[]
        // for (let i = 0; i < correctTiles.length; i++) {
        //     animate_tile(correctTiles[i])
        //     await timer(SETTINGS_TILE_TIMEOUT)
        // }
        // console.log("Game loop finished, awaiting input")
        // setUserInputDisabled(false)
    }
    
    const tile_input = (tile_id) => {
        update_settings("--tile_timeout",3000);
    }

    return (
        <>
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