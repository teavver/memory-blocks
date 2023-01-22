import { Router } from "express";

const heatmaps = Router()

const GET_heatmaps = async (req, res) => {
    res.send('heatmaps of user '+ req.params.userId)
}

heatmaps.route('/heatmaps/:userId')
    .get(GET_heatmaps)

export default heatmaps