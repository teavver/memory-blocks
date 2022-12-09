import GameTiles from "./GameTiles";
import { useEffect, useState, useRef } from "react";
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
    const [userInputTiles, setUserInputTiles] = useState(0);
    const [userInputDisabled, setUserInputDisabled] = useState(true);
    const [score, setScore] = useState(0);
    const isFirstRender = useRef(true);

    let user_input_tiles = []

     useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    console.log('userInputTiles: ', userInputTiles);
    }, [userInputTiles]);
    
    const start_game = () => {
        setGameStarted(true);
        game_loop();
    }
     
    const roll_tile = () => {
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
        console.log("Game loop started")
        setScore(score +1)
        setUserInputDisabled(true)
        
        roll_tile()
        // Animate correctTiles[]
        for (let i = 0; i < correctTiles.length; i++) {
            animate_tile(correctTiles[i])
            await timer(SETTINGS_TILE_TIMEOUT)
        }
        console.log("Game loop finished, awaiting input")
        setUserInputDisabled(false)
    }
    
    const tile_input = (tile_id) => {

        // needs fix (!!!)

        user_input_tiles.push(tile_id)
        // evaluate input
        for (let i = 0; i < score; i++) {
            if(user_input_tiles[i] === correctTiles[i] ){
                console.log("good input")
            }
            else {
                console.log("bad input")
                // alert("game over")
                return
            }
        }
        game_loop()
    }

    return (
        <>
        <div className="game-tile-ctn">
            <GameTiles
            onClick={ userInputDisabled ? {} : tile_input}
            />
            <button className={gameStarted ? "game-start-btn hidden" : "game-start-btn"}onClick={() => start_game()}>Play</button>
        </div>
        </>
    );
}

export default Game;