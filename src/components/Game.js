import GameTiles from "./GameTiles";
import { useState } from "react";
import { settings } from "./Settings";

const Game = () => {
    
    // Load data from user settings
    const SETTINGS_TILE_TIMEOUT = settings.timeout;
    // const TILE_COLOR = settings.tile_color;
    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms));
    // States
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(1);
    const [correctTiles, setCorrectTiles] = useState([]);
    // Game loop

    const test = (id) => {
        console.log("clicked " + id);
    }    
    
    const start_game = () => {
        setGameStarted(true);
        game_loop();
    }

    const game_loop = async () => {
    setScore(score + 1);
    for (var i = 0; i < score; i++) {
        // animate tile

        const randomly_rolled_tile = Math.floor(Math.random() * 9) + 1;
        const animateTile = Promise.resolve(randomly_rolled_tile);
        animateTile.then((id) => {
            console.log(id);
        })

        await timer(SETTINGS_TILE_TIMEOUT);
        }
        console.log("Game loop finished");

        // await_user_input_loop();
    }



    return(
        <div className="game-tile-ctn">
            <GameTiles onClick={test}/>   
            <button className={gameStarted ? "game-gameloop-btn hidden" : "game-gameloop-btn"}onClick={() => start_game()}>Play</button>      
        </div>
    )
}

export default Game;