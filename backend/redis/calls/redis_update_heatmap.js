import { client } from "../../server.js";

const redis_update_heatmap = async (user_id, index_to_increment) => {

    const heatmap = await client.json.GET(`heatmap:${user_id}`,)
    heatmap[index_to_increment] += 0.1

    console.log(heatmap)
    client.json.SET(`heatmap:${user_id}`,'.',heatmap)
}

export default redis_update_heatmap