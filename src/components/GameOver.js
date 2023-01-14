const GameOver = (props) => {
    return(
        <div className="game-over-ctn">
             <h2 className="game-over-title bold">Game over!</h2>
             <h3 className="game-over-scores bold">Score: {props.score} Highscore: {props.highscore}</h3>
            <button onClick={props.onClick} className="game-over-play-again bold">Play again</button>
        </div>
    )
}

export default GameOver