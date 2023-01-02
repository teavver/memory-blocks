const Score = (props) => {
    return(
        <div className="game-score-text">
            <h3>Score: {props.score}</h3>
            <h4>Highscore: {props.highscore}</h4>
        </div>
    )
}

export default Score;