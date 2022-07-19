// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createUser, getAllUsers, getUser } from '../../service/user';
import connectDB from './db'

export default async function (req, res) {
    const user_connection= await connectDB.connect()
    
    if (req.method == 'GET') {
        req.query.id
            ? await getUser(req, res,user_connection)
            : await getAllUsers(req, res,user_connection);
    }
    else if (req.method == 'POST') {
        createUser(req, res,user_connection);
    }
    else {
        res.status(404).send({ msg: 'request not found' })
    }
}