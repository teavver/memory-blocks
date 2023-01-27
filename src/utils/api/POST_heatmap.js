import axios from "axios";

const POST_heatmap = (mistake_tile_index) => {

    const user_id = localStorage.getItem("USER_ID")
    const index_obj = {
        "index": mistake_tile_index
    }

    axios.post(`http://localhost:3000/heatmaps/${user_id}`, index_obj)
    .then(function (res) {
        console.log(res)
    })
    .catch(function(error) {
        console.log(error)
    })
}

export default POST_heatmap