import GameTiles from "./GameTiles";
import { useState } from "react";
import { settings } from "./Settings";

const Game = () => {
    // Settings ideas
    // tile_color
    // tile_active_color
    // tile_bordercolor
    // tile_active_bordercolor
    // mode (easy -> 3 mistakes, medium - 1 mistake, hard - 0 mistakes, default - hard)
    // tile_ids on tiles
    // tile_timeout in ms
    // autoplay_continue

    // User settings
    const SETTINGS_TILE_TIMEOUT = settings.timeout;
    // const TILE_COLOR = settings.tile_color;
    // Returns a Promise that resolves after "ms" Milliseconds

    const timer = ms => new Promise(res => setTimeout(res, ms));
    // States
    const [gameStarted, setGameStarted] = useState(false);
    const [correctTiles, setCorrectTiles] = useState([]);
    const [score, setScore] = useState(1);
    // Game loop

    const test = (id) => {
        console.log("clicked " + id);
    }
    
    const start_game = () => {
        // setGameStarted(true);
        game_loop();
    }

    const roll_tile = () => {
        const rolled_tile = Math.floor(Math.random() * 9) + 1;
        correctTiles.push(rolled_tile);
   }

   const animate_tile = async (tile_id) => {
        console.log("animating tile");
        const animate_tile_promise = Promise.resolve(tile_id)
        animate_tile_promise.then((tile_id) => {
            console.log(tile_id);
        })
   }

    const game_loop = async () => {

        // Roll a new tile
        roll_tile();
        
        // Animate each tile before awaiting user input
        for (let i = 0; i < correctTiles.length; i++) {
            animate_tile(correctTiles[i]);
            await timer(SETTINGS_TILE_TIMEOUT);
        }

        console.log("Game loop finished");
        // await_user_input_loop();        
    }

    return(
        <div className="game-tile-ctn">
            <GameTiles onClick={test}/>   
            <button className={gameStarted ? "game-gameloop-btn hidden" : "game-gameloop-btn"}onClick={() => game_loop()}>Play</button>
        </div>
    )
}

export default Game;