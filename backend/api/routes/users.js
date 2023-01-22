import { Router } from "express";

const users = Router()

const GET_users = async (req, res) => {
    res.send('get user'+ req.params.userId)
}

const POST_users = async (req, res) => {
    res.send('post user'+ req.params.userId)
}

users.route('/users/:userId')
    .get(GET_users)
    .post(POST_users)

export default users