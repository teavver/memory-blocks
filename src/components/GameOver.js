const GameOver = (props) => {
    return(
        <div className="game-over-ctn">
            <h2 className="game-over-title monospace bold">
                Game over!
            </h2>
            <h3 className="game-over-scores monospace bold">
                Score: {props.score}
                <br />
                Highscore: {props.highscore}
            </h3>
            <button
                onClick={props.onClick} className="game-over-play-again monospace bold">
                Play again
            </button>
        </div>
    )
}

export default GameOver