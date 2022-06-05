// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCollection, getAllCollections, getCollection } from '../../service/collection';
import connectDB from './db'

export default async function (req, res) {
    await connectDB()
    if (req.method == 'GET') {
        req.query.id
            ? await getCollection(req, res)
            : await getAllCollections(req, res);
    }
    else if (req.method == 'POST') {
        await createCollection(req, res);
    }
    else {
        res.status(404).send({ msg: 'request not found' })
    }
}