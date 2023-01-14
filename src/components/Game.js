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
let TIMEOUT = 500

const Game = (props) => {
    
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

    // Helper state for managing leaving the game with nav links
    // eslint-disable-next-line
    const [triggerGameReset, setTriggerGameReset] = useState(props.triggerGameReset)

    useEffect(() => {
        get_highscore_on_render()
        load_timeout()
    }, [])

    useEffect(() => {
        // Reset all game data if user leaves mid-game
        reset_game()
    }, [triggerGameReset])

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
            await timer(TIMEOUT * 1.035) // 1.035 To fix anim bug, for good measure
        }
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
        // Check if USERINPUT array is equal to CORRECT array, if round is OK then reset USERINPUT for next round
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
        // Evaluate input for each tile click
        if(eval_input() === false){ game_over() }
        // Eval round
        if(USERINPUT_TILES.length === CORRECT_TILES.length){ eval_round() }
    }

    const eval_input = () => {
        if(USERINPUT_TILES[INPUT_INDEX] === CORRECT_TILES[INPUT_INDEX]){
            INPUT_INDEX++
            return true
        }
        else return false
    }
    
    const evaluate_game = () => {

        const user_id = parseInt(localStorage.getItem("USER_ID"))
        const game_data = {
            "game_sequence": CORRECT_TILES,
            "last_tile": USERINPUT_TILES.pop(),
            "score": score,
            "user_id": user_id,
        }
        POST_game(game_data)
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
    
    const game_over = () => {
        if(score > localStorage.getItem("HIGHSCORE_LOCAL")){
            localStorage.setItem("HIGHSCORE_LOCAL", score)
            setHighscore(score)
        }
        setGameOver(true)
        evaluate_game()
    }
  
    return (
        <>
        { gameOver
        ?
            <GameOver score={score} highscore={highscore} 
            onClick={ () => reset_game() }/>
        :
        <>
            <Score
                score={score}
                highscore={highscore}
            />
        <div className="game-tiles-ctn">
            <div className="game-tile-ctn">
                <GameTiles onClick={ userInputDisabled ? () => undefined : tile_input } />
            </div>
        </div>
            <button
            className=
                { gameStarted 
                ?
                // If user input is disabled (player's turn), add an indicator line
                userInputDisabled === false
                ?
                "game-user-input-line" : "hidden"
                :
                "game-start-btn monospace bold"
                }
            onClick={ () => start_game() }>
            Play
            </button>
        </>
        }
        </>
    );
}

export default Game;