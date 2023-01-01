import '../styles/game.css'
import { useState } from 'react';

const Tile = (props) => {
    const [id, setId] = useState(props.id);
    return(
        <div className={"game-tile"}
        id={props.id}
        onClick={() => props.onClick(props.id)}
        >
        </div>
    )
}

export default Tile;