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
        setLeaderboard(JSON.parse(leaderboardData))
        setLoading(false)
    }
            
    return(
        <div className="leaderboard-content">
            <div className="leaderboard-title">
                <h3>Global Leaderboard</h3>
            </div>
            <div className="leaderboard-list">
                { loading ?
                <h2>Loading data...</h2>
                :
                // the leaderboard
                <ul>
                    { leaderboard.map((item, index) => {
                        return <li key={index}>{`${index + 1}. User: ${item.user_id},   Score: ${item.score}`}</li>
                    })}
                </ul>
                // <h2>{leaderboard}</h2>
                }
            </div>
        </div>
    )
}

export default Leaderboard