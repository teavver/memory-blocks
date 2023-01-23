import { client } from "../../server.js";

const redis_create_heatmap = async (user_id) => {
    // Check for duplicates
    const exists = await client.json.GET(`heatmap:${user_id}`)
    if(exists !== null){ console.error(`heatmap for user ${user_id} already exists`); return }
    
    const empty_heatmap = new Array(16); for(let i = 0; i<16; i++) empty_heatmap[i] = 0
    const heatmap_json = JSON.parse(JSON.stringify(empty_heatmap))
    client.json.SET(`heatmap:${user_id}`,'.',heatmap_json)
}

export default redis_create_heatmap