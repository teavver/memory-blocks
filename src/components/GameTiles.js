import GameTile from "./Tile"

const GameTiles = (props) => {
    return(
        <>
        <GameTile id={1} onClick={props.onClick}/>
        <GameTile id={2} onClick={props.onClick}/>
        <GameTile id={3} onClick={props.onClick}/>
        <GameTile id={4} onClick={props.onClick}/>
        <GameTile id={5} onClick={props.onClick}/>
        <GameTile id={6} onClick={props.onClick}/>
        <GameTile id={7} onClick={props.onClick}/>
        <GameTile id={8} onClick={props.onClick}/>
        <GameTile id={9} onClick={props.onClick}/>
        <GameTile id={10} onClick={props.onClick}/>
        <GameTile id={11} onClick={props.onClick}/>
        <GameTile id={12} onClick={props.onClick}/>
        <GameTile id={13} onClick={props.onClick}/>
        <GameTile id={14} onClick={props.onClick}/>
        <GameTile id={15} onClick={props.onClick}/>
        <GameTile id={16} onClick={props.onClick}/>
        </>
    )
}

export default GameTiles;