import GET_leaderboard from "../utils/api/GET_leaderboard.js";
import "../styles/leaderboard.css";
import { useState, useEffect } from "react";

const Leaderboard = () => {

    const [leaderboard, setLeaderboard] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        console.log("loading leaderboard...")
        load_leaderboard()
    }, [])

    const load_leaderboard = async () => {
        const leaderboardData = await GET_leaderboard()
        console.log(leaderboardData)
        setLeaderboard(leaderboardData)
        setLoading(false)
    }
            
    return(
        <div className="leaderboard-content">
            <div className="leaderboard-title">
                <h2>Global Leaderboard</h2>
            </div>
            <div className="leaderboard-list">
                { loading ?
                <h2>Loading data...</h2>
                :
                // the leaderboard
                // <ul>
                //     { leaderboard.map((score, position) => {
                //         return <li key={position}>{score}</li>
                //     })}
                // </ul>
                <h2>{leaderboard}</h2>
                }
            </div>
        </div>
    )
}

export default Leaderboard