import { client } from "../../server.js";

const redis_get_leaderboard = async () => {
        
    let leaderboard_unsorted = []
    const games = await client.KEYS("*")
    // console.log(games)

    for(const game of games) {

        const data = await client.json.GET(`${game}`)
        const score = data.score
        const user_id = data.user_id

        const game_data = {
            score,
            user_id
        }

        leaderboard_unsorted.push(game_data)
    }

    const leaderboard_sorted = leaderboard_unsorted.sort((a,b) => b.score - a.score)

    // console.log(leaderboard_sorted)

    return leaderboard_sorted
}

export default redis_get_leaderboard