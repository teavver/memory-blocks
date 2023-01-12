import { client } from "../../server.js";

const redis_key_exists = async (key) => {
    const exists = await client.EXISTS(key)

    if(exists === 1){ return 1 }
    else return 0
}

export default redis_key_exists
