// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { del, get, post, put } from '../../service/collection';
import connectDB from './db'

export default async function (req, res) {
    await connectDB()
    if (req.method == 'GET') {
        req.query.id
            ? await get.getCollection(req, res)
            : await get.getAllCollections(req, res);
    }
    if (req.method == 'POST') {
        post.createCollection(req, res);
    }
    if (req.method == 'PUT') {
        put.updateCollection(req, res);
    }
    if (req.method == 'DELETE') {
        await del.deleteCollection(req, res);
    }
}