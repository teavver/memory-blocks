import { Router } from "express";
import { spawn } from "child_process";
import redis_get_json from "../../redis/calls/redis_get_json.js";

const heatmaps = Router()

const GET_heatmaps = async (req, res) => {
    const user_id = req.params.userId
    const heatmap_data = await redis_get_json(`heatmap:${user_id}`)

    var base64_data
    const python = spawn('python', ['./heatmaps/generate_heatmap.py',heatmap_data])
    python.stdout.on('data', function (data){
        base64_data = data.toString()
        console.log(base64_data)
        res.send(base64_data)
    })

    // make sure stream from child process is closed
    python.on('close', (code) => {
        console.log(`python closed with code ${code}`)
    }) 
}

heatmaps.route('/heatmaps/:userId')
    .get(GET_heatmaps)

export default heatmaps