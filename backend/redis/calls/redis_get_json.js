import { client } from "../../server.js";

const redis_get_json = async (key) => {

    const val = await client.json.GET(key)
    if(val === null){ console.error(`couldn't find key ${key}`); return }
    return val
}

export default redis_get_json