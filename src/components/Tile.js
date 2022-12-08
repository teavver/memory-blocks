import '../styles/Game.css'
import { useEffect, useState } from 'react';

const Tile = (props) => {
    const [id, setId] = useState(props.id);
    return(
        <div className={"game-tile"}
        id={props.id}
        onClick={() => props.onClick(props.id)}
        >
        {/* {props.id} */}
        </div>
    )
}

export default Tile;