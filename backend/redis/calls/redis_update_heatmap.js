import { heatmap_update_schema } from "../../api/ajv/schemas/heatmap_update_schema.js";
import { client } from "../../server.js";
import redis_key_exists from "./redis_key_exists.js";
import redis_create_heatmap from "./redis_create_heatmap.js";
import validate from "../../api/ajv/validate.js";

const redis_update_heatmap = async (user_id, index_obj) => {

    // Validate data
    const index_in_range = (index_obj.index <= 15 && index_obj.index >= 0)
    if(!index_in_range){ console.log("index out of range"); return }

    const valid_uid_length = (user_id.length === 4)
    if(!valid_uid_length){ console.log('incorrect u_id length'); return }
    
    const valid_uid = /^\d+$/.test(user_id)
    if(!valid_uid){ console.log("user_id has to be 4 digits"); return }
    
    const valid = validate(heatmap_update_schema, index_obj)
    if(!valid) return

    // Not really "update", more like increment (?)
    const increment_heatmap_err = async () => {
        const heatmap = await client.json.GET(`heatmap:${user_id}`,)
        heatmap[index_obj.index] += 0.2
        await client.json.SET(`heatmap:${user_id}`,'.',heatmap)
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