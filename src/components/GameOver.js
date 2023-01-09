const GameOver = (props) => {
    return(
        <div className="game-over-ctn">
             <h2 className="game-over-title">Game over!</h2>
             <h3 className="game-over-scores">Score: {props.score} Highscore: {props.highscore}</h3>
            <button onClick={props.onClick} className="game-over-play-again">Play again</button>
        </div>
    )
}

export default GameOver