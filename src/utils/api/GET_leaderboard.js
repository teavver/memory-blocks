import axios from "axios";

const GET_leaderboard = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/leaderboard`)
        const data = JSON.stringify(response.data)
        console.log(data)
        return data
    } catch (err) {
        console.error(err)
    }
}

export default GET_leaderboard