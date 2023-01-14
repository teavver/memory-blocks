const Score = (props) => {
    return(
        <div className="game-score-text">
            <h4>Score: {props.score}</h4>
            <h4>Highscore: {props.highscore}</h4>
        </div>
    )
}

export default Score;