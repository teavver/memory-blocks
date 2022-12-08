import GameTiles from "./GameTiles";
import { useEffect, useState } from "react";
import { settings } from "./Settings";
import Score from "./Score";

const Game = () => {
    // Settings ideas
    // tile_color
    // tile_active_color
    // tile_bordercolor
    // tile_active_bordercolor
    // mode (easy -> 3 mistakes, medium - 1 mistake, hard - 0 mistakes, default - hard)
    // tile_ids on tiles
    // tile_timeout in ms

    // User settings
    const SETTINGS_TILE_TIMEOUT = settings.timeout;
    // const TILE_COLOR = settings.tile_color;

    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms));
    
    // States
    const [gameStarted, setGameStarted] = useState(false);
    const [correctTiles, setCorrectTiles] = useState([]);
    const [currentTileAnim, setCurrentTileAnim] = useState(null);
    const [score, setScore] = useState(0);

    const start_game = () => {
        // setGameStarted(true);
        game_loop();
    }
    
    const roll_tile = () => {
        // Roll a random tile ( range 1-9 )
        const rolled_tile = Math.floor(Math.random() * 9) + 1;
        correctTiles.push(rolled_tile);
    }
    
    const animate_tile = async (tile_id) => {
        console.log("animating tile "+tile_id);
        const animate_tile_promise = Promise.resolve(tile_id)
        animate_tile_promise.then((tile_id) => {
            // Add class 'animate' to run the anim
            document.getElementById(tile_id).classList.add("tile-animate");
            setTimeout(() => { document.getElementById(tile_id).classList.remove("tile-animate"); }, SETTINGS_TILE_TIMEOUT);
        });
    }
    
    const game_loop = async () => {

        setScore(score +1);
        roll_tile();
        
        // Animate each tile before awaiting user input
        for (let i = 0; i < correctTiles.length; i++) {
            // Timeout to finish anim
            animate_tile(correctTiles[i]);
            await timer(SETTINGS_TILE_TIMEOUT);
        }
        console.log("Game loop finished");
        // await_user_input_loop();        
    }

    const tile_click = (id) => {
        // Check each tile in state arr with user input
        console.log("clicked " + id);
    }

    return (
        <>
        <div className="game-tile-ctn">
            <GameTiles
            onClick={tile_click}
            />
            <button className={gameStarted ? "game-start-btn hidden" : "game-start-btn"}onClick={() => game_loop()}>Play</button>
        </div>
        </>
    );
}

export default Game;