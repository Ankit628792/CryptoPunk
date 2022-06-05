// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createUser, getAllUsers, getUser } from '../../service/user';
import connectDB from './db'

export default async function (req, res) {
    await connectDB()
    if (req.method == 'GET') {
        req.query.id
            ? await getUser(req, res)
            : await getAllUsers(req, res);
    }
    else if (req.method == 'POST') {
        createUser(req, res);
    }
    else {
        res.status(404).send({ msg: 'request not found' })
    }
}