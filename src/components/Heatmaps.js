import { useEffect, useState, useRef } from "react";

const Heatmaps = () => {

    let isFirstRender = useRef(true)
    
    const [loading, setLoading] = useState(true)
    const [heatmapImg, setHeatmapImg] = useState("")

    const user_id = localStorage.getItem("USER_ID")
    
    useEffect(() => {
        if(isFirstRender.current){
            isFirstRender = false
        }
    }, [])

    const load_heatmap = async () => {
        fetch(`http://localhost:3000/heatmaps/${user_id}`)
            .then(res => res.text())
            .then(res_data => {
                console.log(res_data)
                setLoading(false)
                setHeatmapImg(res_data)
            })
    }
    
    return(
        <div>
            <h1>user {user_id}'s heatmap</h1>
            { loading ?
            <div>
            <button onClick={() => load_heatmap()}>Generate</button>
            <p>click to load heatmap</p>
            </div>
            :
            <img src={`data:image/jpeg;base64,${heatmapImg}`}/>
            }
        </div>
    );
}

export default Heatmaps