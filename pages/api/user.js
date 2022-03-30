// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { del, get, post, put } from '../../service/user';
import connectDB from './db'

export default async function (req, res) {
    await connectDB()
    if (req.method == 'GET') {
        req.query.id
            ? await get.getUser(req, res)
            : await get.getAllUsers(req, res);
    }
    if (req.method == 'POST') {
        post.createUser(req, res);
    }
    if (req.method == 'PUT') {
        put.updateUser(req, res);
    }
    if (req.method == 'DELETE') {
        await del.deleteUser(req, res);
    }
}