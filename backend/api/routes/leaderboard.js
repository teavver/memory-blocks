import { Router } from "express";
import redis_get_leaderboard from "../../redis/calls/redis_get_leaderboard.js";

const leaderboard = Router()

const GET_leaderboard = async (req, res) => {
    const leaderboard_data = await redis_get_leaderboard()
    res.send(JSON.stringify(leaderboard_data))
}

leaderboard.route('/leaderboard')
    .get(GET_leaderboard)

export default leaderboard