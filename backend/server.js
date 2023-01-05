import Ajv from "ajv";
import "dotenv/config.js";
import redis from "redis";
import express from "express";

import { user_schema } from "./redis/schemas/user_schema.js";

const ajv = new Ajv()

const PORT = 3000

export const app = express()
export const client = redis.createClient({
    url: `redis://${process.env.USER}:${process.env.PASSWORD}@${process.env.ENDPOINT}:${process.env.PORT}`
})

client.connect()
const user = await client.aclWhoAmI()
console.log(`Logged to redis as "${user}"`)

app.listen(PORT, () => {
    console.log(`Express server started on http://localhost:${PORT}`)
})

const create_user = () => {
    const username = "testUser"
    const id = generate_id()
    
    const user_data = { username, id }
    const valid = ajv.validate( user_schema, user_data )
    if(!valid) console.log(ajv.errors)
    if(valid){
        client.json.SET("test_USER","$",user_data)
    }
}

const generate_id = () => {
    const id = Math.floor(1000 + Math.random() * 9000);
    console.log("random", id);
    return id
}

create_user()