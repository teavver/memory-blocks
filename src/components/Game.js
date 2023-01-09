import GameTiles from "./GameTiles";
import { useState, useEffect } from "react";
import { user_settings } from "../user_settings";
import Score from "./Score";
import check_setting from "../utils/check_setting";

// Real-time-needed game variables
let correct_tiles = []
let userinput_tiles = []
let input_index = 0

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
    const [highscore, setHighscore] = useState(0)
    const [gameOver, setGameOver] = useState(false) 

    useEffect(() => {
        get_highscore_on_render()
    }, [])
    
    const get_highscore_on_render = () => {
        if(check_setting("HIGHSCORE_LOCAL") === false){
            localStorage.setItem("HIGHSCORE_LOCAL", 0)
            setHighscore(0)
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
        for (let i = 0; i < correct_tiles.length; i++) {
            await animate_tile(correct_tiles[i])
            await timer(SETTINGS_TILE_TIMEOUT + 30) // + 30 to fix anim bug
        }
        await timer(50) // For good measure
        setUserInputDisabled(false)
    }

    const roll_tile = async () => {
        const rolled_tile = Math.floor(Math.random() * NUMBER_OF_TILES) + 1
        correct_tiles.push(rolled_tile)
    }
    
    const animate_tile = async (tile_id) => {
        const animate_tile_promise = Promise.resolve(tile_id)
        animate_tile_promise.then((tile_id) => {
            // Add class 'animate' to run the anim
            document.getElementById(tile_id).classList.add("tile-animate")
            setTimeout(() => { document.getElementById(tile_id).classList.remove("tile-animate"); }, SETTINGS_TILE_TIMEOUT)
        })
    }

    const eval_round = () => {
        if(userinput_tiles.length === correct_tiles.length && userinput_tiles.every((value, index) => value === correct_tiles[index])){
            console.log("round "+score+" GOOD")
            userinput_tiles = []
            input_index = 0
            setScore(score => score + 1)
            start_round()
        }
        else {
            localStorage.setItem("HIGHSCORE_LOCAL", score)
        }
    }
 
    const tile_input = (tile_id) => {
        userinput_tiles.push(tile_id)
        if(eval_input() === false){ game_over() }
        if(userinput_tiles.length === correct_tiles.length){ eval_round() }
    }

    const eval_input = () => {
        if(userinput_tiles[input_index] === correct_tiles[input_index]){
            input_index++
            return true
        }
        else return false
    }

    const game_over = () => {
        setGameOver(true)
        // submit the game
    }
  
    return (
        <>
        <Score score={score} highscore={highscore} ></Score>
        <div className="game-tiles-ctn">
            <div className="game-tile-ctn">
                <GameTiles
                onClick={ userInputDisabled ? {} : tile_input }
                />
            </div>
        </div>
        <button className={ gameStarted ? "game-start-btn hidden" : "game-start-btn" } onClick={ () => start_game() }> Play </button>
        </>
    );
}

export default Game;