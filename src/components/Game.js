import { useState, useEffect } from "react";
import check_setting from "../utils/check_setting";
import update_settings from "../utils/update_settings";
import GameTiles from "./GameTiles";
import GameOver from "./GameOver";
import Score from "./Score";
import POST_game from "../utils/api/POST_game";

// Real-time-needed game variables
let CORRECT_TILES = []
let USERINPUT_TILES = []
let INPUT_INDEX = 0
let TIMEOUT = 750

const Game = () => {
    
    // General
    const NUMBER_OF_TILES = 16
    
    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms))
    
    // States
    const [gameStarted, setGameStarted] = useState(false)
    const [userInputDisabled, setUserInputDisabled] = useState(true)
    const [score, setScore] = useState(0)
    const [highscore, setHighscore] = useState(0)
    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {
        get_highscore_on_render()
        load_timeout()
    }, [])

    const load_timeout = () => {
        if(!check_setting("TILE_TIMEOUT")){
            localStorage.setItem("TILE_TIMEOUT", 1000)   
            return
        }
        TIMEOUT = localStorage.getItem("TILE_TIMEOUT")
        const timeout_in_ms = TIMEOUT + "ms"
        update_settings("--tile_timeout", timeout_in_ms)
    }

    const get_highscore_on_render = () => {
        // If there's no highscore, set it to 0
        if(!check_setting("HIGHSCORE_LOCAL")){
            localStorage.setItem("HIGHSCORE_LOCAL", 0)
            setHighscore(0)
            return
        }
        setHighscore(localStorage.getItem("HIGHSCORE_LOCAL"))
    }
    
    const start_game = async () => {
        setGameStarted(true)
        start_round()
    }

    const start_round = () => {
        setUserInputDisabled(true)
        roll_tile()
        game_loop()
    }
    
    const game_loop = async () => {
        for (let i = 0; i < CORRECT_TILES.length; i++) {
            await animate_tile(CORRECT_TILES[i])
            await timer(TIMEOUT * 1.025) // 1.025 to fix anim bug
        }
        await timer(50) // For good measure
        setUserInputDisabled(false)
    }

    const roll_tile = async () => {
        const rolled_tile = Math.floor(Math.random() * NUMBER_OF_TILES) + 1
        CORRECT_TILES.push(rolled_tile)
    }
    
    const animate_tile = async (tile_id) => {
        const animate_tile_promise = Promise.resolve(tile_id)
        animate_tile_promise.then((tile_id) => {
            // Add class 'animate' to run the anim
            document.getElementById(tile_id).classList.add("tile-animate")
            setTimeout(() => { document.getElementById(tile_id).classList.remove("tile-animate"); }, TIMEOUT)
        })
    }

    const eval_round = () => {
        if(USERINPUT_TILES.length === CORRECT_TILES.length && USERINPUT_TILES.every((value, index) => value === CORRECT_TILES[index])){
            USERINPUT_TILES = []
            INPUT_INDEX = 0
            setScore(score => score + 1)
            start_round()
        }
        else {
            game_over()
        }
    }
 
    const tile_input = (tile_id) => {
        USERINPUT_TILES.push(tile_id)
        if(eval_input() === false){ game_over() }
        if(USERINPUT_TILES.length === CORRECT_TILES.length){ eval_round() }
    }

    const eval_input = () => {
        if(USERINPUT_TILES[INPUT_INDEX] === CORRECT_TILES[INPUT_INDEX]){
            INPUT_INDEX++
            return true
        }
        else return false
    }

    const game_over = () => {
        if(score > localStorage.getItem("HIGHSCORE_LOCAL")){
            localStorage.setItem("HIGHSCORE_LOCAL", score)
            setHighscore(score)
        }
        setGameOver(true)
        evaluate_game()
    }

    const reset_game = () => {
        CORRECT_TILES = []
        USERINPUT_TILES = []
        INPUT_INDEX = 0

        setScore(0)
        setGameStarted(false)
        setGameOver(false)
        setUserInputDisabled(true)
    }

    const evaluate_game = () => {
        const game_data = {
            "game_sequence": CORRECT_TILES,
            "last_tile": USERINPUT_TILES.pop(),
            "score": score,
            "user_id": 1337,
        }

        POST_game(game_data)
    }
  
    return (
        <>
        { gameOver
        ?
        <GameOver score={score} highscore={highscore} 
        onClick={ () => reset_game() }/>
        : 
        <>
        <Score score={score} highscore={highscore} />
        <div className="game-tiles-ctn">
            <div className="game-tile-ctn">
                <GameTiles onClick={ userInputDisabled ? {} : tile_input } />
            </div>
        </div>
        <button className={ gameStarted ? "game-start-btn hidden" : "game-start-btn" } onClick={ () => start_game() }> Play </button>
        </>
        }
        </>
    );
}

export default Game;