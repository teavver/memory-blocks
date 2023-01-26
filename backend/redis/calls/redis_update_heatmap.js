import { client } from "../../server.js";
import redis_key_exists from "./redis_key_exists.js";
import redis_create_heatmap from "./redis_create_heatmap.js";

const redis_update_heatmap = async (user_id, index_obj) => {

    // Not really "update", more like increment (?)
    const increment_heatmap_err = async () => {
        const heatmap = await client.json.GET(`heatmap:${user_id}`,)
        heatmap[index_obj.index] += 0.2
        await client.json.SET(`heatmap:${user_id}`,'.',heatmap)        
        console.log(heatmap)
    }

    // Check if the heatmap exists
    const exists = await redis_key_exists(`heatmap:${user_id}`)
    if(!exists){
        console.log("creating heatmap for user "+user_id)
        await redis_create_heatmap(user_id)
        await increment_heatmap_err()
        return
    }

    // Update with new values
    await increment_heatmap_err()
}

export default redis_update_heatmap