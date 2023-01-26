import { Router } from "express";
import { spawn } from "child_process";
import redis_get_json from "../../redis/calls/redis_get_json.js";
import redis_update_heatmap from "../../redis/calls/redis_update_heatmap.js";

const heatmaps = Router()

const GET_heatmaps = async (req, res) => {
    const user_id = req.params.userId
    const heatmap_data = await redis_get_json(`heatmap:${user_id}`)

    var base64_data
    const python = spawn('python', ['./heatmaps/generate_heatmap.py', heatmap_data, user_id])
    python.stdout.on('data', function (data){
        // Pass b64 data returned from py as response
        base64_data = data.toString()
        // console.log(base64_data)
        res.send(base64_data)
    })

    // Close and return python exit code
    python.on('close', (code) => {
        console.log(`python closed with code ${code}`)
    }) 
}

const POST_heatmaps = async (req,res) => {
    const user_id = req.params.userId
    const index_to_increment = req.body
    // console.log(index_to_increment)
    res.json({requestBody: req.body})

    await redis_update_heatmap(user_id, index_to_increment)
    console.log("heatmap for user "+user_id+" updated")
}

heatmaps.route('/heatmaps/:userId')
    .get(GET_heatmaps)
    .post(POST_heatmaps)

export default heatmaps