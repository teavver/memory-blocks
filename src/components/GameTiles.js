import GameTile from "./Tile"

const GameTiles = (props) => {

    const num_of_tiles = 16
    const tiles = []

    for (let i = 1; i < (num_of_tiles + 1); i++) {
        tiles.push( <GameTile key={i} id={i} onClick={props.onClick} /> )
    }

    return(
        tiles
    )
}

export default GameTiles;