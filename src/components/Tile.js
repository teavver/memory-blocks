// import '../styles/game.css'

const Tile = (props) => {
    return(
        <div className={"game-tile"}
        id={props.id}
        onClick={() => props.onClick(props.id)}
        >
        </div>
    )
}

export default Tile;